"use client";

import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox, TipBox, WarningBox, ErrorCard, Quiz } from "@/components/guide/GuideComponents";

export default function JenkinsMastery() {
  const navGroups = [
    {
      title: "Course Intro",
      items: [
        { id: "overview", title: "📋 Roadmap & Prerequisites" }
      ]
    },
    {
      title: "Stage 1: Foundations",
      items: [
        { id: "lab1", title: "Lab 1: Install Jenkins" },
        { id: "lab2", title: "Lab 2: Navigate the UI" },
        { id: "lab3", title: "Lab 3: First Freestyle Job" },
        { id: "lab4", title: "Lab 4: Diagnose Failures" },
        { id: "lab5", title: "Lab 5: GitHub Webhooks" },
        { id: "lab6", title: "Lab 6: Notifications" },
        { id: "lab7", title: "Lab 7: First Jenkinsfile" },
        { id: "lab8", title: "Lab 8: Parameterised Builds" },
        { id: "lab9", title: "Lab 9: Credentials" },
        { id: "lab10", title: "Lab 10: Cron Scheduling" },
        { id: "lab11", title: "Lab 11: Artifacts & Reports" },
        { id: "lab12", title: "Lab 12: Capstone Project" }
      ]
    },
    {
      title: "Stage 2: Pipelines",
      items: [
        { id: "lab13", title: "Lab 13: Pipeline Deep Dive" },
        { id: "lab14", title: "Lab 14: Multi-Stage Pipelines" },
        { id: "lab15", title: "Lab 15: Parallel Stages" },
        { id: "lab16", title: "Lab 16: Shared Libraries" },
        { id: "lab17", title: "Lab 17: Full-Stack Project" }
      ]
    },
    {
      title: "Stage 3: Infrastructure",
      items: [
        { id: "lab18", title: "Lab 18: Docker Agents" },
        { id: "lab19", title: "Lab 19: Config as Code" },
        { id: "lab20", title: "Lab 20: RBAC & Security" },
        { id: "lab21", title: "Lab 21: Docker-Compose Project" }
      ]
    },
    {
      title: "Stage 4: Advanced",
      items: [
        { id: "lab22", title: "Lab 22: Multibranch Pipelines" },
        { id: "lab23", title: "Lab 23: GitOps" },
        { id: "lab24", title: "Lab 24: Blue/Green Deploy" },
        { id: "lab25", title: "Lab 25: Compliance Gates" }
      ]
    },
    {
      title: "Stage 5: Expert",
      items: [
        { id: "lab26", title: "Lab 26: Observability" },
        { id: "lab27", title: "Lab 27: Performance Tuning" },
        { id: "lab28", title: "Lab 28: Plugin Development" },
        { id: "lab29", title: "Lab 29: Platform Engineering" }
      ]
    },
    {
      title: "Reference",
      items: [
        { id: "errors", title: "🚨 Master Error Guide" },
        { id: "destroy", title: "🗑️ Destroy Resources" }
      ]
    }
  ];

  return (
    <GuideWrapper 
      title="Jenkins CI/CD Mastery Guide" 
      subtitle="From complete beginner to real-world expert — one lab at a time."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case "overview":
            return (
              <div>
                <h2>🚀 Jenkins CI/CD Mastery</h2>
                <p className="guide-subtitle">From complete beginner to real-world expert — one lab at a time</p>

                <ConceptBox title="What is Jenkins?">
                  <p style={{ margin: 0 }}>
                    Jenkins is a free automation server. Think of it as a robot that runs tasks automatically — testing your code when you push, building your app, and deploying it. Companies use Jenkins so developers don&apos;t have to perform these repetitive tasks manually.
                  </p>
                </ConceptBox>

                <h3>📋 Your Learning Roadmap</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Stage</th>
                      <th>Focus</th>
                      <th>Timeline</th>
                      <th>Labs</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1 — Foundations</td>
                      <td>Install, UI, freestyle jobs, webhooks</td>
                      <td>Weeks 1–3</td>
                      <td>1–12</td>
                    </tr>
                    <tr>
                      <td>2 — Pipelines</td>
                      <td>Jenkinsfiles, parallel stages, shared libraries</td>
                      <td>Weeks 4–7</td>
                      <td>13–17</td>
                    </tr>
                    <tr>
                      <td>3 — Infrastructure</td>
                      <td>Docker agents, JCasC, RBAC</td>
                      <td>Weeks 8–12</td>
                      <td>18–21</td>
                    </tr>
                    <tr>
                      <td>4 — Advanced</td>
                      <td>GitOps, blue/green, compliance</td>
                      <td>Weeks 13–18</td>
                      <td>22–25</td>
                    </tr>
                    <tr>
                      <td>5 — Expert</td>
                      <td>Observability, plugins, platform engineering</td>
                      <td>Weeks 19–26</td>
                      <td>26–29</td>
                    </tr>
                  </tbody>
                </table>

                <h3>💰 Cost & Infrastructure Options</h3>
                <p>You can complete this entire course for <strong>100% Free</strong>. You have two choices:</p>
                
                <TipBox>
                  <strong>Option A: Local Development (Free)</strong><br />
                  Run everything on your own Windows laptop using WSL2 and Docker Desktop. This costs $0 and is the fastest way to learn.
                </TipBox>
                
                <WarningBox>
                  <strong>Option B: AWS Cloud (Using your $160 Free Credits)</strong><br />
                  If your laptop is slow or you want real-world cloud experience, use your $160 AWS credits to rent an <code>Ubuntu t3.medium EC2 instance</code> (approx. $30/month). You will SSH into it and run the exact same commands there instead of WSL.
                </WarningBox>

                <h3>🛠️ Prerequisites — Install These First (Local WSL Setup)</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "24px 0" }}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>1</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Install WSL2 (Windows Subsystem for Linux):</strong>
                      <p style={{ margin: "4px 0" }}>Open PowerShell as Administrator and run: <code>wsl --install</code>. Restart your PC.</p>
                      <ErrorCard 
                        error='🔥 Setup Error: "Virtualization is not enabled"'
                        meaning="WSL2 requires CPU virtualization."
                        fix="Restart your computer, enter BIOS/UEFI settings, and enable Intel Virtualization Technology (VT-x) or AMD-V."
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>2</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Docker Desktop:</strong>
                      <p style={{ margin: "4px 0" }}>Download and install from <code>docker.com/products/docker-desktop</code>. In Settings &gt; Resources &gt; WSL Integration, ensure your Ubuntu distro is checked.</p>
                      <TipBox>
                        <strong>💻 Verify Installation:</strong> Open your WSL Terminal (Ubuntu) and run:
                        <CodeBlock title="WSL Terminal" code={`docker --version\ndocker run hello-world`} />
                      </TipBox>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>3</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Git:</strong>
                      <p style={{ margin: "4px 0" }}>Install in WSL by running:</p>
                      <CodeBlock title="WSL Terminal" code={`sudo apt update && sudo apt install -y git\ngit --version`} />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>4</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>GitHub & ngrok:</strong>
                      <p style={{ margin: "4px 0" }}>Create a free account at <code>github.com</code>. Create a free account at <code>ngrok.com</code> and copy your auth token for later webhook use.</p>
                    </div>
                  </div>
                </div>

                <h3>🎯 Real-World Projects You&apos;ll Build</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Stage</th>
                      <th>What You Build</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>NodeApp CI</td>
                      <td>1–2</td>
                      <td>Full CI pipeline for a Node.js REST API</td>
                    </tr>
                    <tr>
                      <td>Full-Stack Pipeline</td>
                      <td>2–3</td>
                      <td>Frontend + Backend with parallel testing</td>
                    </tr>
                    <tr>
                      <td>Dockerized Jenkins</td>
                      <td>3</td>
                      <td>Jenkins-as-Code with docker-compose</td>
                    </tr>
                    <tr>
                      <td>GitOps Deployer</td>
                      <td>4–5</td>
                      <td>Blue/green deployment with compliance gates</td>
                    </tr>
                  </tbody>
                </table>

                <TipBox>
                  Follow the labs in order. Each one builds on the previous. Type every command yourself — don&apos;t just copy-paste!
                </TipBox>
              </div>
            );
          case "lab1":
            return (
              <div>
                <h2>Lab 1: Install Jenkins with Docker</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Estimated time: 15 minutes</p>

                <ConceptBox title="What is Docker?">
                  <p style={{ margin: 0 }}>
                    Docker lets you run apps in <strong>containers</strong> — isolated boxes that contain everything the application needs. Instead of installing Jenkins directly on your host operating system (messy), we run it inside a Docker container. Clean, portable, and easy to manage.
                  </p>
                </ConceptBox>

                <h3>Step-by-Step Setup</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "24px 0" }}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>1</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Create a Docker network:</strong>
                      <p style={{ margin: "4px 0" }}>Jenkins will need to communicate with other containers. A network enables internal resolution by container name.</p>
                      <CodeBlock title="WSL Terminal" code="docker network create jenkins" />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>2</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Create a volume for Jenkins data:</strong>
                      <p style={{ margin: "4px 0" }}>This storage volume persists even if the container is recreated. Your configurations, credentials, and jobs are saved here.</p>
                      <CodeBlock title="WSL Terminal" code="docker volume create jenkins-data" />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>3</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Run Jenkins:</strong>
                      <p style={{ margin: "4px 0" }}>Deploy the official LTS container with port mappings and volume attachments:</p>
                      <CodeBlock 
                        title="WSL Terminal (Use \\ instead of ^ if running in PowerShell)" 
                        code={`docker run -d \\\n  --name jenkins \\\n  --network jenkins \\\n  --restart=on-failure \\\n  -p 8080:8080 \\\n  -p 50000:50000 \\\n  -v jenkins-data:/var/jenkins_home \\\n  -v /var/run/docker.sock:/var/run/docker.sock \\\n  jenkins/jenkins:lts`} 
                      />
                      <ConceptBox title="🔍 Code Explanation: Running Jenkins in Docker">
                        <ul style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                          <li style={{ marginBottom: "8px" }}><strong>-d:</strong> Runs in detached mode (background process).</li>
                          <li style={{ marginBottom: "8px" }}><strong>-p 8080:8080:</strong> Maps port 8080 for web UI browser access.</li>
                          <li style={{ marginBottom: "8px" }}><strong>-p 50000:50000:</strong> Port used for attaching external Jenkins build agents.</li>
                          <li style={{ margin: 0 }}><strong>-v jenkins-data:/var/jenkins_home:</strong> Binds the persistent volume to prevent data loss.</li>
                        </ul>
                      </ConceptBox>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>4</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Get the initial admin password:</strong>
                      <p style={{ margin: "4px 0" }}>Jenkins generates a default password to establish initial setup security. Retrieve it via executive logs:</p>
                      <CodeBlock title="WSL Terminal" code="docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword" />
                      <p style={{ color: "var(--g-accent)" }}><em>Copy that long alphanumeric string!</em></p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>5</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Open Jenkins in your browser:</strong>
                      <p style={{ margin: "4px 0" }}>Go to <code>http://localhost:8080</code></p>
                      <ol style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                        <li style={{ marginBottom: "4px" }}>Paste the retrieved admin password.</li>
                        <li style={{ marginBottom: "4px" }}>Click <strong>&quot;Install suggested plugins&quot;</strong> and wait.</li>
                        <li style={{ marginBottom: "4px" }}>Create your administrative user details.</li>
                        <li style={{ margin: 0 }}>Accept the URL recommendations and click <strong>&quot;Start using Jenkins&quot;</strong>.</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <ErrorCard 
                  error='❌ Error: "Port 8080 is already in use"'
                  meaning="Another application on your host PC is using port 8080."
                  fix={`Inspect ports in command: netstat -ano | findstr :8080\nOr launch Jenkins on an alternate port:\ndocker run -d --name jenkins -p 9090:8080 -p 50000:50000 -v jenkins-data:/var/jenkins_home jenkins/jenkins:lts`}
                />

                <ErrorCard 
                  error="❌ Error: Docker daemon not running"
                  meaning="Docker Desktop is shut down or disabled."
                  fix="Open the Docker Desktop application, wait for the status indicator to turn green, and retry the command."
                />

                <ErrorCard 
                  error='❌ Error: "This site can&apos;t be reached" on localhost:8080'
                  meaning="The Jenkins container crashed or is taking time to initialize."
                  fix={`Inspect status: docker ps -a\nView logs to find crashes: docker logs jenkins\nRestart if necessary: docker start jenkins`}
                />

                <Quiz 
                  question="If you delete the Jenkins container with docker rm jenkins, will you lose all your jobs and settings? Why or why not?"
                  answer="No, you won't lose them. Because we used -v jenkins-data:/var/jenkins_home, all configuration data is stored inside the Docker volume, which exists independently of the container. If you delete the container and create a new one pointing to that volume, all settings will reload. You only lose data if you delete the volume itself."
                />
              </div>
            );
          case "lab2":
            return (
              <div>
                <h2>Lab 2: Navigate the Jenkins UI</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Estimated time: 10 minutes</p>

                <ConceptBox title="The Dashboard">
                  <p style={{ margin: 0 }}>
                    When you access <code>http://localhost:8080</code>, you land on the Dashboard. The left sidebar contains configurations and actions, while the main view presents the list of pipelines, jobs, and execution history.
                  </p>
                </ConceptBox>

                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`┌─────────────────────────────────────────────────┐
│  Jenkins Dashboard                               │
├──────────────┬──────────────────────────────────┤
│ Left Sidebar │  Main Area                        │
│              │                                    │
│ • New Item   │  Build Queue (waiting jobs)        │
│ • People     │  Build Executor (running now)      │
│ • Build Hist │  Job List (your jobs appear here)  │
│ • Manage     │                                    │
│   Jenkins    │                                    │
└──────────────┴──────────────────────────────────┘`}
                </pre>

                <h3>Key Pages You Must Know</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Page</th>
                      <th>Location</th>
                      <th>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>New Item</strong></td>
                      <td>Left sidebar</td>
                      <td>Create new jobs (Freestyle, Pipeline, Multibranch)</td>
                    </tr>
                    <tr>
                      <td><strong>Manage Jenkins</strong></td>
                      <td>Left sidebar</td>
                      <td>Admin settings, tools, credentials, and plugins</td>
                    </tr>
                    <tr>
                      <td><strong>System</strong></td>
                      <td>Manage Jenkins</td>
                      <td>Configure global variables, URLs, and SMTP servers</td>
                    </tr>
                    <tr>
                      <td><strong>Tools</strong></td>
                      <td>Manage Jenkins</td>
                      <td>Manage executable installations (JDK, Git, Node.js)</td>
                    </tr>
                    <tr>
                      <td><strong>Plugins</strong></td>
                      <td>Manage Jenkins</td>
                      <td>Install/uninstall extensions and plugins</td>
                    </tr>
                    <tr>
                      <td><strong>Nodes</strong></td>
                      <td>Manage Jenkins</td>
                      <td>Register and inspect remote executor agents</td>
                    </tr>
                    <tr>
                      <td><strong>Credentials</strong></td>
                      <td>Manage Jenkins</td>
                      <td>Manage securely encrypted passwords, keys, and tokens</td>
                    </tr>
                    <tr>
                      <td><strong>Console Output</strong></td>
                      <td>Inside any build</td>
                      <td>⭐ Console logs that trace commands executed during builds</td>
                    </tr>
                  </tbody>
                </table>

                <h3>Build Status Indicators</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Icon color</th>
                      <th>Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ color: "var(--g-accent)", fontWeight: "bold" }}>Blue/Green</td>
                      <td>Build completed successfully</td>
                    </tr>
                    <tr>
                      <td style={{ color: "var(--g-yellow)", fontWeight: "bold" }}>Yellow</td>
                      <td>Unstable build (e.g. compilation passed but unit tests failed)</td>
                    </tr>
                    <tr>
                      <td style={{ color: "var(--g-red)", fontWeight: "bold" }}>Red</td>
                      <td>Build failed (non-zero shell exit code)</td>
                    </tr>
                    <tr>
                      <td style={{ color: "var(--g-text-muted)", fontWeight: "bold" }}>Grey</td>
                      <td>Build was aborted or never scheduled</td>
                    </tr>
                  </tbody>
                </table>

                <TipBox>
                  Jenkins default builds show blue circles for success. You can install the <strong>Green Balls</strong> plugin under plugins administration if you prefer green indicators.
                </TipBox>

                <h3>Hands-On: Explore</h3>
                <ol style={{ marginLeft: "20px", color: "var(--g-text)" }}>
                  <li style={{ marginBottom: "8px" }}>Click <strong>Manage Jenkins → System</strong> and inspect the global parameters.</li>
                  <li style={{ marginBottom: "8px" }}>Click <strong>Manage Jenkins → Plugins → Available</strong> and search for &quot;Git&quot;.</li>
                  <li style={{ margin: 0 }}>Click <strong>Manage Jenkins → Nodes</strong> to see the Built-In controller node.</li>
                </ol>

                <Quiz 
                  question="Where do you go to see the exact output (every command, every line) of a failed build?"
                  answer="Click the job name in the dashboard, then click the failed build number (e.g., #1) from the Build History on the left, and finally select &quot;Console Output&quot;. This log is the main source of truth for debugging failures."
                />
              </div>
            );
          case "lab3":
            return (
              <div>
                <h2>Lab 3: First Freestyle Job</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Clone a repo and run tests</p>

                <ConceptBox title="What is a Freestyle Job?">
                  <p style={{ margin: 0 }}>
                    A freestyle job is the simplest type of Jenkins job. You configure everything through the graphical user interface — no pipeline code required. You fill in a form stating where the git repository is, what scripts to run, and what actions to execute next.
                  </p>
                </ConceptBox>

                <h3>Step 1: Create a test project on GitHub</h3>
                <p>Create a public repository named <code>jenkins-lab-app</code> on GitHub and add the following files locally:</p>

                <CodeBlock 
                  title="package.json" 
                  code={`{\n  "name": "jenkins-lab-app",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node index.js",\n    "test": "node test.js",\n    "lint": "echo 'Linting passed!'"\n  }\n}`} 
                />

                <CodeBlock 
                  title="index.js" 
                  code={`function add(a, b) { return a + b; }\nfunction subtract(a, b) { return a - b; }\nfunction multiply(a, b) { return a * b; }\n\nmodule.exports = { add, subtract, multiply };\nconsole.log("Jenkins Lab App is running!");`} 
                />

                <CodeBlock 
                  title="test.js" 
                  code={`const { add, subtract, multiply } = require('./index');\nlet passed = 0, failed = 0;\n\nfunction test(name, actual, expected) {\n  if (actual === expected) { console.log(\`✅ PASS: \${name}\`); passed++; }\n  else { console.log(\`❌ FAIL: \${name} — expected \${expected}, got \${actual}\`); failed++; }\n}\n\ntest("add(2,3)=5", add(2,3), 5);\ntest("subtract(10,4)=6", subtract(10,4), 6);\ntest("multiply(5,6)=30", multiply(5,6), 30);\n\nconsole.log(\`\\n--- Results: \${passed} passed, \${failed} failed ---\`);\nif (failed > 0) process.exit(1);  // Non-zero exit code informs Jenkins of failure`} 
                />

                <h3>Step 2: Commit & Push to GitHub</h3>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`git add .\ngit commit -m "feat: initial project with tests"\ngit push origin main`} 
                />

                <h3>Step 3: Pre-install Node.js in the Jenkins Controller</h3>
                <p>Since the container does not ship with languages installed, execute this in your terminal to bootstrap Node:</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code="docker exec -u root jenkins bash -c 'curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs'" 
                />

                <h3>Step 4: Configure the Freestyle Job</h3>
                <ol style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                  <li style={{ marginBottom: "8px" }}>Go to Dashboard → <strong>New Item</strong> → Name it <code>my-first-job</code> → Select <strong>Freestyle project</strong> → OK.</li>
                  <li style={{ marginBottom: "8px" }}>Under <strong>Source Code Management</strong>, check <strong>Git</strong> and paste your repository URL. Under branch specifier, set <code>*/main</code>.</li>
                  <li style={{ marginBottom: "8px" }}>Under <strong>Build Steps</strong>, click Add build step → Select <strong>Execute shell</strong> and write:</li>
                </ol>
                <CodeBlock 
                  title="Shell Script Console" 
                  code={`echo "=== Running Tests ==="\nnode --version\nnpm test\necho "=== Build Complete ==="`} 
                />
                <ol start="4" style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                  <li style={{ margin: 0 }}>Click <strong>Save</strong> → click <strong>Build Now</strong>, and check the logs in Console Output.</li>
                </ol>

                <ErrorCard 
                  error='❌ Error: "node: command not found" or "npm: not found"'
                  meaning="The Jenkins container running the build lacks a Node.js runtime."
                  fix="Run the docker exec command in Step 3 to install Node inside the Jenkins container. In later stages, we will use Docker Agents to prevent modifying the controller."
                />

                <ErrorCard 
                  error='❌ Error: "Repository not found" or "Authentication failed"'
                  meaning="The repository is private and Jenkins lacks authorization credentials."
                  fix="Under SCM Credentials, create a Username/Password entry using your GitHub username and a Personal Access Token (PAT)."
                />

                <Quiz 
                  question="In test.js, why do we call process.exit(1) when a test fails? What happens if we omit this?"
                  answer="process.exit(1) returns exit code 1 to the calling environment. Jenkins monitors shell exit codes — a code of 0 indicates success, while any non-zero code signals failure. If we omit this, the script exits with code 0 even if assertions fail, causing Jenkins to report a false SUCCESS."
                />
              </div>
            );
          case "lab4":
            return (
              <div>
                <h2>Lab 4: Diagnose Failures</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | The most important Jenkins skill</p>

                <WarningBox>
                  Debugging broken jobs is the most common task in CI/CD. When a build crashes, do not start altering parameters blindly. Start with the console output.
                </WarningBox>

                <ConceptBox title="The Log Strategy">
                  <p style={{ margin: 0 }}>
                    Access the Console Output of the failed build. <strong>Read from the bottom up.</strong> The terminating error statement is usually within the final 20 lines of the build log output before the <code>Finished: FAILURE</code> declaration.
                  </p>
                </ConceptBox>

                <h3>Exercise: Trigger a build failure</h3>
                <p>Edit your <code>index.js</code> file to introduce a logical bug:</p>
                <CodeBlock 
                  title="index.js" 
                  code={`function add(a, b) { return a * b; } // BUG: multiplying instead of adding\nfunction subtract(a, b) { return a - b; }\nfunction multiply(a, b) { return a * b; }\nmodule.exports = { add, subtract, multiply };`} 
                />
                <CodeBlock 
                  title="WSL Terminal" 
                  code="git add . && git commit -m 'test: break adding' && git push" 
                />

                <p>Run a build in Jenkins. You will see a failure. The logs will display:</p>
                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`❌ FAIL: add(2,3)=5 — expected 5, got 6
--- Results: 2 passed, 1 failed ---
Build step 'Execute shell' marked build as failure
Finished: FAILURE`}
                </pre>

                <h3>Exit Code Glossary</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Exit Code</th>
                      <th>Interpretation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>0</code></td>
                      <td>Success</td>
                    </tr>
                    <tr>
                      <td><code>1</code></td>
                      <td>General run error (failed tests, syntax crashes)</td>
                    </tr>
                    <tr>
                      <td><code>126</code></td>
                      <td>Permission denied (target file is not executable)</td>
                    </tr>
                    <tr>
                      <td><code>127</code></td>
                      <td>Command not found (missing binary dependency)</td>
                    </tr>
                    <tr>
                      <td><code>137</code></td>
                      <td>Out of Memory (container killed by host kernel)</td>
                    </tr>
                  </tbody>
                </table>

                <Quiz 
                  question="A build fails with exit code 137. What does this mean, and how should you address it?"
                  answer="Exit code 137 indicates the container exceeded host memory limits and was killed by the OS. Check memory footprints with docker stats, and allocation settings inside your run instructions (e.g. increase container allocation with -m 2g)."
                />
              </div>
            );
          case "lab5":
            return (
              <div>
                <h2>Lab 5: GitHub Webhooks</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Automatic builds on every push</p>

                <ConceptBox title="Triggering Pipelines Dynamically">
                  <p style={{ margin: 0 }}>
                    A webhook makes GitHub automatically deliver an HTTP request notifying Jenkins when changes are pushed to your remote repository.
                  </p>
                </ConceptBox>

                <h3>The Network Barrier: Exposing localhost</h3>
                <p>Your local Jenkins runs on <code>http://localhost:8080</code>. GitHub cannot contact this address directly. We use <strong>ngrok</strong> to establish a public secure tunnel.</p>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "24px 0" }}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>1</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Start the ngrok tunnel:</strong>
                      <p style={{ margin: "4px 0" }}>Open a new terminal shell and run:</p>
                      <CodeBlock title="WSL Terminal" code="ngrok http 8080" />
                      <p style={{ margin: "4px 0" }}>Copy the generated forwarding address (e.g., <code>https://abc123.ngrok-free.app</code>).</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>2</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Configure Jenkins global URL:</strong>
                      <p style={{ margin: "4px 0" }}>Go to Manage Jenkins → System → Jenkins URL. Paste your ngrok forwarding address and click Save.</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>3</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Configure Webhook in GitHub repo:</strong>
                      <ol style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                        <li style={{ marginBottom: "4px" }}>Open repository Settings &gt; Webhooks &gt; click Add Webhook.</li>
                        <li style={{ marginBottom: "4px" }}>Set Payload URL to: <code>https://your-ngrok-url.ngrok-free.app/github-webhook/</code> (ensure the trailing slash is included!).</li>
                        <li style={{ marginBottom: "4px" }}>Set Content type to <code>application/json</code>.</li>
                        <li style={{ margin: 0 }}>Select &quot;Just the push event&quot; and click Add Webhook.</li>
                      </ol>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>4</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Enable hook trigger in Jenkins:</strong>
                      <p style={{ margin: "4px 0" }}>Open your job configuration, navigate to Build Triggers, check <strong>&quot;GitHub hook trigger for GITScm polling&quot;</strong>, and click Save.</p>
                    </div>
                  </div>
                </div>

                <ErrorCard 
                  error="❌ Error: GitHub webhook delivery reports Connection Timed Out"
                  meaning="GitHub failed to reach your ngrok tunnel endpoint."
                  fix="Verify ngrok is running and that the webhook URL registered on GitHub matches the forwarding URL in your active ngrok terminal session."
                />

                <Quiz 
                  question="You restart your ngrok tunnel and get a new URL. What two places must be updated?"
                  answer="1. In Jenkins: Manage Jenkins > System > Jenkins URL. 2. On GitHub: Repository Settings > Webhooks > Edit the Payload URL with the new ngrok hostname."
                />
              </div>
            );
          case "lab6":
            return (
              <div>
                <h2>Lab 6: Build Notifications — Slack & Email</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Get notified when builds fail</p>

                <ConceptBox title="Why Notifications?">
                  <p style={{ margin: 0 }}>
                    You don&apos;t want to stare at Jenkins all day waiting for builds. Automated notifications tell you and your team when a build fails so you can react immediately.
                  </p>
                </ConceptBox>

                <h3>Email Setup (SMTP)</h3>
                <p>Configure SMTP under Manage Jenkins → System → E-mail Notification:</p>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Field</th>
                      <th>Gmail Target Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>SMTP server</td>
                      <td><code>smtp.gmail.com</code></td>
                    </tr>
                    <tr>
                      <td>Use SSL</td>
                      <td>✅ Checked</td>
                    </tr>
                    <tr>
                      <td>SMTP Port</td>
                      <td><code>465</code></td>
                    </tr>
                    <tr>
                      <td>Username</td>
                      <td>your-email@gmail.com</td>
                    </tr>
                    <tr>
                      <td>Password</td>
                      <td>Gmail <strong>App Password</strong> (requires 2FA to be active on Google account)</td>
                    </tr>
                  </tbody>
                </table>

                <p>Add to your Freestyle job: Post-build Actions → Add → <strong>E-mail Notification</strong> → Enter target emails.</p>

                <h3>Slack Integration Setup</h3>
                <ol style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                  <li style={{ marginBottom: "8px" }}>Create a Slack workspace and a dedicated channel <code>#jenkins-builds</code>.</li>
                  <li style={{ marginBottom: "8px" }}>Register a Slack app at <code>api.slack.com/apps</code>, enable Incoming Webhooks, and generate a Webhook URL.</li>
                  <li style={{ marginBottom: "8px" }}>Install the <strong>&quot;Slack Notification&quot;</strong> plugin in Jenkins.</li>
                  <li style={{ marginBottom: "8px" }}>Navigate to Manage Jenkins → System → Slack, and add the webhook URL as a Secret Text credential.</li>
                  <li style={{ margin: 0 }}>Configure the job: Post-build Actions → Slack Notifications → Check Success and Failure hooks.</li>
                </ol>

                <ErrorCard 
                  error='❌ Error: "Could not connect to SMTP host"'
                  meaning="SMTP credentials, ports, or SSL options are mismatched."
                  fix="Verify SMTP port is 465, SSL is active, and you are using a dedicated App Password, not your standard account password."
                />

                <Quiz 
                  question="Why use a Gmail App Password instead of your regular password?"
                  answer="Security. App Passwords restrict access specifically to mail sending. If leaked, attackers cannot access your full Google account. Google also blocks less secure apps by default, making App Passwords the only viable way to send email with 2FA enabled."
                />
              </div>
            );
          case "lab7":
            return (
              <div>
                <h2>Lab 7: First Jenkinsfile — Pipeline as Code</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Your pipeline lives in your repo</p>

                <ConceptBox title="Why Pipeline as Code?">
                  <p style={{ margin: 0 }}>
                    Freestyle jobs are configured in the UI — meaning you cannot version control or code-review configuration changes. A <strong>Jenkinsfile</strong> is a text file in your Git repository that defines your build workflow, providing auditing, history, and portability.
                  </p>
                </ConceptBox>

                <h3>Create a Jenkinsfile in your repo root</h3>
                <p>Create a file named exactly <code>Jenkinsfile</code> (no file extension) in the root of your <code>jenkins-lab-app</code> repository:</p>
                <CodeBlock 
                  title="Jenkinsfile" 
                  code={`pipeline {\n    agent any\n\n    stages {\n        stage('Checkout') {\n            steps {\n                echo '📥 Checking out scm...'\n                checkout scm\n            }\n        }\n        stage('Lint') {\n            steps {\n                echo '🔍 Running linter...'\n                sh 'npm run lint'\n            }\n        }\n        stage('Test') {\n            steps {\n                echo '🧪 Running tests...'\n                sh 'npm test'\n            }\n        }\n        stage('Build') {\n            steps {\n                echo '🏗️ Building...'\n                sh 'node index.js'\n            }\n        }\n    }\n\n    post {\n        success { echo '✅ Pipeline completed!' }\n        failure { echo '❌ Pipeline failed!' }\n        always  { cleanWs() }\n    }\n}`} 
                />

                <h3>Declarative Concepts Reference</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Keyword</th>
                      <th>Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>pipeline</code></td>
                      <td>Wraps all declarative syntax parameters</td>
                    </tr>
                    <tr>
                      <td><code>agent any</code></td>
                      <td>Runs the build on any available worker agent</td>
                    </tr>
                    <tr>
                      <td><code>stages</code></td>
                      <td>Container for all execution steps</td>
                    </tr>
                    <tr>
                      <td><code>stage(&apos;Name&apos;)</code></td>
                      <td>Logical category shown in the UI Stage View</td>
                    </tr>
                    <tr>
                      <td><code>sh</code></td>
                      <td>Executes a shell command (on Linux agents)</td>
                    </tr>
                    <tr>
                      <td><code>post</code></td>
                      <td>Executes actions post-build depending on status conditions</td>
                    </tr>
                    <tr>
                      <td><code>cleanWs()</code></td>
                      <td>Deletes files inside the workspace to prevent leftover cache issues</td>
                    </tr>
                  </tbody>
                </table>

                <h3>Create the Pipeline Job</h3>
                <ol style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                  <li style={{ marginBottom: "8px" }}>Go to Dashboard → New Item → Name it <code>my-first-pipeline</code> → Select <strong>Pipeline</strong> → OK.</li>
                  <li style={{ marginBottom: "8px" }}>Under the Pipeline section, change Definition to <strong>&quot;Pipeline script from SCM&quot;</strong>.</li>
                  <li style={{ marginBottom: "8px" }}>Set SCM to <strong>Git</strong>, paste your repository URL, set Branch Specifier to <code>*/main</code>, and verify Script Path is <code>Jenkinsfile</code>.</li>
                  <li style={{ margin: 0 }}>Click <strong>Save</strong> → click <strong>Build Now</strong>, and inspect the visual Stage View!</li>
                </ol>

                <ErrorCard 
                  error='❌ Error: Jenkinsfile syntax error - "Expected a stage"'
                  meaning="The pipeline script contains structural nesting errors."
                  fix="Use the Replay feature in the build sidebar to correct syntax interactively before committing changes. Review syntax guidelines at jenkins.io."
                />

                <Quiz 
                  question="What is the difference between post { failure { } } and placing code at the end of the last stage?"
                  answer="The post failure block is guaranteed to run even if any middle stage fails or is skipped. Placed code at the end of the final stage only runs if all previous build steps completed successfully. The post block is the ideal place for notifications and cleanup commands."
                />
              </div>
            );
          case "lab8":
            return (
              <div>
                <h2>Lab 8: Parameterised Builds</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Pass inputs to control build behavior</p>

                <ConceptBox title="What are Parameters?">
                  <p style={{ margin: 0 }}>
                    Parameters act like function arguments for your pipeline. They allow you to define variable environments, run toggles, or branch overrides at trigger time.
                  </p>
                </ConceptBox>

                <h3>Jenkinsfile Parameter Declaration</h3>
                <CodeBlock 
                  title="Jenkinsfile" 
                  code={`pipeline {\n    agent any\n\n    parameters {\n        choice(name: 'ENVIRONMENT',\n               choices: ['dev', 'staging', 'production'],\n               description: 'Target deployment environment')\n        booleanParam(name: 'RUN_TESTS',\n                     defaultValue: true,\n                     description: 'Toggle testing step')\n        string(name: 'BRANCH_NAME',\n               defaultValue: 'main',\n               description: 'Checkout branch target')\n    }\n\n    stages {\n        stage('Info') {\n            steps {\n                echo "🌍 Environment: \${params.ENVIRONMENT}"\n                echo "🧪 Run Tests: \${params.RUN_TESTS}"\n            }\n        }\n        stage('Test') {\n            when { expression { return params.RUN_TESTS } }\n            steps { sh 'npm test' }\n        }\n        stage('Deploy') {\n            steps {\n                script {\n                    if (params.ENVIRONMENT == 'production') {\n                        echo '🚨 INITIATING PRODUCTION DEPLOY!'\n                    } else {\n                        echo "Deploying to \${params.ENVIRONMENT}..."\n                    }\n                }\n            }\n        }\n    }\n}`} 
                />

                <TipBox>
                  After committing a parameterized Jenkinsfile, run <strong>Build Now</strong> once manually. Jenkins must read the script once to detect and register the parameter definitions. Subsequent executions will show <strong>&quot;Build with Parameters&quot;</strong>.
                </TipBox>

                <Quiz 
                  question="How do you skip a stage dynamically based on parameters?"
                  answer="Use the when directive, for example: when { expression { return params.RUN_TESTS } }. If the condition evaluates to false, Jenkins skips the stage (displayed as grey in the UI)."
                />
              </div>
            );
          case "lab9":
            return (
              <div>
                <h2>Lab 9: Manage Credentials Safely</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Never hardcode secrets in repository files</p>

                <WarningBox>
                  Do not store API keys, passwords, or cloud credentials in your Git history. Utilize the Jenkins Credentials Store to decrypt secrets at build runtime.
                </WarningBox>

                <h3>1. Register Credentials in Jenkins</h3>
                <ol style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                  <li style={{ marginBottom: "8px" }}>Navigate to Manage Jenkins → Credentials → System → Global credentials.</li>
                  <li style={{ marginBottom: "8px" }}>Click Add Credentials. Under Kind, select <strong>Secret text</strong>.</li>
                  <li style={{ marginBottom: "8px" }}>Set Secret to: <code>my-api-key-12345</code>.</li>
                  <li style={{ margin: 0 }}>Set ID to: <code>my-api-key</code>, and click Create.</li>
                </ol>

                <h3>2. Reference Secrets in a Pipeline</h3>
                <CodeBlock 
                  title="Jenkinsfile" 
                  code={`pipeline {\n    agent any\n\n    environment {\n        // Method A: Exposed globally across the pipeline\n        API_KEY = credentials('my-api-key')\n    }\n\n    stages {\n        stage('Use Secret') {\n            steps {\n                // Method B: Isolated to a single steps block (recommended)\n                withCredentials([string(credentialsId: 'my-api-key',\n                                        variable: 'API_SECRET')]) {\n                    sh 'echo "Key length: \${#API_SECRET}"'\n                    // Jenkins will automatically mask the secret with **** in build logs\n                }\n            }\n        }\n    }\n}`} 
                />

                <ErrorCard 
                  error='❌ Error: "No credentials with id &apos;xxx&apos; found"'
                  meaning="The credentials store lacks an entry matching the requested ID."
                  fix="Verify the credentials ID is defined, matches case sensitivity, and that the credentials scope is set to Global (System credentials are restricted)."
                />

                <Quiz 
                  question="Why does Jenkins mask credential values in the Console Output?"
                  answer="Build logs are accessible to all users with permission to view the job. Masking credentials with asterisks (****) prevents casual leaks and secures tokens during execution output."
                />
              </div>
            );
          case "lab10":
            return (
              <div>
                <h2>Lab 10: Cron Scheduling & Build Triggers</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Automate build execution timing</p>

                <ConceptBox title="Automating Executions">
                  <p style={{ margin: 0 }}>
                    Build triggers define when a job gets scheduled. Jenkins supports manual runs, webhooks, upstream project completion, polling, and standard chron schedules.
                  </p>
                </ConceptBox>

                <h3>Cron Pattern Syntax</h3>
                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`# ┌─── minute (0-59)
# │ ┌─── hour (0-23)
# │ │ ┌─── day of month (1-31)
# │ │ │ ┌─── month (1-12)
# │ │ │ │ ┌─── day of week (0-7)
# * * * * *

H/15 * * * *     # Execute every 15 minutes
H 2 * * *        # Execute once daily between 2:00 AM and 2:59 AM
H 2 * * 1-5      # Execute weekdays at 2:00 AM
@midnight         # Execute once daily at midnight`}
                </pre>

                <h3>Integrating Triggers in Jenkinsfile</h3>
                <CodeBlock 
                  title="Jenkinsfile" 
                  code={`pipeline {\n    agent any\n    triggers {\n        pollSCM('H/5 * * * *')  // Check Git for changes every 5 min\n        cron('H 2 * * *')       // Run build daily at 2:00 AM\n    }\n    stages {\n        stage('Build') {\n            steps {\n                checkout scm\n                sh 'npm test'\n            }\n        }\n    }\n}`} 
                />

                <TipBox>
                  Using <code>H</code> (Hash) instead of absolute numbers (e.g. <code>0 2 * * *</code>) load balances the controller. Jenkins hashes the job name to distribute starting times evenly, preventing 100 jobs from firing concurrently at 2:00 AM.
                </TipBox>
              </div>
            );
          case "lab11":
            return (
              <div>
                <h2>Lab 11: Artifacts & Test Reports</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Save outputs and publish unit tests</p>

                <ConceptBox title="What are Artifacts?">
                  <p style={{ margin: 0 }}>
                    Artifacts are files produced during compilation or testing that you want to preserve (binaries, zip archives, XML reports). If not archived, they are erased from workspace directories when clean-up runs.
                  </p>
                </ConceptBox>

                <h3>Pipeline Archiving Definition</h3>
                <CodeBlock 
                  title="Jenkinsfile" 
                  code={`pipeline {\n    agent any\n    options {\n        buildDiscarder(logRotator(\n            numToKeepStr: '10',\n            artifactNumToKeepStr: '5'))\n    }\n    stages {\n        stage('Test') {\n            steps { sh 'npm test' }\n            post {\n                always {\n                    // Read unit test results and create dashboard charts\n                    junit testResults: 'reports/junit.xml', allowEmptyResults: true\n                    // Save test outputs for user download\n                    archiveArtifacts artifacts: 'reports/**', fingerprint: true\n                }\n            }\n        }\n    }\n    post { always { cleanWs() } }\n}`} 
                />

                <h3>Archiving Directives</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Directive</th>
                      <th>Behavior</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>junit</code></td>
                      <td>Parses standard XML output and generates historical test reports</td>
                    </tr>
                    <tr>
                      <td><code>archiveArtifacts</code></td>
                      <td>Stores files inside the master controller database for download</td>
                    </tr>
                    <tr>
                      <td><code>buildDiscarder</code></td>
                      <td>Limits maximum build counts to save disk space</td>
                    </tr>
                  </tbody>
                </table>

                <ErrorCard 
                  error='❌ Error: "No test report files were found"'
                  meaning="The test framework failed to write reports, or the workspace path is wrong."
                  fix="Verify paths are matching report outputs. Add allowEmptyResults: true in the junit call to prevent false build crashes."
                />
              </div>
            );
          case "lab12":
            return (
              <div>
                <h2>Lab 12: Capstone Project — Complete CI Pipeline</h2>
                <p className="guide-subtitle">Stage 1 — Capstone Project | Combining all concepts</p>

                <p>We will configure a complete CI pipeline for a REST API using express. The flow checkout scm, installs packages, runs linting, tests code, saves metrics, and deploys based on parameters.</p>

                <h3>1. Create the repository files</h3>
                <p>In WSL, create a project folder named <code>capstone-api</code> and populate files:</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`mkdir capstone-api && cd capstone-api\ntouch package.json index.js Jenkinsfile`} 
                />

                <p>Add dependencies to <code>package.json</code>:</p>
                <CodeBlock 
                  title="package.json" 
                  code={`{\n  "name": "capstone-api",\n  "version": "1.0.0",\n  "scripts": {\n    "start": "node index.js",\n    "test": "node test.js",\n    "lint": "echo 'Linting passed!'"\n  },\n  "dependencies": { "express": "^4.18.2" }\n}`} 
                />

                <h3>2. The Complete Capstone Jenkinsfile</h3>
                <CodeBlock 
                  title="Jenkinsfile" 
                  code={`pipeline {\n    agent any\n    parameters {\n        choice(name: 'ENVIRONMENT', choices: ['dev', 'staging', 'production'])\n        booleanParam(name: 'SKIP_TESTS', defaultValue: false)\n    }\n    options {\n        buildDiscarder(logRotator(numToKeepStr: '10'))\n        timeout(time: 15, unit: 'MINUTES')\n        timestamps()\n    }\n    environment {\n        APP_NAME = 'capstone-api'\n        VERSION = "\${env.BUILD_NUMBER}"\n    }\n    stages {\n        stage('📥 Checkout') {\n            steps { checkout scm }\n        }\n        stage('📦 Install') {\n            steps { sh 'npm install 2>/dev/null || true' }\n        }\n        stage('🔍 Lint') {\n            steps { sh 'npm run lint' }\n        }\n        stage('🧪 Test') {\n            when { expression { !params.SKIP_TESTS } }\n            steps { sh 'npm test' }\n            post {\n                always {\n                    junit testResults: 'reports/junit.xml', allowEmptyResults: true\n                    archiveArtifacts artifacts: 'reports/**', allowEmptyArchive: true\n                }\n            }\n        }\n        stage('🏗️ Build') {\n            steps {\n                sh "echo '\${APP_NAME} v\${VERSION}' > build-info.txt"\n                archiveArtifacts artifacts: 'build-info.txt'\n            }\n        }\n        stage('🚀 Deploy') {\n            steps {\n                script {\n                    if (params.ENVIRONMENT == 'production') {\n                        echo '🚨 Production deploy queued — approval required'\n                    } else {\n                        echo "Deploying to \${params.ENVIRONMENT}"\n                    }\n                }\n            }\n        }\n    }\n    post {\n        success { echo "✅ \${APP_NAME} v\${VERSION} successfully deployed to \${params.ENVIRONMENT}" }\n        failure { echo "💥 Pipeline FAILED" }\n        always  { cleanWs() }\n    }\n}`} 
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 1 Stage Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s1-install" />
                      <label htmlFor="jenkins-s1-install">Install Jenkins via Docker containers with volume attachments</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s1-ui" />
                      <label htmlFor="jenkins-s1-ui">Navigate the UI dashboard and debug using build Console Output</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s1-free" />
                      <label htmlFor="jenkins-s1-free">Configure freestyle projects to pull code and run test checks</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s1-webhook" />
                      <label htmlFor="jenkins-s1-webhook">Securely expose localhost using ngrok tunnels to route Git webhooks</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s1-notify" />
                      <label htmlFor="jenkins-s1-notify">Configure Slack and Email alerts to notify developers of failures</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s1-jfile" />
                      <label htmlFor="jenkins-s1-jfile">Write declarative Jenkinsfiles to manage pipelines in code</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s1-params" />
                      <label htmlFor="jenkins-s1-params">Parameterize builds to select run targets dynamically</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s1-cred" />
                      <label htmlFor="jenkins-s1-cred">Expose keys using the credentials binding store</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s1-arch" />
                      <label htmlFor="jenkins-s1-arch">Archive build artifacts and generate visual test dashboards</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab13":
            return (
              <div>
                <h2>Lab 13: Pipeline Deep Dive</h2>
                <p className="guide-subtitle">Stage 2 — Pipelines | Master the Declarative syntax</p>

                <ConceptBox title="The Complete Pipeline Skeleton">
                  <p style={{ margin: 0 }}>
                    Every declarative pipeline follows a standard structural layout. Order is strictly enforced: agent configuration first, then global options, environment mappings, triggers, stages containing steps, and finally post execution blocks.
                  </p>
                </ConceptBox>

                <h3>Standard Declarative Layout</h3>
                <CodeBlock 
                  title="Jenkinsfile" 
                  code={`pipeline {\n    agent any                    // Location of execution\n    options { timestamps() }     // Global pipeline configurations\n    environment { APP_NAME = 'myapp' } // Global variables\n    parameters { string(name: 'VERSION', defaultValue: '1.0') }\n    triggers { cron('H 2 * * *') }\n\n    stages {\n        stage('Build') {\n            when { branch 'main' }       // Conditional check\n            environment { MODE = 'prod' } // Stage-scoped variables\n            steps { sh 'npm run build' }\n        }\n    }\n    post {\n        success { echo 'Pipeline Succeeded!' }\n        failure { echo 'Pipeline Failed!' }\n        always  { cleanWs() } // Workspace cleanup\n    }\n}`} 
                />

                <h3>Agent Types</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Syntax</th>
                      <th>Interpretation</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>agent any</code></td>
                      <td>Runs the build on any available worker agent</td>
                    </tr>
                    <tr>
                      <td><code>agent &#123; label &apos;linux&apos; &#125;</code></td>
                      <td>Runs strictly on an agent labeled with the matching tag</td>
                    </tr>
                    <tr>
                      <td><code>agent &apos;none&apos;</code></td>
                      <td>Assigns no global executor; individual stages must declare their agents</td>
                    </tr>
                    <tr>
                      <td><code>agent &#123; docker &#123; image &apos;node:18&apos; &#125; &#125;</code></td>
                      <td>Runs all steps dynamically inside the specified Docker container</td>
                    </tr>
                  </tbody>
                </table>

                <h3>Conditional Stage Checks (when)</h3>
                <CodeBlock 
                  title="Jenkinsfile Snippet" 
                  code={`stage('Deploy Prod') {\n    when {\n        allOf {\n            branch 'main'\n            expression { return params.ENVIRONMENT == 'production' }\n        }\n    }\n    steps { echo 'Deploying...' }\n}`} 
                />

                <h3>Built-In Environment Variables</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Variable</th>
                      <th>Output Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>BUILD_NUMBER</code></td>
                      <td><code>42</code></td>
                    </tr>
                    <tr>
                      <td><code>GIT_COMMIT</code></td>
                      <td><code>a1b2c3d4...</code></td>
                    </tr>
                    <tr>
                      <td><code>WORKSPACE</code></td>
                      <td><code>/var/jenkins_home/workspace/job-name</code></td>
                    </tr>
                    <tr>
                      <td><code>BUILD_URL</code></td>
                      <td><code>http://localhost:8080/job/job-name/42/</code></td>
                    </tr>
                  </tbody>
                </table>

                <ErrorCard 
                  error='❌ Error: Groovy code syntax crashed in steps'
                  meaning="Groovy script logic (like if statements or variables) is not allowed directly inside a steps block without script wrapping."
                  fix="Wrap Groovy logic blocks inside a script directive: steps { script { if (x) { sh 'echo ok' } } }"
                />
              </div>
            );
          case "lab14":
            return (
              <div>
                <h2>Lab 14: Multi-Stage Pipelines</h2>
                <p className="guide-subtitle">Stage 2 — Pipelines | Production-realistic workflows and gates</p>

                <p>We will construct a multi-stage pipeline utilizing conditional triggers, linting steps, test reports, and an interactive manual approval block before executing production deployments.</p>

                <h3>Production Pipeline definition</h3>
                <CodeBlock 
                  title="Jenkinsfile" 
                  code={`pipeline {\n    agent any\n    options { timestamps(); timeout(time: 30, unit: 'MINUTES') }\n    stages {\n        stage('🔍 Pre-flight') {\n            steps {\n                checkout scm\n                sh 'echo "Commit Hash: \$(git rev-parse --short HEAD)"'\n            }\n        }\n        stage('📦 Install')   { steps { sh 'npm ci || npm install' } }\n        stage('🔍 Lint')      { steps { sh 'npm run lint || true' } }\n        stage('🧪 Test')      {\n            steps { sh 'npm test' }\n            post { always { junit '**/junit.xml' } }\n        }\n        stage('🏗️ Build')     { steps { sh 'npm run build || true' } }\n        stage('🟢 Deploy Dev') {\n            when { anyOf { branch 'develop'; branch 'main' } }\n            steps { echo 'Deploying to Dev environment...' }\n        }\n        stage('🟡 Deploy Staging') {\n            when { branch 'main' }\n            steps { echo 'Deploying to Staging environment...' }\n        }\n        stage('✋ Approval') {\n            when { branch 'main' }\n            steps {\n                timeout(time: 24, unit: 'HOURS') {\n                    input message: 'Deploy changes to Production?', ok: 'Deploy', submitter: 'admin'\n                }\n            }\n        }\n        stage('🚀 Deploy Prod') {\n            when { branch 'main' }\n            steps { echo '🚨 EXECUTING PRODUCTION DEPLOYMENT!' }\n        }\n    }\n    post {\n        success { echo '✅ Pipeline run completed successfully' }\n        failure { echo '❌ Pipeline run failed at stage: \${env.STAGE_NAME}' }\n        always  { cleanWs() }\n    }\n}`} 
                />

                <ErrorCard 
                  error="❌ Error: Interactive input step hangs and consumes executor resources"
                  meaning="An input step pauses pipeline execution waiting for human input. If the stage is run on an active agent executor, that build slot is locked up and unavailable for other builds."
                  fix="Configure agent none at the global level and declare agents inside individual work stages. The Approval stage will run without assigning an agent, freeing up executor resources."
                />
              </div>
            );
          case "lab15":
            return (
              <div>
                <h2>Lab 15: Parallel Stages</h2>
                <p className="guide-subtitle">Stage 2 — Pipelines | Accelerate builds via concurrent tasks</p>

                <ConceptBox title="Why Parallel?">
                  <p style={{ margin: 0 }}>
                    Executing Linting (30s) followed by Tests (2m) and Auditing (1m) takes 3.5 minutes sequentially. Running these tasks concurrently inside a <code>parallel</code> block matches the time of the slowest stage (2 minutes), reducing feedback loops.
                  </p>
                </ConceptBox>

                <h3>Concurrent Execution Syntax</h3>
                <CodeBlock 
                  title="Jenkinsfile" 
                  code={`pipeline {\n    agent any\n    stages {\n        stage('Checkout') { steps { checkout scm } }\n        stage('Quality Assurances') {\n            failFast true  // Instantly abort other concurrent steps if one fails\n            parallel {\n                stage('Lint')      { steps { sh 'npm run lint' } }\n                stage('Unit Tests') { steps { sh 'npm test' } }\n                stage('Security')   { steps { sh 'npm audit || true' } }\n            }\n        }\n        stage('Build') { steps { sh 'npm run build' } }\n    }\n}`} 
                />

                <h3>Stashing files across concurrent nodes</h3>
                <p>Use <code>stash</code> to preserve files from one workspace and <code>unstash</code> to restore them inside concurrent environments:</p>
                <CodeBlock 
                  title="Jenkinsfile Snippet" 
                  code={`stage('Checkout') {\n    steps {\n        checkout scm\n        stash name: 'source', includes: '**/*'\n    }\n}\nstage('Parallel Tests') {\n    parallel {\n        stage('Test Node 18') {\n            agent { docker { image 'node:18' } }\n            steps { unstash 'source'; sh 'npm test' }\n        }\n        stage('Test Node 20') {\n            agent { docker { image 'node:20' } }\n            steps { unstash 'source'; sh 'npm test' }\n        }\n    }\n}`} 
                />

                <ErrorCard 
                  error="❌ Error: Parallel stages fail intermittently due to file conflicts"
                  meaning="Race condition occurring when multiple parallel threads try to write to the exact same workspace file location."
                  fix="Isolate parallel workspaces using the stash/unstash mechanisms, wrap executions inside independent dir() blocks, or run each step on separate agent nodes."
                />
              </div>
            );
          case "lab16":
            return (
              <div>
                <h2>Lab 16: Shared Libraries</h2>
                <p className="guide-subtitle">Stage 2 — Pipelines | Standardize and reuse build logic</p>

                <ConceptBox title="The Code Duplication Problem">
                  <p style={{ margin: 0 }}>
                    In a microservice environment with dozens of repositories, copying an 80-line Jenkinsfile across each repo is highly redundant. If a deployment workflow changes, you must edit every single repository. Shared Libraries centralize common logic inside a single Git repository.
                  </p>
                </ConceptBox>

                <h3>Directory Structure</h3>
                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`jenkins-shared-library/
├── vars/
│   ├── nodePipeline.groovy    ← Main entry point called by jobs
│   ├── deployApp.groovy       ← Reusable deploy script step
│   └── notifySlack.groovy     ← Reusable notification script
└── src/                        ← Advanced helper classes (optional)`}
                </pre>

                <h3>Reusable Definition: vars/nodePipeline.groovy</h3>
                <CodeBlock 
                  title="vars/nodePipeline.groovy" 
                  code={`def call(Map config) {\n    def appName = config.appName ?: 'app'\n    pipeline {\n        agent any\n        stages {\n            stage('Install') { steps { sh 'npm ci' } }\n            stage('Test')    { steps { sh 'npm test' } }\n            stage('Build')   { steps { sh 'npm run build || true' } }\n            stage('Deploy')  { steps { echo "Deploying application \${appName}..." } }\n        }\n        post { always { cleanWs() } }\n    }\n}`} 
                />

                <h3>Using the library in a Jenkinsfile</h3>
                <p>Register the library under Manage Jenkins → System → Global Pipeline Libraries. Then import and call it in three lines:</p>
                <CodeBlock 
                  title="Jenkinsfile" 
                  code={`@Library('my-shared-lib') _\nnodePipeline(appName: 'my-service')`} 
                />

                <ErrorCard 
                  error="❌ Error: No such library &apos;my-shared-lib&apos; found"
                  meaning="Jenkins failed to resolve the imported global library name."
                  fix="Verify library configurations in Manage Jenkins under Global Pipeline Libraries. Confirm the repository name, target version branch (main), and SCM credentials are correct."
                />
              </div>
            );
          case "lab17":
            return (
              <div>
                <h2>Lab 17: Full-Stack Project</h2>
                <p className="guide-subtitle">Stage 2 — Real-World Project | Parallel CI for a Monorepo App</p>

                <p>We will construct a monorepo pipeline containing both frontend (React) and backend (Express) applications, executing testing, linting, and compilation in parallel.</p>

                <h3>Monorepo directory structure</h3>
                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`real-estate-app/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── package.json
│   └── src/App.js
└── Jenkinsfile`}
                </pre>

                <ErrorCard 
                  error="🔥 Real-World Problem: NPM Registry rate limiting (Too Many Requests)"
                  meaning="Running npm install concurrently across 4+ parallel pipelines triggers request limits on the public NPM registry, crashing the build."
                  fix="Run npm install once in a dedicated setup stage before parallel stages. Use Jenkins stash to package node_modules, and unstash them inside parallel test and lint stages."
                />

                <h3>Monorepo Jenkinsfile</h3>
                <CodeBlock 
                  title="Jenkinsfile" 
                  code={`pipeline {\n    agent any\n    parameters {\n        choice(name: 'DEPLOY_ENV', choices: ['dev', 'staging', 'production'])\n    }\n    stages {\n        stage('Checkout') { steps { checkout scm } }\n        stage('Quality') {\n            parallel {\n                stage('Backend Lint')  { steps { dir('backend')  { sh 'npm run lint || true' } } }\n                stage('Frontend Lint') { steps { dir('frontend') { sh 'npm run lint || true' } } }\n            }\n        }\n        stage('Tests') {\n            parallel {\n                stage('Backend Tests') {\n                    steps { dir('backend') { sh 'npm test || true' } }\n                    post { always { junit 'backend/reports/junit.xml' } }\n                }\n                stage('Frontend Tests') {\n                    steps { dir('frontend') { sh 'npm test || true' } }\n                    post { always { junit 'frontend/reports/junit.xml' } }\n                }\n            }\n        }\n        stage('Build') {\n            parallel {\n                stage('Build Backend')  { steps { dir('backend') { sh 'echo "Backend Compiled"' } } }\n                stage('Build Frontend') { \n                    steps {\n                        dir('frontend') {\n                            sh 'npm run build || true'\n                            archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true\n                        }\n                    }\n                }\n            }\n        }\n        stage('Deploy') {\n            steps {\n                script {\n                    if (params.DEPLOY_ENV == 'production') {\n                        input 'Confirm production deploy?'\n                    }\n                }\n                echo "Successfully deployed to \${params.DEPLOY_ENV}"\n            }\n        }\n    }\n    post { always { cleanWs() } }\n}`} 
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 2 Stage Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s2-deep" />
                      <label htmlFor="jenkins-s2-deep">Understand the syntax layout structure of Declarative pipelines</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s2-when" />
                      <label htmlFor="jenkins-s2-when">Apply the when directive to trigger stages under specific conditions</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s2-par" />
                      <label htmlFor="jenkins-s2-par">Execute concurrent stages using parallel blocks to minimize build times</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s2-stash" />
                      <label htmlFor="jenkins-s2-stash">Use stash and unstash to transport files across worker nodes</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s2-lib" />
                      <label htmlFor="jenkins-s2-lib">Consolidate redundant scripts using global Jenkins Shared Libraries</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="jenkins-s2-cap" />
                      <label htmlFor="jenkins-s2-cap">Construct a parallelized monorepo build, test, and deploy project</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab18":
            return (
              <div>
                <h2>Lab 18: Docker Agents</h2>
                <p className="guide-subtitle">Stage 3 — Infrastructure | Fresh container for every build</p>

                <ConceptBox title="The Problem">
                  <p style={{ margin: 0 }}>
                    Everything runs on the Jenkins server itself. If builds need different tool versions, they conflict. A misbehaving build can crash Jenkins. Docker agents solve this — each build runs in a fresh, isolated container.
                  </p>
                </ConceptBox>

                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`Jenkins Controller → spins up Container 1 (node:18) for Job A
                   → spins up Container 2 (python:3.11) for Job B
                   → containers deleted after build = always clean`}
                </pre>

                <h3>Setup Steps</h3>
                <ol style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                  <li style={{ marginBottom: "8px" }}>Install the <strong>"Docker Pipeline"</strong> plugin.</li>
                  <li style={{ marginBottom: "8px" }}>Ensure Docker socket is mounted: <code>-v /var/run/docker.sock:/var/run/docker.sock</code></li>
                  <li>Install Docker CLI inside Jenkins:</li>
                </ol>
                <CodeBlock title="WSL Terminal" code={`docker exec -u root jenkins bash -c "apt-get update && apt-get install -y docker.io"`} />

                <h3>Jenkinsfile with Docker Agents</h3>
                <CodeBlock
                  title="Jenkinsfile"
                  code={`pipeline {\n    agent none  // Each stage picks its own agent\n    stages {\n        stage('Test Node 18') {\n            agent { docker { image 'node:18-alpine'; args '-u root' } }\n            steps { checkout scm; sh 'node --version && npm test' }\n        }\n        stage('Test Node 20') {\n            agent { docker { image 'node:20-alpine'; args '-u root' } }\n            steps { checkout scm; sh 'node --version && npm test' }\n        }\n    }\n}\n\n// Custom Dockerfile as agent:\n// agent { dockerfile { filename 'Dockerfile.ci' } }`}
                />

                <TipBox>
                  Use <code>node:18-alpine</code> (50MB) instead of <code>node:18</code> (900MB) for Docker agents — faster pull = faster builds.
                </TipBox>

                <ErrorCard
                  error='❌ Error: "permission denied on /var/run/docker.sock"'
                  meaning="The Jenkins process does not have permission to communicate with the Docker daemon."
                  fix={`Quick fix — run Jenkins as root:\n  docker run ... -u root jenkins/jenkins:lts\n\nProper fix — add jenkins user to docker group:\n  docker exec -u root jenkins bash -c "usermod -aG docker jenkins"\n  docker restart jenkins`}
                />
              </div>
            );
          case "lab19":
            return (
              <div>
                <h2>Lab 19: Jenkins Configuration as Code (JCasC)</h2>
                <p className="guide-subtitle">Stage 3 — Infrastructure | Entire Jenkins setup in YAML</p>

                <ConceptBox title="The Problem">
                  <p style={{ margin: 0 }}>
                    You configured Jenkins through the UI. If Jenkins dies, you must click through ALL settings again. JCasC defines everything in a YAML file — start fresh Jenkins, point at YAML, done.
                  </p>
                </ConceptBox>

                <h3>jenkins-casc.yaml</h3>
                <CodeBlock
                  title="jenkins-casc.yaml"
                  code={`jenkins:\n  systemMessage: "Configured by JCasC 🚀"\n  numExecutors: 4\n  securityRealm:\n    local:\n      allowsSignup: false\n      users:\n        - id: "admin"\n          password: "\${JENKINS_ADMIN_PASSWORD:-admin123}"\n  authorizationStrategy:\n    loggedInUsersCanDoAnything:\n      allowAnonymousRead: false\n\ncredentials:\n  system:\n    domainCredentials:\n      - credentials:\n          - string:\n              id: "slack-webhook"\n              secret: "\${SLACK_WEBHOOK_URL}"\n\nunclassified:\n  location:\n    url: "http://localhost:8080/"`}
                />

                <TipBox>
                  <code>${"{VARIABLE}"}</code> pulls from environment variables — secrets never appear in the YAML file. Pass them at runtime: <code>-e JENKINS_ADMIN_PASSWORD=secret</code>
                </TipBox>

                <ErrorCard
                  error="❌ Error: YAML indentation error"
                  meaning="JCasC is very strict about YAML formatting."
                  fix="Use spaces only (never tabs). Validate your YAML at yamlchecker.com. Use 2 spaces per indent level consistently."
                />
              </div>
            );
          case "lab20":
            return (
              <div>
                <h2>Lab 20: RBAC &amp; Security</h2>
                <p className="guide-subtitle">Stage 3 — Infrastructure | Role-Based Access Control</p>

                <ConceptBox title="Why RBAC?">
                  <p style={{ margin: 0 }}>
                    In production, not everyone should have admin access. Frontend devs should only see frontend jobs. RBAC lets you control who can see, build, and configure which jobs.
                  </p>
                </ConceptBox>

                <h3>Setup Steps</h3>
                <ol style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                  <li style={{ marginBottom: "8px" }}>Install <strong>"Role-based Authorization Strategy"</strong> plugin.</li>
                  <li style={{ marginBottom: "8px" }}>Go to Manage Jenkins → Security → Authorization → select <strong>"Role-Based Strategy"</strong>.</li>
                  <li>Go to Manage and Assign Roles → Create the following roles:</li>
                </ol>

                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Pattern</th>
                      <th>Permissions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td><code>admin</code></td><td>Global</td><td>Everything</td></tr>
                    <tr><td><code>developer</code></td><td>Global</td><td>Read, Build, Workspace</td></tr>
                    <tr><td><code>frontend-dev</code></td><td><code>frontend-.*</code></td><td>Build, Read, Configure</td></tr>
                    <tr><td><code>backend-dev</code></td><td><code>backend-.*</code></td><td>Build, Read, Configure</td></tr>
                  </tbody>
                </table>

                <ErrorCard
                  error="🚨 EMERGENCY: Locked out after enabling RBAC"
                  meaning="Misconfigured RBAC can lock everyone — including admins — out of Jenkins."
                  fix={`Disable security via Docker:\n  docker exec jenkins bash -c "sed -i 's|useSecurity>true|useSecurity>false|' /var/jenkins_home/config.xml"\n  docker restart jenkins\n\nThis disables security. Log in, reconfigure RBAC properly, assign admin role FIRST.`}
                />
              </div>
            );
          case "lab21":
            return (
              <div>
                <h2>Lab 21: Dockerized Jenkins Project</h2>
                <p className="guide-subtitle">Stage 3 — Real-World Project | Full Jenkins setup with docker-compose</p>

                <ErrorCard
                  error='🔥 Real-World Problem: "The Intern Rebooted the Server!"'
                  meaning="Jenkins was rebooted and all users, jobs, and plugins were completely gone."
                  fix="This happens when you run Jenkins in Docker WITHOUT mounting a persistent volume. This lab solves that permanently by mounting jenkins-data. Even if the container is destroyed, the volume survives."
                />

                <h3>docker-compose.yml</h3>
                <TipBox><strong>📄 Where to put this:</strong> Create a new file named <code>docker-compose.yml</code> in an empty folder on your machine.</TipBox>
                <CodeBlock
                  title="docker-compose.yml"
                  code={`version: '3.8'\nservices:\n  jenkins:\n    build: .\n    ports: ["8080:8080", "50000:50000"]\n    volumes:\n      - jenkins-data:/var/jenkins_home\n      - /var/run/docker.sock:/var/run/docker.sock\n    environment:\n      - CASC_JENKINS_CONFIG=/var/jenkins_home/casc.yaml\n      - JENKINS_ADMIN_PASSWORD=\${JENKINS_ADMIN_PASSWORD:-admin}\nvolumes:\n  jenkins-data:`}
                />

                <h3>Dockerfile</h3>
                <TipBox><strong>📄 Where to put this:</strong> Create a <code>Dockerfile</code> (no extension) in the SAME folder as your docker-compose.yml.</TipBox>
                <CodeBlock
                  title="Dockerfile"
                  code={`FROM jenkins/jenkins:lts\nENV JAVA_OPTS="-Djenkins.install.runSetupWizard=false"\nCOPY plugins.txt /usr/share/jenkins/ref/plugins.txt\nRUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt\nCOPY casc.yaml /var/jenkins_home/casc.yaml\nUSER root\nRUN apt-get update && apt-get install -y docker.io\nUSER jenkins`}
                />

                <h3>plugins.txt</h3>
                <CodeBlock
                  title="plugins.txt"
                  code={`configuration-as-code\ngit\nworkflow-aggregator\ndocker-workflow\nslack\nrole-strategy\nnodejs\njunit\nws-cleanup\ntimestamper`}
                />

                <CodeBlock title="Run it" code={`docker-compose up -d --build\n# Open http://localhost:8080 — fully configured!`} />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 3 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="jenkins-s3-docker" /><label htmlFor="jenkins-s3-docker">Run builds inside isolated Docker agent containers</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="jenkins-s3-casc" /><label htmlFor="jenkins-s3-casc">Define Jenkins configuration in YAML using JCasC</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="jenkins-s3-rbac" /><label htmlFor="jenkins-s3-rbac">Set up RBAC for team-based access control</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="jenkins-s3-compose" /><label htmlFor="jenkins-s3-compose">Build a fully automated, persistent Jenkins with docker-compose</label></li>
                  </ul>
                </div>
              </div>
            );
          case "lab22":
            return (
              <div>
                <h2>Lab 22: Multibranch Pipelines</h2>
                <p className="guide-subtitle">Stage 4 — Advanced | Automatic pipeline per branch</p>

                <ConceptBox title="What is Multibranch?">
                  <p style={{ margin: 0 }}>
                    Instead of creating one job per branch, a Multibranch Pipeline scans your repo and automatically creates a pipeline for EVERY branch that has a Jenkinsfile. New branch? New pipeline. Delete branch? Pipeline gone.
                  </p>
                </ConceptBox>

                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`Repository → main (Jenkinsfile)         → Pipeline auto-created
           → feature/login (Jenkinsfile) → Pipeline auto-created
           → hotfix/bug (Jenkinsfile)    → Pipeline auto-created
           → docs (no Jenkinsfile)       → Ignored`}
                </pre>

                <h3>Create a Multibranch Job</h3>
                <ol style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                  <li style={{ marginBottom: "8px" }}>Dashboard → New Item → Name it <code>my-multibranch</code> → select <strong>Multibranch Pipeline</strong>.</li>
                  <li style={{ marginBottom: "8px" }}>Branch Sources → Add → Git → enter your Repo URL.</li>
                  <li style={{ marginBottom: "8px" }}>Set Scan Interval to 1 minute (for testing).</li>
                  <li>Click Save — Jenkins scans and auto-creates pipelines for each branch.</li>
                </ol>

                <h3>Branch-Aware Jenkinsfile</h3>
                <CodeBlock
                  title="Jenkinsfile"
                  code={`pipeline {\n    agent any\n    stages {\n        stage('Test')  { steps { sh 'npm test' } }\n        stage('Build') { steps { sh 'npm run build' } }\n        stage('Deploy Dev') {\n            when { branch 'develop' }\n            steps { echo 'Deploying to dev...' }\n        }\n        stage('Deploy Prod') {\n            when { branch 'main' }\n            steps {\n                input 'Deploy to production?'\n                echo '🚀 Production deploy!'\n            }\n        }\n    }\n}`}
                />

                <ErrorCard
                  error="❌ Error: Branches not discovered"
                  meaning="Jenkins did not find branches in the repository scan."
                  fix="Click 'Scan Multibranch Pipeline Now' to trigger a manual scan. Check the scan log for API errors or rate limits."
                />
              </div>
            );
          case "lab23":
            return (
              <div>
                <h2>Lab 23: GitOps Workflow</h2>
                <p className="guide-subtitle">Stage 4 — Advanced | Git as the single source of truth for deployments</p>

                <ConceptBox title="What is GitOps?">
                  <p style={{ margin: 0 }}>
                    <strong>Traditional:</strong> Developer runs deploy command from laptop.<br />
                    <strong>GitOps:</strong> Merge to main = automatic deploy. The Git repo IS the deployment state. Want to rollback? Revert the commit.
                  </p>
                </ConceptBox>

                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`Code Repo → Jenkins builds + tests → builds image → updates Config Repo
Config Repo change detected → Deploy tool applies changes to server`}
                </pre>

                <h3>GitOps Jenkinsfile</h3>
                <TipBox><strong>📄 Where to put this:</strong> Save this inside your application repository&apos;s <code>Jenkinsfile</code>.</TipBox>
                <CodeBlock
                  title="Jenkinsfile"
                  code={`pipeline {\n    agent any\n    environment {\n        IMAGE = "myapp:\${env.BUILD_NUMBER}"\n        CONFIG_REPO = "https://github.com/user/deploy-config.git"\n    }\n    stages {\n        stage('Test')         { steps { sh 'npm test' } }\n        stage('Build Image') {\n            steps {\n                sh "docker build -t \${IMAGE} ."\n                echo "Built \${IMAGE}"\n            }\n        }\n        stage('Update Config Repo') {\n            when { branch 'main' }\n            steps {\n                withCredentials([usernamePassword(\n                    credentialsId: 'github-token',\n                    usernameVariable: 'GIT_USER',\n                    passwordVariable: 'GIT_TOKEN')]) {\n                    sh '''\n                        git clone \${CONFIG_REPO} config\n                        cd config\n                        sed -i "s|image:.*|image: \${IMAGE}|" deploy.yaml\n                        git add . && git commit -m "deploy: \${IMAGE}"\n                        git push\n                    '''\n                }\n            }\n        }\n    }\n}`}
                />

                <TipBox>
                  <strong>Key principle:</strong> Never SSH into servers. Never run deploy from your laptop. Everything through Git commits that Jenkins processes.
                </TipBox>
              </div>
            );
          case "lab24":
            return (
              <div>
                <h2>Lab 24: Blue/Green Deployment</h2>
                <p className="guide-subtitle">Stage 4 — Advanced | Zero-downtime deployments</p>

                <ConceptBox title="What is Blue/Green?">
                  <p style={{ margin: 0 }}>
                    Run TWO copies of your app: <strong>Blue</strong> (current live) and <strong>Green</strong> (new version). Test Green. When ready, switch traffic from Blue → Green. If Green breaks, switch back instantly. Zero downtime.
                  </p>
                </ConceptBox>

                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`Before:   Users → 🔵 Blue (v1.0) ← LIVE
Deploy:   Users → 🔵 Blue (v1.0) ← LIVE    🟢 Green (v2.0) ← Testing
Switch:   Users → 🟢 Green (v2.0) ← LIVE   🔵 Blue (v1.0) ← Standby
Rollback: Users → 🔵 Blue (v1.0) ← LIVE    🟢 Green (v2.0) ← OFF`}
                </pre>

                <h3>Jenkinsfile with Blue/Green</h3>
                <TipBox><strong>📄 Where to put this:</strong> Save this inside your repository&apos;s <code>Jenkinsfile</code>.</TipBox>
                <CodeBlock
                  title="Jenkinsfile"
                  code={`pipeline {\n    agent any\n    environment { VERSION = "\${env.BUILD_NUMBER}" }\n    stages {\n        stage('Build') {\n            steps { sh "docker build -t myapp:\${VERSION} ." }\n        }\n        stage('Deploy Green') {\n            steps {\n                sh "docker run -d --name green -p 8081:3000 myapp:\${VERSION}"\n                echo 'Green running on port 8081'\n            }\n        }\n        stage('Health Check') {\n            steps {\n                script {\n                    def healthy = false\n                    for (int i = 0; i < 10; i++) {\n                        def code = sh(script: "curl -s -o /dev/null -w '%{http_code}' http://localhost:8081/health", returnStdout: true).trim()\n                        if (code == '200') { healthy = true; break }\n                        sleep 3\n                    }\n                    if (!healthy) { error('Health check failed!') }\n                }\n            }\n        }\n        stage('Switch Traffic') {\n            steps {\n                sh '''\n                    docker stop blue 2>/dev/null || true\n                    docker rm blue 2>/dev/null || true\n                    docker rename green blue\n                '''\n                echo '✅ Traffic switched to new version'\n            }\n        }\n    }\n    post {\n        failure {\n            sh 'docker stop green 2>/dev/null; docker rm green 2>/dev/null'\n            echo '⚠️ Rollback: Green removed, Blue still serving'\n        }\n    }\n}`}
                />
              </div>
            );
          case "lab25":
            return (
              <div>
                <h2>Lab 25: Compliance Gates</h2>
                <p className="guide-subtitle">Stage 4 — Advanced | Enforce quality and security before deploy</p>

                <ConceptBox title="What are Compliance Gates?">
                  <p style={{ margin: 0 }}>
                    Automated checks that BLOCK deployment if standards aren&apos;t met. Code coverage too low? Blocked. Security vulnerability found? Blocked. No manual approval? Blocked. This protects production.
                  </p>
                </ConceptBox>

                <CodeBlock
                  title="Jenkinsfile"
                  code={`pipeline {\n    agent any\n    stages {\n        stage('Test') {\n            steps { sh 'npm test -- --coverage' }\n        }\n        stage('Gate: Coverage') {\n            steps {\n                script {\n                    def coverage = sh(script: "grep -oP '\\\\d+\\\\.\\\\d+' coverage/summary.txt | head -1", returnStdout: true).trim().toFloat()\n                    echo "Coverage: \${coverage}%"\n                    if (coverage < 80) {\n                        error("❌ Coverage \${coverage}% is below 80% minimum")\n                    }\n                }\n            }\n        }\n        stage('Gate: Security') {\n            steps {\n                sh 'npm audit --audit-level=high'  // Fails on high/critical vulnerabilities\n            }\n        }\n        stage('Gate: Approval') {\n            when { branch 'main' }\n            steps {\n                timeout(time: 4, unit: 'HOURS') {\n                    input message: 'Production deploy approved?',\n                          submitter: 'lead-dev,manager'\n                }\n            }\n        }\n        stage('Deploy') {\n            steps { echo '✅ All gates passed — deploying!' }\n        }\n    }\n}`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 4 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="jenkins-s4-mb" /><label htmlFor="jenkins-s4-mb">Set up Multibranch Pipeline with automatic branch discovery</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="jenkins-s4-gitops" /><label htmlFor="jenkins-s4-gitops">Implement GitOps — deploy by merging to main</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="jenkins-s4-bg" /><label htmlFor="jenkins-s4-bg">Build a blue/green deployment with health checks</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="jenkins-s4-gates" /><label htmlFor="jenkins-s4-gates">Add compliance gates for coverage, security, and approval</label></li>
                  </ul>
                </div>
              </div>
            );
          case "lab26":
            return (
              <div>
                <h2>Lab 26: Observability — Monitoring Jenkins</h2>
                <p className="guide-subtitle">Stage 5 — Expert | Know when Jenkins is unhealthy before it breaks</p>

                <ConceptBox title="Why Monitor?">
                  <p style={{ margin: 0 }}>
                    Jenkins IS infrastructure. If Jenkins is down, no builds run, no deployments happen. You need to know: Is Jenkins healthy? Are builds getting slower? Is disk filling up?
                  </p>
                </ConceptBox>

                <h3>Key Metrics to Watch</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr><th>Metric</th><th>Why It Matters</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Build queue length</td><td>Growing = need more agents</td></tr>
                    <tr><td>Build duration trend</td><td>Increasing = something degraded</td></tr>
                    <tr><td>Disk space</td><td>Jenkins stores everything — fills up fast</td></tr>
                    <tr><td>JVM heap usage</td><td>High = Jenkins will crash</td></tr>
                  </tbody>
                </table>

                <h3>Prometheus + Grafana Stack</h3>
                <CodeBlock
                  title="docker-compose-monitoring.yml"
                  code={`version: '3.8'\nservices:\n  prometheus:\n    image: prom/prometheus\n    ports: ["9090:9090"]\n    volumes: ["./prometheus.yml:/etc/prometheus/prometheus.yml"]\n  grafana:\n    image: grafana/grafana\n    ports: ["3000:3000"]\n    environment: ["GF_SECURITY_ADMIN_PASSWORD=admin"]\n\n# prometheus.yml:\n# scrape_configs:\n#   - job_name: 'jenkins'\n#     metrics_path: '/prometheus'\n#     static_configs:\n#       - targets: ['jenkins:8080']`}
                />

                <TipBox>
                  Import Grafana dashboard ID <code>9964</code> for pre-built Jenkins visualizations.
                </TipBox>

                <ErrorCard
                  error='❌ Error: "No space left on device"'
                  meaning="Jenkins has filled up disk with old workspace files and build logs."
                  fix={`Quick cleanup:\n  docker exec jenkins find /var/jenkins_home/workspace -maxdepth 1 -mtime +7 -exec rm -rf {} \\;\n\nPermanent fix:\n  Add buildDiscarder(logRotator(numToKeepStr: '10')) and cleanWs() to EVERY pipeline.`}
                />
              </div>
            );
          case "lab27":
            return (
              <div>
                <h2>Lab 27: Performance Tuning</h2>
                <p className="guide-subtitle">Stage 5 — Expert | Make pipelines faster</p>

                <h3>4 Optimization Techniques</h3>

                <h4>1. Cache Dependencies</h4>
                <CodeBlock
                  title="Jenkinsfile"
                  code={`agent {\n    docker {\n        image 'node:18'\n        args '-v npm-cache:/root/.npm'  // Persistent cache\n    }\n}\nsteps { sh 'npm ci --cache /root/.npm' }`}
                />

                <h4>2. Parallel Everything</h4>
                <CodeBlock
                  title="Jenkinsfile"
                  code={`parallel {\n    stage('Lint')   { steps { sh 'npm run lint' } }\n    stage('Test')   { steps { sh 'npm test' } }\n    stage('Audit')  { steps { sh 'npm audit || true' } }\n}`}
                />

                <h4>3. Skip Unchanged Modules</h4>
                <CodeBlock
                  title="Jenkinsfile"
                  code={`stage('Backend') {\n    when { changeset "backend/**" }\n    steps { dir('backend') { sh 'npm test' } }\n}`}
                />

                <h4>4. Shallow Clone</h4>
                <CodeBlock
                  title="Jenkinsfile"
                  code={`checkout([\n    $class: 'GitSCM',\n    extensions: [[$class: 'CloneOption', depth: 1, shallow: true]],\n    userRemoteConfigs: [[url: 'https://github.com/user/repo.git']]\n])`}
                />

                <TipBox>
                  Use <code>node:18-alpine</code> (50MB) instead of <code>node:18</code> (900MB) for Docker agents — faster pull = faster builds.
                </TipBox>
              </div>
            );
          case "lab28":
            return (
              <div>
                <h2>Lab 28: Plugin Development</h2>
                <p className="guide-subtitle">Stage 5 — Expert | Build your own Jenkins plugin</p>

                <ConceptBox title="When to Write Plugins">
                  <p style={{ margin: 0 }}>
                    When no existing plugin does what you need — e.g., your company has a custom API that Jenkins needs to talk to. Most teams never need this, but understanding it makes you an expert-level Jenkins engineer.
                  </p>
                </ConceptBox>

                <h3>Setup (Java + Maven Required)</h3>
                <CodeBlock
                  title="WSL Terminal"
                  code={`# Generate plugin skeleton:\nmvn archetype:generate \\\n  -Dfilter=io.jenkins.archetypes:hello-world-plugin \\\n  -DgroupId=org.example \\\n  -DartifactId=my-jenkins-plugin\n\n# Build it:\ncd my-jenkins-plugin\nmvn package\n\n# Test it (launches Jenkins with your plugin):\nmvn hpi:run\n# → localhost:8080 with your plugin installed!`}
                />

                <h3>Plugin Structure</h3>
                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`my-jenkins-plugin/
├── pom.xml                          ← Maven build config
├── src/main/java/.../
│   └── HelloBuilder.java           ← Your plugin logic
├── src/main/resources/.../
│   ├── config.jelly                 ← UI form
│   └── help-name.html               ← Help text
└── target/my-plugin.hpi             ← Upload this to Jenkins`}
                </pre>

                <ErrorCard
                  error="❌ Error: Plugin update breaks pipeline"
                  meaning="java.lang.NoSuchMethodError — a plugin update changed or removed an API method your pipeline depends on."
                  fix="Downgrade: Manage Jenkins → Plugins → Installed → find the plugin → Downgrade. Prevent: Pin versions in plugins.txt. Test updates on a staging Jenkins first. Update one plugin at a time."
                />
              </div>
            );
          case "lab29":
            return (
              <div>
                <h2>Lab 29: Platform Engineering</h2>
                <p className="guide-subtitle">Stage 5 — Expert | Self-service Jenkins for your organization</p>

                <ConceptBox title="What is Platform Engineering?">
                  <p style={{ margin: 0 }}>
                    Instead of each team managing their own Jenkins, YOU provide a self-service platform: standardized pipelines via shared libraries, centralized security, and team onboarding in minutes, not days.
                  </p>
                </ConceptBox>

                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`┌──────────────────────────────────┐
│      Jenkins Platform             │
├──────────────────────────────────┤
│ Shared Libraries                  │
│  ├── nodePipeline()              │
│  ├── javaPipeline()              │
│  └── deployPipeline()            │
├──────────────────────────────────┤
│ RBAC: Team A → folder-a          │
│       Team B → folder-b          │
├──────────────────────────────────┤
│ Monitoring: Prometheus + Grafana  │
│ Backups: Daily automated          │
└──────────────────────────────────┘`}
                </pre>

                <h3>Production Readiness Checklist</h3>
                <ul className="g-checklist">
                  <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="prod-https" /><label htmlFor="prod-https">HTTPS enabled (reverse proxy with nginx)</label></li>
                  <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="prod-rbac" /><label htmlFor="prod-rbac">RBAC — no anonymous access</label></li>
                  <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="prod-creds" /><label htmlFor="prod-creds">Credentials in store, never in code</label></li>
                  <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="prod-backup" /><label htmlFor="prod-backup">Automated daily backups</label></li>
                  <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="prod-plugins" /><label htmlFor="prod-plugins">Plugin versions pinned</label></li>
                  <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="prod-discard" /><label htmlFor="prod-discard"><code>buildDiscarder</code> + <code>cleanWs()</code> on all jobs</label></li>
                  <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="prod-prom" /><label htmlFor="prod-prom">Prometheus metrics exported</label></li>
                  <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="prod-grafana" /><label htmlFor="prod-grafana">Grafana dashboards configured</label></li>
                  <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="prod-alerts" /><label htmlFor="prod-alerts">Slack alerts for Jenkins downtime</label></li>
                </ul>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 5 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="jenkins-s5-obs" /><label htmlFor="jenkins-s5-obs">Monitor Jenkins with Prometheus + Grafana</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="jenkins-s5-perf" /><label htmlFor="jenkins-s5-perf">Optimize pipeline performance (cache, parallel, shallow clone)</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="jenkins-s5-plugin" /><label htmlFor="jenkins-s5-plugin">Understand plugin development basics</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="jenkins-s5-plat" /><label htmlFor="jenkins-s5-plat">Design a self-service Jenkins platform</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="jenkins-s5-prod" /><label htmlFor="jenkins-s5-prod">Complete production readiness checklist</label></li>
                  </ul>
                </div>

                <div style={{ background: "var(--g-surface)", border: "1px solid var(--g-accent)", borderRadius: "12px", padding: "28px", margin: "30px 0", textAlign: "center" }}>
                  <h3 style={{ color: "var(--g-accent)", marginBottom: "10px" }}>🎓 Congratulations — You&apos;re a Jenkins Expert!</h3>
                  <p style={{ color: "var(--g-text-muted)", fontSize: "0.9rem", maxWidth: "600px", margin: "0 auto" }}>
                    You&apos;ve completed all 5 stages and 29 labs. You can now set up, scale, secure, monitor, and troubleshoot Jenkins in any environment. You&apos;re the person your team calls when Jenkins breaks.
                  </p>
                  <p style={{ color: "var(--g-text-muted)", fontSize: "0.85rem", marginTop: "16px" }}>
                    <strong>Next steps:</strong> Jenkins Engineer certification • Contribute to open-source plugins • Explore ArgoCD, Tekton, GitHub Actions
                  </p>
                </div>
              </div>
            );
          case "errors":
            return (
              <div>
                <h2>🚨 Master Error Reference</h2>
                <p className="guide-subtitle">Quick-lookup guide — find your error, get the fix</p>

                <h3>Installation &amp; Startup</h3>
                <ErrorCard
                  error="❌ Port 8080 already in use"
                  meaning="Bind for 0.0.0.0:8080 failed: port is already allocated"
                  fix={`Find and kill the process:\n  netstat -ano | findstr :8080\n\nOr start Jenkins on a different port:\n  docker run ... -p 9090:8080 ...`}
                />
                <ErrorCard
                  error="❌ Docker daemon not running"
                  meaning="error during connect: docker daemon is not running"
                  fix="Open Docker Desktop → wait for the green icon → retry the command."
                />

                <h3>Build &amp; Tool Errors</h3>
                <ErrorCard
                  error="❌ npm / node / java not found"
                  meaning="line 3: node: not found — the required runtime is not installed in the build environment."
                  fix={`Install the tool globally, or use Docker agents:\n  agent { docker { image 'node:18' } }`}
                />
                <ErrorCard
                  error="❌ Execute shell marked build as failure"
                  meaning="A command in your pipeline returned a non-zero exit code."
                  fix="Read the Console Output — the real error is ABOVE this message. Scroll up to find the first red line."
                />

                <h3>Exit Code Reference</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr><th>Code</th><th>Meaning</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><code>0</code></td><td>Success</td></tr>
                    <tr><td><code>1</code></td><td>General error (test failed)</td></tr>
                    <tr><td><code>126</code></td><td>Permission denied (not executable)</td></tr>
                    <tr><td><code>127</code></td><td>Command not found</td></tr>
                    <tr><td><code>137</code></td><td>Out of memory — killed by OS</td></tr>
                    <tr><td><code>143</code></td><td>Gracefully terminated (SIGTERM)</td></tr>
                  </tbody>
                </table>

                <h3>Pipeline Syntax</h3>
                <ErrorCard
                  error='❌ "Expected a stage" / "Expected a step"'
                  meaning="Declarative pipeline block is in the wrong order or Groovy code is outside a script block."
                  fix={`Correct order: agent → options → environment → parameters → stages → post\nGroovy code must be inside: steps { script { if (x) { sh 'cmd' } } }`}
                />

                <h3>Credentials</h3>
                <ErrorCard
                  error='❌ "No credentials with id &apos;xxx&apos; found"'
                  meaning="Jenkins cannot find a credential matching the ID used in your pipeline."
                  fix="Match the credential ID exactly (it is case-sensitive). Change the credential scope from 'System' to 'Global'."
                />

                <h3>Docker</h3>
                <ErrorCard
                  error="❌ Permission denied on docker.sock"
                  meaning="The Jenkins user does not have permission to use the Docker socket."
                  fix={`docker exec -u root jenkins bash -c "usermod -aG docker jenkins"\ndocker restart jenkins`}
                />

                <h3>Webhooks</h3>
                <ErrorCard
                  error="❌ Webhook timeout / 400 Bad Request"
                  meaning="GitHub cannot reach your Jenkins instance, or the webhook URL is misconfigured."
                  fix="Check ngrok is running and the forwarding URL is active. Use application/json content type. Include the trailing slash: /github-webhook/"
                />

                <h3>Performance</h3>
                <ErrorCard
                  error="❌ java.lang.OutOfMemoryError"
                  meaning="Jenkins JVM has run out of heap memory."
                  fix={`Restart with increased memory:\n  docker run ... -e JAVA_OPTS="-Xmx2g -Xms1g" ...`}
                />

                <h3>🛡️ EMERGENCY: Locked Out</h3>
                <ErrorCard
                  error="❌ Can't login after enabling security"
                  meaning="Security was misconfigured and now even the admin account cannot log in."
                  fix={`Disable security via config.xml:\n  docker exec jenkins bash -c "sed -i 's|useSecurity>true|useSecurity>false|' /var/jenkins_home/config.xml"\n  docker restart jenkins\n\nLog in → fix the security config → re-enable.`}
                />

                <h3>🔍 General Debugging Checklist</h3>
                <ol style={{ color: "var(--g-text-muted)", fontSize: "0.9rem", paddingLeft: "20px" }}>
                  <li style={{ marginBottom: "8px" }}>Console Output → read from <strong>BOTTOM UP</strong></li>
                  <li style={{ marginBottom: "8px" }}>Find the <strong>FIRST</strong> error (errors cascade — later lines are side-effects)</li>
                  <li style={{ marginBottom: "8px" }}>Classify: Code error? Config error? Environment error?</li>
                  <li style={{ marginBottom: "8px" }}>Google the exact error message (include &ldquo;Jenkins&rdquo; in your search)</li>
                  <li>Fix → Push → Rebuild → Verify</li>
                </ol>
              </div>
            );
          case "destroy":
            return (
              <div>
                <h2>🗑️ Destroy AWS Resources</h2>
                <p className="guide-subtitle">Don&apos;t blow your $160 free credits.</p>

                <ConceptBox title="Why This is Critical">
                  <p style={{ margin: 0 }}>
                    If you used Option B (AWS Cloud) to run Jenkins on an EC2 instance, you are being charged by the hour. If you close your laptop and forget about it, that instance will burn through your $160 AWS credits in a few weeks. You must explicitly terminate it.
                  </p>
                </ConceptBox>

                <h3>Step 1: Save Your Work (Optional)</h3>
                <p>If you want to save your Jenkins pipelines before destroying the server, push all your <code>Jenkinsfile</code>s to GitHub first.</p>

                <h3>Step 2: Terminate the EC2 Instance</h3>
                <TipBox><strong>💻 Where to do this:</strong> Inside the AWS Management Console in your browser.</TipBox>
                <ol style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                  <li style={{ marginBottom: "8px" }}>Log into your AWS Account.</li>
                  <li style={{ marginBottom: "8px" }}>Go to the <strong>EC2 Dashboard</strong>.</li>
                  <li style={{ marginBottom: "8px" }}>Click <strong>Instances (running)</strong>.</li>
                  <li style={{ marginBottom: "8px" }}>Select the checkbox next to your Jenkins server.</li>
                  <li style={{ marginBottom: "8px" }}>Click <strong>Instance state</strong> (top right) → <strong>Terminate instance</strong>.</li>
                  <li>Confirm the termination.</li>
                </ol>

                <ErrorCard
                  error='🔥 Real-World Mistake: Stopping vs Terminating'
                  meaning="You click 'Stop instance' instead of 'Terminate'. A week later, your credits are still draining."
                  fix="'Stop' only pauses the CPU. AWS still charges you for the EBS storage volume (hard drive) attached to the stopped instance. You must click TERMINATE to permanently delete the server and its hard drive and stop all billing."
                />

                <h3>🏆 Deletion Checklist</h3>
                <ul className="g-checklist">
                  <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="destroy-git" /><label htmlFor="destroy-git">Pushed all important code and Jenkinsfiles to GitHub</label></li>
                  <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="destroy-ec2" /><label htmlFor="destroy-ec2">Verified the EC2 instance State says &ldquo;Terminated&rdquo;</label></li>
                  <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="destroy-billing" /><label htmlFor="destroy-billing">Checked the AWS Billing Dashboard to ensure no hidden charges</label></li>
                </ul>
              </div>
            );
          default:
            return <div>Select a section from the sidebar.</div>;
        }
      }}
    </GuideWrapper>
  );
}
