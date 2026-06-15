"use client";

import { useState, useRef, useCallback } from "react";
import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox, TipBox } from "@/components/guide/GuideComponents";

export default function AwsVpnWizard() {
  // CIDR state
  const [cidrs, setCidrs] = useState({
    opCidr: "", ocCidr: "", opSub: "", ocSub: ""
  });
  const [appliedCidrs, setAppliedCidrs] = useState({
    opCidr: "10.0.0.0/16", ocCidr: "10.1.0.0/16",
    opSub: "10.0.1.0/24", ocSub: "10.1.1.0/24"
  });
  const [cidrApplied, setCidrApplied] = useState(false);

  // Upload / parse state
  const [cfg, setCfg] = useState(null);
  const [parseError, setParseError] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [guideGenerated, setGuideGenerated] = useState(false);

  // Phase 2 private IP inputs
  const [onpremPrivIP, setOnpremPrivIP] = useState("");
  const [oncloudPrivIP, setOncloudPrivIP] = useState("");
  const [privIPApplied, setPrivIPApplied] = useState(false);
  const [cloudIPApplied, setCloudIPApplied] = useState(false);

  // Cleanup checklist
  const [cleanupChecks, setCleanupChecks] = useState(Array(8).fill(false));

  const fileInputRef = useRef(null);

  const navGroups = [
    {
      title: "Setup (Steps 1-14)",
      items: [
        { id: "architecture", title: "🏗️ Architecture & CIDRs" },
        { id: "vpcs", title: "1-2. VPC Creation" },
        { id: "subnets", title: "3-4. Subnets" },
        { id: "igw", title: "5. Internet Gateway" },
        { id: "routes", title: "6-7. Route Tables" },
        { id: "security", title: "8-9. Security Groups" },
        { id: "gateways", title: "10-13. VPN Gateways" },
        { id: "upload", title: "14. Download & Upload Config" }
      ]
    },
    {
      title: "Personalized Guide (15-31)",
      items: [
        { id: "propagation", title: "15-16. Route Propagation" },
        { id: "ec2", title: "17-20. EC2 Instances" },
        { id: "strongswan", title: "21-28. strongSwan Config" },
        { id: "verify", title: "29-31. Verify & Test" },
        { id: "cleanup", title: "🗑️ Cleanup Checklist" }
      ]
    }
  ];

  // ── CIDR helpers ──
  const getOp = () => appliedCidrs.opCidr || "10.0.0.0/16";
  const getOc = () => appliedCidrs.ocCidr || "10.1.0.0/16";
  const getOps = () => appliedCidrs.opSub || appliedCidrs.opCidr.replace(/\/\d+$/, "/24") || "10.0.1.0/24";
  const getOcs = () => appliedCidrs.ocSub || appliedCidrs.ocCidr.replace(/\/\d+$/, "/24") || "10.1.1.0/24";

  const applyCIDRs = () => {
    const op = cidrs.opCidr || "10.0.0.0/16";
    const oc = cidrs.ocCidr || "10.1.0.0/16";
    const ops = cidrs.opSub || op.replace(/\/\d+$/, "/24");
    const ocs = cidrs.ocSub || oc.replace(/\/\d+$/, "/24");
    setAppliedCidrs({ opCidr: op, ocCidr: oc, opSub: ops, ocSub: ocs });
    setCidrApplied(true);
    setTimeout(() => setCidrApplied(false), 2500);
  };

  // ── Config parser ──
  const parseConfig = useCallback((text) => {
    if (!text.includes("IPSEC Tunnel #1") || !text.includes("IPSEC Tunnel #2")) {
      return { error: "⚠️ This does not look like an AWS VPN config file. Please download from AWS Console → Site-to-Site VPN → Download Configuration → Vendor: Strongswan." };
    }

    const t1Start = text.indexOf("IPSEC Tunnel #1");
    const t2Start = text.indexOf("IPSEC Tunnel #2");
    const t1Sec = text.substring(t1Start, t2Start);
    const t2Sec = text.substring(t2Start);

    const ex = (sec, re) => {
      const m = sec.match(re);
      return m ? m[1].trim() : null;
    };

    const onpremIP = ex(t1Sec, /leftid\s*=\s*([\d.]+)/i);
    const t1Outside = ex(t1Sec, /[\t ]right\s*=\s*([\d.]+)/i);
    const t2Outside = ex(t2Sec, /[\t ]right\s*=\s*([\d.]+)/i);
    const t1PSK = ex(t1Sec, /PSK\s+"([^"]+)"/i);
    const t2PSK = ex(t2Sec, /PSK\s+"([^"]+)"/i);

    const getInsideIPs = (sec) => {
      let m = sec.match(/-ll\s+(169\.254\.[\d.]+\/\d+)\s+-lr\s+(169\.254\.[\d.]+\/\d+)/i);
      if (m) return { local: m[1].trim(), remote: m[2].trim() };
      m = sec.match(/ip\s+addr\s+add\s+(169\.254\.[\d.]+\/\d+)\s+remote\s+(169\.254\.[\d.]+\/\d+)/i);
      if (m) return { local: m[1].trim(), remote: m[2].trim() };
      return { local: null, remote: null };
    };

    const t1In = getInsideIPs(t1Sec);
    const t2In = getInsideIPs(t2Sec);

    const missing = [];
    if (!onpremIP) missing.push("Customer Gateway IP (leftid=)");
    if (!t1Outside) missing.push("Tunnel1 VGW Outside IP (right=)");
    if (!t2Outside) missing.push("Tunnel2 VGW Outside IP (right=)");
    if (!t1PSK) missing.push("Tunnel1 PSK");
    if (!t2PSK) missing.push("Tunnel2 PSK");
    if (!t1In.local) missing.push("Tunnel1 Inside Local IP (-ll)");
    if (!t1In.remote) missing.push("Tunnel1 Inside Remote IP (-lr)");
    if (!t2In.local) missing.push("Tunnel2 Inside Local IP (-ll)");
    if (!t2In.remote) missing.push("Tunnel2 Inside Remote IP (-lr)");

    if (missing.length > 0) {
      return { error: "⚠️ Could not extract: " + missing.join(", ") + ". Please ensure you downloaded the Strongswan config from AWS." };
    }

    return {
      onpremIP, t1Outside, t1PSK, t1Local: t1In.local, t1Remote: t1In.remote,
      t2Outside, t2PSK, t2Local: t2In.local, t2Remote: t2In.remote
    };
  }, []);

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const result = parseConfig(text);
      if (result.error) {
        setParseError(result.error);
        setCfg(null);
        return;
      }
      setParseError("");
      setCfg(result);
      setUploadedFileName(file.name);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const generateGuide = () => {
    if (!cfg) return;
    setGuideGenerated(true);
  };

  // Cleanup progress
  const cleanupDone = cleanupChecks.filter(Boolean).length;
  const cleanupTotal = cleanupChecks.length;
  const toggleCleanup = (i) => {
    const next = [...cleanupChecks];
    next[i] = !next[i];
    setCleanupChecks(next);
  };

  // ── Build ipsec.conf content ──
  const getIpsecConf = () => {
    if (!cfg) return "";
    const ip = cfg.onpremIP;
    const opCidr = getOp();
    const ocCidr = getOc();
    return `config setup
    uniqueids=no
    charondebug="ike 1, knl 1, cfg 0"

conn %default
    ikelifetime=60m
    keylife=20m
    rekeymargin=3m
    keyingtries=1
    authby=secret
    keyexchange=ikev1
    mobike=no

conn Tunnel1
    auto=start
    left=%defaultroute
    leftid=${ip}
    leftsubnet=${opCidr}
    right=${cfg.t1Outside}
    rightsubnet=${ocCidr}
    ike=aes128-sha1-modp2048!
    esp=aes128-sha1-modp2048!
    type=tunnel
    dpdaction=restart
    dpddelay=30s
    dpdtimeout=120s
    mark=100
    leftupdown="/etc/ipsec.d/aws-updown.sh -ln Tunnel1 -ll ${cfg.t1Local} -lr ${cfg.t1Remote} -m 100 -r ${ocCidr}"

conn Tunnel2
    auto=start
    left=%defaultroute
    leftid=${ip}
    leftsubnet=${opCidr}
    right=${cfg.t2Outside}
    rightsubnet=${ocCidr}
    ike=aes128-sha1-modp2048!
    esp=aes128-sha1-modp2048!
    type=tunnel
    dpdaction=restart
    dpddelay=30s
    dpdtimeout=120s
    mark=200
    leftupdown="/etc/ipsec.d/aws-updown.sh -ln Tunnel2 -ll ${cfg.t2Local} -lr ${cfg.t2Remote} -m 200 -r ${ocCidr}"`;
  };

  const getIpsecSecrets = () => {
    if (!cfg) return "";
    return `${cfg.onpremIP} ${cfg.t1Outside} : PSK "${cfg.t1PSK}"
${cfg.onpremIP} ${cfg.t2Outside} : PSK "${cfg.t2PSK}"`;
  };

  const getUpdownScript = () => {
    const privIP = privIPApplied && onpremPrivIP ? onpremPrivIP : "[ON-PREM-EC2-PRIVATE-IP]";
    const ocCidr = getOc();
    return `#!/bin/bash

while [[ $# > 1 ]]; do
\tcase \${1} in
\t\t-ln|--link-name)
\t\t\tTUNNEL_NAME="\${2}"
\t\t\tTUNNEL_PHY_INTERFACE="\${PLUTO_INTERFACE}"
\t\t\tshift
\t\t\t;;
\t\t-ll|--link-local)
\t\t\tTUNNEL_LOCAL_ADDRESS="\${2}"
\t\t\tTUNNEL_LOCAL_ENDPOINT="\${PLUTO_ME}"
\t\t\tshift
\t\t\t;;
\t\t-lr|--link-remote)
\t\t\tTUNNEL_REMOTE_ADDRESS="\${2}"
\t\t\tTUNNEL_REMOTE_ENDPOINT="\${PLUTO_PEER}"
\t\t\tshift
\t\t\t;;
\t\t-m|--mark)
\t\t\tTUNNEL_MARK="\${2}"
\t\t\tshift
\t\t\t;;
\t\t-r|--static-route)
\t\t\tTUNNEL_STATIC_ROUTE="\${2}"
\t\t\tshift
\t\t\t;;
\t\t*)
\t\t\techo "\${0}: Unknown argument \\"\${1}\\"" >&2
\t\t\t;;
\tesac
\tshift
done

command_exists() { type "$1" >&2 2>&2; }

create_interface() {
\tip link add \${TUNNEL_NAME} type vti local \${TUNNEL_LOCAL_ENDPOINT} remote \${TUNNEL_REMOTE_ENDPOINT} key \${TUNNEL_MARK}
\tip addr add \${TUNNEL_LOCAL_ADDRESS} remote \${TUNNEL_REMOTE_ADDRESS} dev \${TUNNEL_NAME}
\tip link set \${TUNNEL_NAME} up mtu 1419
}

configure_sysctl() {
\tsysctl -w net.ipv4.ip_forward=1
\tsysctl -w net.ipv4.conf.\${TUNNEL_NAME}.rp_filter=2
\tsysctl -w net.ipv4.conf.\${TUNNEL_NAME}.disable_policy=1
\tsysctl -w net.ipv4.conf.\${TUNNEL_PHY_INTERFACE}.disable_xfrm=1
\tsysctl -w net.ipv4.conf.\${TUNNEL_PHY_INTERFACE}.disable_policy=1
}

add_route() {
\tIFS=',' read -ra route <<< "\${TUNNEL_STATIC_ROUTE}"
\tfor i in "\${route[@]}"; do
\t    ip route add \${i} dev \${TUNNEL_NAME} metric \${TUNNEL_MARK} src ${privIP}
\tdone
\tiptables -t mangle -A FORWARD -o \${TUNNEL_NAME} -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu
\tiptables -t mangle -A INPUT -p esp -s \${TUNNEL_REMOTE_ENDPOINT} -d \${TUNNEL_LOCAL_ENDPOINT} -j MARK --set-xmark \${TUNNEL_MARK}
\tip route flush table 220
}

cleanup() {
\tIFS=',' read -ra route <<< "\${TUNNEL_STATIC_ROUTE}"
\tfor i in "\${route[@]}"; do
\t    ip route del \${i} dev \${TUNNEL_NAME} metric \${TUNNEL_MARK}
\tdone
\tiptables -t mangle -D FORWARD -o \${TUNNEL_NAME} -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu
\tiptables -t mangle -D INPUT -p esp -s \${TUNNEL_REMOTE_ENDPOINT} -d \${TUNNEL_LOCAL_ENDPOINT} -j MARK --set-xmark \${TUNNEL_MARK}
\tip route flush cache
}

delete_interface() { ip link set \${TUNNEL_NAME} down; ip link del \${TUNNEL_NAME}; }

command_exists ip       || echo "ERROR: ip command required" >&2
command_exists iptables || echo "ERROR: iptables command required" >&2
command_exists sysctl   || echo "ERROR: sysctl command required" >&2

case "\${PLUTO_VERB}" in
\tup-client)
\t\tcreate_interface
\t\tconfigure_sysctl
\t\tadd_route
\t\t;;
\tdown-client)
\t\tcleanup
\t\tdelete_interface
\t\t;;
esac`;
  };

  // Reusable inline step component
  const Step = ({ num, title, children, critical }) => (
    <div style={{
      backgroundColor: "var(--g-surface)",
      border: `1px solid ${critical ? "rgba(239,68,68,0.4)" : "var(--g-border)"}`,
      borderRadius: "12px",
      padding: "22px 24px",
      marginBottom: "14px"
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "14px" }}>
        <div style={{
          background: critical
            ? "linear-gradient(135deg, #ef4444, #f59e0b)"
            : "linear-gradient(135deg, var(--g-accent), #8b5cf6)",
          color: "#fff", fontSize: "0.8rem", fontWeight: 800,
          minWidth: "32px", height: "32px", borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
        }}>
          {num}
        </div>
        <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--g-text-bright)", lineHeight: 1.4, margin: 0, paddingTop: "4px" }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );

  const Why = ({ children }) => (
    <div style={{
      fontSize: "0.82rem", color: "var(--g-text-muted)",
      background: "rgba(255,255,255,0.02)", borderLeft: "3px solid var(--g-accent)",
      padding: "8px 14px", borderRadius: "0 6px 6px 0", marginBottom: "14px", lineHeight: 1.7
    }}>
      {children}
    </div>
  );

  const Alert = ({ type, children }) => {
    const colors = {
      tip: { bg: "rgba(0,212,170,0.06)", border: "rgba(0,212,170,0.25)", icon: "💡" },
      warn: { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.3)", icon: "⚠️" },
      crit: { bg: "rgba(239,68,68,0.07)", border: "rgba(239,68,68,0.3)", icon: "🔴" }
    };
    const c = colors[type] || colors.tip;
    return (
      <div style={{
        display: "flex", gap: "12px", padding: "12px 16px", borderRadius: "8px",
        fontSize: "0.83rem", lineHeight: 1.7, margin: "10px 0",
        background: c.bg, border: `1px solid ${c.border}`
      }}>
        <span>{c.icon}</span>
        <div>{children}</div>
      </div>
    );
  };

  const VTable = ({ rows }) => (
    <table className="g-table" style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", margin: "10px 0" }}>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: "7px 12px", border: "1px solid var(--g-border)", color: "var(--g-text)", fontFamily: j === 1 ? "'JetBrains Mono', monospace" : "inherit", fontSize: j === 1 ? "0.75rem" : "0.8rem" }}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const HTable = ({ heads, rows }) => (
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", margin: "10px 0" }}>
      <thead>
        <tr>
          {heads.map((h, i) => (
            <th key={i} style={{ background: "rgba(96,165,250,0.1)", color: "#a5b4fc", fontWeight: 600, textAlign: "left", padding: "8px 12px", border: "1px solid var(--g-border)" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: "7px 12px", border: "1px solid var(--g-border)", color: "var(--g-text)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem" }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  const Nav = ({ text }) => (
    <p style={{ fontSize: "0.83rem", color: "var(--g-text-muted)", marginBottom: "8px" }}>
      Navigate: <strong style={{ color: "var(--g-text-bright)" }}>{text}</strong>
    </p>
  );

  const PartHeader = ({ num, title }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", margin: "36px 0 20px" }}>
      <div style={{
        background: "linear-gradient(135deg, var(--g-accent), #00d4aa)", color: "#fff",
        fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.08em",
        padding: "4px 12px", borderRadius: "20px", textTransform: "uppercase", whiteSpace: "nowrap"
      }}>Part {num}</div>
      <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--g-text-bright)" }}>{title}</div>
      <div style={{ flex: 1, height: "1px", background: "var(--g-border)" }} />
    </div>
  );

  const CidrSpan = ({ value }) => (
    <span style={{
      fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85em", color: "#86efac",
      background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)",
      padding: "1px 6px", borderRadius: "4px", fontWeight: 600
    }}>{value}</span>
  );

  // Cleanup items
  const cleanupItems = [
    <>Terminate EC2 instance: <code>on-prem-ec2</code></>,
    <>Terminate EC2 instance: <code>on-cloud-ec2</code></>,
    <><strong>Delete Site-to-Site VPN Connection</strong> — <strong style={{ color: "#fca5a5" }}>Do this first — $0.05/hr</strong></>,
    <>Delete <strong>Customer Gateway</strong> (on-prem-cgw)</>,
    <>Detach then Delete <strong>Virtual Private Gateway</strong> (on-cloud-vgw) — <strong style={{ color: "#fca5a5" }}>$0.05/hr</strong></>,
    <>Detach then Delete <strong>Internet Gateway</strong> (on-prem-igw)</>,
    <>Delete both Subnets (on-prem-public-subnet &amp; on-cloud-private-subnet)</>,
    <>Delete both VPCs (<code>on-prem</code> and <code>on-cloud</code>)</>
  ];

  return (
    <GuideWrapper
      title="AWS VPN Wizard"
      subtitle="Personalized strongSwan Site-to-Site VPN Setup Guide — zero placeholders, zero errors."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {

          // ═══════════════════════════════════════════
          // ARCHITECTURE & CIDR CONFIG
          // ═══════════════════════════════════════════
          case "architecture":
            return (
              <div>
                <h2>Lab Architecture &amp; CIDR Configuration</h2>
                <p className="guide-subtitle">Enter your CIDRs and click Apply to personalize all steps below.</p>

                {/* Cost Warning */}
                <div style={{
                  background: "rgba(239,68,68,0.08)", border: "1.5px solid rgba(239,68,68,0.35)",
                  borderRadius: "12px", padding: "16px 20px", marginBottom: "20px"
                }}>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fca5a5", marginBottom: "8px" }}>
                    ⚠️ Cost Warning — Resources below are NOT free tier
                  </div>
                  <HTable
                    heads={["Resource", "$/hr", "$/day", "Free tier?"]}
                    rows={[
                      ["EC2 t3.micro ×2", "$0.0104 each", "~$0.50", "✅ Yes"],
                      ["Site-to-Site VPN", "$0.05", "~$1.20", "❌ No"],
                      ["Virtual Private Gateway", "$0.05", "~$1.20", "❌ No"],
                      ["Total", "~$0.11", "~$2.60", "🗑️ Delete after lab!"]
                    ]}
                  />
                </div>

                {/* Architecture Diagram */}
                <div style={{
                  background: "var(--g-surface)", border: "1px solid var(--g-border)",
                  borderRadius: "16px", padding: "24px", marginBottom: "28px", position: "relative", overflow: "hidden"
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, var(--g-accent), #00d4aa)" }} />
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--g-accent)", marginBottom: "14px" }}>
                    🏗️ Lab Architecture
                  </div>
                  <svg viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", borderRadius: "10px", display: "block" }}>
                    <defs>
                      <marker id="arr-g" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="#22c55e" /></marker>
                      <marker id="arr-r" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><polygon points="0,0 7,3.5 0,7" fill="rgba(239,68,68,0.85)" /></marker>
                      <marker id="arr-l" markerWidth="7" markerHeight="7" refX="1" refY="3.5" orient="auto"><polygon points="7,0 0,3.5 7,7" fill="rgba(239,68,68,0.85)" /></marker>
                    </defs>
                    <rect width="900" height="650" fill="#0d1117" rx="10" />
                    {/* Left: on-prem VPC */}
                    <rect x="18" y="18" width="400" height="338" rx="12" fill="rgba(34,197,94,0.04)" stroke="rgba(34,197,94,0.4)" strokeWidth="1.5" strokeDasharray="8,4" />
                    <text x="218" y="46" textAnchor="middle" fill="#f0fdf4" fontSize="15" fontWeight="700" fontFamily="Inter,sans-serif">on-prem VPC</text>
                    <text x="218" y="64" textAnchor="middle" fill="#86efac" fontSize="12" fontFamily="JetBrains Mono,monospace">{getOp()}</text>
                    <rect x="36" y="78" width="364" height="242" rx="10" fill="rgba(34,197,94,0.07)" stroke="rgba(34,197,94,0.25)" strokeWidth="1" />
                    <text x="218" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="700" fontFamily="Inter,sans-serif">Public Subnet</text>
                    <text x="218" y="116" textAnchor="middle" fill="#86efac" fontSize="11" fontFamily="JetBrains Mono,monospace">{getOps()}</text>
                    <rect x="54" y="128" width="118" height="66" rx="8" fill="#166534" />
                    <text x="113" y="158" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Inter,sans-serif">EC2</text>
                    <text x="113" y="176" textAnchor="middle" fill="#bbf7d0" fontSize="11" fontFamily="Inter,sans-serif">Bastion host</text>
                    <rect x="214" y="128" width="118" height="66" rx="8" fill="#1d4ed8" />
                    <text x="273" y="158" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Inter,sans-serif">IGW</text>
                    <text x="273" y="176" textAnchor="middle" fill="#bfdbfe" fontSize="11" fontFamily="Inter,sans-serif">Internet GW</text>
                    <rect x="54" y="214" width="345" height="86" rx="8" fill="#1f2937" />
                    <text x="227" y="236" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600" fontFamily="Inter,sans-serif">Route Table</text>
                    <text x="227" y="255" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="JetBrains Mono,monospace">{"0.0.0.0/0 → IGW"}</text>
                    <text x="227" y="274" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="JetBrains Mono,monospace">{`${getOc()} → VGW`}</text>
                    {/* Right: on-cloud VPC */}
                    <rect x="482" y="18" width="400" height="338" rx="12" fill="rgba(99,102,241,0.04)" stroke="rgba(99,102,241,0.4)" strokeWidth="1.5" strokeDasharray="8,4" />
                    <text x="682" y="46" textAnchor="middle" fill="#f5f3ff" fontSize="15" fontWeight="700" fontFamily="Inter,sans-serif">on-cloud VPC</text>
                    <text x="682" y="64" textAnchor="middle" fill="#c4b5fd" fontSize="12" fontFamily="JetBrains Mono,monospace">{getOc()}</text>
                    <rect x="500" y="78" width="364" height="242" rx="10" fill="rgba(99,102,241,0.07)" stroke="rgba(99,102,241,0.25)" strokeWidth="1" />
                    <text x="682" y="100" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="700" fontFamily="Inter,sans-serif">Private Subnet</text>
                    <text x="682" y="116" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontFamily="JetBrains Mono,monospace">{getOcs()}</text>
                    <rect x="518" y="128" width="118" height="66" rx="8" fill="#4338ca" />
                    <text x="577" y="158" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700" fontFamily="Inter,sans-serif">EC2</text>
                    <text x="577" y="176" textAnchor="middle" fill="#c4b5fd" fontSize="11" fontFamily="Inter,sans-serif">Private target</text>
                    <rect x="678" y="128" width="118" height="66" rx="8" fill="#374151" />
                    <text x="737" y="158" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="700" fontFamily="Inter,sans-serif">No IGW</text>
                    <text x="737" y="176" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="Inter,sans-serif">Private only</text>
                    <rect x="500" y="214" width="345" height="86" rx="8" fill="#1f2937" />
                    <text x="673" y="236" textAnchor="middle" fill="#e2e8f0" fontSize="12" fontWeight="600" fontFamily="Inter,sans-serif">Route Table</text>
                    <text x="673" y="255" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="JetBrains Mono,monospace">{`${getOp()} → VGW`}</text>
                    <text x="673" y="274" textAnchor="middle" fill="#9ca3af" fontSize="11" fontFamily="Inter,sans-serif">local traffic only</text>
                    {/* SSH via VPN */}
                    <rect x="328" y="136" width="118" height="22" rx="4" fill="#0d1117" opacity="0.95" />
                    <text x="387" y="151" textAnchor="middle" fill="#22c55e" fontSize="11" fontWeight="600" fontFamily="Inter,sans-serif">SSH via VPN</text>
                    <line x1="175" y1="161" x2="328" y2="161" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6,3" />
                    <line x1="446" y1="161" x2="518" y2="161" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6,3" markerEnd="url(#arr-g)" />
                    {/* Connectors */}
                    <line x1="155" y1="356" x2="155" y2="398" stroke="rgba(34,197,94,0.5)" strokeWidth="1.5" strokeDasharray="5,3" />
                    <line x1="745" y1="356" x2="745" y2="398" stroke="rgba(99,102,241,0.5)" strokeWidth="1.5" strokeDasharray="5,3" />
                    <rect x="50" y="398" width="210" height="56" rx="10" fill="#92400e" />
                    <text x="155" y="424" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter,sans-serif">Customer Gateway (CGW)</text>
                    <text x="155" y="442" textAnchor="middle" fill="#fde68a" fontSize="11" fontFamily="Inter,sans-serif">on-prem side of VPN</text>
                    <rect x="640" y="398" width="210" height="56" rx="10" fill="#78350f" />
                    <text x="745" y="424" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter,sans-serif">Virtual Private GW (VGW)</text>
                    <text x="745" y="442" textAnchor="middle" fill="#fde68a" fontSize="11" fontFamily="Inter,sans-serif">cloud side of VPN</text>
                    <line x1="155" y1="454" x2="155" y2="492" stroke="rgba(239,68,68,0.6)" strokeWidth="1.5" strokeDasharray="5,3" />
                    <line x1="745" y1="454" x2="745" y2="492" stroke="rgba(239,68,68,0.6)" strokeWidth="1.5" strokeDasharray="5,3" />
                    <rect x="50" y="492" width="210" height="52" rx="10" fill="#991b1b" />
                    <text x="155" y="517" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter,sans-serif">Site-to-Site VPN</text>
                    <text x="155" y="534" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="Inter,sans-serif">IPsec tunnel</text>
                    <rect x="640" y="492" width="210" height="52" rx="10" fill="#991b1b" />
                    <text x="745" y="517" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700" fontFamily="Inter,sans-serif">Site-to-Site VPN</text>
                    <text x="745" y="534" textAnchor="middle" fill="#fca5a5" fontSize="11" fontFamily="Inter,sans-serif">IPsec tunnel</text>
                    <rect x="332" y="496" width="236" height="44" rx="8" fill="none" stroke="rgba(239,68,68,0.5)" strokeWidth="1.5" strokeDasharray="6,3" />
                    <text x="450" y="522" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="600" fontFamily="Inter,sans-serif">IPsec tunnel</text>
                    <line x1="260" y1="518" x2="332" y2="518" stroke="rgba(239,68,68,0.85)" strokeWidth="1.5" markerEnd="url(#arr-r)" />
                    <line x1="640" y1="518" x2="568" y2="518" stroke="rgba(239,68,68,0.85)" strokeWidth="1.5" markerEnd="url(#arr-l)" />
                    <text x="450" y="638" textAnchor="middle" fill="#9ca3af" fontSize="12" fontFamily="Inter,sans-serif">{"Your goal: SSH from Bastion → private EC2"}</text>
                  </svg>
                </div>

                {/* CIDR Input Bar */}
                <div style={{
                  background: "var(--g-surface)", border: "1px solid var(--g-border)",
                  borderRadius: "14px", padding: "18px 24px", marginBottom: "28px", position: "relative", overflow: "hidden"
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, #00d4aa, var(--g-accent))" }} />
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--g-text-muted)", marginBottom: "14px" }}>
                    📐 Your CIDR Configuration
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    {[
                      { label: "On-Prem VPC CIDR", key: "opCidr", ph: "e.g. 10.0.0.0/16" },
                      { label: "On-Cloud VPC CIDR", key: "ocCidr", ph: "e.g. 10.1.0.0/16" },
                      { label: "On-Prem Public Subnet", key: "opSub", ph: "e.g. 10.0.1.0/24" },
                      { label: "On-Cloud Private Subnet", key: "ocSub", ph: "e.g. 10.1.1.0/24" }
                    ].map(({ label, key, ph }) => (
                      <div key={key}>
                        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "var(--g-text-muted)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "7px" }}>{label}</label>
                        <input
                          type="text"
                          placeholder={ph}
                          value={cidrs[key]}
                          onChange={(e) => setCidrs(prev => ({ ...prev, [key]: e.target.value }))}
                          style={{
                            width: "100%", background: "var(--g-bg)", border: "1px solid var(--g-border)",
                            borderRadius: "8px", padding: "10px 14px", color: "var(--g-text)",
                            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.88rem", outline: "none"
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ textAlign: "center", paddingTop: "20px", marginTop: "20px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <button
                      onClick={applyCIDRs}
                      style={{
                        background: "linear-gradient(135deg, #00d4aa, #00b894)", border: "none",
                        borderRadius: "8px", padding: "12px 30px", color: "#000",
                        fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.9rem",
                        cursor: "pointer", transition: "opacity 0.15s"
                      }}
                    >
                      Apply Configurations
                    </button>
                  </div>
                  {cidrApplied && (
                    <div style={{ textAlign: "center", marginTop: "14px", fontSize: "0.78rem", color: "#86efac" }}>
                      ✅ CIDRs applied to all steps below
                    </div>
                  )}
                </div>
              </div>
            );

          // ═══════════════════════════════════════════
          // VPCs
          // ═══════════════════════════════════════════
          case "vpcs":
            return (
              <div>
                <PartHeader num={1} title="VPC Creation" />
                <Step num={1} title="Create On-Prem VPC">
                  <Why>Simulates your on-premises data center network.</Why>
                  <Nav text="VPC Dashboard → Your VPCs → Create VPC" />
                  <VTable rows={[
                    ["Name tag", "on-prem"],
                    [<>IPv4 CIDR</>, <><strong><CidrSpan value={getOp()} /></strong></>],
                    ["Tenancy", "Default"]
                  ]} />
                </Step>
                <Step num={2} title="Create On-Cloud VPC">
                  <Why>Your AWS cloud workload network — destination of the VPN tunnel.</Why>
                  <Nav text="VPC Dashboard → Your VPCs → Create VPC" />
                  <VTable rows={[
                    ["Name tag", "on-cloud"],
                    [<>IPv4 CIDR</>, <><strong><CidrSpan value={getOc()} /></strong></>],
                    ["Tenancy", "Default"]
                  ]} />
                </Step>
              </div>
            );

          // ═══════════════════════════════════════════
          // SUBNETS
          // ═══════════════════════════════════════════
          case "subnets":
            return (
              <div>
                <PartHeader num={2} title="Subnets" />
                <Step num={3} title="Create On-Prem Public Subnet">
                  <Why>Public subnet so you can SSH in and VPN traffic has an internet path.</Why>
                  <Nav text="VPC → Subnets → Create Subnet" />
                  <VTable rows={[
                    ["VPC", "on-prem"],
                    ["Subnet name", "on-prem-public-subnet"],
                    [<>IPv4 CIDR</>, <><strong><CidrSpan value={getOps()} /></strong></>]
                  ]} />
                </Step>
                <Step num={4} title="Create On-Cloud Private Subnet">
                  <Why>Private subnet — no internet. Reachable only through the VPN tunnel.</Why>
                  <Nav text="VPC → Subnets → Create Subnet" />
                  <VTable rows={[
                    ["VPC", "on-cloud"],
                    ["Subnet name", "on-cloud-private-subnet"],
                    [<>IPv4 CIDR</>, <><strong><CidrSpan value={getOcs()} /></strong></>]
                  ]} />
                </Step>
              </div>
            );

          // ═══════════════════════════════════════════
          // INTERNET GATEWAY
          // ═══════════════════════════════════════════
          case "igw":
            return (
              <div>
                <PartHeader num={3} title="Internet Gateway" />
                <Step num={5} title="Create & Attach Internet Gateway to On-Prem VPC">
                  <Why>Only on-prem needs internet — for SSH and for VPN traffic to reach AWS.</Why>
                  <ol style={{ fontSize: "0.85rem", color: "var(--g-text-muted)", paddingLeft: "20px", lineHeight: 2.1 }}>
                    <li>VPC &rarr; Internet Gateways &rarr; Create &rarr; Name: <code>on-prem-igw</code></li>
                    <li>Select <code>on-prem-igw</code> &rarr; Actions &rarr; <strong>Attach to VPC</strong> &rarr; <code>on-prem</code></li>
                  </ol>
                  <Alert type="tip">The on-cloud VPC does NOT get an IGW — stays private, accessible only via VPN.</Alert>
                </Step>
              </div>
            );

          // ═══════════════════════════════════════════
          // ROUTE TABLES
          // ═══════════════════════════════════════════
          case "routes":
            return (
              <div>
                <PartHeader num={4} title="Route Tables" />
                <Step num={6} title="Create On-Prem Route Table">
                  <Why>Routes internet traffic through IGW and VPN traffic through the on-prem EC2.</Why>
                  <ol style={{ fontSize: "0.85rem", color: "var(--g-text-muted)", paddingLeft: "20px", lineHeight: 2.1 }}>
                    <li>VPC &rarr; Route Tables &rarr; Create &rarr; Name: <code>on-prem-rt</code> &rarr; VPC: <code>on-prem</code></li>
                    <li>Subnet Associations &rarr; Edit &rarr; Associate: <code>on-prem-public-subnet</code></li>
                    <li>Routes &rarr; Edit &rarr; Add: Destination <code>0.0.0.0/0</code> &rarr; Target: <code>on-prem-igw</code></li>
                  </ol>
                </Step>
                <Step num={7} title="Create On-Cloud Route Table">
                  <Why>No IGW route — this subnet stays private. VGW propagation added later in Step 15.</Why>
                  <ol style={{ fontSize: "0.85rem", color: "var(--g-text-muted)", paddingLeft: "20px", lineHeight: 2.1 }}>
                    <li>VPC &rarr; Route Tables &rarr; Create &rarr; Name: <code>on-cloud-rt</code> &rarr; VPC: <code>on-cloud</code></li>
                    <li>Subnet Associations &rarr; Edit &rarr; Associate: <code>on-cloud-private-subnet</code></li>
                  </ol>
                  <Alert type="tip">Do NOT add a 0.0.0.0/0 route — this keeps on-cloud private.</Alert>
                </Step>
              </div>
            );

          // ═══════════════════════════════════════════
          // SECURITY GROUPS
          // ═══════════════════════════════════════════
          case "security":
            return (
              <div>
                <PartHeader num={5} title="Security Groups" />
                <Step num={8} title="Create On-Prem Security Group">
                  <Why>Allows SSH, IKE/NAT-T for VPN, and all traffic from on-cloud VPC.</Why>
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>
                    VPC &rarr; Security Groups &rarr; Create | Name: <code>on-prem-sg</code> | VPC: <code>on-prem</code>
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}><strong>Inbound Rules:</strong></p>
                  <HTable
                    heads={["Protocol", "Port", "Source", "Purpose"]}
                    rows={[
                      ["TCP", "22", "0.0.0.0/0", "SSH from your laptop"],
                      ["UDP", "500", "0.0.0.0/0", "IKE — VPN key exchange"],
                      ["UDP", "4500", "0.0.0.0/0", "NAT-T — VPN traversal"],
                      ["All traffic", "All", getOc(), "Traffic from on-cloud VPC"]
                    ]}
                  />
                </Step>
                <Step num={9} title="Create On-Cloud Security Group">
                  <Why>Only allows traffic from on-prem — so private EC2 is reachable only via VPN.</Why>
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>
                    VPC &rarr; Security Groups &rarr; Create | Name: <code>on-cloud-sg</code> | VPC: <code>on-cloud</code>
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}><strong>Inbound Rules:</strong></p>
                  <HTable
                    heads={["Protocol", "Port", "Source", "Purpose"]}
                    rows={[
                      ["TCP", "22", getOp(), "SSH via VPN tunnel"],
                      ["All traffic", "All", getOp(), "All traffic from on-prem VPC"]
                    ]}
                  />
                </Step>
              </div>
            );

          // ═══════════════════════════════════════════
          // VPN GATEWAYS (10-13)
          // ═══════════════════════════════════════════
          case "gateways":
            return (
              <div>
                <PartHeader num={6} title="VPN Gateway Components" />
                <Step num={10} title="Create Customer Gateway (CGW)">
                  <Why>Represents your on-prem EC2 in AWS. Use its public IP — available after launching EC2 in Step 17.</Why>
                  <Nav text="VPC → Customer Gateways → Create" />
                  <VTable rows={[
                    ["Name", "on-prem-cgw"],
                    ["BGP ASN", "65000"],
                    ["IP Address", <span key="ip" style={{ color: "#fcd34d", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem" }}>[Your on-prem EC2 public IP — available after Step 17]</span>]
                  ]} />
                  <Alert type="warn">Launch the on-prem EC2 first (Step 17) to get its public IP, then come back and create the CGW.</Alert>
                </Step>
                <Step num={11} title="Create Virtual Private Gateway (VGW)">
                  <Why>The AWS-side VPN endpoint. Attaches to the cloud VPC and terminates the tunnel.</Why>
                  <Nav text="VPC → Virtual Private Gateways → Create" />
                  <VTable rows={[["Name", "on-cloud-vgw"], ["ASN", "Amazon default ASN"]]} />
                  <Alert type="tip">After creating: select it &rarr; Actions &rarr; Attach to VPC &rarr; select <code>on-cloud</code>.</Alert>
                </Step>
                <Step num={12} title="Attach VGW to On-Cloud VPC">
                  <ol style={{ fontSize: "0.85rem", color: "var(--g-text-muted)", paddingLeft: "20px", lineHeight: 2.1 }}>
                    <li>Select <code>on-cloud-vgw</code> &rarr; Actions &rarr; <strong>Attach to VPC</strong></li>
                    <li>Select VPC: <code>on-cloud</code> &rarr; Attach</li>
                    <li>Wait for state: <strong style={{ color: "#86efac" }}>Attached</strong></li>
                  </ol>
                </Step>
                <Step num={13} title="Create Site-to-Site VPN Connection">
                  <Why>Creates two redundant tunnels. AWS generates PSKs and assigns tunnel IPs — you will download this config next.</Why>
                  <Nav text="VPC → Site-to-Site VPN Connections → Create" />
                  <VTable rows={[
                    ["Name", "on-prem-to-on-cloud-vpn"],
                    ["Virtual Private Gateway", "on-cloud-vgw"],
                    ["Customer Gateway", "Existing → on-prem-cgw"],
                    ["Routing Options", "Static"],
                    ["Static IP Prefixes", <CidrSpan key="pfx" value={getOp()} />]
                  ]} />
                  <Alert type="warn">Wait for VPN state: <strong>Available</strong> (1–2 mins) before downloading config.</Alert>
                  <Alert type="crit">⚠️ <strong>FINAL STEP:</strong> After creation, <strong>select the VPN connection</strong>, go to the &quot;Static Routes&quot; tab at the bottom. If it is empty, click <strong>Edit Routes</strong> and manually add <strong><CidrSpan value={getOp()} /></strong>. AWS sometimes misses this!</Alert>
                </Step>
              </div>
            );

          // ═══════════════════════════════════════════
          // UPLOAD CONFIG
          // ═══════════════════════════════════════════
          case "upload":
            return (
              <div>
                <Step num={14} title="Download Configuration from AWS">
                  <Why>AWS generates a config file with your tunnel IPs, PSKs, and inside addresses — unique to your VPN connection.</Why>
                  <ol style={{ fontSize: "0.85rem", color: "var(--g-text-muted)", paddingLeft: "20px", lineHeight: 2.1 }}>
                    <li>Site-to-Site VPN Connections &rarr; select your connection</li>
                    <li><strong>Download Configuration</strong> &rarr; Vendor: <strong>Strongswan</strong> &rarr; Platform: Ubuntu &rarr; Software: strongSwan</li>
                    <li>Save the .txt file — upload it below</li>
                  </ol>

                  <div style={{
                    background: "rgba(96,165,250,0.04)", border: "1.5px dashed rgba(96,165,250,0.3)",
                    borderRadius: "12px", padding: "20px 24px", marginTop: "20px"
                  }}>
                    <p style={{ fontSize: "0.85rem", color: "var(--g-text-muted)", marginBottom: "12px", fontWeight: 500 }}>
                      ✅ Done downloading? Upload your config file below to generate your personalized guide (Steps 15–31 →)
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "var(--g-text-muted)", marginBottom: "14px" }}>
                      📥 Vendor must be <strong style={{ color: "#a5b4fc" }}>Strongswan</strong> — other vendor files will fail validation.
                    </p>

                    {/* Upload zone */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDrop={handleDrop}
                      onDragOver={(e) => e.preventDefault()}
                      style={{
                        border: `2px dashed ${cfg ? "var(--g-green)" : "var(--g-border)"}`,
                        borderStyle: cfg ? "solid" : "dashed",
                        borderRadius: "12px", padding: "36px 24px", textAlign: "center",
                        cursor: "pointer", transition: "all 0.2s",
                        background: cfg ? "rgba(34,197,94,0.05)" : "transparent",
                        marginBottom: "16px"
                      }}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".txt,.conf,text/plain"
                        style={{ display: "none" }}
                        onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]); }}
                      />
                      <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>{cfg ? "✅" : "📂"}</div>
                      <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--g-text-bright)", marginBottom: "6px" }}>
                        {cfg ? "Config file loaded!" : "Drop your config file here or click to browse"}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "var(--g-text-muted)" }}>
                        {cfg ? "" : "Supports .txt or .conf files from AWS"}
                      </div>
                      {uploadedFileName && (
                        <div style={{ marginTop: "10px", fontSize: "0.85rem", color: "var(--g-green)", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>
                          📄 {uploadedFileName}
                        </div>
                      )}
                    </div>

                    {/* Parse error */}
                    {parseError && (
                      <div style={{
                        background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)",
                        borderRadius: "10px", padding: "14px 18px", fontSize: "0.85rem", color: "#fca5a5", marginBottom: "20px"
                      }}>
                        {parseError}
                      </div>
                    )}

                    {/* Extracted values */}
                    {cfg && (
                      <div style={{
                        background: "var(--g-surface)", border: "1px solid rgba(34,197,94,0.3)",
                        borderRadius: "16px", padding: "28px 32px", marginBottom: "16px",
                        position: "relative", overflow: "hidden"
                      }}>
                        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, var(--g-green), #00d4aa)" }} />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--g-text-bright)" }}>✅ Config Parsed Successfully</div>
                            <div style={{
                              background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
                              color: "#86efac", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em",
                              padding: "3px 10px", borderRadius: "20px", textTransform: "uppercase"
                            }}>Verified</div>
                          </div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                          <div style={{ background: "var(--g-bg)", border: "1px solid var(--g-border)", borderRadius: "10px", padding: "14px 16px" }}>
                            <div style={{ fontSize: "0.7rem", color: "var(--g-text-muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>🖥️ Customer Gateway IP</div>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: "#86efac", fontWeight: 500 }}>{cfg.onpremIP}</div>
                          </div>
                          <div style={{ background: "var(--g-bg)", border: "1px solid var(--g-border)", borderRadius: "10px", padding: "14px 16px" }}>
                            <div style={{ fontSize: "0.7rem", color: "var(--g-text-muted)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>🌐 Tunnel1 VGW Outside IP</div>
                            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: "#86efac", fontWeight: 500 }}>{cfg.t1Outside}</div>
                          </div>
                        </div>
                        {[
                          { num: "1", psk: cfg.t1PSK, inside: `${cfg.t1Local} → ${cfg.t1Remote}` },
                          { num: "2", psk: cfg.t2PSK, inside: `${cfg.t2Local} → ${cfg.t2Remote}` }
                        ].map(t => (
                          <div key={t.num} style={{ background: "var(--g-bg)", border: "1px solid var(--g-border)", borderRadius: "10px", padding: "16px", marginBottom: "12px" }}>
                            <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--g-accent)", marginBottom: "12px", letterSpacing: "0.05em", textTransform: "uppercase" }}>🔗 Tunnel {t.num}</div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                              <div>
                                <div style={{ fontSize: "0.67rem", color: "var(--g-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "3px" }}>PSK</div>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", color: "#fcd34d", background: "rgba(245,158,11,0.08)", padding: "4px 8px", borderRadius: "6px", fontSize: "0.78rem" }}>{t.psk}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: "0.67rem", color: "var(--g-text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "3px" }}>Inside -ll → -lr</div>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", color: "#c084fc" }}>{t.inside}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div style={{ marginTop: "14px", fontSize: "0.78rem", color: "var(--g-text-muted)" }}>
                          🔑 PSK values are read locally — your file never leaves your browser.
                        </div>
                      </div>
                    )}

                    {/* Generate button */}
                    <button
                      onClick={generateGuide}
                      disabled={!cfg}
                      style={{
                        width: "100%",
                        background: cfg ? "linear-gradient(135deg, var(--g-accent), #00d4aa)" : "var(--g-border)",
                        border: "none", borderRadius: "10px", padding: "14px 32px",
                        color: cfg ? "#fff" : "var(--g-text-muted)",
                        fontFamily: "'Inter', sans-serif", fontSize: "1rem", fontWeight: 700,
                        cursor: cfg ? "pointer" : "not-allowed", opacity: cfg ? 1 : 0.35,
                        transition: "opacity 0.2s"
                      }}
                    >
                      ⚡ Generate My Personalized Guide (Steps 15–31) →
                    </button>
                  </div>
                </Step>
              </div>
            );

          // ═══════════════════════════════════════════
          // ROUTE PROPAGATION (15-16)
          // ═══════════════════════════════════════════
          case "propagation":
            if (!guideGenerated) return <div style={{ textAlign: "center", padding: "60px 0", color: "var(--g-text-muted)" }}><p>⬆️ Upload your AWS config file in Step 14 first to unlock this section.</p></div>;
            return (
              <div>
                <div style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.25)",
                  borderRadius: "10px", padding: "12px 18px", fontSize: "0.82rem", color: "#a5b4fc",
                  marginBottom: "24px", textAlign: "center", justifyContent: "center"
                }}>
                  ✅ Guide personalized | CGW IP: <strong>{cfg?.onpremIP}</strong> | {getOp()} ↔ {getOc()}
                </div>
                <Step num={15} title="Enable VGW Route Propagation on On-Cloud Route Table">
                  <Why>Without this, even if tunnels are UP, the on-cloud EC2 has no route back to on-prem.</Why>
                  <ol style={{ fontSize: "0.85rem", color: "var(--g-text-muted)", paddingLeft: "20px", lineHeight: 2.1 }}>
                    <li>VPC &rarr; Route Tables &rarr; select <code>on-cloud-rt</code></li>
                    <li>Tab: <strong>Route Propagation &rarr; Edit &rarr; Enable</strong> for <code>on-cloud-vgw</code></li>
                  </ol>
                  <Alert type="crit">Commonly missed! Without this, traffic is one-way — the cloud EC2 cannot respond.</Alert>
                </Step>
                <Step num={16} title="Add Static Route to On-Cloud Route Table">
                  <ol style={{ fontSize: "0.85rem", color: "var(--g-text-muted)", paddingLeft: "20px", lineHeight: 2.1 }}>
                    <li>Route Tables &rarr; <code>on-cloud-rt</code> &rarr; Routes &rarr; Edit &rarr; Add Route</li>
                    <li>Destination: <strong style={{ color: "#86efac" }}>{getOp()}</strong> &rarr; Target: <code>on-cloud-vgw</code></li>
                  </ol>
                </Step>
              </div>
            );

          // ═══════════════════════════════════════════
          // EC2 (17-20)
          // ═══════════════════════════════════════════
          case "ec2":
            if (!guideGenerated) return <div style={{ textAlign: "center", padding: "60px 0", color: "var(--g-text-muted)" }}><p>⬆️ Upload your AWS config file in Step 14 first to unlock this section.</p></div>;
            return (
              <div>
                <PartHeader num={7} title="EC2 Instances" />
                <Step num={17} title="Launch On-Prem EC2 (VPN Gateway)">
                  <Why>Runs strongSwan. Needs public IP for AWS to reach it for VPN tunneling.</Why>
                  <VTable rows={[
                    ["Name", "on-prem-ec2"], ["AMI", "Ubuntu Server 24.04 LTS"],
                    ["Instance type", "t3.micro"], ["VPC", "on-prem"],
                    ["Subnet", "on-prem-public-subnet"],
                    [<>Auto-assign public IP</>, <strong key="en" style={{ color: "#86efac" }}>Enable</strong>],
                    ["Security group", "on-prem-sg"]
                  ]} />
                  <Alert type="tip">After launch, verify the public IP matches: <strong style={{ color: "#86efac" }}>{cfg?.onpremIP}</strong></Alert>
                </Step>
                <Step num={18} title="Launch On-Cloud EC2 (Private Target)">
                  <Why>The destination — only reachable through the encrypted VPN tunnel. No public IP.</Why>
                  <VTable rows={[
                    ["Name", "on-cloud-ec2"], ["AMI", "Ubuntu Server 24.04 LTS"],
                    ["Instance type", "t3.micro"], ["VPC", "on-cloud"],
                    ["Subnet", "on-cloud-private-subnet"],
                    [<>Auto-assign public IP</>, <strong key="dis" style={{ color: "#fca5a5" }}>Disable</strong>],
                    ["Security group", "on-cloud-sg"]
                  ]} />
                  <Alert type="tip">Note the <strong>private IP</strong> (10.x.x.x) — you will SSH to this from on-prem EC2.</Alert>
                </Step>
                <Step num={19} title="⚠️ CRITICAL: Disable Source/Destination Check on On-Prem EC2" critical>
                  <Why>AWS blocks traffic that didn&apos;t originate from the EC2 itself by default. As a router, our EC2 must &quot;pass through&quot; other people&apos;s data.</Why>
                  <ol style={{ fontSize: "0.85rem", color: "var(--g-text-muted)", paddingLeft: "20px", lineHeight: 2.1 }}>
                    <li>EC2 Console &rarr; Instances &rarr; <code>on-prem-public</code></li>
                    <li>Actions &rarr; Networking &rarr; <strong>Change source/destination check</strong></li>
                    <li>Check the box labeled <strong>Stop</strong> (this disables the check) &rarr; Save</li>
                  </ol>
                  <Alert type="crit">In the new AWS UI, you must <strong>check the box</strong> to &quot;Stop&quot; the checking. When done correctly, the status should say <strong>Disabled</strong>.</Alert>
                </Step>
                <Step num={20} title="Add Route in On-Prem Route Table for On-Cloud Traffic">
                  <Why>Tells on-prem VPC to route {getOc()} traffic through the EC2 (VPN gateway).</Why>
                  <ol style={{ fontSize: "0.85rem", color: "var(--g-text-muted)", paddingLeft: "20px", lineHeight: 2.1 }}>
                    <li>VPC &rarr; Route Tables &rarr; <code>on-prem-rt</code> &rarr; Routes &rarr; Edit &rarr; Add Route</li>
                    <li>Destination: <strong style={{ color: "#86efac" }}>{getOc()}</strong> &rarr; Target: Instance &rarr; <code>on-prem-ec2</code></li>
                  </ol>
                </Step>
              </div>
            );

          // ═══════════════════════════════════════════
          // STRONGSWAN (21-28)
          // ═══════════════════════════════════════════
          case "strongswan":
            if (!guideGenerated) return <div style={{ textAlign: "center", padding: "60px 0", color: "var(--g-text-muted)" }}><p>⬆️ Upload your AWS config file in Step 14 first to unlock this section.</p></div>;
            return (
              <div>
                <PartHeader num={8} title="strongSwan Configuration (on On-Prem EC2)" />
                <Step num={21} title="SSH into On-Prem EC2">
                  <Why>All remaining commands run on the on-prem EC2 terminal.</Why>
                  <CodeBlock title="Local Terminal" code={`ssh -i your-key.pem ubuntu@${cfg?.onpremIP}`} />
                </Step>
                <Step num={22} title="Install strongSwan">
                  <CodeBlock title="WSL Terminal" code="sudo apt update && sudo apt install -y strongswan" />
                </Step>
                <Step num={23} title="Enable IP Forwarding & VTI Module — Mandatory">
                  <Why>Allows EC2 to forward packets. The <code>ip_vti</code> module is the &quot;engine&quot; that handles AWS VPN tunnels.</Why>
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>1. Load the VTI Driver (Do this first!):</p>
                  <CodeBlock title="WSL Terminal" code={`sudo modprobe ip_vti\necho "ip_vti" | sudo tee -a /etc/modules`} />
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>2. Enable IP Forwarding (Temporary):</p>
                  <CodeBlock title="WSL Terminal" code="sudo sysctl -w net.ipv4.ip_forward=1" />
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>3. Enable IP Forwarding (Persistent):</p>
                  <CodeBlock title="WSL Terminal" code={`echo "net.ipv4.ip_forward = 1" | sudo tee -a /etc/sysctl.conf\nsudo sysctl -p`} />
                  <Alert type="tip">If the driver isn&apos;t loaded, your pings will say &quot;Destination Host Unreachable&quot;.</Alert>
                </Step>
                <Step num={24} title="Configure /etc/ipsec.conf — All Values Auto-Filled ✅">
                  <Why>Defines both VPN tunnels with correct algorithms. All IPs are from your uploaded config — no placeholders.</Why>
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>Open the file:</p>
                  <CodeBlock title="WSL Terminal" code="sudo nano /etc/ipsec.conf" />
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>Replace entire content with (ready to paste):</p>
                  <CodeBlock title="ipsec.conf" code={getIpsecConf()} />
                  <Alert type="tip">The <code>leftupdown</code> lines are already uncommented and filled. They link Tunnel1/2 to the failover script.</Alert>
                </Step>
                <Step num={25} title="Configure /etc/ipsec.secrets — PSKs Auto-Filled ✅">
                  <Why>Pre-Shared Keys for tunnel authentication. Even one wrong character kills the tunnel — these are exact from your config.</Why>
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>Open the file:</p>
                  <CodeBlock title="WSL Terminal" code="sudo nano /etc/ipsec.secrets" />
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>Replace entire content with:</p>
                  <CodeBlock title="ipsec.secrets" code={getIpsecSecrets()} />
                  <Alert type="crit">Do not add extra spaces or newlines. Format must be exactly: <code>IP IP : PSK &quot;key&quot;</code></Alert>
                </Step>
                <Step num={26} title="Create Tunnel Failover Script — /etc/ipsec.d/aws-updown.sh">
                  <Why>AWS-provided script that auto-creates VTI interfaces and manages routes when tunnels go up/down.</Why>
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>Create the file:</p>
                  <CodeBlock title="WSL Terminal" code={`sudo mkdir -p /etc/ipsec.d\nsudo nano /etc/ipsec.d/aws-updown.sh`} />
                  <div style={{
                    background: "rgba(96,165,250,0.04)", border: "1.5px dashed rgba(96,165,250,0.3)",
                    borderRadius: "12px", padding: "20px 24px", margin: "14px 0 10px"
                  }}>
                    <div style={{ fontSize: "0.83rem", fontWeight: 600, color: "var(--g-text-bright)", marginBottom: "10px" }}>
                      🖥️ Enter your On-Prem EC2 Private IP to complete the <code>ip route add</code> line below:
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--g-text-muted)", marginBottom: "10px" }}>
                      You got this IP after launching the EC2 in Step 17 (check EC2 console → Private IPv4 address).
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                      <input
                        type="text"
                        placeholder="e.g. 10.0.1.5"
                        value={onpremPrivIP}
                        onChange={(e) => { setOnpremPrivIP(e.target.value); setPrivIPApplied(false); }}
                        style={{
                          background: "var(--g-bg)", border: "1px solid var(--g-border)",
                          borderRadius: "8px", padding: "9px 14px", color: "var(--g-text)",
                          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem",
                          outline: "none", flex: 1, maxWidth: "220px"
                        }}
                      />
                      <button
                        onClick={() => { if (onpremPrivIP) setPrivIPApplied(true); }}
                        style={{
                          background: "linear-gradient(135deg, #00d4aa, #00b894)", border: "none",
                          borderRadius: "8px", padding: "9px 18px", color: "#000",
                          fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.82rem",
                          cursor: "pointer", whiteSpace: "nowrap"
                        }}
                      >
                        {privIPApplied ? "✅ Updated!" : "Update Script"}
                      </button>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>Paste the full script:</p>
                  <CodeBlock title="aws-updown.sh" code={getUpdownScript()} />
                </Step>
                <Step num={27} title="⚠️ CRITICAL: Make aws-updown.sh Executable" critical>
                  <Alert type="crit"><strong>chmod 744 is mandatory.</strong> strongSwan cannot execute this script without it. This was the mistake that caused a real trainer to fail the entire lab.</Alert>
                  <CodeBlock title="WSL Terminal" code="sudo chmod 744 /etc/ipsec.d/aws-updown.sh" />
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>Verify:</p>
                  <CodeBlock title="WSL Terminal" code="ls -la /etc/ipsec.d/aws-updown.sh" />
                  <Alert type="tip">Output must show <code>-rwxr--r--</code> — the <strong>x</strong> confirms it is executable.</Alert>
                </Step>
                <Step num={28} title="Start strongSwan & Bring Up Tunnels">
                  <Why>Restarts the service to apply your new configs, then manually initiates both VPN tunnels.</Why>
                  <CodeBlock title="WSL Terminal" code={`sudo systemctl restart ipsec\nsudo ipsec up Tunnel1\nsudo ipsec up Tunnel2`} />
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>Check tunnel status:</p>
                  <CodeBlock title="WSL Terminal" code="sudo ipsec status" />
                  <Alert type="tip">Look for <strong>INSTALLED, TUNNEL</strong> for both tunnels.</Alert>
                </Step>
              </div>
            );

          // ═══════════════════════════════════════════
          // VERIFY & TEST (29-31)
          // ═══════════════════════════════════════════
          case "verify":
            if (!guideGenerated) return <div style={{ textAlign: "center", padding: "60px 0", color: "var(--g-text-muted)" }}><p>⬆️ Upload your AWS config file in Step 14 first to unlock this section.</p></div>;
            return (
              <div>
                <PartHeader num={9} title="Verify & Test" />
                <Step num={29} title="Verify Tunnels in AWS Console">
                  <ol style={{ fontSize: "0.85rem", color: "var(--g-text-muted)", paddingLeft: "20px", lineHeight: 2.1 }}>
                    <li>VPC &rarr; <strong>Site-to-Site VPN Connections</strong></li>
                    <li>Select your VPN &rarr; <strong>Tunnel Details</strong> tab</li>
                    <li>Both Tunnel 1 &amp; Tunnel 2 should show 🟢 <strong style={{ color: "#86efac" }}>UP</strong></li>
                  </ol>
                  <Alert type="warn">If DOWN: Verify SG allows UDP 500/4500, CGW IP matches EC2 public IP, ipsec.conf has correct IPs.</Alert>
                </Step>
                <Step num={30} title="Ping Test from On-Prem EC2">
                  <Why>Simpler than SSH — confirms VPN routing is working before attempting SSH.</Why>
                  <div style={{
                    background: "rgba(96,165,250,0.04)", border: "1.5px dashed rgba(96,165,250,0.3)",
                    borderRadius: "12px", padding: "20px 24px", margin: "14px 0 10px"
                  }}>
                    <div style={{ fontSize: "0.83rem", fontWeight: 600, color: "var(--g-text-bright)", marginBottom: "10px" }}>
                      🖥️ Enter your On-Cloud EC2 Private IP:
                    </div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                      <input
                        type="text"
                        placeholder="e.g. 10.1.1.18"
                        value={oncloudPrivIP}
                        onChange={(e) => { setOncloudPrivIP(e.target.value); setCloudIPApplied(false); }}
                        style={{
                          background: "var(--g-bg)", border: "1px solid var(--g-border)",
                          borderRadius: "8px", padding: "9px 14px", color: "var(--g-text)",
                          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem",
                          outline: "none", flex: 1, maxWidth: "220px"
                        }}
                      />
                      <button
                        onClick={() => { if (oncloudPrivIP) setCloudIPApplied(true); }}
                        style={{
                          background: "linear-gradient(135deg, #00d4aa, #00b894)", border: "none",
                          borderRadius: "8px", padding: "9px 18px", color: "#000",
                          fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: "0.82rem",
                          cursor: "pointer", whiteSpace: "nowrap"
                        }}
                      >
                        {cloudIPApplied ? "✅ Updated!" : "Update Commands"}
                      </button>
                    </div>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>From on-prem EC2 terminal:</p>
                  <CodeBlock title="WSL Terminal" code={`ping -c 4 ${cloudIPApplied && oncloudPrivIP ? oncloudPrivIP : "[ON-CLOUD-PRIVATE-IP]"}`} />
                  <Alert type="tip">Ping works ✅ → proceed to SSH. Ping fails ❌ → check route tables and security groups.</Alert>
                  <Alert type="warn"><strong>Propagation Patience:</strong> If ping fails initially, wait 3–5 minutes. Even when the VPN shows &quot;Available&quot;, AWS internal routers need time to propagate the new routes.</Alert>
                </Step>
                <Step num={31} title="SSH from On-Prem EC2 to On-Cloud EC2">
                  <Why>Final validation — proves encrypted end-to-end connectivity through the VPN tunnel.</Why>
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>Step 1 — Copy key to on-prem EC2 (run on your local machine):</p>
                  <CodeBlock title="Local Terminal" code={`scp -i your-key.pem your-key.pem ubuntu@${cfg?.onpremIP}:/home/ubuntu/.ssh/`} />
                  <p style={{ fontSize: "0.82rem", color: "var(--g-text-muted)", margin: "10px 0 6px" }}>Step 2 — From on-prem EC2, SSH to on-cloud EC2:</p>
                  <CodeBlock title="WSL Terminal" code={`chmod 400 ~/.ssh/your-key.pem\nssh -i ~/.ssh/your-key.pem ubuntu@${cloudIPApplied && oncloudPrivIP ? oncloudPrivIP : "[ON-CLOUD-PRIVATE-IP]"}`} />
                  <Alert type="tip">If you get in 🎉 — the VPN lab is complete! You are connected to a private EC2 through an encrypted IPsec tunnel.</Alert>
                </Step>
              </div>
            );

          // ═══════════════════════════════════════════
          // CLEANUP CHECKLIST
          // ═══════════════════════════════════════════
          case "cleanup":
            return (
              <div>
                <div style={{
                  background: "rgba(239,68,68,0.07)", border: "1.5px solid rgba(239,68,68,0.35)",
                  borderRadius: "12px 12px 0 0", padding: "16px 20px"
                }}>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fca5a5", marginBottom: "4px" }}>
                    🗑️ Cleanup — Delete All Resources (In This Order!)
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#fca5a5", marginTop: "4px" }}>
                    Delete in exact order to avoid dependency errors
                  </div>
                  <div style={{ background: "var(--g-border)", borderRadius: "4px", height: "6px", marginTop: "10px" }}>
                    <div style={{
                      background: "linear-gradient(90deg, #ef4444, #f59e0b)",
                      height: "6px", borderRadius: "4px",
                      width: `${(cleanupDone / cleanupTotal) * 100}%`,
                      transition: "width 0.3s"
                    }} />
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--g-text-muted)", marginTop: "4px" }}>
                    {cleanupDone} / {cleanupTotal} completed
                  </div>
                </div>
                <div style={{
                  background: "var(--g-surface)", border: "1px solid var(--g-border)",
                  borderTop: "none", borderRadius: "0 0 12px 12px", padding: "20px"
                }}>
                  {cleanupItems.map((item, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: "12px",
                      padding: "10px 0", borderBottom: i < cleanupItems.length - 1 ? "1px solid var(--g-border)" : "none",
                      transition: "opacity 0.2s",
                      opacity: cleanupChecks[i] ? 0.4 : 1
                    }}>
                      <input
                        type="checkbox"
                        checked={cleanupChecks[i]}
                        onChange={() => toggleCleanup(i)}
                        style={{ marginTop: "3px", width: "16px", height: "16px", accentColor: "var(--g-green)", cursor: "pointer", flexShrink: 0 }}
                      />
                      <label style={{ fontSize: "0.85rem", cursor: "pointer", lineHeight: 1.5 }}>{item}</label>
                    </div>
                  ))}
                  {cleanupDone === cleanupTotal && (
                    <div style={{
                      textAlign: "center", padding: "20px",
                      background: "rgba(34,197,94,0.08)", borderRadius: "10px", marginTop: "14px"
                    }}>
                      🎉 <strong>All resources deleted!</strong> Your AWS account is clean — no further charges.
                    </div>
                  )}
                </div>
              </div>
            );

          default:
            return null;
        }
      }}
    </GuideWrapper>
  );
}
