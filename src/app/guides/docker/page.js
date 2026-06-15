"use client";

import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox, TipBox, WarningBox, ErrorCard, Quiz } from "@/components/guide/GuideComponents";

export default function DockerMastery() {
  const navGroups = [
    {
      title: "Course Intro",
      items: [
        { id: "overview", title: "📘 Roadmap & Setup" }
      ]
    },
    {
      title: "Stage 1: Foundations",
      items: [
        { id: "lab1", title: "Lab 1: Arch & VMs vs Containers" },
        { id: "lab2", title: "Lab 2: First Container & Pull" },
        { id: "lab3", title: "Lab 3: Ports & Web Apps" },
        { id: "lab4", title: "Lab 4: Env Vars & Secrets" },
        { id: "lab5", title: "Lab 5: Lifecycle & Logs" },
        { id: "lab6", title: "Lab 6: Capstone (PostgreSQL)" }
      ]
    },
    {
      title: "Stage 2: Images",
      items: [
        { id: "lab7", title: "Lab 7: Anatomy of Dockerfile" },
        { id: "lab8", title: "Lab 8: Building & Caching" },
        { id: "lab9", title: "Lab 9: The .dockerignore" },
        { id: "lab10", title: "Lab 10: Multi-Stage Builds" },
        { id: "lab11", title: "Lab 11: Capstone (Legacy App)" }
      ]
    },
    {
      title: "Stage 3: Data & Net",
      items: [
        { id: "lab12", title: "Lab 12: Volumes vs Bind Mounts" },
        { id: "lab13", title: "Lab 13: Volume Backups" },
        { id: "lab14", title: "Lab 14: Default Bridge Net" },
        { id: "lab15", title: "Lab 15: Custom Networks & DNS" },
        { id: "lab16", title: "Lab 16: Capstone (3-Tier App)" }
      ]
    },
    {
      title: "Stage 4: Compose",
      items: [
        { id: "lab17", title: "Lab 17: Intro to YAML" },
        { id: "lab18", title: "Lab 18: Service Dependencies" },
        { id: "lab19", title: "Lab 19: Local Dev Workflow" },
        { id: "lab20", title: "Lab 20: Scaling Services" },
        { id: "lab21", title: "Lab 21: Capstone (E-Commerce)" }
      ]
    },
    {
      title: "Stage 5: Production",
      items: [
        { id: "lab22", title: "Lab 22: Image Registries" },
        { id: "lab23", title: "Lab 23: Security & Non-root" },
        { id: "lab24", title: "Lab 24: Vuln Scanning" },
        { id: "lab25", title: "Lab 25: Resource Limits" },
        { id: "lab26", title: "Lab 26: Logging Drivers" },
        { id: "lab27", title: "Lab 27: Capstone (Production)" }
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
      title="Docker Mastery Guide" 
      subtitle="A complete 5-stage interactive course for WSL users."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case "overview":
            return (
              <div>
                <h2>Docker Mastery: Beginner to Real-World Expert</h2>
                <p className="guide-subtitle">A complete 5-stage interactive course for WSL users.</p>

                <ConceptBox title="How to use this guide">
                  <p style={{ margin: 0 }}>
                    This is not just reading material. This is a <strong>hands-on laboratory</strong>. Every block of code has a specific place to be executed. If you see a code block, DO it.
                  </p>
                </ConceptBox>

                <h3>💰 Cost & Infrastructure Options</h3>
                <p>You can complete this entire course for <strong>100% Free</strong>. You have two choices:</p>
                
                <TipBox>
                  <strong>Option A: Local Development (Free)</strong><br />
                  Run everything on your own Windows laptop using WSL2 and Docker Desktop. This costs $0 and is the fastest way to learn.
                </TipBox>
                
                <WarningBox>
                  <strong>Option B: AWS Cloud (Using your $160 Free Credits)</strong><br />
                  If your laptop is slow or runs out of RAM, use your $160 AWS credits to rent an <code>Ubuntu t3.medium EC2 instance</code> (approx. $30/month). You will SSH into it and run the exact same Linux commands there.
                </WarningBox>

                <h3>🛠️ Prerequisites — Install These First (Local WSL Setup)</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "24px 0" }}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>1</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Install WSL2 (Windows Subsystem for Linux):</strong>
                      <p style={{ margin: "4px 0" }}>Open PowerShell as Administrator and run:</p>
                      <CodeBlock title="PowerShell" code="wsl --install" />
                      <p style={{ margin: "4px 0", color: "var(--g-text-muted)" }}>Restart your PC after the installation completes.</p>
                      <ErrorCard 
                        error='🔥 Setup Error: "Virtualization is not enabled"'
                        meaning="WSL2 requires hardware virtualization."
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
                      <strong>VS Code Setup:</strong>
                      <p style={{ margin: "4px 0" }}>Install Visual Studio Code. Inside VS Code, install the extension: <strong>&quot;WSL&quot;</strong> (by Microsoft). Click the remote connection button in the bottom left corner to &quot;Connect to WSL&quot;.</p>
                      <TipBox>
                        <strong>💻 The Golden Rule:</strong> Always open your VS Code terminal and make sure you are inside your WSL Ubuntu shell (the prompt should look like <code>user@hostname:~$</code>), NOT PowerShell. All commands assume a Linux environment.
                      </TipBox>
                    </div>
                  </div>
                </div>

                <h3>The 5 Stages to Mastery</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Stage</th>
                      <th>Focus</th>
                      <th>What You&apos;ll Build</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1. Foundations</td>
                      <td>CLI, Ports, Env Vars</td>
                      <td>Run a PostgreSQL database server</td>
                    </tr>
                    <tr>
                      <td>2. Images</td>
                      <td>Dockerfiles, Multi-stage</td>
                      <td>Containerize a real Node.js app</td>
                    </tr>
                    <tr>
                      <td>3. Data & Net</td>
                      <td>Volumes, DNS, Isolation</td>
                      <td>Connect a 3-tier application</td>
                    </tr>
                    <tr>
                      <td>4. Compose</td>
                      <td>YAML, Dependencies</td>
                      <td>Launch an entire e-commerce stack</td>
                    </tr>
                    <tr>
                      <td>5. Production</td>
                      <td>Security, Registries, Limits</td>
                      <td>Audit and secure a container for Prod</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          case "lab1":
            return (
              <div>
                <h2>Lab 1: Architecture — VMs vs Containers</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Why does Docker exist?</p>

                <ConceptBox title="The &quot;Works on my machine&quot; Problem">
                  <p style={{ margin: 0 }}>
                    Before Docker, you built an app on your laptop (Windows), gave it to QA (Mac), and deployed to Production (Linux). It crashed because someone had a different version of Node.js or Python installed. Docker solves this by packaging your app AND its dependencies into a single, standardized unit called a <strong>Container</strong>.
                  </p>
                </ConceptBox>

                <h3>Virtual Machines vs Containers</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Virtual Machine (VM)</th>
                      <th>Docker Container</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Bundles the App, Binaries, and a FULL Operating System (e.g., 20GB Windows Server).</td>
                      <td>Bundles the App and Binaries, but <em>shares</em> the host machine&apos;s OS Kernel.</td>
                    </tr>
                    <tr>
                      <td>Takes minutes to boot up.</td>
                      <td>Starts in milliseconds (like running a normal program).</td>
                    </tr>
                    <tr>
                      <td>Eats dedicated RAM and CPU even if idle.</td>
                      <td>Only uses exactly what the app needs.</td>
                    </tr>
                  </tbody>
                </table>

                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`Hardware → OS → Docker Engine → [ Container A (App + Node) ]
                                 → [ Container B (DB + Postgres) ]`}
                </pre>

                <Quiz 
                  question="If you need to run 10 separate microservices, why use Docker instead of 10 Virtual Machines?"
                  answer="Running 10 VMs means booting 10 entire operating systems, wasting massive amounts of RAM and CPU just on OS overhead. 10 Docker containers share the same underlying OS kernel, meaning 99% of your server's resources go to your actual apps, not idle operating systems."
                />
              </div>
            );
          case "lab2":
            return (
              <div>
                <h2>Lab 2: First Container & Pull</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Your first interaction with the Docker Daemon</p>

                <h3>1. Verify Installation</h3>
                <p>Open your WSL (Ubuntu) terminal and paste this command:</p>
                <CodeBlock title="WSL Terminal" code="docker --version" />

                <h3>2. Run Your First Container</h3>
                <p>Let&apos;s run the classic &quot;Hello World&quot; container to prove Docker can pull an image from the internet and execute it.</p>
                <CodeBlock title="WSL Terminal" code="docker run hello-world" />

                <ConceptBox title="What just happened?">
                  <ol style={{ marginLeft: "20px", color: "var(--g-text)" }}>
                    <li style={{ marginBottom: "8px" }}>Docker looked for the <code>hello-world</code> image locally.</li>
                    <li style={{ marginBottom: "8px" }}>It didn&apos;t find it, so it <strong>pulled</strong> it from Docker Hub (the public registry).</li>
                    <li style={{ marginBottom: "8px" }}>It created a container from that image and ran it.</li>
                    <li style={{ margin: 0 }}>The app printed a message and exited.</li>
                  </ol>
                </ConceptBox>

                <h3>3. Interactive Containers (Getting inside)</h3>
                <p>You can run a completely fresh, isolated Linux environment (Ubuntu) in less than a second and &quot;SSH&quot; directly into it.</p>
                <CodeBlock title="WSL Terminal" code="docker run -it ubuntu bash" />

                <p><strong>Flags explained:</strong></p>
                <ul style={{ marginLeft: "20px", marginBottom: "20px" }}>
                  <li><code>-i</code> (interactive): Keeps STDIN open even if not attached.</li>
                  <li><code>-t</code> (tty): Allocates a pseudo-TTY (makes your terminal act like a real screen).</li>
                  <li>Together (<code>-it</code>), they let you type commands inside the container.</li>
                </ul>

                <ErrorCard 
                  error='🔥 Real-World Problem: "My container exits immediately!"'
                  meaning="You run docker run ubuntu bash and nothing happens. The command finishes instantly."
                  fix="Containers exist ONLY as long as their main process is running. If you don't use -it, the bash shell has no terminal attached, so it exits instantly, killing the container. Always use -it when you want an interactive session."
                />
              </div>
            );
          case "lab3":
            return (
              <div>
                <h2>Lab 3: Ports & Web Apps</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Connecting the container to the outside world</p>

                <ConceptBox title="The Isolation Wall">
                  <p style={{ margin: 0 }}>
                    Containers are completely isolated by default. If a web server runs on port 80 <em>inside</em> the container, your browser (outside the container) cannot reach it. You must explicitly punch a hole through the wall using <strong>Port Mapping</strong>.
                  </p>
                </ConceptBox>

                <h3>1. Run a Web Server without Port Mapping (The Error)</h3>
                <CodeBlock title="WSL Terminal" code="docker run -d --name my-nginx nginx" />
                <p style={{ color: "var(--g-text-muted)" }}>
                  <em>(The <code>-d</code> flag runs it in the &quot;detached&quot; background mode).</em> Now try opening <code>http://localhost:80</code> in Chrome. It will fail. The server is running, but isolated.
                </p>

                <h3>2. Kill it and Map the Port</h3>
                <CodeBlock title="WSL Terminal" code={`docker rm -f my-nginx\ndocker run -d --name my-nginx -p 8080:80 nginx`} />

                <p><strong>Syntax:</strong> <code>-p HOST_PORT:CONTAINER_PORT</code></p>
                <ul style={{ marginLeft: "20px", marginBottom: "20px" }}>
                  <li><code>8080</code> is the port on your physical laptop (Windows/WSL).</li>
                  <li><code>80</code> is the port Nginx is listening on inside the container.</li>
                </ul>

                <p>Now open <strong>http://localhost:8080</strong> in Chrome. You will see the &quot;Welcome to nginx!&quot; screen.</p>

                <ErrorCard 
                  error='🔥 Real-World Problem: "Port is already allocated"'
                  meaning="You try to run a container and get: Bind for 0.0.0.0:8080 failed: port is already allocated."
                  fix="Two programs cannot listen on the same host port. You might have another container (or a local Node server) running on 8080. Change the HOST port: -p 9090:80 and try again."
                />
              </div>
            );
          case "lab4":
            return (
              <div>
                <h2>Lab 4: Environment Variables & Secrets</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Passing configuration dynamically</p>

                <ConceptBox title="Never Hardcode Secrets">
                  <p style={{ margin: 0 }}>
                    If you build a database password or API key directly into your code or image, anyone who downloads the image can steal your credentials. Instead, you pass <strong>Environment Variables</strong> at runtime when starting the container.
                  </p>
                </ConceptBox>

                <h3>1. Passing a variable at runtime</h3>
                <p>This spins up Ubuntu, passes the variable using <code>-e</code>, runs the <code>printenv</code> command to prove it is there, and immediately exits.</p>
                <CodeBlock title="WSL Terminal" code="docker run -e MY_MESSAGE=&quot;Hello from WSL&quot; ubuntu printenv MY_MESSAGE" />

                <h3>2. Passing multiple variables using a file</h3>
                <p>Typing out 15 secrets in the CLI is painful. Instead, use an <code>.env</code> file.</p>
                <p>Create a file named <code>config.env</code> in your terminal:</p>
                <CodeBlock title="WSL Terminal" code={`echo "DB_USER=admin" > config.env\necho "DB_PASS=supersecret123" >> config.env`} />

                <p>Now pass it using the <code>--env-file</code> flag:</p>
                <CodeBlock title="WSL Terminal" code="docker run --env-file ./config.env ubuntu env" />
                <p style={{ color: "var(--g-text-muted)" }}>You will see <code>DB_USER</code> and <code>DB_PASS</code> printed in the environment output.</p>

                <Quiz 
                  question="If a container requires a database password to start, but you forget to provide the -e flag, what usually happens?"
                  answer="The container will usually start, log a fatal error (e.g., &quot;FATAL: password authentication failed&quot; or &quot;Missing DB_PASSWORD&quot;), and immediately crash/exit. This is known as &quot;failing fast&quot;, which is a good practice!"
                />
              </div>
            );
          case "lab5":
            return (
              <div>
                <h2>Lab 5: Lifecycle & Logs</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Managing running containers</p>

                <h3>1. See what is running (ps)</h3>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Show only running containers\ndocker ps\n\n# Show ALL containers (even stopped ones)\ndocker ps -a`} 
                />

                <h3>2. Start, Stop, and Remove</h3>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Stop a running container gracefully\ndocker stop my-nginx\n\n# Start it back up\ndocker start my-nginx\n\n# Forcibly kill and remove a container forever\ndocker rm -f my-nginx`} 
                />

                <h3>3. Reading Logs</h3>
                <p>When a container crashes, the logs are your only clue. Because containers don&apos;t have traditional UI screens, all application output must be printed to standard output (STDOUT/STDERR).</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Start a broken container that loops an error\ndocker run -d --name buggy-app ubuntu bash -c "while true; do echo 'CRASH'; sleep 1; done"\n\n# Read the logs\ndocker logs buggy-app\n\n# Follow the logs live (like tail -f)\ndocker logs -f buggy-app\n\n# Clean up\ndocker rm -f buggy-app`} 
                />

                <ErrorCard 
                  error='🔥 Real-World Problem: "Docker is eating all my disk space!"'
                  meaning="Stopped containers, dangling images, and old networks are not deleted automatically. Over months, they consume gigabytes."
                  fix="Run: docker system prune -a to nuke everything that isn't actively running and reclaim space instantly."
                />
              </div>
            );
          case "lab6":
            return (
              <div>
                <h2>Lab 6: Capstone — Real Postgres DB</h2>
                <p className="guide-subtitle">Stage 1 — Capstone Project | Run an Enterprise Database in seconds</p>

                <ConceptBox title="The Power of Public Images">
                  <p style={{ margin: 0 }}>
                    Before Docker, installing a PostgreSQL database required downloading an installer, managing Windows services, configuring users, and dealing with registry keys. With Docker, you can spin up a fully isolated, production-ready database in exactly one command.
                  </p>
                </ConceptBox>

                <h3>1. Launch the Database</h3>
                <p>We are going to use everything we learned: detached mode (<code>-d</code>), naming (<code>--name</code>), port mapping (<code>-p</code>), and environment variables (<code>-e</code>).</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`docker run -d \\\n  --name capstone-db \\\n  -p 5432:5432 \\\n  -e POSTGRES_USER=admin \\\n  -e POSTGRES_PASSWORD=secret \\\n  postgres:15-alpine`} 
                />

                <ConceptBox title="🔍 Code Explanation: Running a DB">
                  <ul style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                    <li style={{ marginBottom: "8px" }}><strong>-d:</strong> Runs the database in the background so it doesn&apos;t lock up your terminal.</li>
                    <li style={{ marginBottom: "8px" }}><strong>-p 5432:5432:</strong> Binds the standard Postgres port from inside the container to your host machine.</li>
                    <li style={{ margin: 0 }}><strong>-e POSTGRES_PASSWORD:</strong> Sets the database superuser password on first boot.</li>
                  </ul>
                </ConceptBox>

                <h3>2. Connect to the Database</h3>
                <p>For this lab, we will use Docker to run a temporary container that contains the <code>psql</code> client, link it to our host network, and log in.</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Run a temporary client and delete it after (--rm)\ndocker run -it --rm \\\n  postgres:15-alpine \\\n  psql -h host.docker.internal -U admin -d postgres\n\n# When prompted, type the password: secret\n# You are now inside the DB! Type \\q to exit.`} 
                />
                <p style={{ color: "var(--g-text-muted)" }}>
                  <em>Note: <code>host.docker.internal</code> is a special Docker Desktop DNS name that lets a container talk to the host machine (your laptop) where port 5432 is exposed.</em>
                </p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 1 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s1-vm" />
                      <label htmlFor="docker-s1-vm">Understand why Containers are better than VMs for apps</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s1-run" />
                      <label htmlFor="docker-s1-run">Pull an image and run it in the terminal (docker run -it)</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s1-port" />
                      <label htmlFor="docker-s1-port">Expose a container to the browser using Port Mapping (-p)</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s1-env" />
                      <label htmlFor="docker-s1-env">Pass secrets securely using Environment Variables (-e)</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s1-logs" />
                      <label htmlFor="docker-s1-logs">View logs and clean up old containers (docker ps, logs, rm)</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s1-postgres" />
                      <label htmlFor="docker-s1-postgres">Spin up a real-world PostgreSQL database</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab7":
            return (
              <div>
                <h2>Lab 7: Anatomy of a Dockerfile</h2>
                <p className="guide-subtitle">Stage 2 — Images | Creating your own containers</p>

                <ConceptBox title="What is a Dockerfile?">
                  <p style={{ margin: 0 }}>
                    A Dockerfile is a simple text document that contains all the commands a user could call on the command line to assemble an image. It is the recipe for your container.
                  </p>
                </ConceptBox>

                <h3>The 4 Core Instructions</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Instruction</th>
                      <th>What it does</th>
                      <th>Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>FROM</code></td>
                      <td>The base OS image you start with. Must be the first line.</td>
                      <td><code>FROM node:18-alpine</code></td>
                    </tr>
                    <tr>
                      <td><code>COPY</code></td>
                      <td>Copies files from your laptop into the container.</td>
                      <td><code>COPY . /app</code></td>
                    </tr>
                    <tr>
                      <td><code>RUN</code></td>
                      <td>Executes a command DURING the build process (e.g., install dependencies).</td>
                      <td><code>RUN npm install</code></td>
                    </tr>
                    <tr>
                      <td><code>CMD</code></td>
                      <td>The default command that runs when the container STARTS.</td>
                      <td><code>CMD [&quot;node&quot;, &quot;server.js&quot;]</code></td>
                    </tr>
                  </tbody>
                </table>

                <h3>A Basic Dockerfile Example</h3>
                <CodeBlock 
                  title="Dockerfile" 
                  code={`# Start from a lightweight Node.js image\nFROM node:18-alpine\n\n# Set the working directory inside the container\nWORKDIR /app\n\n# Copy the package.json first (we'll explain why in Lab 8)\nCOPY package.json .\n\n# Install dependencies DURING the build\nRUN npm install\n\n# Copy the rest of your application code\nCOPY . .\n\n# What to run when the container starts\nCMD ["node", "index.js"]`} 
                />

                <ConceptBox title="🔍 Code Explanation: The Dockerfile">
                  <ul style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                    <li style={{ marginBottom: "8px" }}><strong>FROM:</strong> This is your foundation. We use &apos;alpine&apos; because it is a stripped-down Linux distribution that makes your final image extremely small and secure.</li>
                    <li style={{ marginBottom: "8px" }}><strong>WORKDIR:</strong> Automatically creates a folder named <code>/app</code> inside the container and sets it as the default directory for subsequent instructions.</li>
                    <li style={{ margin: 0 }}><strong>RUN vs CMD:</strong> <code>RUN</code> executes <em>during the build process</em> (when you run docker build). <code>CMD</code> executes <em>during runtime</em> (when you run docker run).</li>
                  </ul>
                </ConceptBox>
              </div>
            );
          case "lab8":
            return (
              <div>
                <h2>Lab 8: Building & Caching</h2>
                <p className="guide-subtitle">Stage 2 — Images | The Layer Cache</p>

                <h3>Building an Image</h3>
                <p>To turn a <code>Dockerfile</code> into a runnable Image, use the <code>docker build</code> command.</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# The -t flag tags (names) the image. The dot (.) means "current directory"\ndocker build -t my-app:v1 .`} 
                />

                <ConceptBox title="The Layer Cache (Why order matters)">
                  <p style={{ margin: 0 }}>
                    Docker executes instructions top-to-bottom. Every line creates a &quot;Layer&quot; which is cached. If you change a file, that layer and EVERY LAYER AFTER IT loses its cache and must rebuild.
                  </p>
                </ConceptBox>

                <h3>Bad vs Good Dockerfile</h3>
                <p>In the Bad example, every time you edit your <code>server.js</code> code, the <code>COPY . .</code> layer invalidates. Because <code>RUN npm install</code> comes AFTER it, Docker must redownload all npm packages. This makes builds take minutes instead of seconds.</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", margin: "24px 0" }}>
                  <div>
                    <strong style={{ color: "var(--g-red)" }}>❌ BAD (No Cache Optimization)</strong>
                    <CodeBlock 
                      title="Dockerfile" 
                      code={`FROM node:18-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD ["node", "server.js"]`} 
                    />
                  </div>
                  <div>
                    <strong style={{ color: "var(--g-green)" }}>✅ GOOD (The Cache Trick)</strong>
                    <CodeBlock 
                      title="Dockerfile" 
                      code={`FROM node:18-alpine\nWORKDIR /app\n# Copy ONLY package.json first\nCOPY package.json .\n# Installed layer is cached!\nRUN npm install\n# Code changes only trigger this fast layer\nCOPY . .\nCMD ["node", "server.js"]`} 
                    />
                  </div>
                </div>
              </div>
            );
          case "lab9":
            return (
              <div>
                <h2>Lab 9: The .dockerignore File</h2>
                <p className="guide-subtitle">Stage 2 — Images | Stop uploading the internet</p>

                <ErrorCard 
                  error='🔥 Real-World Problem: "My image build takes 20 minutes!"'
                  meaning="When you run docker build ., Docker copies the ENTIRE current folder to the build daemon. If you have a massive node_modules folder, .git history, or log files locally, you upload gigabytes needlessly."
                  fix="Create a .dockerignore file in your project directory to filter out local node_modules, git directories, build files, and local environment secrets."
                />

                <h3>Creating a .dockerignore</h3>
                <p>Create a file named <code>.dockerignore</code> right next to your Dockerfile:</p>
                <CodeBlock 
                  title=".dockerignore" 
                  code={`node_modules/\nnpm-debug.log\n.git/\n.env\ndist/\nbuild/`} 
                />
                <p>This ensures that your massive local <code>node_modules</code> is never sent to the Docker daemon, and the container builds strictly using its own internal <code>RUN npm install</code> command.</p>
              </div>
            );
          case "lab10":
            return (
              <div>
                <h2>Lab 10: Multi-Stage Builds</h2>
                <p className="guide-subtitle">Stage 2 — Images | Tiny production images</p>

                <ConceptBox title="The Problem: Fat Images">
                  <p style={{ margin: 0 }}>
                    To compile a React frontend or Go backend, you need massive SDKs, compilers, and dev dependencies. But to RUN the compiled code, you only need the final build files. If you ship the compilers to production, your image is huge (e.g. 1GB+) and contains unnecessary security vulnerabilities.
                  </p>
                </ConceptBox>

                <h3>The Multi-Stage Solution</h3>
                <p>Use multiple <code>FROM</code> statements. The first stage builds the app. The second stage starts fresh, copying ONLY the compiled static files from the first stage, and discards the build environment.</p>

                <CodeBlock 
                  title="Dockerfile" 
                  code={`# STAGE 1: Build the app (Massive Node environment)\nFROM node:18 AS builder\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\nRUN npm run build   # Creates the /app/build directory\n\n# STAGE 2: Production server (Tiny Nginx environment)\nFROM nginx:alpine\n# Copy compiled HTML/JS from the builder stage\nCOPY --from=builder /app/build /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]`} 
                />
                <p style={{ color: "var(--g-text-muted)" }}>
                  <em>Result: Instead of shipping a 1.2GB Node dev image, you ship a 20MB Nginx production image containing only compiled assets.</em>
                </p>
              </div>
            );
          case "lab11":
            return (
              <div>
                <h2>Lab 11: Capstone — Containerize a Node App</h2>
                <p className="guide-subtitle">Stage 2 — Capstone Project | Build and run a real application</p>

                <p>You have inherited a legacy Node.js Express API. Your job is to containerize it and run it.</p>

                <h3>1. Create the App Files</h3>
                <p>Create a new directory and files in WSL:</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`mkdir my-api && cd my-api\ntouch package.json index.js Dockerfile .dockerignore`} 
                />

                <h3>2. Paste the Source Code</h3>
                <p>Open <code>package.json</code> and paste:</p>
                <CodeBlock 
                  title="package.json" 
                  code={`{\n  "name": "my-api",\n  "version": "1.0.0",\n  "main": "index.js",\n  "scripts": { "start": "node index.js" },\n  "dependencies": { "express": "^4.18.2" }\n}`} 
                />

                <p>Open <code>index.js</code> and paste:</p>
                <CodeBlock 
                  title="index.js" 
                  code={`const express = require('express');\nconst app = express();\nconst PORT = process.env.PORT || 3000;\n\napp.get('/', (req, res) => {\n    res.json({ message: "Hello from inside the Docker Container!" });\n});\n\napp.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));`} 
                />

                <h3>3. Create the Docker Configuration</h3>
                <p>Open <code>.dockerignore</code> and paste:</p>
                <CodeBlock title=".dockerignore" code={`node_modules\nnpm-debug.log`} />

                <p>Open <code>Dockerfile</code> and paste:</p>
                <CodeBlock 
                  title="Dockerfile" 
                  code={`FROM node:18-alpine\nWORKDIR /usr/src/app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD ["npm", "start"]`} 
                />

                <h3>4. Build and Run!</h3>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# 1. Build the image\ndocker build -t my-api:latest .\n\n# 2. Run the image, mapping host port 8080 to container port 3000\ndocker run -d --name legacy-api -p 8080:3000 my-api:latest\n\n# 3. Test it!\ncurl http://localhost:8080`} 
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 2 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s2-df" />
                      <label htmlFor="docker-s2-df">Write a Dockerfile using FROM, WORKDIR, COPY, RUN, and CMD</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s2-cache" />
                      <label htmlFor="docker-s2-cache">Optimize cache layers by ordering npm installs before code copy</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s2-ignore" />
                      <label htmlFor="docker-s2-ignore">Use a .dockerignore file to filter local node_modules from build context</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s2-multistage" />
                      <label htmlFor="docker-s2-multistage">Understand the benefits of Multi-Stage builds for compiling/static apps</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s2-capstone" />
                      <label htmlFor="docker-s2-capstone">Completely containerize, build, and run a custom Express API from scratch</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab12":
            return (
              <div>
                <h2>Lab 12: Volumes vs Bind Mounts</h2>
                <p className="guide-subtitle">Stage 3 — Data & Net | Stop losing your data</p>

                <ConceptBox title="The Ephemeral Container">
                  <p style={{ margin: 0 }}>
                    By default, when a container is deleted, ALL data inside it is destroyed permanently. If you run a database container, delete it, and replace it, your database is empty. To save data permanently, you must mount storage from the host machine into the container.
                  </p>
                </ConceptBox>

                <h3>1. Docker Volumes (Best for Databases)</h3>
                <p>Docker completely manages the storage location on your hard drive. You don&apos;t need to know or manage the host file system path.</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# 1. Create a named volume\ndocker volume create pg-data\n\n# 2. Mount it to the PostgreSQL data directory\ndocker run -d --name db \\\n  -v pg-data:/var/lib/postgresql/data \\\n  -e POSTGRES_PASSWORD=secret \\\n  postgres:15-alpine`} 
                />

                <h3>2. Bind Mounts (Best for Live Coding)</h3>
                <p>You map an EXACT folder on your laptop to a folder inside the container. If you edit a file on your host, it instantly updates inside the running container.</p>
                <CodeBlock 
                  title="WSL Terminal (Inside my-api project folder)" 
                  code={`# The \$(pwd) command prints the current working directory\ndocker run -d --name dev-api \\\n  -p 8080:3000 \\\n  -v \$(pwd):/usr/src/app \\\n  my-api:latest`} 
                />
                <p style={{ color: "var(--g-text-muted)" }}>
                  <em>Now if you change <code>index.js</code> in VS Code, the changes propagate to the container instantly without rebuilding the image!</em>
                </p>

                <ErrorCard 
                  error='🔥 Real-World Problem: "My live-reloading doesn&apos;t work on Windows!"'
                  meaning="You use a bind mount -v $(pwd):/app, edit a file in Windows, but the container (Node.js/React) doesn't detect changes."
                  fix="File system events (inotify) do not cross the Windows-to-WSL mount boundary reliably. Store your project code inside the WSL root filesystem (e.g. ~/projects), not in /mnt/c/Users/... and open it in VS Code via WSL."
                />
              </div>
            );
          case "lab13":
            return (
              <div>
                <h2>Lab 13: Managing Volumes (Backups)</h2>
                <p className="guide-subtitle">Stage 3 — Data & Net | How to backup a Docker Volume</p>

                <p>Because Docker Volumes are managed by Docker inside its storage subsystem, you cannot just copy-paste them in Windows Explorer or WSL directories. You have to run a temporary container to extract a backup archive (tarball).</p>

                <h3>Backing up a volume</h3>
                <p>This spins up an Alpine Linux container, mounts the <code>pg-data</code> volume, mounts your current WSL folder <code>\$(pwd)</code> to <code>/backup</code>, and creates a zipped backup of the data:</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Create the backup archive\ndocker run --rm \\\n  -v pg-data:/db-data \\\n  -v \$(pwd):/backup \\\n  alpine tar cvf /backup/db_backup.tar /db-data`} 
                />
                <p>Look in your current folder. You now have a <code>db_backup.tar</code> file containing the entire database state which you can safely commit or back up elsewhere.</p>
              </div>
            );
          case "lab14":
            return (
              <div>
                <h2>Lab 14: The Default Bridge Network</h2>
                <p className="guide-subtitle">Stage 3 — Data & Net | Why containers cannot talk to each other easily</p>

                <ConceptBox title="The Default IP Problem">
                  <p style={{ margin: 0 }}>
                    When you start a container without specifying a network, Docker places it on the default <code>bridge</code> network and assigns a random IP address (like <code>172.17.0.2</code>). If your API needs to talk to your DB, you have to guess that IP. If the DB restarts, its IP might change, breaking your API connection!
                  </p>
                </ConceptBox>

                <h3>Proving the problem</h3>
                <p>Start a DB and try to ping it from another container by looking up its random IP:</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Start a DB container\ndocker run -d --name my-db redis\n\n# Inspect the DB to find its random IP\ndocker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' my-db\n\n# Ping it from a temporary alpine container (replace 172.17.0.2 with the real IP)\ndocker run -it --rm alpine ping 172.17.0.2`} 
                />
                <p>Hardcoding IP addresses in configuration files is a recipe for disaster. We need a reliable DNS mechanism.</p>
              </div>
            );
          case "lab15":
            return (
              <div>
                <h2>Lab 15: Custom Networks & DNS</h2>
                <p className="guide-subtitle">Stage 3 — Data & Net | Containers finding each other by name</p>

                <ConceptBox title="Docker DNS Magic">
                  <p style={{ margin: 0 }}>
                    If you create a <strong>User-Defined Network</strong>, Docker activates an internal DNS resolver. Containers on the same custom network can talk to each other directly using their **container names** as hostnames, ignoring dynamic IP addresses completely.
                  </p>
                </ConceptBox>

                <h3>1. Create a Network</h3>
                <CodeBlock title="WSL Terminal" code="docker network create backend-net" />

                <h3>2. Run two containers on the network</h3>
                <p>Deploy a database, then ping it from another container on the same network using its name:</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Run the DB on the custom network\ndocker run -d --name redis-db --network backend-net redis\n\n# Ping the DB BY NAME\ndocker run -it --rm --network backend-net alpine ping redis-db`} 
                />
                <p>Notice how <code>ping redis-db</code> resolves to the correct IP address automatically. This is the foundation of microservice networking in Docker.</p>
              </div>
            );
          case "lab16":
            return (
              <div>
                <h2>Lab 16: Capstone — 3-Tier App</h2>
                <p className="guide-subtitle">Stage 3 — Capstone Project | A Full Microservices Architecture</p>

                <p>Let&apos;s build a real multi-tier architecture: A Node.js API that talks to a Redis Database via internal DNS. The DB is completely hidden from the internet for security.</p>

                <h3>1. Setup the Infrastructure Network</h3>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Create the private network\ndocker network create my-startup-net\n\n# Start the DB, attach to network, NO PORT MAPPING (secured internally)\ndocker run -d \\\n  --name startup-db \\\n  --network my-startup-net \\\n  redis`} 
                />

                <h3>2. Build the API Code</h3>
                <p>Create a directory <code>startup-api</code> and add these files:</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`mkdir startup-api && cd startup-api\ntouch package.json index.js Dockerfile`} 
                />

                <p>Open <code>package.json</code> and paste:</p>
                <CodeBlock 
                  title="package.json" 
                  code={`{\n  "dependencies": { "express": "^4.18.2", "redis": "^4.6.7" }\n}`} 
                />

                <p>Open <code>index.js</code> and paste:</p>
                <CodeBlock 
                  title="index.js" 
                  code={`const express = require('express');\nconst { createClient } = require('redis');\nconst app = express();\n\n// Notice the URL uses the exact container name "startup-db" instead of an IP\nconst client = createClient({ url: 'redis://startup-db:6379' });\nclient.connect().catch(console.error);\n\napp.get('/', async (req, res) => {\n    await client.incr('visits');\n    const visits = await client.get('visits');\n    res.send(\`This page has been visited \${visits} times!\\n\`);\n});\n\napp.listen(3000, () => console.log('API Running on port 3000'));`} 
                />

                <p>Open <code>Dockerfile</code> and paste:</p>
                <CodeBlock 
                  title="Dockerfile" 
                  code={`FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nCMD ["node", "index.js"]`} 
                />

                <h3>3. Deploy the API</h3>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Build the API image\ndocker build -t startup-api .\n\n# Run it on the SAME network, exposing port 8080 externally\ndocker run -d \\\n  --name api-server \\\n  --network my-startup-net \\\n  -p 8080:3000 \\\n  startup-api`} 
                />
                <p>Open <code>http://localhost:8080</code> in your browser and refresh. The counter increments successfully because the API resolves <code>startup-db</code> using internal DNS!</p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 3 Stage Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s3-vol" />
                      <label htmlFor="docker-s3-vol">Persist database data using named Docker Volumes</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s3-bind" />
                      <label htmlFor="docker-s3-bind">Create a bind mount for live-reloading code during development</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s3-bridge" />
                      <label htmlFor="docker-s3-bridge">Understand why default bridge networks require fragile hardcoded IPs</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s3-net" />
                      <label htmlFor="docker-s3-net">Create custom user-defined networks for automatic DNS resolution</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s3-multi" />
                      <label htmlFor="docker-s3-multi">Build a multi-container app where the DB is securely isolated from the public internet</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab17":
            return (
              <div>
                <h2>Lab 17: Intro to YAML</h2>
                <p className="guide-subtitle">Stage 4 — Compose | Stop typing long CLI commands</p>

                <ConceptBox title="Why Docker Compose?">
                  <p style={{ margin: 0 }}>
                    In Lab 16, you typed multiple complex CLI commands to create a network, run a database, and run an API. If you reboot your system, you have to run them all again. <strong>Docker Compose</strong> lets you declare your entire stack inside a single <code>docker-compose.yml</code> file. You run one command (<code>docker-compose up</code>), and the entire stack boots up.
                  </p>
                </ConceptBox>

                <h3>Translating CLI to YAML</h3>
                <p>Let&apos;s translate this CLI command: <code>docker run -d --name my-nginx -p 8080:80 -v config:/etc/nginx nginx</code></p>

                <CodeBlock 
                  title="docker-compose.yml" 
                  code={`version: '3.8'\n\nservices:\n  my-nginx:\n    image: nginx\n    ports:\n      - "8080:80"\n    volumes:\n      - config:/etc/nginx\n\nvolumes:\n  config:`} 
                />
                <p><strong>Note:</strong> YAML relies strictly on spaces (not tabs) for indentation. It is extremely sensitive: 2 spaces = 1 nesting level.</p>
              </div>
            );
          case "lab18":
            return (
              <div>
                <h2>Lab 18: Service Dependencies</h2>
                <p className="guide-subtitle">Stage 4 — Compose | Controlling boot order</p>

                <ErrorCard 
                  error='🔥 Real-World Problem: "My API crashes on startup!"'
                  meaning="You run docker-compose up. The API starts in 0.5 seconds and tries to connect to the DB. However, PostgreSQL takes 5 seconds to fully boot and accept connections. The API fails to connect and crashes permanently."
                  fix="Use the depends_on block to force Compose to wait for the database container to start before starting the API."
                />

                <h3>The depends_on block</h3>
                <CodeBlock 
                  title="docker-compose.yml" 
                  code={`version: '3.8'\nservices:\n  db:\n    image: postgres:15\n\n  api:\n    build: .\n    depends_on:\n      - db`} 
                />
                <p style={{ color: "var(--g-text-muted)" }}>
                  <em>Note: In modern Docker, <code>depends_on</code> waits for the DB container to start, but not necessarily be fully initialized. In production, you combine it with <code>condition: service_healthy</code> to wait until health checks pass.</em>
                </p>
              </div>
            );
          case "lab19":
            return (
              <div>
                <h2>Lab 19: Local Dev Workflow</h2>
                <p className="guide-subtitle">Stage 4 — Compose | Live-reloading with Compose</p>

                <p>You can configure Compose to automatically rebuild your image if the Dockerfile changes, and configure bind mounts for live-reloading code during development.</p>

                <CodeBlock 
                  title="docker-compose.yml" 
                  code={`version: '3.8'\nservices:\n  api:\n    build: .\n    ports:\n      - "3000:3000"\n    volumes:\n      - .:/usr/src/app       # Bind mount host folder to container\n      - /usr/src/app/node_modules  # Anonymous volume to protect container node_modules\n    environment:\n      - NODE_ENV=development`} 
                />

                <h3>The daily workflow commands</h3>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Start the stack and stream logs to stdout\ndocker-compose up\n\n# Start the stack in background (detached)\ndocker-compose up -d\n\n# Force a rebuild of the images (e.g. after changing package.json)\ndocker-compose up --build\n\n# Stop the stack\ndocker-compose down\n\n# Stop the stack AND delete all data volumes (wipe databases)\ndocker-compose down -v`} 
                />
              </div>
            );
          case "lab20":
            return (
              <div>
                <h2>Lab 20: Scaling Services</h2>
                <p className="guide-subtitle">Stage 4 — Compose | Running multiple copies</p>

                <ConceptBox title="The Load Balancer Trick">
                  <p style={{ margin: 0 }}>
                    If you experience high traffic, you want to run multiple identical copies of your API server behind a load balancer. Docker Compose can spin up multiple containers for a service automatically using the <code>--scale</code> flag.
                  </p>
                </ConceptBox>

                <h3>Scaling up</h3>
                <CodeBlock 
                  title="WSL Terminal" 
                  code="docker-compose up -d --scale api=5" 
                />

                <ErrorCard 
                  error='🔥 Real-World Problem: "Port collision when scaling"'
                  meaning="You run --scale api=5 but get: Bind for 0.0.0.0:8080 failed: port is already allocated."
                  fix="If your compose file hardcodes the host port like ports: [&quot;8080:3000&quot;], all 5 replicas try to bind to host port 8080. Remove the host mapping and only expose the container port: ports: [&quot;3000&quot;]. Docker will automatically allocate random host ports to avoid conflicts."
                />
              </div>
            );
          case "lab21":
            return (
              <div>
                <h2>Lab 21: Capstone — E-Commerce Stack</h2>
                <p className="guide-subtitle">Stage 4 — Capstone Project | 4 microservices in one command</p>

                <p>Let&apos;s orchestrate an entire production architecture containing:</p>
                <ol style={{ marginLeft: "20px", color: "var(--g-text)", marginBottom: "20px" }}>
                  <li style={{ marginBottom: "6px" }}>PostgreSQL Database</li>
                  <li style={{ marginBottom: "6px" }}>Redis Cache</li>
                  <li style={{ marginBottom: "6px" }}>Backend Node API</li>
                  <li style={{ margin: 0 }}>Frontend Nginx Web UI</li>
                </ol>

                <h3>The Ultimate docker-compose.yml</h3>
                <CodeBlock 
                  title="docker-compose.yml" 
                  code={`version: '3.8'\n\nservices:\n  # 1. The Database\n  db:\n    image: postgres:15-alpine\n    environment:\n      POSTGRES_PASSWORD: supersecret\n    volumes:\n      - pg-data:/var/lib/postgresql/data\n\n  # 2. The Cache\n  redis:\n    image: redis:alpine\n\n  # 3. The Backend API\n  api:\n    image: node:18-alpine\n    command: sh -c "echo 'API Running' && sleep 3600"\n    ports:\n      - "5000:5000"\n    depends_on:\n      - db\n      - redis\n    environment:\n      - DB_HOST=db\n      - REDIS_HOST=redis\n      - DB_PASS=supersecret\n\n  # 4. The Frontend\n  frontend:\n    image: nginx:alpine\n    ports:\n      - "80:80"\n    depends_on:\n      - api\n\nvolumes:\n  pg-data:`} 
                />

                <h3>Run the stack!</h3>
                <CodeBlock 
                  title="WSL Terminal" 
                  code="docker-compose up -d" 
                />
                <p>You just orchestrated an entire microservices stack. Docker Compose automatically provisions a dedicated network, configures DNS lookups between services, and handles dependencies seamlessly.</p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 4 Stage Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s4-yaml" />
                      <label htmlFor="docker-s4-yaml">Translate complex docker run commands into clean declarative Compose YAML files</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s4-dep" />
                      <label htmlFor="docker-s4-dep">Use depends_on to coordinate startup order and boot dependencies</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s4-build" />
                      <label htmlFor="docker-s4-build">Use docker-compose up --build to force rebuilds during daily coding workflows</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s4-scale" />
                      <label htmlFor="docker-s4-scale">Configure service ports to avoid collisions when scaling containers with --scale</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s4-multi" />
                      <label htmlFor="docker-s4-multi">Launch an entire 4-tier microservice architecture using a single Compose orchestrator</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab22":
            return (
              <div>
                <h2>Lab 22: Image Registries</h2>
                <p className="guide-subtitle">Stage 5 — Production | Shipping your code</p>

                <p>To deploy an image on a production server, you must publish it to a registry (like Docker Hub, GitHub Packages, or AWS ECR).</p>

                <h3>1. Tagging for a Registry</h3>
                <p>To push to Docker Hub, your image name must be prefixed with your username:</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Syntax: docker tag SOURCE_IMAGE USERNAME/IMAGE_NAME:VERSION\ndocker tag my-api:latest johndoe/my-api:v1.0.0`} 
                />

                <h3>2. Authenticate and Push</h3>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Log in to your registry credentials\ndocker login\n\n# Push the image to the cloud\ndocker push johndoe/my-api:v1.0.0`} 
                />
                <p style={{ color: "var(--g-text-muted)" }}>
                  <em>Once pushed, any server in the world can fetch and run your container using: <code>docker run johndoe/my-api:v1.0.0</code>.</em>
                </p>
              </div>
            );
          case "lab23":
            return (
              <div>
                <h2>Lab 23: Security & Non-Root</h2>
                <p className="guide-subtitle">Stage 5 — Production | Never run as Root</p>

                <ConceptBox title="The Root User Threat">
                  <p style={{ margin: 0 }}>
                    By default, processes inside a Docker container execute as the <code>root</code> user. If an attacker exploits a vulnerability inside your application, they gain root access to the container. With root access, they can potentially break out of the container boundary and compromise the host machine.
                  </p>
                </ConceptBox>

                <h3>Securing the Dockerfile</h3>
                <p>We must explicitly instruct Docker to run as a non-privileged user. In Node images, a restricted user named <code>node</code> is pre-installed.</p>
                <CodeBlock 
                  title="Dockerfile" 
                  code={`FROM node:18-alpine\nWORKDIR /app\nCOPY package.json .\nRUN npm install\nCOPY . .\n\n# 🔒 SECURITY: Switch from root to the restricted 'node' user\nUSER node\n\nCMD ["npm", "start"]`} 
                />

                <ErrorCard 
                  error='🔥 Real-World Problem: "EACCES: permission denied, mkdir /app/node_modules"'
                  meaning="You added USER node, but the application crashes on startup because it cannot write files or directories."
                  fix="The files were copied into the container by the root user, so the node user does not have write access. Fix this by setting ownership in the COPY instruction: COPY --chown=node:node . ."
                />
              </div>
            );
          case "lab24":
            return (
              <div>
                <h2>Lab 24: Vulnerability Scanning</h2>
                <p className="guide-subtitle">Stage 5 — Production | Finding CVEs</p>

                <p>Starting your Dockerfile with outdated base images like <code>FROM node:14</code> introduces hundreds of known vulnerabilities (CVEs) into your production stack, violating compliance standards.</p>

                <h3>Scanning your image</h3>
                <p>Docker Desktop includes <code>docker scout</code> to scan images for software vulnerabilities directly from the command line:</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Scan a target image for High and Critical vulnerabilities\ndocker scout cves nginx:latest`} 
                />
                <p>If security alerts appear, resolve them by updating the base image to a modern version (e.g. changing <code>FROM node:14</code> to <code>FROM node:20-alpine</code>) and rebuilding.</p>
              </div>
            );
          case "lab25":
            return (
              <div>
                <h2>Lab 25: Resource Limits</h2>
                <p className="guide-subtitle">Stage 5 — Production | Preventing server crashes</p>

                <ConceptBox title="The Memory Leak Threat">
                  <p style={{ margin: 0 }}>
                    By default, a container is allowed to consume 100% of the host machine&apos;s CPU and memory resources. If an application suffers from a memory leak, it can starve the host OS, leading to a complete system crash and taking down all sibling containers.
                  </p>
                </ConceptBox>

                <h3>Enforcing Limits</h3>
                <p>Apply resource constraints directly in your docker run command to isolate resource usage:</p>
                <CodeBlock 
                  title="WSL Terminal" 
                  code={`# Restrict to 512MB RAM and exactly half of one CPU core\ndocker run -d \\\n  --name safe-api \\\n  --memory="512m" \\\n  --cpus="0.5" \\\n  my-api:latest`} 
                />
                <p>If the container attempts to exceed 512MB, Docker terminates it immediately (OOMKilled), preserving host server stability.</p>
              </div>
            );
          case "lab26":
            return (
              <div>
                <h2>Lab 26: Logging Drivers</h2>
                <p className="guide-subtitle">Stage 5 — Production | Preventing disk exhaustion</p>

                <ErrorCard 
                  error='🔥 Real-World Problem: "No space left on device"'
                  meaning="Your server runs perfectly for 3 months, then suddenly crashes. You inspect the disk usage and discover a single container log file has ballooned to 60GB."
                  fix="By default, Docker saves logs to a JSON file and never rotates them. You must configure log rotation limits on all production containers."
                />

                <h3>Setting Log Rotation Limits</h3>
                <p>Add logging options inside your docker-compose file to limit the log size automatically:</p>
                <CodeBlock 
                  title="docker-compose.yml" 
                  code={`services:\n  api:\n    image: my-api:latest\n    logging:\n      driver: "json-file"\n      options:\n        max-size: "10m"   # Rotate logs when they hit 10MB\n        max-file: "3"     # Keep only the last 3 rotated files`} 
                />
                <p style={{ color: "var(--g-text-muted)" }}>
                  <em>Now, Docker limits the disk consumption of this container&apos;s logs to a maximum of 30MB.</em>
                </p>
              </div>
            );
          case "lab27":
            return (
              <div>
                <h2>Lab 27: Capstone — Production Readiness</h2>
                <p className="guide-subtitle">Stage 5 — Capstone Project | The Ultimate Deployment</p>

                <p>You are deploying an API server to production. You must compile resource limits, restart policy, and log rotation options into a bulletproof docker-compose file.</p>

                <h3>The Production-Ready Compose File</h3>
                <CodeBlock 
                  title="docker-compose.prod.yml" 
                  code={`version: '3.8'\n\nservices:\n  prod-api:\n    # 1. Pulling pre-built images (not building locally on server)\n    image: johndoe/my-api:v1.0.0\n    \n    # 2. Restart policy (recover if it crashes)\n    restart: unless-stopped\n    \n    # 3. Hard resource limits\n    deploy:\n      resources:\n        limits:\n          cpus: '1.0'\n          memory: 1G\n          \n    # 4. Log rotation limits\n    logging:\n      driver: "json-file"\n      options:\n        max-size: "50m"\n        max-file: "3"\n        \n    ports:\n      - "80:3000"`} 
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 5 Stage Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s5-reg" />
                      <label htmlFor="docker-s5-reg">Tag and publish container images to a remote Docker Registry</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s5-user" />
                      <label htmlFor="docker-s5-user">Secure containers by executing processes as a non-root USER</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s5-scout" />
                      <label htmlFor="docker-s5-scout">Scan images for software vulnerabilities using docker scout</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s5-res" />
                      <label htmlFor="docker-s5-res">Defend servers against memory leaks using cpus and memory constraints</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s5-logs" />
                      <label htmlFor="docker-s5-logs">Protect storage from full logs using docker logging drivers and rotations</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-s5-compose" />
                      <label htmlFor="docker-s5-compose">Build a highly resilient, resource-capped, production-ready docker-compose configuration</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "errors":
            return (
              <div>
                <h2>🚨 Master Error Reference</h2>
                <p className="guide-subtitle">How to translate Docker errors into English.</p>

                <ConceptBox title="The Golden Rule of Debugging Docker">
                  <p style={{ margin: 0 }}>
                    If a container crashes, <strong>DO NOT</strong> blindly change configuration settings. Stop and run: <code>docker logs &lt;container_name&gt;</code>. The root cause is almost always printed in the log output.
                  </p>
                </ConceptBox>

                <h3>1. Connection Refused / Can&apos;t access website</h3>
                <ErrorCard 
                  error="Error: Site can't be reached (localhost refused to connect)"
                  meaning="The application inside the container is running, but you did not expose the port correctly, or you mapped it backwards."
                  fix="Ensure you ran the container using: -p HOST_PORT:CONTAINER_PORT. If your web app listens on port 3000 inside the container, you must expose it via -p 8080:3000. Also, ensure your application code binds to host address 0.0.0.0, not local loopback 127.0.0.1."
                />

                <h3>2. Port Conflicts</h3>
                <ErrorCard 
                  error="Error: Bind for 0.0.0.0:8080 failed: port is already allocated"
                  meaning="You are attempting to start a container bound to host port 8080, but another process or container is already utilizing that port."
                  fix="Run docker ps to verify if a dormant or active container is occupying the port. Terminate it with docker rm -f <id>. Alternatively, change your command host port mapping (e.g. -p 9090:8080)."
                />

                <h3>3. File Permission Issues</h3>
                <ErrorCard 
                  error="Error: EACCES: permission denied, mkdir '/app/node_modules'"
                  meaning="The user executing processes inside the container (e.g. the restricted node user) does not have write privileges to that folder."
                  fix="In your Dockerfile, verify you appended: COPY --chown=node:node . . to delegate write permissions to the restricted node process."
                />

                <h3>4. Docker Daemon Issues</h3>
                <ErrorCard 
                  error="Error: Cannot connect to the Docker daemon at unix:///var/run/docker.sock"
                  meaning="The Docker engine is stopped, or your WSL session does not have administrative rights to establish a connection."
                  fix="Start the Docker Desktop application on Windows. Navigate to Settings > Resources > WSL Integration and verify integration is active for your target WSL Linux distro (Ubuntu)."
                />

                <h3>5. Ghost Containers</h3>
                <ErrorCard 
                  error="Error: Conflict. The container name &quot;/my-app&quot; is already in use by container..."
                  meaning="You stopped a container named my-app, but did not delete its registry entry from Docker. It remains in a dormant state."
                  fix="Run docker rm my-app to permanently erase the old container definition, then re-execute your docker run command."
                />

                <div style={{ textalign: "center", margin: "64px 0", padding: "40px", backgroundColor: "rgba(63, 185, 80, 0.1)", borderRadius: "12px", border: "1px solid var(--g-green)" }}>
                  <h2 style={{ color: "var(--g-green)", border: "none", marginTop: 0, paddingBottom: 0 }}>🎓 You are a Docker Expert!</h2>
                  <p style={{ fontSize: "1.1rem", margin: "16px 0 0" }}>You have completed all 5 stages of the Docker Mastery Guide.<br />You are now ready to containerize and deploy any application in the real world.</p>
                </div>
              </div>
            );
          case "destroy":
            return (
              <div>
                <h2>🗑️ Destroy AWS Resources</h2>
                <p className="guide-subtitle">Don&apos;t blow your $160 free credits.</p>

                <ConceptBox title="Why this is critical">
                  <p style={{ margin: 0 }}>
                    If you utilized Option B (AWS Cloud EC2 instance) to run Docker, you are billed by the hour. If you close your laptop without terminating the instance, it will eventually consume your entire credit allocation. You must explicitly terminate the server in the console.
                  </p>
                </ConceptBox>

                <h3>Step 1: Save your data (Optional)</h3>
                <p>Ensure any custom Dockerfiles or scripts are committed and pushed to GitHub, or copied to your local machine before terminating the server.</p>

                <h3>Step 2: Terminate the EC2 Instance</h3>
                <p>Log into your AWS Account and complete these steps:</p>
                <ol style={{ marginLeft: "20px", color: "var(--g-text)", display: "flex", flexDirection: "column", gap: "10px", margin: "20px 0" }}>
                  <li>Navigate to the <strong>EC2 Dashboard</strong> in your active region.</li>
                  <li>Click on <strong>Instances (running)</strong>.</li>
                  <li>Select the checkbox next to your Docker training server.</li>
                  <li>Click <strong>Instance state</strong> (top right) &gt; <strong>Terminate instance</strong>.</li>
                  <li>Confirm the termination. The state will change to <em>Shutting-down</em> and then <em>Terminated</em>.</li>
                </ol>

                <ErrorCard 
                  error="🔥 Real-World Mistake: Stopping vs Terminating"
                  meaning="You selected Stop Instance instead of Terminate. Your AWS billing charges continue to accumulate."
                  fix="Stopping an instance only pauses CPU billing. AWS continues charging you for the EBS storage volume (hard drive) attached to the stopped instance. You must Terminate the instance to permanently remove the EBS volume and halt all associated charges."
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Deletion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-del-git" />
                      <label htmlFor="docker-del-git">Pushed all critical code configurations/Dockerfiles to GitHub</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-del-terminate" />
                      <label htmlFor="docker-del-terminate">Verified the EC2 instance state reports Terminated in AWS Console</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="docker-del-billing" />
                      <label htmlFor="docker-del-billing">Checked the billing dashboard to ensure no active EBS volumes or IPs remain</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          default:
            return <div>Select a section from the sidebar.</div>;
        }
      }}
    </GuideWrapper>
  );
}
