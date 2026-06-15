"use client";

import GuideWrapper from "@/components/guide/GuideWrapper";

export default function TerminologyMastery() {
  const navGroups = [
    {
      title: "Terminology Guide",
      items: [
        { id: "senior", title: "1. The \"Senior\" Words" },
        { id: "deploy", title: "2. Deployment Slang" },
        { id: "arch", title: "3. Architecture Slang" },
        { id: "translate", title: "4. Junior vs Senior Translation" }
      ]
    }
  ];

  return (
    <GuideWrapper 
      title="DevOps Terminology Mastery" 
      subtitle="The 'Fake It Till You Make It' Guide to speaking like a senior engineer."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case "senior":
            return (
              <div>
                <h2>The &quot;Senior Engineer&quot; Vocabulary</h2>
                <p className="guide-subtitle">Use these 5 words correctly, and the interviewer will instantly respect you.</p>
                
                <div className="g-concept-box" style={{ borderLeftColor: "var(--g-accent)" }}>
                  <h4>💡 Why this matters:</h4>
                  <p style={{ margin: 0 }}>
                    Juniors talk about <em>tools</em> (&quot;I used Terraform&quot;). Seniors talk about <em>concepts</em> (&quot;I used Terraform to ensure idempotency&quot;).
                  </p>
                </div>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>Configuration Drift <span style={phoneticStyle}>/kənˌfiɡyəˈrāSHən drift/</span></h4>
                  <p><strong>Meaning:</strong> When the actual state of a server (what&apos;s running on it right now) gradually differs from the documented or desired state (what the code says should be running) because someone manually logged in and changed things.</p>
                  <div className="bad-way" style={badWayStyle}>❌ Junior: &quot;People kept manually logging into the EC2 instances and messing up the settings.&quot;</div>
                  <div className="good-way" style={goodWayStyle}>✅ Senior: &quot;We adopted an immutable infrastructure pattern to eliminate <strong>configuration drift</strong>.&quot;</div>
                </div>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>Idempotent <span style={phoneticStyle}>/ˌīdemˈpōtnt/</span></h4>
                  <p><strong>Meaning:</strong> An operation that can be run 100 times, but the result will be exactly the same as running it once. If a server is already configured correctly, running a Terraform script against it does absolutely nothing.</p>
                  <div className="bad-way" style={badWayStyle}>❌ Junior: &quot;If you run the script twice, it doesn&apos;t break anything.&quot;</div>
                  <div className="good-way" style={goodWayStyle}>✅ Senior: &quot;I wrote our Ansible playbooks and Terraform modules to be completely <strong>idempotent</strong>.&quot;</div>
                </div>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>Blast Radius <span style={phoneticStyle}>/blast ˈrādēəs/</span></h4>
                  <p><strong>Meaning:</strong> The measure of how much damage a mistake will cause. If a junior pushes bad code, does it take down the whole website, or just the payment microservice?</p>
                  <div className="bad-way" style={badWayStyle}>❌ Junior: &quot;If this breaks, it won&apos;t break the rest of the app.&quot;</div>
                  <div className="good-way" style={goodWayStyle}>✅ Senior: &quot;We decoupled the architecture to minimize the <strong>blast radius</strong> of any single component failure.&quot;</div>
                </div>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>Immutable Infrastructure <span style={phoneticStyle}>/i(m)ˈmyo͞odəb(ə)l/</span></h4>
                  <p><strong>Meaning:</strong> Servers are never updated or patched. If an update is needed, you destroy the old server and build a brand new one from scratch. (Containers are naturally immutable).</p>
                  <div className="bad-way" style={badWayStyle}>❌ Junior: &quot;We don&apos;t SSH in and run updates anymore, we just build new Docker images.&quot;</div>
                  <div className="good-way" style={goodWayStyle}>✅ Senior: &quot;We&apos;ve fully transitioned to <strong>immutable infrastructure</strong> to prevent snowflake servers.&quot;</div>
                </div>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>Shift Left <span style={phoneticStyle}>/SHift left/</span></h4>
                  <p><strong>Meaning:</strong> Moving testing, security, and quality checks earlier in the software development lifecycle (to the &quot;left&quot; side of the pipeline).</p>
                  <div className="bad-way" style={badWayStyle}>❌ Junior: &quot;We check for security bugs before we deploy to production.&quot;</div>
                  <div className="good-way" style={goodWayStyle}>✅ Senior: &quot;We implemented DevSecOps by <strong>shifting left</strong>, integrating static code analysis directly into our Jenkins PR builds.&quot;</div>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="term-drift" />
                      <label htmlFor="term-drift">I understand and can explain Configuration Drift</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="term-idempotent" />
                      <label htmlFor="term-idempotent">I understand and can explain Idempotent operations</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="term-blast" />
                      <label htmlFor="term-blast">I understand and can explain Blast Radius</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="term-immutable" />
                      <label htmlFor="term-immutable">I understand and can explain Immutable Infrastructure</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="term-shift" />
                      <label htmlFor="term-shift">I understand and can explain Shifting Left</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "deploy":
            return (
              <div>
                <h2>Deployment Slang</h2>
                <p className="guide-subtitle">How to talk about putting code into production.</p>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>Zero-Downtime Deployment</h4>
                  <p><strong>Meaning:</strong> Deploying a new version of the app without the end-user experiencing a single dropped request or error page.</p>
                </div>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>Rolling Update</h4>
                  <p><strong>Meaning:</strong> You have 3 servers. You take down Server 1, update it, and bring it back up. Then Server 2. Then Server 3. Traffic continues to hit the other servers while one is updating. (This is how Kubernetes updates Pods by default).</p>
                </div>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>Blue/Green Deployment</h4>
                  <p><strong>Meaning:</strong> You run two identical production environments. &quot;Blue&quot; is currently live. You deploy the new code to &quot;Green&quot; and test it. When ready, you flip the router to send all traffic to Green instantly. If it breaks, you flip the router back to Blue.</p>
                </div>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>Canary Release <span style={phoneticStyle}>(Like a canary in a coal mine)</span></h4>
                  <p><strong>Meaning:</strong> You release the new code to only 5% of your users. If the 5% don&apos;t report errors, you slowly roll it out to 20%, then 50%, then 100%.</p>
                </div>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>Single Source of Truth (SSOT)</h4>
                  <p><strong>Meaning:</strong> There is only ONE place where the correct configuration lives (usually a Git repository). If someone makes a change manually in the AWS console, it is immediately considered invalid.</p>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="dep-zero" />
                      <label htmlFor="dep-zero">I understand Zero-Downtime Deployments</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="dep-rolling" />
                      <label htmlFor="dep-rolling">I understand Rolling Updates</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="dep-bluegreen" />
                      <label htmlFor="dep-bluegreen">I understand Blue/Green Deployments</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="dep-canary" />
                      <label htmlFor="dep-canary">I understand Canary Releases</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="dep-ssot" />
                      <label htmlFor="dep-ssot">I understand Single Source of Truth (SSOT)</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "arch":
            return (
              <div>
                <h2>Architecture Slang</h2>
                <p className="guide-subtitle">How to talk about the system as a whole.</p>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>SPOF (Single Point of Failure)</h4>
                  <p><strong>Meaning:</strong> A part of a system that, if it fails, will stop the entire system from working. (e.g., Having only one database server).</p>
                  <div className="good-way" style={goodWayStyle}>✅ &quot;I implemented an Auto-Scaling Group across multiple Availability Zones to eliminate <strong>SPOFs</strong>.&quot;</div>
                </div>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>Compute vs. State</h4>
                  <p><strong>Meaning:</strong> &quot;Compute&quot; is the processing power (EC2, Containers, Lambda). &quot;State&quot; is the permanent data (Databases, S3 buckets). Modern architecture separates compute from state so compute can be destroyed and recreated instantly.</p>
                  <div className="good-way" style={goodWayStyle}>✅ &quot;We ensured our Kubernetes pods are entirely stateless, offloading <strong>state</strong> to an RDS database.&quot;</div>
                </div>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>Monolith vs. Microservices</h4>
                  <p><strong>Meaning:</strong> A Monolith is an entire app built into one massive block of code. Microservices breaks the app into 20 tiny, independent apps (e.g., Login Service, Payment Service) that talk to each other via APIs.</p>
                </div>

                <div className="term-card" style={cardStyle}>
                  <h4 style={cardHeaderStyle}>Control Plane vs. Data Plane</h4>
                  <p><strong>Meaning:</strong> The Control Plane makes the decisions (e.g., Kubernetes Master Node). The Data Plane does the actual heavy lifting (e.g., Kubernetes Worker Nodes running your app).</p>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="arch-spof" />
                      <label htmlFor="arch-spof">I understand SPOFs and how to prevent them</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="arch-state" />
                      <label htmlFor="arch-state">I understand Compute vs State separation</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="arch-micro" />
                      <label htmlFor="arch-micro">I understand Monoliths vs Microservices</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="arch-control" />
                      <label htmlFor="arch-control">I understand Control Plane vs Data Plane</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "translate":
            return (
              <div>
                <h2>Junior vs. Senior Translation Guide</h2>
                <p className="guide-subtitle">Practice saying the right column out loud.</p>

                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "16px" }}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--g-sidebar-bg)", textAlign: "left", borderBottom: "1px solid var(--g-border)" }}>
                      <th style={{ padding: "16px", color: "#ff7b72", fontSize: "0.9rem" }}>❌ How a Junior says it</th>
                      <th style={{ padding: "16px", color: "#7ee787", fontSize: "0.9rem" }}>✅ How a Senior says it</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "16px", backgroundColor: "rgba(248, 81, 73, 0.02)" }}>&quot;I clicked around the AWS console to make a server.&quot;</td>
                      <td style={{ padding: "16px", backgroundColor: "rgba(63, 185, 80, 0.02)" }}>&quot;I provisioned the infrastructure using declarative <strong>Terraform</strong> modules.&quot;</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "16px", backgroundColor: "rgba(248, 81, 73, 0.02)" }}>&quot;I type `docker run` on the server to update the app.&quot;</td>
                      <td style={{ padding: "16px", backgroundColor: "rgba(63, 185, 80, 0.02)" }}>&quot;We utilize a <strong>GitOps</strong> approach where ArgoCD automates the delivery.&quot;</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "16px", backgroundColor: "rgba(248, 81, 73, 0.02)" }}>&quot;When the server crashes, I have to wake up and restart it.&quot;</td>
                      <td style={{ padding: "16px", backgroundColor: "rgba(63, 185, 80, 0.02)" }}>&quot;Our workloads are orchestrated by Kubernetes, which handles <strong>self-healing</strong> and automatic rescheduling.&quot;</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "16px", backgroundColor: "rgba(248, 81, 73, 0.02)" }}>&quot;We have a massive EC2 instance that costs a lot.&quot;</td>
                      <td style={{ padding: "16px", backgroundColor: "rgba(63, 185, 80, 0.02)" }}>&quot;I right-sized our infrastructure by migrating to an <strong>Auto-Scaling Group</strong> that scales elastically based on CPU metrics.&quot;</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "16px", backgroundColor: "rgba(248, 81, 73, 0.02)" }}>&quot;I don&apos;t know what broke.&quot;</td>
                      <td style={{ padding: "16px", backgroundColor: "rgba(63, 185, 80, 0.02)" }}>&quot;We need to improve our <strong>observability</strong> stack to capture better metrics and distributed traces.&quot;</td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ textAlign: "center", margin: "64px 0", padding: "40px", backgroundColor: "var(--g-accent-glow)", borderRadius: "12px", border: "1px solid var(--g-accent)" }}>
                  <h3 style={{ color: "var(--g-accent)", marginBottom: "16px", marginTop: 0 }}>🎓 You&apos;re Ready for Interviews!</h3>
                  <p style={{ fontSize: "1.1rem", color: "var(--g-text)", margin: 0 }}>
                    Memorize these terms. Use them naturally in your technical discussions.<br />
                    When you combine real-world projects with senior-level terminology, nobody will question your experience.
                  </p>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="trans-check" />
                      <label htmlFor="trans-check">I have read and practiced all translation examples</label>
                    </li>
                  </ul>
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

// Inline Styles for Terminology Cards (keeps file neat and reusable styling simple)
const cardStyle = {
  backgroundColor: "var(--g-surface)",
  border: "1px solid var(--g-border)",
  borderLeft: "4px solid var(--g-accent)",
  borderRadius: "8px",
  padding: "24px",
  marginBottom: "24px",
  marginTop: "20px"
};

const cardHeaderStyle = {
  fontSize: "1.2rem",
  color: "var(--g-text-bright)",
  marginBottom: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "8px"
};

const phoneticStyle = {
  fontSize: "0.85rem",
  color: "var(--g-text-muted)",
  fontWeight: "normal",
  fontFamily: "var(--g-font-mono)"
};

const badWayStyle = {
  backgroundColor: "var(--g-red-bg)",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid rgba(248, 81, 73, 0.3)",
  marginBottom: "8px",
  fontSize: "0.9rem",
  color: "#ff7b72"
};

const goodWayStyle = {
  backgroundColor: "var(--g-green-bg)",
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid rgba(63, 185, 80, 0.3)",
  fontSize: "0.9rem",
  color: "#7ee787"
};
