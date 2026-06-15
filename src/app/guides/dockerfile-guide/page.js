"use client";

import { useState } from "react";
import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox, TipBox, WarningBox, ErrorCard, Quiz } from "@/components/guide/GuideComponents";

export default function DockerfileGuide() {
  const navGroups = [
    {
      title: "Introduction",
      items: [
        { id: "overview", title: "📘 Roadmap & Intro" }
      ]
    },
    {
      title: "Instructions",
      items: [
        { id: "all-instructions", title: "🛠️ All Instructions" }
      ]
    },
    {
      title: "Optimization & Layers",
      items: [
        { id: "layer-usage", title: "🥞 Layer Usage" },
        { id: "golden-order", title: "🏆 Golden Build Order" }
      ]
    },
    {
      title: "Key Comparisons",
      items: [
        { id: "arg-vs-env", title: "⚖️ ARG vs ENV" },
        { id: "cmd-vs-entrypoint", title: "⚖️ CMD vs ENTRYPOINT" },
        { id: "copy-vs-add", title: "⚖️ COPY vs ADD" }
      ]
    },
    {
      title: "Best Practices",
      items: [
        { id: "golden-rules", title: "📜 5 Golden Rules" },
        { id: "quick-ref", title: "🔍 Quick Reference" }
      ]
    }
  ];

  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const [ruleExpanded, setRuleExpanded] = useState({
    1: true,
    2: false,
    3: false,
    4: false,
    5: false
  });

  const toggleRule = (num) => {
    setRuleExpanded(prev => ({
      ...prev,
      [num]: !prev[num]
    }));
  };

  const instructions = [
    {
      id: "FROM",
      category: "foundation",
      title: "Base image",
      subtitle: "Every Dockerfile must start here",
      usage: "once",
      why: "Every container starts from an existing image. FROM tells Docker which OS + runtime to use as the foundation. Without it, you'd have to build everything from scratch — kernel, libc, shell. Think of it as 'inherit from this template.'",
      syntax: "FROM <image>[:tag] [AS <name>]",
      examples: `# Minimal Alpine Linux (5MB) — use for small production images
FROM alpine:3.19

# Official Node.js runtime on Alpine
FROM node:20-alpine

# Multi-stage: name a build stage
FROM node:20-alpine AS builder
FROM node:20-alpine AS production`,
      tips: [
        { type: "warn", icon: "⚠", text: "Never use <code>FROM ubuntu:latest</code> in production. Always pin a specific tag like <code>ubuntu:22.04</code>. 'latest' breaks builds silently when upstream updates." },
        { type: "info", icon: "💡", text: "Prefer <code>-alpine</code> variants — they're 5–10× smaller than default images, reducing attack surface and pull time." }
      ]
    },
    {
      id: "ARG",
      category: "foundation",
      title: "Build-time arguments",
      subtitle: "Variables only available during docker build",
      usage: "many",
      why: "ARG lets you pass dynamic values at build time without hardcoding them. Unlike ENV, ARG values do not persist inside the running container — they're build-only. Perfect for version pins, registry URLs, build flags.",
      syntax: "ARG <name>[=<default>]",
      examples: `ARG APP_VERSION=1.0.0
ARG NODE_VERSION=20
FROM node:\${NODE_VERSION}-alpine

# Override at build time:
# docker build --build-arg APP_VERSION=2.0.0 .`,
      tips: [
        { type: "warn", icon: "🔒", text: "Never use <code>ARG</code> for secrets. They appear in <code>docker history</code> — use Docker secrets or build secrets instead." }
      ],
      customSection: (
        <div style={{ marginTop: "12px" }}>
          <div className="clabel">ARG vs ENV — key difference</div>
          <div className="diff-grid">
            <div className="diff-card">
              <div className="diff-label" style={{ color: "var(--g-red)" }}>ARG — build only</div>
              <div className="diff-text">Exists during <code>docker build</code>. Gone when container runs. Visible in docker history.</div>
            </div>
            <div className="diff-card">
              <div className="diff-label" style={{ color: "var(--g-green)" }}>ENV — runtime</div>
              <div className="diff-text">Persists in running container. Visible to app code. Overridden with <code>-e</code> at docker run.</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "LABEL",
      category: "foundation",
      title: "Image metadata",
      subtitle: "Document your image with key-value pairs",
      usage: "many",
      why: "LABEL adds metadata to images — no effect on the container, but invaluable for tracking ownership, versions, and CI/CD pipeline info. Docker Hub, Kubernetes, and security scanners read these labels.",
      syntax: 'LABEL key="value" key2="value2"',
      examples: `LABEL maintainer="devops@company.com" \\
      version="1.2.0" \\
      description="Payment service API" \\
      org.opencontainers.image.source="https://github.com/org/repo"`,
      tips: [
        { type: "info", icon: "💡", text: "Use OCI standard labels (<code>org.opencontainers.image.*</code>) for compatibility with container registries and CI tools." }
      ]
    },
    {
      id: "ENV",
      category: "env",
      title: "Environment variables",
      subtitle: "Persist inside the running container",
      usage: "many",
      why: "ENV sets variables that live inside the container at runtime. Your app reads them via process.env, os.environ, etc. This is how you configure apps without hardcoding values in source code.",
      syntax: "ENV <key>=<value> [key2=value2 ...]",
      examples: `ENV NODE_ENV=production \\
    PORT=3000 \\
    LOG_LEVEL=info \\
    TZ=UTC`,
      tips: [
        { type: "warn", icon: "🔒", text: "Don't put secrets in <code>ENV</code> — they're visible in <code>docker inspect</code>. Use Docker secrets or orchestrator secrets at runtime." }
      ]
    },
    {
      id: "WORKDIR",
      category: "env",
      title: "Working directory",
      subtitle: "Sets the CWD for all following instructions",
      usage: "once",
      why: "WORKDIR sets the current directory inside the container for all RUN, COPY, CMD, and ENTRYPOINT instructions that follow. Creates the directory if it doesn't exist. Without it, your files land in root — messy and risky.",
      syntax: "WORKDIR /path/to/dir",
      examples: `WORKDIR /app
# All subsequent COPY/RUN happen inside /app
COPY . .       # copies to /app
RUN  ls        # runs inside /app`,
      customSection: (
        <div className="cmp" style={{ marginTop: "12px" }}>
          <div className="cmp-box">
            <div className="cmp-top ct-bad">❌ Avoid this</div>
            <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
              <code>{`RUN cd /app && npm install\n# cd doesn't persist between RUN steps`}</code>
            </pre>
          </div>
          <div className="cmp-box">
            <div className="cmp-top ct-good">✓ Do this</div>
            <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
              <code>{`WORKDIR /app\nRUN npm install\n# WORKDIR persists for all steps`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      id: "USER",
      category: "env",
      title: "Switch user",
      subtitle: "Drop root privileges — always do this before CMD",
      usage: "once",
      why: "By default, Docker runs everything as root. That's a massive security risk — if your app is exploited, the attacker gets root access to the container. USER switches to a non-root user for all following instructions and the running container.",
      syntax: "USER <user>[:group]",
      examples: `# Create a non-root user first, then switch
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Node.js images have a built-in 'node' user — use it
USER node`,
      tips: [
        { type: "sec", icon: "🛡", text: "Place <code>USER</code> after all installs (which need root) but before <code>EXPOSE</code> and <code>CMD</code>. Required by most enterprise security scanners." }
      ]
    },
    {
      id: "RUN",
      category: "files",
      title: "Execute a command",
      subtitle: "The workhorse — installs, builds, configures",
      usage: "many",
      why: "RUN executes commands during build and commits the result as a new layer. This is how you install packages, compile code, create directories, set permissions — anything that must happen before the container starts.",
      syntax: `# Shell form — runs in /bin/sh -c
RUN apt-get update && apt-get install -y curl

# Exec form — no shell, more precise
RUN ["apt-get", "install", "-y", "curl"]`,
      examples: `RUN apt-get update \\
  && apt-get install -y curl \\
  && rm -rf /var/lib/apt/lists/*`,
      tips: [
        { type: "warn", icon: "⚠", text: "Always clean up package manager caches in the same <code>RUN</code> step. Cleaning in a separate layer means the cache is still stored in the previous layer — wasting space." }
      ],
      customSection: (
        <div style={{ marginTop: "12px" }}>
          <div className="clabel">Layer optimization — always chain with &&</div>
          <div className="cmp">
            <div className="cmp-box">
              <div className="cmp-top ct-bad">❌ 3 layers — image bloated</div>
              <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
                <code>{`RUN apt-get update\nRUN apt-get install curl\nRUN rm -rf /var/lib/apt`}</code>
              </pre>
            </div>
            <div className="cmp-box">
              <div className="cmp-top ct-good">✓ 1 layer — small and clean</div>
              <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
                <code>{`RUN apt-get update \\\n  && apt-get install -y curl \\\n  && rm -rf /var/lib/apt/lists/*`}</code>
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "COPY",
      category: "files",
      title: "Copy files",
      subtitle: "Move files from host (or build stage) into the image",
      usage: "many",
      why: "COPY is how your application code and config files get into the image. It copies from your build context into the container filesystem. Use it for everything except URLs or archives.",
      syntax: `COPY [--chown=user:group] <src> <dest>
COPY --from=stagename <src> <dest>  # multi-stage`,
      examples: `# Copy a single file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy with ownership (avoids a separate RUN chown)
COPY --chown=node:node . /app

# Multi-stage: copy compiled output from 'builder' stage
COPY --from=builder /app/dist ./dist`,
      customSection: (
        <div style={{ marginTop: "12px" }}>
          <div className="clabel">Cache optimization trick</div>
          <div className="cmp">
            <div className="cmp-box">
              <div className="cmp-top ct-bad">❌ Slow — cache always busts</div>
              <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
                <code>{`COPY . .\nRUN npm install\n# Any file change = reinstall!`}</code>
              </pre>
            </div>
            <div className="cmp-box">
              <div className="cmp-top ct-good">✓ Fast — smart caching</div>
              <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
                <code>{`COPY package*.json ./\nRUN npm install\nCOPY . .\n# Cached unless package.json changes`}</code>
              </pre>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "ADD",
      category: "files",
      title: "Add files (extended COPY)",
      subtitle: "Can also fetch URLs and auto-extract archives",
      usage: "many",
      why: "ADD does everything COPY does, plus: it can download from a URL, and it auto-extracts .tar archives. These superpowers make it less predictable — use COPY for everything unless you specifically need tar extraction.",
      syntax: "ADD [--chown=user:group] <src> <dest>",
      examples: `# Auto-extract a tar file — the ONE valid use case
ADD app.tar.gz /app/

# Everything else — use COPY instead:
COPY config.json /app/config.json   # ← preferred`,
      tips: [
        { type: "warn", icon: "⚠", text: "Avoid ADD for URL downloads — it has no cache control. Use <code>RUN curl -O</code> with a checksum instead for reproducible builds." }
      ]
    },
    {
      id: "EXPOSE",
      category: "runtime",
      title: "Document ports",
      subtitle: "Declares which ports the app listens on",
      usage: "many",
      why: "EXPOSE is documentation — it tells humans and tools (Compose, Kubernetes) which ports the container uses. It does not actually publish the port to your host. You still need -p 3000:3000 in docker run.",
      syntax: "EXPOSE <port>[/protocol]",
      examples: `EXPOSE 3000       # HTTP app
EXPOSE 443        # HTTPS
EXPOSE 5432/tcp  # Postgres
EXPOSE 8125/udp  # StatsD metrics`,
      tips: [
        { type: "info", icon: "💡", text: "EXPOSE doesn't open a firewall port. Use <code>docker run -p 3000:3000</code> or Docker Compose <code>ports:</code> to actually bind to the host." }
      ]
    },
    {
      id: "ENTRYPOINT",
      category: "runtime",
      title: "Container executable",
      subtitle: "The fixed command that always runs",
      usage: "once",
      why: "ENTRYPOINT defines the executable that always runs when the container starts. Unlike CMD, it cannot be overridden by passing a command to docker run — only with --entrypoint. Use it when your container has one clear purpose.",
      syntax: 'ENTRYPOINT ["executable", "param1"]',
      examples: `# Container is always a Node.js server
ENTRYPOINT ["node"]
CMD        ["server.js"]

# docker run myapp             → runs: node server.js (CMD default)
# docker run myapp worker.js   → runs: node worker.js (CMD overridden)`,
      tips: [
        { type: "warn", icon: "⚠", text: "Always use exec form <code>[\"cmd\",\"arg\"]</code>. Shell form wraps your process in <code>/bin/sh</code> which blocks shutdown signals — your app won't stop cleanly." }
      ]
    },
    {
      id: "CMD",
      category: "runtime",
      title: "Default command",
      subtitle: "Default args — easily overridden at docker run",
      usage: "once",
      why: "CMD sets the default command when the container starts. Only one CMD is active — if you write multiple, only the last one runs. It's designed to be overridden, making the image flexible.",
      syntax: `# Exec form (preferred) — no shell, signals work correctly
CMD ["node", "server.js"]

# Shell form — runs in /bin/sh -c (avoid!)
CMD node server.js

# Parameter form — when ENTRYPOINT is also set
ENTRYPOINT ["python"]
CMD        ["app.py"]`,
      examples: `# Override CMD at runtime:
# docker run myapp node worker.js
# (Runs node worker.js instead of default server.js)`,
      customSection: (
        <div style={{ marginTop: "12px" }}>
          <div className="diff-grid">
            <div className="diff-card">
              <div className="diff-label" style={{ color: "var(--g-accent)" }}>ENTRYPOINT</div>
              <div className="diff-text">Fixed executable. Can't be replaced from <code>docker run</code>. What this container <em>IS</em>.</div>
            </div>
            <div className="diff-card">
              <div className="diff-label" style={{ color: "var(--g-accent)" }}>CMD</div>
              <div className="diff-text">Default arguments. Easily overridden with <code>docker run myapp myarg</code>. The default parameters.</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "VOLUME",
      category: "runtime",
      title: "Mount point declaration",
      subtitle: "Marks directories for persistent data storage",
      usage: "many",
      why: "VOLUME declares a mount point — data written here is stored outside the container's writable layer. Data survives restarts and can be shared between containers. Use for databases, logs, uploads — anything that must outlive the container.",
      syntax: 'VOLUME ["/path/to/directory"]',
      examples: `# Postgres data directory
VOLUME ["/var/lib/postgresql/data"]

# App logs and uploads
VOLUME ["/app/logs", "/app/uploads"]`,
      tips: [
        { type: "info", icon: "💡", text: "VOLUME in a Dockerfile creates an anonymous volume. In production, always map it explicitly: <code>docker run -v /host/data:/var/lib/postgresql/data</code>." }
      ]
    },
    {
      id: "HEALTHCHECK",
      category: "runtime",
      title: "Container health probe",
      subtitle: "Docker checks if your app is truly alive",
      usage: "once",
      why: "HEALTHCHECK tells Docker how to test if the container is actually working — not just 'running' but truly healthy. A container can be up but stuck in a deadlock. With HEALTHCHECK, Docker and Kubernetes can detect this and restart it.",
      syntax: `HEALTHCHECK --interval=30s --timeout=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1`,
      examples: `# Disable inherited healthcheck from base image
HEALTHCHECK NONE`,
      tips: [
        { type: "info", icon: "💡", text: "Always add a <code>/health</code> endpoint to your app. Kubernetes liveness probes can override this, but having it in the Dockerfile is good practice for local Docker usage." }
      ]
    }
  ];

  return (
    <GuideWrapper
      title="Dockerfile Best Practices Guide"
      subtitle="Every instruction explained with syntax, examples, and production tips."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case "overview":
            return (
              <div>
                <h2>Dockerfile Mastery: Write Production-Ready Containers</h2>
                <p className="guide-subtitle">A comprehensive breakdown of all Dockerfile keywords and layer caching optimization strategies.</p>

                <div className="g-concept-box">
                  <h4>💡 What is a Dockerfile?</h4>
                  <p style={{ margin: 0 }}>
                    A Dockerfile is a recipe text file containing all commands a user could call on the command line to assemble an image. 
                    Writing clean, secure, and small Dockerfiles is the difference between a <strong>50MB image</strong> that builds in 5 seconds and an <strong>800MB image</strong> that builds in 10 minutes and exposes security vulnerabilities.
                  </p>
                </div>

                <h3>🎓 Learning Roadmap</h3>
                <p>This guide is organized into 5 major areas to help you master container assembly:</p>
                <ul>
                  <li><strong>🛠️ Keywords Reference:</strong> Complete deep-dive into FROM, RUN, COPY, ENV, etc.</li>
                  <li><strong>🥞 Layer Cache Rules:</strong> How Docker stores layers and how duplicate instructions are ignored.</li>
                  <li><strong>🏆 Golden Build Order:</strong> The ideal arrangement of Dockerfile lines to maximize caching speed.</li>
                  <li><strong>⚖️ Detailed Comparisons:</strong> ARG vs ENV, CMD vs ENTRYPOINT, COPY vs ADD.</li>
                  <li><strong>📜 The 5 Golden Rules:</strong> Real-world analogies for non-root users, multi-stage compilation, and signal handling.</li>
                </ul>
              </div>
            );

          case "all-instructions":
            return (
              <div>
                <h2>Every Dockerfile Instruction Explained</h2>
                <p className="guide-subtitle">Filter instructions by category. Click any card to expand details including syntax, examples, and tips.</p>

                {/* Filter bar */}
                <div className="filter-bar">
                  {["all", "foundation", "env", "files", "runtime"].map((cat) => (
                    <button 
                      key={cat}
                      className={`fbtn ${activeFilter === cat ? "active" : ""}`}
                      onClick={() => setActiveFilter(cat)}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {instructions
                    .filter(inst => activeFilter === "all" || inst.category === activeFilter)
                    .map(inst => {
                      const isOpen = !!expandedCards[inst.id];
                      return (
                        <div 
                          key={inst.id} 
                          className={`icard ${isOpen ? "open" : ""}`}
                          style={{ borderColor: isOpen ? "var(--g-border)" : "transparent" }}
                        >
                          <div className="icard-head" onClick={() => toggleCard(inst.id)}>
                            <span className={`ibadge bb ${inst.usage === "once" ? "br" : "bg"}`}>
                              {inst.id}
                            </span>
                            <div className="icard-meta">
                              <div className="icard-title">{inst.title}</div>
                              <div className="icard-sub">{inst.subtitle}</div>
                            </div>
                            <div className="icard-right">
                              <span className={`use-tag ${inst.usage === "once" ? "ut-once" : "ut-many"}`}>
                                {inst.usage === "once" ? "× once" : "× many"}
                              </span>
                              <span className="chev" style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
                                ▾
                              </span>
                            </div>
                          </div>

                          {isOpen && (
                            <div className="icard-body">
                              <div className="why-box">
                                {inst.why}
                              </div>
                              
                              <div className="clabel">Syntax</div>
                              <pre className="g-code-content" style={{ fontSize: "0.9rem", padding: "12px", marginBottom: "16px" }}>
                                <code>{inst.syntax}</code>
                              </pre>

                              {inst.examples && (
                                <>
                                  <div className="clabel">Examples</div>
                                  <pre className="g-code-content" style={{ fontSize: "0.9rem", padding: "12px", marginBottom: "16px" }}>
                                    <code>{inst.examples}</code>
                                  </pre>
                                </>
                              )}

                              {inst.customSection}

                              {inst.tips && inst.tips.map((tip, idx) => (
                                <div key={idx} className={`tip tip-${tip.type}`}>
                                  <span className="tip-icon">{tip.icon}</span>
                                  <span dangerouslySetInnerHTML={{ __html: tip.text }}></span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  }
                </div>
              </div>
            );

          case "layer-usage":
            return (
              <div>
                <h2>Layer usage — once vs repeatable</h2>
                <p className="guide-subtitle">Some instructions only make sense once (Docker ignores duplicates silently). Others are designed to be repeated throughout your Dockerfile.</p>

                <div className="usage-wrap">
                  <div className="usage-card">
                    <div className="usage-head">
                      <div className="udot" style={{ background: "var(--g-red)" }}></div>
                      <span className="usage-head-title">Use only once</span>
                      <span className="utag ut-once" style={{ marginLeft: "auto" }}>× 1 max</span>
                    </div>
                    <div className="usage-body">
                      {[
                        { name: "FROM", desc: "Base image — the start", type: "bb" },
                        { name: "WORKDIR", desc: "Working directory", type: "bp" },
                        { name: "USER", desc: "Non-root user switch", type: "bp" },
                        { name: "ENTRYPOINT", desc: "Main executable", type: "ba" },
                        { name: "CMD", desc: "Default command/args", type: "ba" },
                        { name: "HEALTHCHECK", desc: "Health probe command", type: "bt" }
                      ].map((item, index) => (
                        <div className="urow" key={index}>
                          <span className={`ubadge ${item.type}`}>{item.name}</span>
                          <span className="udesc">{item.desc}</span>
                          <span className="utag ut-once">once</span>
                        </div>
                      ))}
                      <div className="usage-note">
                        ⚠ If you write <strong>CMD</strong> or <strong>ENTRYPOINT</strong> more than once, Docker silently uses only the <strong>last one</strong>. No error — just silent confusion.
                      </div>
                    </div>
                  </div>

                  <div className="usage-card">
                    <div className="usage-head">
                      <div className="udot" style={{ background: "var(--g-green)" }}></div>
                      <span className="usage-head-title">Can be repeated freely</span>
                      <span className="utag ut-many" style={{ marginLeft: "auto" }}>× many</span>
                    </div>
                    <div className="usage-body">
                      {[
                        { name: "RUN", desc: "Execute any command", type: "br" },
                        { name: "COPY", desc: "Copy files into image", type: "bg" },
                        { name: "ADD", desc: "Copy + extract archives", type: "bg" },
                        { name: "ENV", desc: "Set env variables", type: "bp" },
                        { name: "ARG", desc: "Build-time arguments", type: "bb" },
                        { name: "LABEL", desc: "Metadata key-values", type: "bb" },
                        { name: "EXPOSE", desc: "Document ports", type: "ba" },
                        { name: "VOLUME", desc: "Persistent mount points", type: "ba" }
                      ].map((item, index) => (
                        <div className="urow" key={index}>
                          <span className={`ubadge ${item.type}`}>{item.name}</span>
                          <span className="udesc">{item.desc}</span>
                          <span className="utag ut-many">many</span>
                        </div>
                      ))}
                      <div className="usage-note">
                        ✓ These can appear at any point. RUN and COPY are used most — each creates a new layer, so chain RUN commands with <code>&&</code> to keep the image small.
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "30px" }}>
                  <Quiz 
                    question="What happens if a Dockerfile contains three CMD statements?"
                    answer="Only the last CMD statement will be active and executed. The previous ones are silently ignored by Docker, which can lead to confusion if you expect multiple commands to run. If you need to run multiple processes, use a process manager like supervisord, an entrypoint script, or run multiple containers."
                  />
                </div>
              </div>
            );

          case "golden-order":
            return (
              <div>
                <h2>The Golden Build Order</h2>
                <p className="guide-subtitle">Docker caches each layer. A change in any step invalidates all steps below it. Put least-changing things at the top, most-changing at the bottom.</p>

                <div className="oflow">
                  {[
                    { num: "01", name: "FROM", desc: "Base OS and runtime. Everything else builds on top of this.", tags: ["never changes", "once only"], tagClasses: ["ot-stable", "ot-once"], color: "var(--g-accent)" },
                    { num: "02", name: "ARG / LABEL", desc: "Build arguments and metadata. Version pins, maintainer info.", tags: ["rarely changes"], tagClasses: ["ot-stable"], color: "var(--g-accent)" },
                    { num: "03", name: "RUN — system packages", desc: "apt-get, apk, yum installs. These rarely change — cache them aggressively.", tags: ["changes occasionally", "repeatable"], tagClasses: ["ot-mid", "ot-many"], color: "var(--g-red)" },
                    { num: "04", name: "ENV", desc: "App-level environment variables. NODE_ENV, PORT, TZ, etc.", tags: ["changes occasionally"], tagClasses: ["ot-mid"], color: "var(--g-purple)" },
                    { num: "05", name: "WORKDIR", desc: "Set working directory for all following steps.", tags: ["rarely changes", "once only"], tagClasses: ["ot-stable", "ot-once"], color: "var(--g-purple)" },
                    { num: "06", name: "COPY — dependency manifest only", desc: "Copy ONLY package.json or requirements.txt — not your code. This is the cache trick that makes builds fast.", tags: ["changes with deps", "repeatable"], tagClasses: ["ot-mid", "ot-many"], color: "var(--g-green)" },
                    { num: "07", name: "RUN — install dependencies", desc: "npm install, pip install, go mod download. Cached until the manifest changes.", tags: ["changes with deps", "repeatable"], tagClasses: ["ot-mid", "ot-many"], color: "var(--g-red)" },
                    { num: "08", name: "COPY — source code", desc: "Now copy all your app files. Changes every commit — that's fine, it's near the bottom.", tags: ["changes often", "repeatable"], tagClasses: ["ot-change", "ot-many"], color: "var(--g-green)" },
                    { num: "09", name: "RUN — build", desc: "Compile TypeScript, bundle React, generate assets. Runs after source code is in place.", tags: ["changes with code"], tagClasses: ["ot-change"], color: "var(--g-red)" },
                    { num: "10", name: "USER", desc: "Drop root privileges now — all installs are done. Security rule: never run your app as root.", tags: ["security", "once only"], tagClasses: ["ot-sec", "ot-once"], color: "var(--g-purple)" },
                    { num: "11", name: "EXPOSE", desc: "Document which port the app listens on. This is for humans and tools — not a firewall rule.", tags: ["rarely changes"], tagClasses: ["ot-stable"], color: "var(--g-accent)" },
                    { num: "12", name: "ENTRYPOINT + CMD", desc: "How to start the app. Always last. ENTRYPOINT = the executable. CMD = the default arguments.", tags: ["changes occasionally", "once only"], tagClasses: ["ot-mid", "ot-once"], color: "var(--g-accent)" }
                  ].map((step, index) => (
                    <div className="ostep" key={index}>
                      <div className="onum" style={{ background: "var(--g-surface)", border: "1px solid var(--g-border)" }}>{step.num}</div>
                      <div className="ocontent">
                        <div className="oinstr" style={{ color: step.color }}>{step.name}</div>
                        <div className="owhy">{step.desc}</div>
                        <div className="otags">
                          {step.tags.map((tag, tIdx) => (
                            <span key={tIdx} className={`otag ${step.tagClasses[tIdx]}`}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );

          case "arg-vs-env":
            return (
              <div>
                <h2>Build Arguments (ARG) vs Environment Variables (ENV)</h2>
                <p className="guide-subtitle">Understanding lifecycle, scopes, and where to use each variable type.</p>

                <div className="diff-grid" style={{ marginBottom: "24px" }}>
                  <div className="diff-card" style={{ backgroundColor: "var(--g-surface)", border: "1px solid var(--g-border)" }}>
                    <div className="diff-label" style={{ color: "var(--g-red)", fontSize: "1.1rem" }}>ARG — Build-time Only</div>
                    <ul style={{ paddingLeft: "20px", marginTop: "10px", fontSize: "0.9rem" }}>
                      <li>Only exists during the <code>docker build</code> phase.</li>
                      <li>Completely gone when the container starts running.</li>
                      <li>Can be set dynamically at the command line: <code>--build-arg VERSION=1.2</code></li>
                      <li>Values are visible in the <code>docker history</code> command (do not use for secrets!).</li>
                    </ul>
                  </div>
                  <div className="diff-card" style={{ backgroundColor: "var(--g-surface)", border: "1px solid var(--g-border)" }}>
                    <div className="diff-label" style={{ color: "var(--g-green)", fontSize: "1.1rem" }}>ENV — Container Runtime</div>
                    <ul style={{ paddingLeft: "20px", marginTop: "10px", fontSize: "0.9rem" }}>
                      <li>Persists inside the running container.</li>
                      <li>Visible to your application process (e.g. <code>process.env.DB_HOST</code>).</li>
                      <li>Can be overridden during <code>docker run -e DB_HOST=dev ...</code></li>
                      <li>Stored in the final image metadata, visible via <code>docker inspect</code>.</li>
                    </ul>
                  </div>
                </div>

                <div className="g-concept-box">
                  <h4>🧠 Key Guideline</h4>
                  <p style={{ margin: 0 }}>
                    Use <strong>ARG</strong> for configuration that changes the <em>build process itself</em> (like choosing an Alpine vs Ubuntu base version, or pinning compiler versions). 
                    Use <strong>ENV</strong> for configuration that changes how the <em>running application behaves</em> (like connection strings, ports, environment modes).
                  </p>
                </div>
              </div>
            );

          case "cmd-vs-entrypoint":
            return (
              <div>
                <h2>CMD vs ENTRYPOINT</h2>
                <p className="guide-subtitle">How to make your container behave like an executable or a flexible service.</p>

                <div className="g-concept-box">
                  <h4>💡 The Golden Rule of CMD vs ENTRYPOINT</h4>
                  <p style={{ margin: 0 }}>
                    Think of <strong>ENTRYPOINT</strong> as the command that defines what the container <em>is</em> (e.g., a node server, a python scraper). 
                    Think of <strong>CMD</strong> as the default arguments passed to that entrypoint, which can be easily overridden at runtime.
                  </p>
                </div>

                <div className="diff-grid" style={{ margin: "24px 0" }}>
                  <div className="diff-card" style={{ backgroundColor: "var(--g-surface)", border: "1px solid var(--g-border)" }}>
                    <div className="diff-label" style={{ color: "var(--g-accent)" }}>ENTRYPOINT</div>
                    <p style={{ fontSize: "0.9rem" }}>
                      The hardcoded executable run when the container starts. Difficult to override (requires the explicit <code>--entrypoint</code> flag at runtime). 
                      Ensures the container acts as a specific tool.
                    </p>
                  </div>
                  <div className="diff-card" style={{ backgroundColor: "var(--g-surface)", border: "1px solid var(--g-border)" }}>
                    <div className="diff-label" style={{ color: "var(--g-accent)" }}>CMD</div>
                    <p style={{ fontSize: "0.9rem" }}>
                      The default arguments to the executable. Overridden simply by appending arguments at the end of the run command: <code>docker run image [overridden cmd]</code>.
                    </p>
                  </div>
                </div>

                <h3>Example Pattern: Combining Both</h3>
                <pre className="g-code-content" style={{ padding: "16px", borderRadius: "8px" }}>
                  <code>{`# Dockerfile\nENTRYPOINT ["ping"]\nCMD ["localhost"]\n\n# Run command A:\n# docker run my-pinger\n# Runs: ping localhost\n\n# Run command B:\n# docker run my-pinger 8.8.8.8\n# Runs: ping 8.8.8.8 (CMD overridden)`}</code>
                </pre>
              </div>
            );

          case "copy-vs-add":
            return (
              <div>
                <h2>COPY vs ADD</h2>
                <p className="guide-subtitle">Two ways to add files. One clear best practice.</p>

                <div className="diff-grid" style={{ marginBottom: "24px" }}>
                  <div className="diff-card" style={{ backgroundColor: "var(--g-surface)", border: "1px solid var(--g-border)" }}>
                    <div className="diff-label" style={{ color: "var(--g-green)" }}>COPY — Clean &amp; Explicit</div>
                    <p style={{ fontSize: "0.9rem", marginTop: "8px" }}>
                      Moves files and directories from the host build context into the container. 
                      Predictable, clean, and handles nothing else. <strong>This is the default choice for 99% of file transfers.</strong>
                    </p>
                  </div>
                  <div className="diff-card" style={{ backgroundColor: "var(--g-surface)", border: "1px solid var(--g-border)" }}>
                    <div className="diff-label" style={{ color: "var(--g-yellow)" }}>ADD — Auto-extract Magic</div>
                    <p style={{ fontSize: "0.9rem", marginTop: "8px" }}>
                      Superpowers: Can download files from remote URLs, and automatically unpacks local tar archives (like <code>.tar.gz</code>) into the container. 
                      Less predictable due to auto-unpacking.
                    </p>
                  </div>
                </div>

                <div className="g-concept-box">
                  <h4>💡 The Only Valid ADD Use Case: Local Tar Expansion</h4>
                  <p style={{ margin: 0 }}>
                    Only use <code>ADD</code> when you explicitly need to unpack a local archive directly into the image: <code>ADD archive.tar.gz /app/</code>. 
                    For URL downloads, it's a best practice to run <code>RUN curl -L -O ... && tar -xzf ...</code> to avoid caching bugs and keep intermediate layers clean.
                  </p>
                </div>
              </div>
            );

          case "golden-rules":
            return (
              <div>
                <h2>The 5 Golden Rules of Dockerfiles</h2>
                <p className="guide-subtitle">Analogies and practices that separate novice container developers from seasoned DevOps engineers.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Rule 1 */}
                  <div className={`icard ${ruleExpanded[1] ? "open" : ""}`}>
                    <div className="icard-head" onClick={() => toggleRule(1)}>
                      <div className="rule-num" style={{ background: "var(--g-accent-glow)", color: "var(--g-accent)", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", fontWeight: "700" }}>1</div>
                      <div className="icard-meta">
                        <div className="icard-title">Cache is everything — order your layers smartly</div>
                        <div className="icard-sub">Put static layers first, volatile layers last</div>
                      </div>
                      <span className="chev" style={{ transform: ruleExpanded[1] ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                    </div>
                    {ruleExpanded[1] && (
                      <div className="icard-body">
                        <div className="why-box">
                          🥪 <strong>Sandwich analogy:</strong> You make a sandwich every day. Bread and butter never change — prep those once. The filling changes daily. Docker saves each step like a photo. If step 5 changes, it re-runs 5, 6, 7... but reuses cached 1–4. Put stable things first, changing things last.
                        </div>
                        <div className="cmp">
                          <div className="cmp-box">
                            <div className="cmp-top ct-bad">❌ npm install runs on EVERY build</div>
                            <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
                              <code>{`COPY . .\nRUN npm install # runs every time!`}</code>
                            </pre>
                          </div>
                          <div className="cmp-box">
                            <div className="cmp-top ct-good">✓ npm install cached smartly</div>
                            <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
                              <code>{`COPY package.json .\nRUN npm install\nCOPY . . # code AFTER`}</code>
                            </pre>
                          </div>
                        </div>
                        <div className="tip tip-info">
                          <span className="tip-icon">✅</span>
                          <span><strong>Result:</strong> Normal code changes rebuild in seconds. npm install only re-runs when package.json actually changes — not on every commit.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rule 2 */}
                  <div className={`icard ${ruleExpanded[2] ? "open" : ""}`}>
                    <div className="icard-head" onClick={() => toggleRule(2)}>
                      <div className="rule-num" style={{ background: "var(--g-green-bg)", color: "var(--g-green)", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", fontWeight: "700" }}>2</div>
                      <div className="icard-meta">
                        <div className="icard-title">Chain your RUN commands — one step, not three</div>
                        <div className="icard-sub">Fewer layers = smaller, faster image</div>
                      </div>
                      <span className="chev" style={{ transform: ruleExpanded[2] ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                    </div>
                    {ruleExpanded[2] && (
                      <div className="icard-body">
                        <div className="why-box">
                          📸 <strong>Photo analogy:</strong> You take photos while cleaning your room. Photo 1: messy. Photo 2: half-done. Photo 3: trash removed. All 3 are saved permanently even if you only care about the clean room. Docker layers are the same — clean up in the same step, or the mess is frozen in a hidden layer forever, making your image larger.
                        </div>
                        <div className="cmp">
                          <div className="cmp-box">
                            <div className="cmp-top ct-bad">❌ 3 layers — cache still stores the mess</div>
                            <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
                              <code>{`RUN apt-get update\nRUN apt-get install curl\nRUN rm -rf /var/cache`}</code>
                            </pre>
                          </div>
                          <div className="cmp-box">
                            <div className="cmp-top ct-good">✓ 1 layer — cleanup happens before snapshot</div>
                            <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
                              <code>{`RUN apt-get update \\\n  && apt-get install -y curl \\\n  && rm -rf /var/cache/apt`}</code>
                            </pre>
                          </div>
                        </div>
                        <div className="tip tip-info">
                          <span className="tip-icon">✅</span>
                          <span><strong>Result:</strong> The cache files are never frozen into any layer. Image stays lean. Use <code>&&</code> and <code>\</code> to chain every install + cleanup into one RUN.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rule 3 */}
                  <div className={`icard ${ruleExpanded[3] ? "open" : ""}`}>
                    <div className="icard-head" onClick={() => toggleRule(3)}>
                      <div className="rule-num" style={{ background: "var(--g-red-bg)", color: "var(--g-red)", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", fontWeight: "700" }}>3</div>
                      <div className="icard-meta">
                        <div className="icard-title">Never run as root — always add USER</div>
                        <div className="icard-sub">One line that prevents huge security risks</div>
                      </div>
                      <span className="chev" style={{ transform: ruleExpanded[3] ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                    </div>
                    {ruleExpanded[3] && (
                      <div className="icard-body">
                        <div className="why-box">
                          🏬 <strong>Mall analogy:</strong> A worker has a key that opens only their shop. The security guard has a master key that opens everything. Docker runs as root by default — that's the master key. If your app has a bug and gets exploited, the attacker gets the master key. One line, USER node, gives your app the worker's key. Even if stolen, damage is very limited.
                        </div>
                        <div className="cmp">
                          <div className="cmp-box">
                            <div className="cmp-top ct-bad">❌ Runs as root — master key risk</div>
                            <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
                              <code>{`FROM node:20-alpine\nCOPY . /app\nCMD  ["node","app.js"]`}</code>
                            </pre>
                          </div>
                          <div className="cmp-box">
                            <div className="cmp-top ct-good">✓ Non-root user — limited blast radius</div>
                            <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
                              <code>{`FROM node:20-alpine\nCOPY . /app\nUSER node\nCMD  ["node","app.js"]`}</code>
                            </pre>
                          </div>
                        </div>
                        <div className="tip tip-sec">
                          <span className="tip-icon">🛡</span>
                          <span><strong>Result:</strong> A hacked app running as <code>node</code> user can't touch system files, install packages, or escape to the host. Required by most enterprise security audits.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rule 4 */}
                  <div className={`icard ${ruleExpanded[4] ? "open" : ""}`}>
                    <div className="icard-head" onClick={() => toggleRule(4)}>
                      <div className="rule-num" style={{ background: "var(--g-yellow-bg)", color: "var(--g-yellow)", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", fontWeight: "700" }}>4</div>
                      <div className="icard-meta">
                        <div className="icard-title">Use multi-stage builds — don't ship the kitchen</div>
                        <div className="icard-sub">Build with heavy tools, deploy with tiny outputs</div>
                      </div>
                      <span className="chev" style={{ transform: ruleExpanded[4] ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                    </div>
                    {ruleExpanded[4] && (
                      <div className="icard-body">
                        <div className="why-box">
                          🎂 <strong>Cake analogy:</strong> To bake a cake you use a giant mixer, baking trays, and an oven. But when delivering it, you put the cake in a small box — you don't bring the whole kitchen. Multi-stage builds do this: Stage 1 is the kitchen (compilers, dev tools). Stage 2 is the delivery box (only the compiled output). 800MB → 50MB.
                        </div>
                        <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "12px", borderRadius: "8px" }}>
                          <code>{`# Stage 1 — the "kitchen" (build tools)\nFROM node:20 AS builder\nWORKDIR /app\nCOPY . .\nRUN npm install && npm run build\n\n# Stage 2 — the "delivery box" (minimal output)\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nUSER node\nCMD  ["node", "dist/server.js"]`}</code>
                        </pre>
                        <div className="tip tip-info">
                          <span className="tip-icon">✅</span>
                          <span><strong>Result:</strong> Final image has no dev dependencies or source code — just compiled bundles. Smaller size, faster loads, and fewer security vulnerabilities.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Rule 5 */}
                  <div className={`icard ${ruleExpanded[5] ? "open" : ""}`}>
                    <div className="icard-head" onClick={() => toggleRule(5)}>
                      <div className="rule-num" style={{ background: "var(--g-purple-bg)", color: "var(--g-purple)", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "6px", fontWeight: "700" }}>5</div>
                      <div className="icard-meta">
                        <div className="icard-title">Always use exec form — wrap in square brackets</div>
                        <div className="icard-sub">Allows processes to handle system shutdown signals</div>
                      </div>
                      <span className="chev" style={{ transform: ruleExpanded[5] ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                    </div>
                    {ruleExpanded[5] && (
                      <div className="icard-body">
                        <div className="why-box">
                          📞 <strong>Manager analogy:</strong> Your boss says "tell the worker to go home." But the manager is busy — so the worker never hears it and keeps working all night. Shell form wraps your app in <code>/bin/sh</code> (the manager). Docker's "stop" signal goes to the shell, not your app. Exec form (brackets) removes the middleman — "stop" reaches your app directly.
                        </div>
                        <div className="cmp">
                          <div className="cmp-box">
                            <div className="cmp-top ct-bad">❌ Shell form — signal blocks</div>
                            <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
                              <code>{`CMD node server.js\n\nENTRYPOINT python app.py`}</code>
                            </pre>
                          </div>
                          <div className="cmp-box">
                            <div className="cmp-top ct-good">✓ Exec form — signal goes direct</div>
                            <pre className="g-code-content" style={{ fontSize: "0.85rem", padding: "10px" }}>
                              <code>{`CMD ["node", "server.js"]\n\nENTRYPOINT ["python", "app.py"]`}</code>
                            </pre>
                          </div>
                        </div>
                        <div className="tip tip-warn">
                          <span className="tip-icon">⚠</span>
                          <span><strong>Result:</strong> Force-kills are avoided. With shell form, Docker waits 10 seconds, then hard kills the app, potentially corrupting files or dropping in-flight database requests.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );

          case "quick-ref":
            return (
              <div>
                <h2>Quick Reference Cheat Sheet</h2>
                <p className="guide-subtitle">All core Dockerfile keywords summarized for quick reference.</p>

                <div style={{ background: "var(--g-sidebar-bg)", border: "1px solid var(--g-border)", borderRadius: "8px", overflow: "hidden" }}>
                  <table className="qtable">
                    <thead>
                      <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                        <th style={{ padding: "12px 16px", color: "var(--g-text-bright)" }}>Instruction</th>
                        <th style={{ padding: "12px 16px", color: "var(--g-text-bright)" }}>What it does</th>
                        <th style={{ padding: "12px 16px", color: "var(--g-text-bright)" }}>Usage Limit</th>
                        <th style={{ padding: "12px 16px", color: "var(--g-text-bright)" }}>Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "FROM", desc: "Sets the base image for subsequent instructions", usage: "once", cat: "foundation", catClass: "ot-stable" },
                        { name: "ARG", desc: "Defines variables that users can pass at build-time", usage: "many", cat: "foundation", catClass: "ot-stable" },
                        { name: "LABEL", desc: "Adds metadata to an image in key-value pairs", usage: "many", cat: "foundation", catClass: "ot-stable" },
                        { name: "ENV", desc: "Sets environment variables that persist at runtime", usage: "many", cat: "environment", catClass: "ot-mid" },
                        { name: "WORKDIR", desc: "Sets the working directory inside the container", usage: "once", cat: "environment", catClass: "ot-mid" },
                        { name: "USER", desc: "Sets the username/UID when running the image", usage: "once", cat: "security", catClass: "ot-sec" },
                        { name: "RUN", desc: "Executes commands in a new layer and creates a commit", usage: "many", cat: "build", catClass: "ot-mid" },
                        { name: "COPY", desc: "Copies local files/folders into the container", usage: "many", cat: "files", catClass: "ot-change" },
                        { name: "ADD", desc: "Copies files, auto-extracts tars, and fetches URLs", usage: "many", cat: "files", catClass: "ot-change" },
                        { name: "EXPOSE", desc: "Documents the ports the container will listen on", usage: "many", cat: "runtime", catClass: "ot-stable" },
                        { name: "VOLUME", desc: "Creates a mount point for external host storage", usage: "many", cat: "runtime", catClass: "ot-stable" },
                        { name: "HEALTHCHECK", desc: "Tells Docker how to test the container's health", usage: "once", cat: "runtime", catClass: "ot-stable" },
                        { name: "ENTRYPOINT", desc: "Configures a container that will run as an executable", usage: "once", cat: "runtime", catClass: "ot-mid" },
                        { name: "CMD", desc: "Provides default arguments for an executing container", usage: "once", cat: "runtime", catClass: "ot-mid" }
                      ].map((row, idx) => (
                        <tr key={idx} style={{ borderBottom: idx === 13 ? "none" : "1px solid var(--g-border)" }}>
                          <td style={{ padding: "12px 16px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-accent)" }}>{row.name}</td>
                          <td style={{ padding: "12px 16px", fontSize: "0.85rem" }}>{row.desc}</td>
                          <td style={{ padding: "12px 16px", fontSize: "0.85rem" }}>
                            <span className={`use-tag ${row.usage === "once" ? "ut-once" : "ut-many"}`}>{row.usage}</span>
                          </td>
                          <td style={{ padding: "12px 16px", fontSize: "0.85rem" }}>
                            <span className={`otag ${row.catClass}`}>{row.cat}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ marginTop: "30px" }}>
                  <h3>🏆 Topic Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="ref-check-basic" />
                      <label htmlFor="ref-check-basic">I know the purpose of FROM, RUN, COPY, CMD, and ENTRYPOINT</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="ref-check-vars" />
                      <label htmlFor="ref-check-vars">I understand the differences between ARG and ENV</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="ref-check-cache" />
                      <label htmlFor="ref-check-cache">I know how to structure layers to utilize Docker's build cache</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="ref-check-sec" />
                      <label htmlFor="ref-check-sec">I know why running as root is bad and how to switch users using USER</label>
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
