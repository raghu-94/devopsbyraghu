"use client";

import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox, TipBox, WarningBox, ErrorCard, Quiz } from "@/components/guide/GuideComponents";

export default function TerraformMastery() {
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
        { id: "lab1", title: "Lab 1: Why Terraform?" },
        { id: "lab2", title: "Lab 2: Install & Providers" },
        { id: "lab3", title: "Lab 3: The Core Workflow" },
        { id: "lab4", title: "Lab 4: First Resource" },
        { id: "lab5", title: "Lab 5: Capstone (EC2 + SG)" }
      ]
    },
    {
      title: "Stage 2: Core Workflow",
      items: [
        { id: "lab6", title: "Lab 6: Variables" },
        { id: "lab7", title: "Lab 7: Outputs & Data Sources" },
        { id: "lab8", title: "Lab 8: Dependencies" },
        { id: "lab9", title: "Lab 9: user_data & Provisioners" },
        { id: "lab10", title: "Lab 10: Capstone (Web Stack)" }
      ]
    },
    {
      title: "Stage 3: State Management",
      items: [
        { id: "lab11", title: "Lab 11: The State File" },
        { id: "lab12", title: "Lab 12: Remote State (S3 + Lock)" },
        { id: "lab13", title: "Lab 13: State Surgery & Import" },
        { id: "lab14", title: "Lab 14: Workspaces" },
        { id: "lab15", title: "Lab 15: Capstone (Migrate State)" }
      ]
    },
    {
      title: "Stage 4: Modules",
      items: [
        { id: "lab16", title: "Lab 16: Your First Module" },
        { id: "lab17", title: "Lab 17: count vs for_each" },
        { id: "lab18", title: "Lab 18: Locals & Conditionals" },
        { id: "lab19", title: "Lab 19: Terraform Registry" },
        { id: "lab20", title: "Lab 20: Capstone (VPC Module)" }
      ]
    },
    {
      title: "Stage 5: Production",
      items: [
        { id: "lab21", title: "Lab 21: Secrets & Sensitive Data" },
        { id: "lab22", title: "Lab 22: Least-Privilege IAM" },
        { id: "lab23", title: "Lab 23: CI/CD with GitHub Actions" },
        { id: "lab24", title: "Lab 24: Drift Detection" },
        { id: "lab24b", title: "Lab 24b: Debugging Terraform" },
        { id: "lab25", title: "Lab 25: Capstone (Prod Pipeline)" }
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
      title="Terraform Mastery Guide" 
      subtitle="A complete 5-stage interactive course for WSL + AWS users."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case "overview":
            return (
              <div>
                <h2>Terraform Mastery: Beginner to Real-World Expert</h2>
                <p className="guide-subtitle">A complete 5-stage interactive course for WSL + AWS users.</p>

                <ConceptBox title="How to use this guide">
                  <p style={{ margin: 0 }}>
                    This is a <strong>hands-on laboratory</strong>, not a reading exercise. Every code block has a specific file it belongs in and a specific terminal it runs in. If you see a code block, write it and run it — don't just read it.
                  </p>
                </ConceptBox>

                <h3>The "ClickOps" Problem</h3>
                <p>Before Terraform, infrastructure was built by clicking through the AWS Console: launch an EC2 instance here, attach a security group there, remember to tag it, remember what you clicked six months ago when it breaks. Nobody can review a click in a pull request. Nobody can diff a click. When the person who built it leaves the company, the knowledge leaves with them.</p>
                <p>Terraform replaces clicking with <strong>code</strong>. You describe the infrastructure you want in <code>.tf</code> files, Terraform compares that to what actually exists, and calculates the exact set of API calls needed to make reality match your code. That diff-and-apply model is the entire idea — everything else in this guide is detail on top of it.</p>

                <h3>💰 Cost & Infrastructure Options</h3>
                <p>This guide uses <strong>real AWS resources</strong> (EC2, S3, DynamoDB) because Terraform's whole job is managing real infrastructure — there's no meaningful way to learn it against a fake API.</p>
                <TipBox>
                  <strong>Free Tier Coverage:</strong> Every resource used in this guide (t2.micro/t3.micro EC2, small S3 buckets, on-demand DynamoDB with near-zero usage) fits inside the AWS Free Tier or your $160 in trial credits if you keep things running for hours, not weeks.
                </TipBox>
                <WarningBox>
                  <strong>⚠️ The real risk isn't running these labs — it's forgetting to destroy them.</strong> Stage 3 onward creates an S3 bucket + DynamoDB table that exist outside normal teardown flow. The <strong>Destroy Resources</strong> section at the end exists specifically to stop that from costing you money. Read it before you start, not after.
                </WarningBox>

                <h3>🛠️ Prerequisites — Install These First</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "24px 0" }}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>1</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Install Terraform CLI</strong>
                      <p style={{ margin: "4px 0" }}>Inside your WSL (Ubuntu) terminal:</p>
                      <CodeBlock title="WSL Terminal" code={`wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg\necho "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list\nsudo apt update && sudo apt install terraform`} />
                      <ErrorCard 
                        error='🔥 Setup Error: "terraform: command not found"'
                        meaning="The binary installed but your shell's PATH doesn't know where to find it, or the apt install silently failed because the repo wasn't added correctly."
                        fix="Run \`which terraform\`. If empty, re-run the four commands above one at a time and check each one for errors before moving to the next, instead of pasting all four at once."
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>2</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Install & configure the AWS CLI</strong>
                      <p style={{ margin: "4px 0" }}>Terraform's AWS provider uses the same credential chain as the AWS CLI, so set this up first:</p>
                      <CodeBlock title="WSL Terminal" code={`curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"\nunzip awscliv2.zip && sudo ./aws/install\naws configure\n# Paste your AWS Access Key ID, Secret Access Key, default region (e.g. ap-south-1), and output format (json)`} />
                      <ErrorCard 
                        error='🔥 Setup Error: "aws: command not found" after install'
                        meaning="The installer ran but didn't add \`/usr/local/bin\` to your WSL shell's PATH, or the \`sudo ./aws/install\` step failed silently because \`unzip\` wasn't installed."
                        fix="Run \`sudo apt install unzip -y\` first, then re-run the three install commands. Confirm with \`which aws\` — if it prints a path, the binary is found. If \`aws configure\` was already run before fixing the PATH, run it again — the credentials file is separate from the binary."
                      />
                      <TipBox>
                        <strong>💻 Verify both installs before continuing — don't skip this step:</strong>
                        <CodeBlock title="WSL Terminal" code={`terraform -version\naws sts get-caller-identity`} />
                        <span style={{color: "var(--g-text-muted)"}}>If \`aws sts get-caller-identity\` returns your Account ID and User ARN, your credentials are wired up correctly and Terraform will be able to use them.</span>
                      </TipBox>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>3</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>VS Code Setup</strong>
                      <p style={{ margin: "4px 0" }}>Install the official <strong>HashiCorp Terraform</strong> extension (by HashiCorp) in VS Code for syntax highlighting, auto-formatting, and inline validation. Connect VS Code to your WSL window the same way you would for any other DevOps tool.</p>
                    </div>
                  </div>
                </div>

                <h3>The 5 Stages to Mastery</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Stage</th>
                      <th>Focus</th>
                      <th>What You'll Build</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>1. Foundations</td><td>CLI workflow, providers, first resource</td><td>An EC2 instance + security group</td></tr>
                    <tr><td>2. Core Workflow</td><td>Variables, outputs, data sources, dependencies</td><td>A parameterized web server stack</td></tr>
                    <tr><td>3. State Management</td><td>Remote state, locking, workspaces, import</td><td>Migrate local state to an S3 + DynamoDB backend</td></tr>
                    <tr><td>4. Modules</td><td>Reusability, count/for_each, the public registry</td><td>A reusable VPC module for dev + prod</td></tr>
                    <tr><td>5. Production</td><td>Secrets, least-privilege IAM, CI/CD, drift</td><td>A GitHub Actions plan/apply pipeline</td></tr>
                  </tbody>
                </table>
              </div>
            );
          
          case "lab1":
            return (
              <div>
                <h2>Lab 1: Why Terraform?</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Infrastructure as Code, explained without the buzzwords</p>

                <ConceptBox title="The Problem Terraform Solves">
                  <p style={{ margin: 0 }}>
                    Imagine you manually built a server in the AWS Console. Six months later it breaks. Do you remember every setting you clicked? Could a teammate rebuild it exactly, including the one checkbox you toggled at 2am? This is <strong>configuration drift</strong> — the gap between what you think your infrastructure looks like and what it actually looks like. Terraform closes that gap by making the code itself the single source of truth.
                  </p>
                </ConceptBox>

                <h3>ClickOps vs Infrastructure as Code</h3>
                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr>
                      <th>Manual Console ("ClickOps")</th>
                      <th>Terraform (IaC)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>No record of what was clicked or why.</td><td>Every resource and setting is plain text in version control.</td></tr>
                    <tr><td>Rebuilding an environment means remembering steps.</td><td>Rebuilding is <code>terraform apply</code> — identical every time.</td></tr>
                    <tr><td>Code review is impossible — there's no diff for a click.</td><td>Changes go through pull requests with a readable plan diff.</td></tr>
                    <tr><td>Tearing down 20 resources means deleting them one by one.</td><td><code>terraform destroy</code> removes everything it created, in order.</td></tr>
                  </tbody>
                </table>

                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`Your .tf Code  →  terraform plan  →  terraform apply  →  Provider API (AWS)  →  Real Infrastructure
(desired state)   (the diff)         (executes the diff)                            (actual state)`}
                </pre>

                <ConceptBox title="Terraform isn't AWS-only">
                  <p style={{ margin: 0 }}>
                    Terraform talks to almost any platform — AWS, Azure, GCP, Kubernetes, Cloudflare, even GitHub itself — through plugins called <strong>providers</strong>. The workflow you learn here (init → plan → apply) is identical no matter which provider you point it at. This guide uses AWS because it's the most common pairing in real DevOps jobs, but the core skill transfers everywhere.
                  </p>
                </ConceptBox>

                <Quiz 
                  question="A teammate manually deletes a security group rule in the AWS Console that Terraform created. What happens the next time someone runs \`terraform plan\`?"
                  answer="Terraform compares its state file against real AWS infrastructure during every plan/apply. It will detect that the rule is missing and show it as something to be re-created (a \`+\` in the plan output). This is called drift detection — you'll build a real workflow around this exact scenario in Lab 24."
                />
              </div>
            );

          case "lab2":
            return (
              <div>
                <h2>Lab 2: Providers & Your First Config File</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Telling Terraform which cloud to talk to</p>

                <h3>1. Create your project folder</h3>
                <CodeBlock title="WSL Terminal" code={`mkdir ~/terraform-foundations && cd ~/terraform-foundations\ntouch main.tf`} />

                <h3>2. Write the Provider Block</h3>
                <ConceptBox title="What is a Provider?">
                  <p style={{ margin: 0 }}>
                    A provider is a plugin that translates your <code>.tf</code> code into actual API calls. The <code>aws</code> provider knows how to talk to AWS's API; a <code>kubernetes</code> provider would know how to talk to a cluster instead. Nothing happens until you declare one.
                  </p>
                </ConceptBox>

                <CodeBlock title="main.tf — paste this" code={`terraform {\n  required_version = ">= 1.7.0"\n  required_providers {\n    aws = {\n      source  = "hashicorp/aws"\n      version = "~> 5.0"\n    }\n  }\n}\n\nprovider "aws" {\n  region = "ap-south-1"\n}`} />

                <p><strong>What each block does:</strong></p>
                <ul style={{ marginLeft: "20px" }}>
                  <li><code>required_version</code> — pins the minimum Terraform CLI version, so old binaries don't silently misinterpret new syntax.</li>
                  <li><code>required_providers</code> — pins the provider source and version range. <code>~&gt; 5.0</code> means "any 5.x release, but never 6.0" — this is what stops a surprise breaking change from wrecking your pipeline.</li>
                  <li><code>provider "aws"</code> — the actual configuration block; <code>region</code> tells AWS where new resources should be created by default.</li>
                </ul>

                <h3>3. Initialize the working directory</h3>
                <CodeBlock title="WSL Terminal — inside terraform-foundations/" code={`terraform init`} />
                <p style={{ color: "var(--g-text-muted)" }}><em>This downloads the AWS provider plugin into a hidden <code>.terraform/</code> folder and creates a <code>.terraform.lock.hcl</code> file that pins the exact provider version used — commit this lock file to git, but never commit <code>.terraform/</code> itself.</em></p>

                <ErrorCard 
                  error='🔥 Real-World Problem: "No valid credential sources found"'
                  meaning="Terraform's AWS provider looks for credentials in the same chain the AWS CLI uses (environment variables, ~/.aws/credentials, IAM role). If none exist, it can't authenticate."
                  fix="Run \`aws configure\` from the Overview prerequisites if you skipped it, then re-run \`terraform init\`. You don't put AWS keys inside .tf files — ever."
                />
              </div>
            );

          case "lab3":
            return (
              <div>
                <h2>Lab 3: The Core Workflow</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | init, fmt, validate, plan, apply, destroy</p>

                <ConceptBox title="The Loop You'll Run Forever">
                  <p style={{ margin: 0 }}>
                    Every single Terraform task in your career — from a one-line tweak to a 200-resource migration — uses this same loop. Memorize the order, not just the commands.
                  </p>
                </ConceptBox>

                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto" }}>
{`terraform init      → download providers, set up backend
terraform fmt       → auto-format code to canonical style
terraform validate  → check syntax is structurally valid
terraform plan      → calculate the diff (no changes made yet)
terraform apply     → execute the diff against real infrastructure
terraform destroy   → tear everything this config created back down`}
                </pre>

                <h3>1. Format and validate</h3>
                <CodeBlock title="WSL Terminal" code={`terraform fmt\nterraform validate`} />
                <p style={{ color: "var(--g-text-muted)" }}><em><code>fmt</code> rewrites indentation/spacing to Terraform's standard style — run it before every commit so diffs in pull requests only show real changes, not whitespace noise.</em></p>

                <h3>2. Plan — read this output carefully</h3>
                <CodeBlock title="WSL Terminal" code={`terraform plan`} />

                <table style={{ width: "100%", margin: "24px 0" }}>
                  <thead>
                    <tr><th>Symbol</th><th>Meaning</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><code>+</code></td><td>Resource will be created</td></tr>
                    <tr><td><code>-</code></td><td>Resource will be destroyed</td></tr>
                    <tr><td><code>~</code></td><td>Resource will be updated in-place (no downtime, e.g. a tag change)</td></tr>
                    <tr><td><code>-/+</code></td><td>Resource will be <strong>destroyed and recreated</strong> — this can mean downtime or data loss</td></tr>
                  </tbody>
                </table>

                <WarningBox>
                  <strong>⚠️ The single most expensive mistake new Terraform users make:</strong> skimming past a <code>-/+</code> line. That symbol means Terraform is about to delete something — a database, an EC2 instance — and rebuild it from scratch. Always scroll through the full plan output before typing "yes," especially on anything stateful.
                </WarningBox>

                <h3>3. Apply</h3>
                <CodeBlock title="WSL Terminal" code={`terraform apply\n# Terraform shows the plan again and asks: "Do you want to perform these actions?"\n# Type exactly: yes`} />

                <WarningBox>
                  <strong>⚠️ Avoid <code>terraform apply -auto-approve</code> while learning.</strong> It skips the confirmation prompt entirely. It exists for CI pipelines where a human already approved the plan in a separate step (you'll build that in Lab 23) — not for your local terminal.
                </WarningBox>

                <ErrorCard 
                  error='🔥 Real-World Problem: Unexpected -/+ replacement on apply'
                  meaning="You changed an attribute that AWS doesn't support updating in-place — Terraform has no choice but to destroy the existing resource and create a new one. This can mean downtime or data loss for stateful resources like databases or instances with local storage."
                  fix="Never type 'yes' on a \`-/+\` line you didn't expect. Read the provider docs for that attribute — they will say 'Changing this forces a new resource.' If recreation is unacceptable, look for a \`lifecycle { create_before_destroy = true }\` block to reduce downtime, or find a different attribute to change your intent. When in doubt: stop, read, don't apply."
                />
              </div>
            );

          case "lab4":
            return (
              <div>
                <h2>Lab 4: Your First Real Resource</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Creating an S3 bucket end to end</p>

                <h3>1. Add a resource block</h3>
                <p>Append this to the same <code>main.tf</code> from Lab 2:</p>
                <CodeBlock title="main.tf — append this" code={`resource "aws_s3_bucket" "my_first_bucket" {\n  bucket = "raghu-terraform-lab-changeme123"\n\n  tags = {\n    Project = "terraform-foundations"\n    Stage   = "lab4"\n  }\n}`} />

                <ConceptBox title="Reading a Resource Address">
                  <p style={{ margin: 0 }}>
                    <code>resource "aws_s3_bucket" "my_first_bucket"</code> breaks down as: <strong>resource type</strong> (<code>aws_s3_bucket</code>, defined by the provider) + <strong>local name</strong> (<code>my_first_bucket</code>, yours to choose). Together they form the address <code>aws_s3_bucket.my_first_bucket</code> — this is how you'll reference this resource from anywhere else in your config.
                  </p>
                </ConceptBox>

                <h3>2. Plan, then apply</h3>
                <CodeBlock title="WSL Terminal" code={`terraform plan\nterraform apply`} />
                <p>Check the AWS Console → S3. Your bucket exists, created entirely from code.</p>

                <ErrorCard 
                  error='🔥 Real-World Problem: Bucket name already exists'
                  meaning="S3 bucket names are globally unique across EVERY AWS account on Earth, not just yours. Someone else has already claimed that exact name."
                  fix="Add a unique suffix — your initials plus a random number works fine for labs. In production, teams generate bucket names programmatically (e.g. appending the AWS account ID) to guarantee uniqueness."
                />
              </div>
            );

          case "lab5":
            return (
              <div>
                <h2>Lab 5: Capstone — EC2 Instance + Security Group</h2>
                <p className="guide-subtitle">Stage 1 — Capstone Project | Provision a real, reachable server</p>

                <p>You'll combine everything from Stage 1 into one working config: a provider, a security group controlling access, and an EC2 instance — the same shape as 90% of real-world first deployments.</p>

                <h3>1. New project folder</h3>
                <CodeBlock title="WSL Terminal" code={`mkdir ~/terraform-ec2-capstone && cd ~/terraform-ec2-capstone\ntouch main.tf`} />

                <h3>2. The full configuration</h3>
                <CodeBlock title="main.tf" code={`terraform {\n  required_providers {\n    aws = {\n      source  = "hashicorp/aws"\n      version = "~> 5.0"\n    }\n  }\n}\n\nprovider "aws" {\n  region = "ap-south-1"\n}\n\nresource "aws_security_group" "web_sg" {\n  name        = "capstone-web-sg"\n  description = "Allow SSH and HTTP"\n\n  ingress {\n    description = "SSH from anywhere (lab only — never do this in prod)"\n    from_port   = 22\n    to_port     = 22\n    protocol    = "tcp"\n    cidr_blocks = ["0.0.0.0/0"]\n  }\n\n  ingress {\n    description = "HTTP"\n    from_port   = 80\n    to_port     = 80\n    protocol    = "tcp"\n    cidr_blocks = ["0.0.0.0/0"]\n  }\n\n  egress {\n    from_port   = 0\n    to_port     = 0\n    protocol    = "-1"\n    cidr_blocks = ["0.0.0.0/0"]\n  }\n}\n\nresource "aws_instance" "web_server" {\n  ami                    = "ami-0e35ddab05955cf57" # Amazon Linux 2023, ap-south-1\n  instance_type          = "t2.micro"\n  vpc_security_group_ids = [aws_security_group.web_sg.id]\n\n  tags = {\n    Name = "capstone-web-server"\n  }\n}\n\noutput "instance_public_ip" {\n  value = aws_instance.web_server.public_ip\n}`} />

                <ConceptBox title="Spot the implicit dependency">
                  <p style={{ margin: 0 }}>
                    <code>vpc_security_group_ids = [aws_security_group.web_sg.id]</code> doesn't just set a value — it tells Terraform that <code>aws_instance.web_server</code> depends on <code>aws_security_group.web_sg</code>. Terraform automatically creates the security group <em>first</em>, waits for its real AWS ID, then creates the instance. You never had to write "do this before that" — the reference did it for you. We'll go deeper on this in Lab 8.
                  </p>
                </ConceptBox>

                <h3>3. Run it</h3>
                <CodeBlock title="WSL Terminal — inside terraform-ec2-capstone/" code={`terraform init\nterraform plan\nterraform apply`} />

                <p>After apply finishes, Terraform prints the <code>instance_public_ip</code> output. SSH into it to confirm it's real:</p>
                <CodeBlock title="WSL Terminal" code={`ssh ec2-user@<the_public_ip_from_output>`} />

                <TipBox>
                  <strong>💡 Keep this running</strong> — Stage 2's capstone builds directly on top of this same pattern. If you want to tear it down now anyway, jump to the <strong>Destroy Resources</strong> section for the safe order to do it in.
                </TipBox>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 1 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s1-1" /><label htmlFor="tf-s1-1">Explain why Infrastructure as Code beats manual console changes</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s1-2" /><label htmlFor="tf-s1-2">Write a provider block and run terraform init</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s1-3" /><label htmlFor="tf-s1-3">Run the full init → plan → apply loop from memory</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s1-4" /><label htmlFor="tf-s1-4">Read a plan diff and correctly identify a -/+ replace operation</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s1-5" /><label htmlFor="tf-s1-5">Provision a real, SSH-reachable EC2 instance with a security group</label></li>
                  </ul>
                </div>
              </div>
            );

          case "lab6":
            return (
              <div>
                <h2>Lab 6: Variables</h2>
                <p className="guide-subtitle">Stage 2 — Core Workflow | Stop hardcoding values</p>

                <ConceptBox title="Why Variables Matter">
                  <p style={{ margin: 0 }}>
                    Your Lab 5 config hardcodes the region, AMI, and instance type. To deploy to a different environment (staging vs prod), you'd have to copy-paste the whole file and manually edit it — guaranteeing the two will eventually drift apart. Variables let one config file serve every environment.
                  </p>
                </ConceptBox>

                <h3>1. Declare variables</h3>
                <CodeBlock title="variables.tf" code={`variable "aws_region" {\n  description = "AWS region to deploy into"\n  type        = string\n  default     = "ap-south-1"\n}\n\nvariable "instance_type" {\n  description = "EC2 instance size"\n  type        = string\n  default     = "t2.micro"\n}\n\nvariable "environment" {\n  description = "Deployment environment name"\n  type        = string\n  # No default — this one is required, forcing a deliberate choice every time\n}`} />

                <h3>2. Use them in main.tf</h3>
                <CodeBlock title="main.tf — replace the hardcoded values" code={`provider "aws" {\n  region = var.aws_region\n}\n\nresource "aws_instance" "web_server" {\n  ami           = "ami-0e35ddab05955cf57"\n  instance_type = var.instance_type\n\n  tags = {\n    Name        = "web-server-\${var.environment}"\n    Environment = var.environment\n  }\n}`} />

                <h3>3. Three ways to supply values</h3>
                <CodeBlock title="WSL Terminal" code={`# Option A: a .tfvars file (most common for real projects)\necho 'environment = "dev"' > dev.tfvars\nterraform apply -var-file="dev.tfvars"\n\n# Option B: inline flag (quick overrides)\nterraform apply -var="environment=staging"\n\n# Option C: environment variable (useful in CI — prefix with TF_VAR_)\nexport TF_VAR_environment="ci-test"\nterraform apply`} />

                <ErrorCard 
                  error='🔥 Real-World Problem: Missing required variable'
                  meaning="You declared \`environment\` with no default, which makes it mandatory. Terraform refuses to guess — it stops and asks rather than deploying with an empty value."
                  fix="Supply it with one of the three methods above. This 'fail loudly instead of guessing' behavior is intentional — it's what stops someone from accidentally deploying to the wrong environment."
                />

                <div style={{ marginTop: "32px" }}>
                  <Quiz 
                    question="Why intentionally leave a variable like `environment` without a default value, instead of defaulting it to `'dev'`?"
                    answer="A default value means someone can run `terraform apply` without thinking about which environment they're targeting. If 'dev' were the default, a typo'd or rushed command in a prod directory could silently apply prod-shaped resources tagged as dev — or worse, the reverse. Forcing an explicit value for anything environment-determining is a deliberate safety rail, not an oversight."
                  />
                </div>
              </div>
            );

          case "lab7":
            return (
              <div>
                <h2>Lab 7: Outputs & Data Sources</h2>
                <p className="guide-subtitle">Stage 2 — Core Workflow | Reading values out, and looking values up</p>

                <h3>1. Outputs — getting values out of Terraform</h3>
                <CodeBlock title="outputs.tf" code={`output "public_ip" {\n  description = "Public IP address of the web server"\n  value       = aws_instance.web_server.public_ip\n}\n\noutput "instance_id" {\n  value = aws_instance.web_server.id\n}`} />

                <CodeBlock title="WSL Terminal" code={`# See all outputs after an apply\nterraform output\n\n# Get just one value (useful for scripting, e.g. piping into ssh)\nterraform output -raw public_ip`} />

                <h3>2. Data Sources — looking values up instead of hardcoding</h3>
                <ConceptBox title="The Stale AMI Problem">
                  <p style={{ margin: 0 }}>
                    Your capstone hardcoded <code>ami-0e35ddab05955cf57</code>. AMI IDs are region-specific and get replaced as AWS patches them — that exact ID could be deprecated in a few months. A <strong>data source</strong> queries AWS live, every plan, for the current value instead of trusting a number you typed once and forgot about.
                  </p>
                </ConceptBox>

                <CodeBlock title="main.tf — add this, then reference it" code={`data "aws_ami" "amazon_linux" {\n  most_recent = true\n  owners      = ["amazon"]\n\n  filter {\n    name   = "name"\n    values = ["al2023-ami-*-x86_64"]\n  }\n}\n\nresource "aws_instance" "web_server" {\n  ami           = data.aws_ami.amazon_linux.id   # always current, never stale\n  instance_type = var.instance_type\n}`} />

                <ErrorCard 
                  error='🔥 Real-World Problem: Ambiguous data source query'
                  meaning="Your filter matched multiple AMIs and Terraform refuses to silently guess which one you meant."
                  fix="Either tighten the \`filter\` block (a more specific name pattern), or add \`most_recent = true\` as shown above so Terraform deterministically picks the newest match instead of erroring."
                />
              </div>
            );

          case "lab8":
            return (
              <div>
                <h2>Lab 8: Resource Dependencies</h2>
                <p className="guide-subtitle">Stage 2 — Core Workflow | How Terraform decides what to build first</p>

                <ConceptBox title="Implicit vs Explicit Dependencies">
                  <p style={{ margin: 0 }}>
                    Terraform builds a dependency graph from your code automatically. Whenever one resource references an attribute of another (like <code>aws_security_group.web_sg.id</code>), Terraform knows it must finish creating the security group before it can create anything that needs that ID. This is an <strong>implicit dependency</strong> — true for 95% of real configs.
                  </p>
                </ConceptBox>

                <pre style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", fontFamily: "var(--g-font-mono)", fontSize: "0.85rem", color: "var(--g-text-muted)", overflowX: "auto", margin: "24px 0" }}>
{`aws_security_group.web_sg
        │
        │ (implicit — id is referenced)
        ▼
aws_instance.web_server`}
                </pre>

                <h3>When references aren't enough: depends_on</h3>
                <p>Occasionally two resources don't share an attribute, but one still must exist before the other (e.g. an IAM policy must finish attaching before an application boots and tries to use it). For that, use explicit <code>depends_on</code>:</p>

                <CodeBlock title="main.tf" code={`resource "aws_iam_role_policy_attachment" "app_policy" {\n  role       = aws_iam_role.app_role.name\n  policy_arn = "arn:aws:iam::aws:policy/AmazonS3ReadOnlyAccess"\n}\n\nresource "aws_instance" "web_server" {\n  ami           = data.aws_ami.amazon_linux.id\n  instance_type = var.instance_type\n\n  # No attribute of app_role is actually used here, so Terraform\n  # wouldn't know to wait — depends_on forces the ordering anyway.\n  depends_on = [aws_iam_role_policy_attachment.app_policy]\n}`} />

                <WarningBox>
                  <strong>⚠️ Reach for <code>depends_on</code> last, not first.</strong> Overusing it makes your dependency graph harder to reason about and can slow down applies by forcing unnecessary serialization. If an attribute reference can express the same dependency, prefer that.
                </WarningBox>

                <ErrorCard 
                  error='🔥 Real-World Problem: Dependency cycle'
                  meaning="Resource A depends on Resource B, which somehow also depends back on Resource A — usually from two separate \`depends_on\` blocks pointing at each other, or a typo'd reference."
                  fix="Run \`terraform graph\` to visualize the dependency tree and find the loop. Most cycles are fixed by removing one unnecessary \`depends_on\` and trusting the implicit reference instead."
                />
              </div>
            );

          case "lab9":
            return (
              <div>
                <h2>Lab 9: user_data & Provisioners</h2>
                <p className="guide-subtitle">Stage 2 — Core Workflow | Bootstrapping a server on first boot</p>

                <h3>The right way: user_data</h3>
                <p><code>user_data</code> runs a script automatically the first time an EC2 instance boots — no SSH connection required during the apply, which makes it fast and reliable.</p>

                <CodeBlock title="main.tf" code={`resource "aws_instance" "web_server" {\n  ami           = data.aws_ami.amazon_linux.id\n  instance_type = var.instance_type\n\n  user_data = <<-EOF\n              #!/bin/bash\n              dnf install -y nginx\n              systemctl enable nginx\n              systemctl start nginx\n              echo "Deployed by Terraform - \${var.environment}" > /usr/share/nginx/html/index.html\n              EOF\n\n  tags = { Name = "web-server-\${var.environment}" }\n}`} />

                <WarningBox>
                  <strong>⚠️ Provisioners (<code>remote-exec</code>, <code>local-exec</code>) are a last resort.</strong> HashiCorp's own documentation says this directly: provisioners require an active SSH connection during apply, they're invisible to <code>terraform plan</code> (Terraform can't predict what a shell script will do), and they make your state file lie about whether configuration actually succeeded. Prefer <code>user_data</code> for bootstrapping, and a real configuration tool (Ansible, cloud-init) for anything more complex than a few lines.
                </WarningBox>

                <h3>If you must use a provisioner</h3>
                <CodeBlock title="main.tf — only when there's truly no alternative" code={`resource "aws_instance" "web_server" {\n  # ...\n\n  provisioner "remote-exec" {\n    inline = ["echo 'Instance is ready' > /tmp/ready.txt"]\n\n    connection {\n      type        = "ssh"\n      user        = "ec2-user"\n      private_key = file("~/.ssh/my-key.pem")\n      host        = self.public_ip\n    }\n  }\n}`} />

                <ErrorCard 
                  error='🔥 Real-World Problem: Provisioner timeout'
                  meaning="Terraform tried to SSH into the instance immediately after creation, but the instance's SSH daemon wasn't ready yet, or the security group doesn't actually allow port 22 from where Terraform is running."
                  fix="Check the security group allows inbound 22 from your IP. If it's a timing issue, this is exactly the kind of fragility that makes \`user_data\` the better choice — it runs on the instance itself with no external connection needed."
                />
              </div>
            );

          case "lab10":
            return (
              <div>
                <h2>Lab 10: Capstone — Parameterized Web Server Stack</h2>
                <p className="guide-subtitle">Stage 2 — Capstone Project | One config, any environment</p>

                <p>Combine variables, data sources, dependencies, and user_data into a single deployable stack that works identically for dev or staging just by swapping a <code>.tfvars</code> file.</p>

                <h3>1. Project structure</h3>
                <CodeBlock title="WSL Terminal" code={`mkdir ~/terraform-web-stack && cd ~/terraform-web-stack\ntouch main.tf variables.tf outputs.tf dev.tfvars`} />

                <CodeBlock title="variables.tf" code={`variable "aws_region"   { default = "ap-south-1" }\nvariable "instance_type" { default = "t2.micro" }\nvariable "environment"  { type = string }`} />

                <CodeBlock title="main.tf" code={`terraform {\n  required_providers {\n    aws = { source = "hashicorp/aws", version = "~> 5.0" }\n  }\n}\n\nprovider "aws" { region = var.aws_region }\n\ndata "aws_ami" "amazon_linux" {\n  most_recent = true\n  owners      = ["amazon"]\n  filter {\n    name   = "name"\n    values = ["al2023-ami-*-x86_64"]\n  }\n}\n\nresource "aws_security_group" "web_sg" {\n  name = "web-stack-sg-\${var.environment}"\n\n  ingress { from_port = 22, to_port = 22, protocol = "tcp", cidr_blocks = ["0.0.0.0/0"] }\n  ingress { from_port = 80, to_port = 80, protocol = "tcp", cidr_blocks = ["0.0.0.0/0"] }\n  egress  { from_port = 0,  to_port = 0,  protocol = "-1",  cidr_blocks = ["0.0.0.0/0"] }\n}\n\nresource "aws_instance" "web_server" {\n  ami                    = data.aws_ami.amazon_linux.id\n  instance_type          = var.instance_type\n  vpc_security_group_ids = [aws_security_group.web_sg.id]\n\n  user_data = <<-EOF\n              #!/bin/bash\n              dnf install -y nginx\n              systemctl enable nginx\n              systemctl start nginx\n              echo "Hello from \${var.environment}" > /usr/share/nginx/html/index.html\n              EOF\n\n  tags = { Name = "web-stack-\${var.environment}" }\n}`} />

                <CodeBlock title="outputs.tf" code={`output "url" {\n  value = "http://\${aws_instance.web_server.public_ip}"\n}`} />

                <CodeBlock title="dev.tfvars" code={`environment = "dev"`} />

                <h3>2. Deploy</h3>
                <CodeBlock title="WSL Terminal — inside terraform-web-stack/" code={`terraform init\nterraform plan -var-file="dev.tfvars"\nterraform apply -var-file="dev.tfvars"`} />

                <p>Open the printed <code>url</code> output in your browser. You'll see "Hello from dev" served by Nginx, fully provisioned and configured with zero manual steps.</p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 2 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s2-1" /><label htmlFor="tf-s2-1">Replace hardcoded values with variables and supply them via .tfvars</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s2-2" /><label htmlFor="tf-s2-2">Use outputs to extract values after apply</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s2-3" /><label htmlFor="tf-s2-3">Use a data source instead of a hardcoded, staleness-prone AMI ID</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s2-4" /><label htmlFor="tf-s2-4">Explain implicit vs explicit (depends_on) dependencies</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s2-5" /><label htmlFor="tf-s2-5">Bootstrap a server with user_data instead of a fragile provisioner</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s2-6" /><label htmlFor="tf-s2-6">Deploy one config to a named environment via -var-file</label></li>
                  </ul>
                </div>
              </div>
            );

          case "lab11":
            return (
              <div>
                <h2>Lab 11: Understanding the State File</h2>
                <p className="guide-subtitle">Stage 3 — State Management | terraform.tfstate is the actual source of truth</p>

                <ConceptBox title="What State Actually Is">
                  <p style={{ margin: 0 }}>
                    Your <code>.tf</code> files describe <em>desired</em> infrastructure. The <strong>state file</strong> (<code>terraform.tfstate</code>) is Terraform's record of what it believes <em>actually exists</em> — including real AWS resource IDs that don't appear anywhere in your code. Every plan compares three things: your code, the state file, and a live check against AWS — not just two.
                  </p>
                </ConceptBox>

                <h3>Inspecting state</h3>
                <CodeBlock title="WSL Terminal — inside terraform-web-stack/" code={`# List every resource Terraform is tracking\nterraform state list\n\n# Show full details of one resource, including AWS IDs\nterraform state show aws_instance.web_server\n\n# Human-readable dump of the whole state\nterraform show`} />

                <WarningBox>
                  <strong>⚠️ Never hand-edit terraform.tfstate, and never commit it to a public Git repository.</strong> It's a plain-text JSON file containing real resource IDs and, frequently, sensitive values (passwords, connection strings) in plaintext — even for resources marked <code>sensitive</code> in your code. State file exposure is one of the most common real-world Terraform security incidents.
                </WarningBox>

                <ErrorCard 
                  error='🔥 Real-World Problem: State file lost or deleted'
                  meaning="Without a state file, Terraform has no memory of what it already built. It treats every resource as brand new, and applying this plan would try to create duplicates of things that already exist in AWS."
                  fix="Stop — don't apply. Use \`terraform import\` (Lab 13) to rebuild state by matching existing AWS resources back to your resource blocks one by one. This is exactly why Lab 12's remote state backend matters: a local-only state file living on one laptop is a single point of failure."
                />
              </div>
            );

          case "lab12":
            return (
              <div>
                <h2>Lab 12: Remote State with S3 + DynamoDB Locking</h2>
                <p className="guide-subtitle">Stage 3 — State Management | Making state safe for more than one person</p>

                <ConceptBox title="Why Local State Breaks in a Team">
                  <p style={{ margin: 0 }}>
                    If state lives on your laptop and a teammate runs <code>terraform apply</code> from theirs, the two of you have two different "memories" of reality. Worse, if you both apply at the same moment, you can corrupt the state file or create duplicate resources. A <strong>remote backend</strong> stores state in one shared location (S3) with a <strong>lock</strong> (DynamoDB) that prevents two applies from running simultaneously.
                  </p>
                </ConceptBox>

                <h3>1. Bootstrap the backend resources (using local state, just this once)</h3>
                <p>This is the one deliberate exception to "always use remote state" — you need somewhere to put the backend infrastructure itself before it can manage its own state.</p>

                <CodeBlock title="WSL Terminal" code={`mkdir ~/terraform-backend-bootstrap && cd ~/terraform-backend-bootstrap\ntouch main.tf`} />

                <CodeBlock title="main.tf" code={`provider "aws" { region = "ap-south-1" }\n\nresource "aws_s3_bucket" "tf_state" {\n  bucket = "raghu-terraform-state-changeme123"\n}\n\nresource "aws_s3_bucket_versioning" "tf_state_versioning" {\n  bucket = aws_s3_bucket.tf_state.id\n  versioning_configuration { status = "Enabled" }\n}\n\nresource "aws_dynamodb_table" "tf_lock" {\n  name         = "terraform-locks"\n  billing_mode = "PAY_PER_REQUEST"\n  hash_key     = "LockID"\n\n  attribute {\n    name = "LockID"\n    type = "S"\n  }\n}`} />

                <CodeBlock title="WSL Terminal" code={`terraform init\nterraform apply`} />

                <TipBox>
                  <strong>💡 Versioning matters here:</strong> if state ever gets corrupted, S3 versioning lets you roll back to the previous state file instead of starting from zero.
                </TipBox>

                <h3>2. Point your web-stack project at this new backend</h3>
                <CodeBlock title="main.tf — add to the top of terraform-web-stack/main.tf" code={`terraform {\n  backend "s3" {\n    bucket         = "raghu-terraform-state-changeme123"\n    key            = "web-stack/terraform.tfstate"\n    region         = "ap-south-1"\n    dynamodb_table = "terraform-locks"\n    encrypt        = true\n  }\n}`} />

                <CodeBlock title="WSL Terminal — inside terraform-web-stack/" code={`terraform init\n# Terraform detects the new backend and asks:\n# "Do you want to copy existing state to the new backend?" → yes`} />

                <ErrorCard 
                  error='🔥 Real-World Problem: State lock stuck'
                  meaning="Either someone else (or another terminal tab you forgot about) is currently running apply, or a previous apply crashed (e.g. your laptop lost network mid-run) without releasing its lock."
                  fix="First confirm nobody is actually running an apply right now — ask your team or check for other terminal sessions. Only then run \`terraform force-unlock <LOCK_ID>\`. Force-unlocking while someone is genuinely mid-apply can corrupt state, so this is a last resort, not a reflex."
                />
              </div>
            );

          case "lab13":
            return (
              <div>
                <h2>Lab 13: State Surgery & Import</h2>
                <p className="guide-subtitle">Stage 3 — State Management | Fixing state without destroying infrastructure</p>

                <h3>Renaming a resource without recreating it</h3>
                <p>If you rename a resource's local name in code (e.g. <code>aws_instance.web_server</code> → <code>aws_instance.app_server</code>), Terraform's default reaction is to destroy the old one and create a "new" one — because as far as state is concerned, the old address no longer exists in your code. <code>terraform state mv</code> tells Terraform "this is the same resource, just renamed":</p>

                <CodeBlock title="WSL Terminal" code={`terraform state mv aws_instance.web_server aws_instance.app_server`} />

                <h3>Removing a resource from state (without destroying it)</h3>
                <p>Sometimes you want Terraform to "forget" about a resource without deleting the real infrastructure — e.g. you're handing ownership of that resource to another team's Terraform config:</p>
                
                <CodeBlock title="WSL Terminal" code={`terraform state rm aws_s3_bucket.shared_bucket`} />
                <p style={{ color: "var(--g-text-muted)" }}><em>The S3 bucket itself is untouched in AWS — only the line in <code>terraform.tfstate</code> is removed.</em></p>

                <h3>Importing infrastructure that already exists</h3>
                <ConceptBox title="The Real Scenario">
                  <p style={{ margin: 0 }}>
                    You inherit a project where someone manually created an S3 bucket in the Console before Terraform existed. You want to manage it going forward without deleting and recreating it (which would lose its data).
                  </p>
                </ConceptBox>

                <CodeBlock title="main.tf — write the resource block first, matching the real config" code={`resource "aws_s3_bucket" "legacy_bucket" {\n  bucket = "the-bucket-that-already-exists"\n}`} />

                <CodeBlock title="WSL Terminal" code={`terraform import aws_s3_bucket.legacy_bucket the-bucket-that-already-exists\nterraform plan   # review carefully — it should show near-zero changes`} />

                <ErrorCard 
                  error='🔥 Real-World Problem: Import target doesn"t exist in config'
                  meaning="Import only links a real AWS resource to a resource block you've ALREADY WRITTEN — it does not generate the .tf code for you."
                  fix="Write the (even minimal) resource block first, then run import again. After importing, run \`terraform plan\` and use the diff to fill in any attributes your block is missing, until plan shows no changes."
                />
              </div>
            );

          case "lab14":
            return (
              <div>
                <h2>Lab 14: Workspaces</h2>
                <p className="guide-subtitle">Stage 3 — State Management | One config, multiple isolated states</p>

                <h3>Creating and switching workspaces</h3>
                <CodeBlock title="WSL Terminal — inside terraform-web-stack/" code={`terraform workspace new dev\nterraform workspace new staging\nterraform workspace list\nterraform workspace select dev`} />

                <h3>Using the workspace name in code</h3>
                <CodeBlock title="main.tf" code={`resource "aws_instance" "web_server" {\n  # ...\n  tags = {\n    Name        = "web-server-\${terraform.workspace}"\n    Environment = terraform.workspace\n  }\n}`} />

                <p>Each workspace gets its own state file under the hood (<code>env:/dev/web-stack/terraform.tfstate</code>, <code>env:/staging/web-stack/terraform.tfstate</code>), even though they share the same backend bucket and the exact same <code>.tf</code> code.</p>

                <WarningBox>
                  <strong>⚠️ Workspaces share the same backend configuration and AWS credentials — they're a state-isolation tool, not a security or environment-isolation tool.</strong> If dev and prod need separate AWS accounts or different IAM permissions (which most real production setups require), use separate root configs or directories instead, and consider a tool like Terragrunt once you have more than 3–4 environments to keep DRY.
                </WarningBox>

                <div style={{ marginTop: "32px", marginBottom: "32px" }}>
                  <Quiz 
                    question="You're in the `staging` workspace and accidentally run `terraform destroy`. Does it affect your `dev` resources?"
                    answer="No — destroy only acts on the resources tracked in the CURRENT workspace's state file. Your dev resources, tracked in a completely separate state file, are untouched. This isolation is exactly what workspaces are for. That said, always run `terraform workspace show` before a destroy if you're not 100% sure which one is active."
                  />
                </div>

                <ErrorCard 
                  error='🔥 Real-World Problem: Applying to the wrong workspace'
                  meaning="You opened a new terminal tab to run a quick apply, forgetting that workspace selection is per-shell session. The new tab dropped back to the `default` workspace — apply ran against entirely the wrong environment, creating duplicate resources or overwriting prod-shaped config with dev values."
                  fix="Make \`terraform workspace show\` a reflex before any apply or destroy — one second to check, versus hours to untangle a cross-environment state mess. Teams working with multiple environments often add a Makefile target or shell alias that always prints the current workspace before running any Terraform command."
                />
              </div>
            );

          case "lab15":
            return (
              <div>
                <h2>Lab 15: Capstone — Migrate Local State to Remote Backend</h2>
                <p className="guide-subtitle">Stage 3 — Capstone Project | The exact migration you'll do on a real team's legacy project</p>

                <p>This capstone simulates the most common real-world state task: you've inherited a project with local-only <code>terraform.tfstate</code>, and you need to safely move it to a shared S3 backend without losing track of any resources.</p>

                <h3>1. Start from local state (simulate the legacy project)</h3>
                <CodeBlock title="WSL Terminal" code={`mkdir ~/terraform-migration-capstone && cd ~/terraform-migration-capstone\ntouch main.tf`} />

                <CodeBlock title="main.tf" code={`provider "aws" { region = "ap-south-1" }\n\nresource "aws_s3_bucket" "migration_demo" {\n  bucket = "raghu-migration-demo-changeme123"\n}`} />

                <CodeBlock title="WSL Terminal" code={`terraform init\nterraform apply\nls -la   # confirm terraform.tfstate exists locally`} />

                <h3>2. Add the backend block (reusing the bucket/table from Lab 12)</h3>
                <CodeBlock title="main.tf — add to the top" code={`terraform {\n  backend "s3" {\n    bucket         = "raghu-terraform-state-changeme123"\n    key            = "migration-capstone/terraform.tfstate"\n    region         = "ap-south-1"\n    dynamodb_table = "terraform-locks"\n    encrypt        = true\n  }\n}`} />

                <h3>3. Migrate</h3>
                <CodeBlock title="WSL Terminal" code={`terraform init\n# Prompt: "Do you want to copy existing state to the new backend?"\n# Type: yes`} />

                <h3>4. Verify nothing changed</h3>
                <CodeBlock title="WSL Terminal" code={`terraform plan\n# Expected output: "No changes. Your infrastructure matches the configuration."\n\n# Confirm the local state file is now just a stub pointer, not the real data\ncat terraform.tfstate`} />

                <p>A clean <code>terraform plan</code> with zero diffs after migration is the entire point — your infrastructure didn't change at all, only <em>where Terraform remembers it</em> changed.</p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 3 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s3-1" /><label htmlFor="tf-s3-1">Explain what the state file tracks that your .tf code doesn't</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s3-2" /><label htmlFor="tf-s3-2">Bootstrap an S3 + DynamoDB remote backend from scratch</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s3-3" /><label htmlFor="tf-s3-3">Resolve a stuck state lock safely</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s3-4" /><label htmlFor="tf-s3-4">Use state mv, state rm, and import correctly</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s3-5" /><label htmlFor="tf-s3-5">Switch between workspaces and explain their isolation limits</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s3-6" /><label htmlFor="tf-s3-6">Migrate an existing local-state project to a remote backend with zero drift</label></li>
                  </ul>
                </div>
              </div>
            );

          case "lab16":
            return (
              <div>
                <h2>Lab 16: Your First Module</h2>
                <p className="guide-subtitle">Stage 4 — Modules | Write once, deploy everywhere</p>

                <ConceptBox title="The Copy-Paste Problem">
                  <p style={{ margin: 0 }}>
                    By now you've written near-identical EC2 + security group blocks three times across different labs. In a real job, you'd need this same shape for dev, staging, and prod — copy-pasting it three more times means a fix in one place never makes it to the others. A <strong>module</strong> is a reusable, parameterized package of resources.
                  </p>
                </ConceptBox>

                <h3>1. Folder structure</h3>
                <CodeBlock title="WSL Terminal" code={`mkdir -p ~/terraform-modules-lab/modules/ec2-instance\ncd ~/terraform-modules-lab\ntouch main.tf\ntouch modules/ec2-instance/{main.tf,variables.tf,outputs.tf}`} />

                <h3>2. Build the module</h3>
                <CodeBlock title="modules/ec2-instance/variables.tf" code={`variable "name"          { type = string }\nvariable "instance_type" { type = string, default = "t2.micro" }\nvariable "ami_id"         { type = string }`} />

                <CodeBlock title="modules/ec2-instance/main.tf" code={`resource "aws_security_group" "this" {\n  name = "\${var.name}-sg"\n  ingress { from_port = 22, to_port = 22, protocol = "tcp", cidr_blocks = ["0.0.0.0/0"] }\n  egress  { from_port = 0,  to_port = 0,  protocol = "-1",  cidr_blocks = ["0.0.0.0/0"] }\n}\n\nresource "aws_instance" "this" {\n  ami                    = var.ami_id\n  instance_type          = var.instance_type\n  vpc_security_group_ids = [aws_security_group.this.id]\n  tags                   = { Name = var.name }\n}`} />

                <CodeBlock title="modules/ec2-instance/outputs.tf" code={`output "public_ip" {\n  value = aws_instance.this.public_ip\n}`} />

                <h3>3. Call the module from the root config</h3>
                <CodeBlock title="main.tf" code={`provider "aws" { region = "ap-south-1" }\n\nmodule "dev_server" {\n  source   = "./modules/ec2-instance"\n  name     = "dev-server"\n  ami_id   = "ami-0e35ddab05955cf57"\n}\n\nmodule "staging_server" {\n  source        = "./modules/ec2-instance"\n  name          = "staging-server"\n  ami_id        = "ami-0e35ddab05955cf57"\n  instance_type = "t3.small"\n}\n\noutput "dev_ip"     { value = module.dev_server.public_ip }\noutput "staging_ip" { value = module.staging_server.public_ip }`} />

                <p>One module definition, called twice with different inputs, produces two independent servers. This is the entire point of modules: the logic lives in one place, the differences live in the inputs.</p>

                <ErrorCard 
                  error='🔥 Real-World Problem: Module not found after adding source'
                  meaning="Every time you add, remove, or change a module source, Terraform needs to re-download and wire it up before it can plan."
                  fix="Run \`terraform init\` any time you change a \`source\` in a module block. This is the same reason you run \`init\` when adding a new provider — modules are plugins too, just local ones. Make it a habit: new module → always init before plan."
                />
              </div>
            );

          case "lab17":
            return (
              <div>
                <h2>Lab 17: count vs for_each</h2>
                <p className="guide-subtitle">Stage 4 — Modules | Creating multiple copies of a resource safely</p>

                <h3>count — index-based repetition</h3>
                <CodeBlock title="main.tf" code={`resource "aws_instance" "worker" {\n  count         = 3\n  ami           = "ami-0e35ddab05955cf57"\n  instance_type = "t2.micro"\n  tags          = { Name = "worker-\${count.index}" }\n}`} />

                <WarningBox>
                  <strong>⚠️ The hidden danger of count:</strong> resources are tracked by index (<code>worker[0]</code>, <code>worker[1]</code>, <code>worker[2]</code>). If you remove the middle item from a list driving <code>count</code>, every item after it shifts down an index — Terraform sees that as "destroy worker[1], destroy worker[2], recreate worker[1] with new data" instead of just removing one instance. This has caused real production outages.
                </WarningBox>

                <h3>for_each — name-based repetition (safer)</h3>
                <CodeBlock title="main.tf" code={`variable "workers" {\n  type = map(string)\n  default = {\n    "ingest"  = "t2.micro"\n    "process" = "t3.small"\n    "export"  = "t2.micro"\n  }\n}\n\nresource "aws_instance" "worker" {\n  for_each      = var.workers\n  ami           = "ami-0e35ddab05955cf57"\n  instance_type = each.value\n  tags          = { Name = "worker-\${each.key}" }\n}`} />

                <p>Resources are now tracked by key (<code>worker["ingest"]</code>, <code>worker["process"]</code>) instead of position. Removing <code>"process"</code> from the map destroys exactly that one instance — <code>"ingest"</code> and <code>"export"</code> are completely untouched.</p>

                <div style={{ marginTop: "32px", marginBottom: "32px" }}>
                  <Quiz 
                    question="You have `count = 3` creating three S3 buckets from a list, and you delete the first item in that list. What does Terraform's plan show?"
                    answer="It shows the old index-0 bucket being destroyed, then index-1's old data being applied to a 'new' index-0 (destroy + recreate), and the same cascading down the line — potentially destroying and recreating buckets you never intended to touch, with real data loss if they weren't empty. This is precisely why for_each, keyed by a stable identifier, is the safer default for any list that might change membership over time."
                  />
                </div>
              </div>
            );

          case "lab18":
            return (
              <div>
                <h2>Lab 18: Locals & Conditional Expressions</h2>
                <p className="guide-subtitle">Stage 4 — Modules | Computing values instead of repeating logic</p>

                <h3>locals — named computed values</h3>
                <CodeBlock title="main.tf" code={`locals {\n  common_tags = {\n    Project   = "terraform-mastery"\n    ManagedBy = "terraform"\n  }\n  is_production = var.environment == "prod"\n}\n\nresource "aws_instance" "web_server" {\n  # ...\n  tags = merge(local.common_tags, { Name = "web-\${var.environment}" })\n}`} />
                <p style={{ color: "var(--g-text-muted)" }}><em>Unlike variables, locals aren't set from outside — they're computed once from other values and reused throughout the config, which keeps repeated logic (like tag merging) in exactly one place.</em></p>

                <h3>Conditional expressions</h3>
                <CodeBlock title="main.tf" code={`resource "aws_instance" "web_server" {\n  ami           = data.aws_ami.amazon_linux.id\n  instance_type = local.is_production ? "t3.medium" : "t2.micro"\n\n  tags = {\n    Name    = "web-\${var.environment}"\n    Backups = local.is_production ? "enabled" : "disabled"\n  }\n}`} />
                <p>The syntax is <code>condition ? value_if_true : value_if_false</code> — production environments automatically get a bigger instance size, with zero duplicated resource blocks.</p>

                <ErrorCard 
                  error='🔥 Real-World Problem: Type mismatch in a conditional'
                  meaning="Your true-branch and false-branch return different types — e.g. one returns a string and the other returns a number, which Terraform's type system won't silently coerce."
                  fix="Make both branches return the same type. If you genuinely need a number sometimes and a string other times, convert explicitly with \`tostring()\` on whichever branch needs it."
                />
              </div>
            );

          case "lab19":
            return (
              <div>
                <h2>Lab 19: The Terraform Registry</h2>
                <p className="guide-subtitle">Stage 4 — Modules | Don't reinvent infrastructure that's already battle-tested</p>

                <ConceptBox title="Public Modules">
                  <p style={{ margin: 0 }}>
                    For common infrastructure shapes (a VPC, an EKS cluster, an RDS database), a well-maintained community module on the <a href="https://registry.terraform.io" target="_blank" rel="noopener noreferrer" style={{ color: "var(--g-primary)" }}>Terraform Registry</a> has already handled the dozens of edge cases you haven't thought of yet. Writing your own VPC module from scratch in a real job is usually wasted effort.
                  </p>
                </ConceptBox>

                <h3>Using a registry module</h3>
                <CodeBlock title="main.tf" code={`module "vpc" {\n  source  = "terraform-aws-modules/vpc/aws"\n  version = "5.8.1"   # always pin an exact version\n\n  name = "lab-vpc"\n  cidr = "10.0.0.0/16"\n\n  azs             = ["ap-south-1a", "ap-south-1b"]\n  public_subnets  = ["10.0.1.0/24", "10.0.2.0/24"]\n  private_subnets = ["10.0.101.0/24", "10.0.102.0/24"]\n\n  enable_nat_gateway = false   # keep this off for lab cost reasons — see the warning below\n}`} />

                <WarningBox>
                  <strong>⚠️ Two production habits to build now:</strong> (1) Always pin an exact module version — an unpinned <code>~&gt; 5.0</code> on a community module can pull in unreviewed changes during your next <code>terraform init</code>. (2) NAT Gateways cost roughly $30–35/month <em>per gateway</em>, billed whether you use them or not — leave <code>enable_nat_gateway = false</code> for learning, and remember it's on if you ever flip it for a real capstone.
                </WarningBox>

                <CodeBlock title="WSL Terminal" code={`terraform init   # downloads the module source on init, same as a provider\nterraform plan`} />

                <TipBox>
                  <strong>💡 Before trusting any community module:</strong> check its GitHub stars/issues, read through <code>main.tf</code> in its source at least once, and confirm the last update isn't years old. You're trusting someone else's code to run with your AWS credentials.
                </TipBox>

                <ErrorCard 
                  error='🔥 Real-World Problem: Registry module version constraint conflict'
                  meaning="Your root config pins \`aws ~> 5.0\` but the community module you added requires \`aws ~> 4.0\`. The two constraints are incompatible — Terraform can't install a single provider version that satisfies both, so init fails."
                  fix="Check the registry page for the module and look for a newer version that supports the aws 5.x provider — most major modules release a major version bump alongside each AWS provider generation. If the module truly has no 5.x-compatible release, you'll need to either pin your root config back to 4.x or find an alternative module. This is why checking module compatibility before adding it saves you an init failure later."
                />
              </div>
            );

          case "lab20":
            return (
              <div>
                <h2>Lab 20: Capstone — Reusable VPC Module</h2>
                <p className="guide-subtitle">Stage 4 — Capstone Project | One module, two environments, two different CIDR ranges</p>

                <h3>1. Build a small custom VPC module</h3>
                <CodeBlock title="WSL Terminal" code={`mkdir -p ~/terraform-vpc-capstone/modules/simple-vpc\ncd ~/terraform-vpc-capstone\ntouch main.tf\ntouch modules/simple-vpc/{main.tf,variables.tf,outputs.tf}`} />

                <CodeBlock title="modules/simple-vpc/variables.tf" code={`variable "name"     { type = string }\nvariable "cidr_block" { type = string }`} />

                <CodeBlock title="modules/simple-vpc/main.tf" code={`resource "aws_vpc" "this" {\n  cidr_block           = var.cidr_block\n  enable_dns_support   = true\n  enable_dns_hostnames = true\n  tags                 = { Name = var.name }\n}\n\nresource "aws_subnet" "public" {\n  vpc_id                  = aws_vpc.this.id\n  cidr_block              = cidrsubnet(var.cidr_block, 8, 0)\n  map_public_ip_on_launch = true\n  tags                    = { Name = "\${var.name}-public" }\n}\n\nresource "aws_internet_gateway" "this" {\n  vpc_id = aws_vpc.this.id\n  tags   = { Name = "\${var.name}-igw" }\n}`} />

                <CodeBlock title="modules/simple-vpc/outputs.tf" code={`output "vpc_id"    { value = aws_vpc.this.id }\noutput "subnet_id" { value = aws_subnet.public.id }`} />

                <h3>2. Call it twice, with different CIDRs, using for_each</h3>
                <CodeBlock title="main.tf" code={`provider "aws" { region = "ap-south-1" }\n\nvariable "environments" {\n  type = map(string)\n  default = {\n    "dev"  = "10.0.0.0/16"\n    "prod" = "10.1.0.0/16"\n  }\n}\n\nmodule "vpc" {\n  source     = "./modules/simple-vpc"\n  for_each   = var.environments\n  name       = "vpc-\${each.key}"\n  cidr_block = each.value\n}\n\noutput "vpc_ids" {\n  value = { for k, v in module.vpc : k => v.vpc_id }\n}`} />

                <h3>3. Deploy both at once</h3>
                <CodeBlock title="WSL Terminal" code={`terraform init\nterraform plan\nterraform apply`} />
                <p>One <code>terraform apply</code> creates two fully isolated VPCs — different CIDR ranges, different names, zero duplicated resource code. This is the module + for_each combination you'll use constantly in real multi-environment infrastructure.</p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 4 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s4-1" /><label htmlFor="tf-s4-1">Build a module with its own variables.tf, main.tf, and outputs.tf</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s4-2" /><label htmlFor="tf-s4-2">Call the same module multiple times with different inputs</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s4-3" /><label htmlFor="tf-s4-3">Explain why for_each is safer than count for lists that can change</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s4-4" /><label htmlFor="tf-s4-4">Use locals and conditional expressions to compute values</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s4-5" /><label htmlFor="tf-s4-5">Pull in and version-pin a community module from the Terraform Registry</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s4-6" /><label htmlFor="tf-s4-6">Deploy two environment-specific VPCs from one parameterized module</label></li>
                  </ul>
                </div>
              </div>
            );

          case "lab21":
            return (
              <div>
                <h2>Lab 21: Secrets & Sensitive Data</h2>
                <p className="guide-subtitle">Stage 5 — Production | Never hardcode a credential in a .tf file</p>

                <ConceptBox title="The Hardcoded Secret Problem">
                  <p style={{ margin: 0 }}>
                    A database password typed directly into a <code>.tf</code> file ends up in your Git history forever, even if you delete it in a later commit. Anyone with repo access — or anyone who finds an old commit — has it.
                  </p>
                </ConceptBox>

                <h3>1. Mark variables as sensitive</h3>
                <CodeBlock title="variables.tf" code={`variable "db_password" {\n  type      = string\n  sensitive = true\n}`} />
                <p style={{ color: "var(--g-text-muted)" }}><em>This stops the value from being printed in <code>plan</code>/<code>apply</code> output — Terraform shows <code>(sensitive value)</code> instead.</em></p>

                <h3>2. Supply it without ever writing it in a file</h3>
                <CodeBlock title="WSL Terminal" code={`export TF_VAR_db_password=$(aws secretsmanager get-secret-value \\\n  --secret-id prod/db/password \\\n  --query SecretString --output text)\n\nterraform apply`} />

                <h3>3. Or pull a secret directly with a data source</h3>
                <CodeBlock title="main.tf" code={`data "aws_secretsmanager_secret_version" "db_password" {\n  secret_id = "prod/db/password"\n}\n\nresource "aws_db_instance" "main" {\n  # ...\n  password = data.aws_secretsmanager_secret_version.db_password.secret_string\n}`} />

                <WarningBox>
                  <strong>⚠️ <code>sensitive = true</code> only hides the value from terminal output — it does NOT encrypt it inside the state file.</strong> The plaintext secret still sits in <code>terraform.tfstate</code> in S3. This is why Lab 12's <code>encrypt = true</code> backend setting and tightly scoped IAM permissions on that state bucket (Lab 22) aren't optional extras — they're the actual security boundary protecting your secrets.
                </WarningBox>

                <ErrorCard 
                  error='🔥 Real-World Problem: A secret leaked in CI logs before sensitive was added'
                  meaning="A teammate added a new variable for an API key but forgot \`sensitive = true\`. A GitHub Actions plan run printed the key in plaintext in build logs, which are visible to everyone with repo access."
                  fix="Add \`sensitive = true\` immediately — but that alone isn't enough. The key is already compromised the moment it appeared in a log anyone could read. Rotate the actual credential at the source (regenerate the API key), then update the secret value, and treat the leaked one as permanently burned."
                />

                <div style={{ marginTop: "32px", marginBottom: "32px" }}>
                  <Quiz 
                    question="A variable is marked `sensitive = true` and its value is pulled from AWS Secrets Manager via a data source. A teammate checks the S3 state bucket and finds the value in plaintext inside `terraform.tfstate`. Is this a bug in Terraform?"
                    answer="No — this is documented, expected behavior. `sensitive = true` is a display hint that prevents values from appearing in CLI output and plan diffs. It does not affect how values are stored in state. The state file is your responsibility to protect: S3 encryption at rest (`encrypt = true` in the backend block), an S3 bucket policy blocking public access, tightly scoped IAM access, and S3 versioning so you can roll back a corrupted state — these are the actual security controls. `sensitive = true` is a safeguard against accidental log leaks, not a substitute for protecting the state file itself."
                  />
                </div>
              </div>
            );

          case "lab22":
            return (
              <div>
                <h2>Lab 22: Least-Privilege IAM for Terraform</h2>
                <p className="guide-subtitle">Stage 5 — Production | Stop running Terraform with admin keys</p>

                <ConceptBox title="The Admin-Key Anti-Pattern">
                  <p style={{ margin: 0 }}>
                    It's extremely common — and risky — for a Terraform user to run with full <code>AdministratorAccess</code> "to avoid permission errors." If that credential ever leaks (committed to a repo, exposed in a CI log, stolen from a laptop), the blast radius is your entire AWS account.
                  </p>
                </ConceptBox>

                <h3>1. Write a scoped IAM policy</h3>
                <CodeBlock title="iam-policy.json — only what this guide's labs actually need" code={`{\n  "Version": "2012-10-17",\n  "Statement": [\n    {\n      "Effect": "Allow",\n      "Action": [\n        "ec2:*",\n        "s3:*",\n        "dynamodb:*",\n        "iam:GetRole",\n        "iam:PassRole"\n      ],\n      "Resource": "*"\n    }\n  ]\n}`} />

                <TipBox>
                  <strong>💡 This is a learning-scoped example, not a production template.</strong> Real production IAM policies scope <code>Resource</code> down to specific ARNs (e.g. only the state bucket, not all S3 buckets) and avoid wildcards on the action list wherever the resource matters. Use this as a starting point to tighten further, not as a final answer.
                </TipBox>

                <h3>2. Use a dedicated IAM role for CI, not a long-lived user</h3>
                <p>For local learning, an IAM user with access keys is fine. For any real CI pipeline (Lab 23), use <strong>OIDC federation</strong> instead — GitHub Actions assumes a temporary IAM role with no long-lived secret stored anywhere:</p>

                <CodeBlock title="main.tf — trust policy snippet for GitHub Actions OIDC" code={`data "aws_iam_policy_document" "github_actions_trust" {\n  statement {\n    actions = ["sts:AssumeRoleWithWebIdentity"]\n    principals {\n      type        = "Federated"\n      identifiers = ["arn:aws:iam::ACCOUNT_ID:oidc-provider/token.actions.githubusercontent.com"]\n    }\n    condition {\n      test     = "StringEquals"\n      variable = "token.actions.githubusercontent.com:sub"\n      values   = ["repo:your-org/your-repo:ref:refs/heads/main"]\n    }\n  }\n}`} />
                <p style={{ color: "var(--g-text-muted)" }}><em>This restricts the role to only be assumable by workflows running on the <code>main</code> branch of your specific repo — not by anyone who happens to know the role ARN.</em></p>

                <ErrorCard 
                  error='🔥 Real-World Problem: Policy too narrow'
                  meaning="Your scoped-down policy doesn't grant the exact action your config is trying to perform. This is the natural, expected friction of least-privilege — it's supposed to stop you until you've deliberately granted the action."
                  fix="Read the exact action name from the error (\`iam:CreateRole\`) and add precisely that action to your policy — resist the urge to add a wildcard like \`iam:*\` just to make the error go away."
                />
              </div>
            );

          case "lab23":
            return (
              <div>
                <h2>Lab 23: CI/CD with GitHub Actions</h2>
                <p className="guide-subtitle">Stage 5 — Production | Nobody runs terraform apply from a laptop on a real team</p>

                <ConceptBox title="Why CI, Not a Laptop">
                  <p style={{ margin: 0 }}>
                    Local applies mean nobody else can see what changed, when, or why. A CI pipeline makes every change reviewable in a pull request, runs against consistent, audited credentials (not whatever's cached on someone's machine), and creates a permanent log of every apply.
                  </p>
                </ConceptBox>

                <h3>The standard pattern: plan on PR, apply on merge</h3>
                <CodeBlock title=".github/workflows/terraform.yml" code={`name: Terraform\n\non:\n  pull_request:\n    branches: [main]\n  push:\n    branches: [main]\n\npermissions:\n  id-token: write   # required for OIDC\n  contents: read\n  pull-requests: write\n\njobs:\n  terraform:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - uses: hashicorp/setup-terraform@v3\n\n      - name: Configure AWS credentials (OIDC, no stored secrets)\n        uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::ACCOUNT_ID:role/github-actions-terraform\n          aws-region: ap-south-1\n\n      - run: terraform init\n\n      - name: Terraform Plan\n        if: github.event_name == 'pull_request'\n        run: terraform plan -no-color\n        continue-on-error: false\n\n      - name: Terraform Apply\n        if: github.ref == 'refs/heads/main' && github.event_name == 'push'\n        run: terraform apply -auto-approve`} />

                <TipBox>
                  <strong>💡 Notice <code>-auto-approve</code> is finally safe here.</strong> The human approval already happened — as a reviewer reading the plan output in the pull request before merging. That's the one place this guide tells you to use it.
                </TipBox>

                <h3>Add a manual approval gate for production</h3>
                <p>For anything touching production, add a GitHub <strong>Environment</strong> with required reviewers, so the apply job pauses and waits for an explicit human click even after merge:</p>
                <CodeBlock title=".github/workflows/terraform.yml — add to the apply job" code={`  terraform-apply:\n    needs: terraform-plan\n    environment: production   # configure required reviewers in repo Settings → Environments\n    runs-on: ubuntu-latest\n    steps:\n      - run: terraform apply -auto-approve`} />

                <ErrorCard 
                  error='🔥 Real-World Problem: Plan succeeds locally, fails in CI'
                  meaning="Your local terminal has \`aws configure\` credentials cached, but the CI runner is a fresh environment with nothing cached — it needs its own way to authenticate, set up explicitly in the workflow."
                  fix="Confirm the OIDC trust policy (Lab 22) actually matches your repo and branch, and that \`configure-aws-credentials\` runs BEFORE any \`terraform\` command in the job."
                />

                <div style={{ marginTop: "32px", marginBottom: "32px" }}>
                  <Quiz 
                    question="Your pipeline runs `terraform plan` on pull requests and `terraform apply -auto-approve` on merge. A bug slips through review — the plan looked fine but apply has an unexpected side effect. Why is this pipeline design still safer than having engineers run `terraform apply` from their laptops?"
                    answer="Three reasons: (1) Audit trail — every apply is logged in GitHub Actions with the exact commit hash, who triggered it, and full output. A laptop apply leaves no record. (2) Consistent credentials — the pipeline uses the OIDC role with a known, scoped IAM policy; laptops use whatever the engineer last configured with `aws configure`, which varies per person. (3) Forced code review — the plan output appears in the PR where multiple people can review it. A local apply can bypass this entirely. The bug still got through, but you now know exactly what was applied, when, from which commit — which makes the incident much faster to diagnose and revert."
                  />
                </div>
              </div>
            );

          case "lab24":
            return (
              <div>
                <h2>Lab 24: Drift Detection</h2>
                <p className="guide-subtitle">Stage 5 — Production | Catching the manual console change before it bites you</p>

                <ConceptBox title="What Drift Actually Looks Like">
                  <p style={{ margin: 0 }}>
                    Drift happens the moment anyone changes infrastructure outside of Terraform — resizing an instance in the Console "just to test something," or a different automated tool touching the same resources. Terraform doesn't know about the change until the next plan, and by default, nothing runs a plan unless a human remembers to.
                  </p>
                </ConceptBox>

                <h3>Scheduled drift detection in CI</h3>
                <CodeBlock title=".github/workflows/drift-detection.yml" code={`name: Drift Detection\n\non:\n  schedule:\n    - cron: '0 6 * * *'   # every day at 6am UTC\n  workflow_dispatch: {}    # also allow manual triggering\n\njobs:\n  detect-drift:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: hashicorp/setup-terraform@v3\n      - uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::ACCOUNT_ID:role/github-actions-terraform\n          aws-region: ap-south-1\n\n      - run: terraform init\n\n      - name: Plan and check for drift\n        run: |\n          terraform plan -detailed-exitcode -no-color || \\\n          (echo '::warning::Drift detected — manual changes found outside Terraform' && exit 1)`} />

                <ConceptBox title="Reading -detailed-exitcode">
                  <p style={{ margin: 0 }}>
                    <code>terraform plan -detailed-exitcode</code> returns exit code <strong>0</strong> for "no changes," <strong>1</strong> for an actual error, and <strong>2</strong> for "changes detected." A scheduled job checking specifically for exit code 2 is how teams get alerted to drift automatically instead of discovering it during an unrelated apply weeks later.
                  </p>
                </ConceptBox>

                <ErrorCard 
                  error='🔥 Real-World Incident: Silent revert of a manual fix'
                  meaning="During an incident, an on-call engineer manually resized a struggling EC2 instance from the Console to stop it from crashing — a reasonable emergency action. Two days later, an unrelated routine \`terraform apply\` ran, saw the instance size didn't match the .tf code, and silently resized it back down — re-triggering the original crash."
                  fix="Two layers: first, scheduled drift detection (above) would have caught and surfaced this resize within 24 hours instead of 2 days, giving the team a chance to update the .tf code to match the emergency fix. Second, any manual emergency change needs a same-day follow-up ticket to either codify the change in Terraform or deliberately revert it — never leave drift unresolved and undocumented."
                />
              </div>
            );

          case "lab24b":
            return (
              <div>
                <h2>Lab 24b: Debugging Terraform at 2am</h2>
                <p className="guide-subtitle">Stage 5 — Production | The tools you reach for when plan is lying to you</p>

                <ConceptBox title="Why Debugging Terraform Is Different">
                  <p style={{ margin: 0 }}>
                    Most CLI tools give you one output. Terraform gives you three layers to cross-reference: your <code>.tf</code> code, the state file, and live AWS. When something goes wrong — a plan shows unexpected changes, an apply errors mid-run, a resource shows as tainted — you need to know which layer the disagreement is in before you can fix it.
                  </p>
                </ConceptBox>

                <h3>1. terraform console — your interactive REPL</h3>
                <TipBox>
                  <strong>💻 Run this inside any initialized project folder in your WSL Terminal</strong>
                </TipBox>
                <CodeBlock title="WSL Terminal" code={`terraform console`} />
                <p>Inside the console, you can evaluate any Terraform expression against your current state and variables — without running a full plan:</p>
                <CodeBlock title="Inside terraform console" code={`# Inside terraform console (type these one at a time, press Enter)\nvar.environment\naws_instance.web_server.public_ip\ncidrsubnet("10.0.0.0/16", 8, 0)\n{ for k, v in var.workers : k => upper(v) }\n# Ctrl+C or type exit to quit`} />
                <TipBox>
                  <strong>💡 Most useful case:</strong> when a complex expression in your code behaves unexpectedly, paste it into <code>terraform console</code> and poke at it live instead of guessing and re-running plan 10 times.
                </TipBox>

                <h3>2. TF_LOG — turn on verbose debug logging</h3>
                <CodeBlock title="WSL Terminal" code={`# Capture all debug output to a file (the terminal output is too noisy to read live)\nTF_LOG=DEBUG terraform plan 2> tf_debug.log\n\n# Then search for the specific resource or API call that's failing\ngrep -i "RequestError\\|Error\\|aws_instance" tf_debug.log | head -40`} />
                <p style={{ color: "var(--g-text-muted)" }}><em>Log levels from least to most verbose: <code>ERROR</code>, <code>WARN</code>, <code>INFO</code>, <code>DEBUG</code>, <code>TRACE</code>. Start with <code>DEBUG</code> — <code>TRACE</code> is so verbose it'll produce hundreds of MB for a simple plan.</em></p>

                <h3>3. terraform state show — inspect what Terraform actually thinks a resource looks like</h3>
                <CodeBlock title="WSL Terminal" code={`# When plan shows a change you didn't make, compare state vs your code\nterraform state show aws_instance.web_server\n\n# Diff: what Terraform currently knows (state) vs what plan wants to apply\n# If these differ, you've found the source of the unexpected plan`} />

                <h3>4. terraform graph — visualize what will run and in what order</h3>
                <CodeBlock title="WSL Terminal" code={`# Install graphviz if not already there\nsudo apt install graphviz -y\n\n# Generate the dependency graph as an image\nterraform graph | dot -Tpng > graph.png\n\n# Open it in Windows from WSL\nexplorer.exe graph.png`} />
                <p>Most useful for diagnosing cycle errors — the loop is visually obvious in the image even when it's invisible in the HCL text.</p>

                <h3>5. Tainted resources — force a recreation on next apply</h3>
                <CodeBlock title="WSL Terminal" code={`# Mark a resource as needing replacement even if its config hasn't changed\n# (e.g. an EC2 instance whose userdata ran incorrectly and needs a fresh boot)\nterraform taint aws_instance.web_server\n\n# Verify — plan will now show -/+ for this resource\nterraform plan\n\n# If you change your mind before applying:\nterraform untaint aws_instance.web_server`} />

                <WarningBox>
                  <strong>⚠️ <code>terraform taint</code> in Terraform 1.x triggers a destroy-and-recreate on next apply.</strong> For EC2 instances with attached EBS volumes, make sure the volumes have <code>delete_on_termination = false</code> or you want them recreated too, otherwise you lose data. Confirm the plan carefully before applying a tainted resource.
                </WarningBox>

                <ErrorCard 
                  error='🔥 Real-World Problem: Apply fails halfway through — now state is partial'
                  meaning="A network blip, AWS rate limit, or duplicate-name collision caused an apply to fail midway. Terraform created the first four resources, updated state for those, then died. Now state is partially true — some resources exist and are tracked, some don't exist, and the one that failed may or may not exist in AWS."
                  fix="Run \`terraform plan\` first — Terraform will re-detect what's missing and show the remaining diff. Fix the root cause of the original failure (in this case, a naming conflict), then re-run \`terraform apply\`. Because state was saved for successful resources, Terraform won't re-create those — it only finishes the remaining ones. This idempotent re-run behavior is one of Terraform's most valuable properties."
                />

                <div style={{ marginTop: "32px", marginBottom: "32px" }}>
                  <Quiz 
                    question="An apply fails halfway through — 6 resources created successfully, the 7th failed. A panicked junior runs `terraform destroy` immediately to 'start fresh.' Why is this likely the wrong move?"
                    answer="Destroy will now remove the 6 resources that successfully applied, including anything stateful (databases, S3 buckets with data, etc.) — potentially causing data loss. The correct move is to fix the root cause of the failure, then re-run `terraform apply`. Terraform's idempotency means it will detect the 6 already-created resources in state, skip them, and only attempt the remaining ones. 'Re-apply after fixing the error' should be the first instinct, not destroy-and-rebuild, especially when stateful resources are involved."
                  />
                </div>
              </div>
            );

          case "lab25":
            return (
              <div>
                <h2>Lab 25: Capstone — Production-Ready Pipeline</h2>
                <p className="guide-subtitle">Stage 5 — Capstone Project | Everything from this guide, working together</p>

                <p>This combines the VPC module (Stage 4), a remote backend (Stage 3), and a GitHub Actions pipeline with a manual approval gate (this stage) into one realistic production setup.</p>

                <h3>1. Repository structure</h3>
                <CodeBlock title="WSL Terminal" code={`mkdir -p ~/terraform-prod-pipeline/{modules/simple-vpc,.github/workflows}\ncd ~/terraform-prod-pipeline\ntouch main.tf variables.tf outputs.tf\n# Copy the simple-vpc module from Lab 20 into modules/simple-vpc/`} />

                <h3>2. Root config with remote backend + module</h3>
                <CodeBlock title="main.tf" code={`terraform {\n  backend "s3" {\n    bucket         = "raghu-terraform-state-changeme123"\n    key            = "prod-pipeline/terraform.tfstate"\n    region         = "ap-south-1"\n    dynamodb_table = "terraform-locks"\n    encrypt        = true\n  }\n  required_providers {\n    aws = { source = "hashicorp/aws", version = "~> 5.0" }\n  }\n}\n\nprovider "aws" { region = "ap-south-1" }\n\nmodule "vpc" {\n  source     = "./modules/simple-vpc"\n  name       = "prod-pipeline-vpc"\n  cidr_block = "10.2.0.0/16"\n}\n\noutput "vpc_id" { value = module.vpc.vpc_id }`} />

                <h3>3. The pipeline — plan on PR, gated apply on merge</h3>
                <CodeBlock title=".github/workflows/terraform.yml" code={`name: Terraform Production Pipeline\n\non:\n  pull_request:\n    branches: [main]\n  push:\n    branches: [main]\n\npermissions:\n  id-token: write\n  contents: read\n  pull-requests: write\n\njobs:\n  plan:\n    if: github.event_name == 'pull_request'\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: hashicorp/setup-terraform@v3\n      - uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::ACCOUNT_ID:role/github-actions-terraform\n          aws-region: ap-south-1\n      - run: terraform init\n      - run: terraform plan -no-color\n\n  apply:\n    if: github.ref == 'refs/heads/main' && github.event_name == 'push'\n    environment: production\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: hashicorp/setup-terraform@v3\n      - uses: aws-actions/configure-aws-credentials@v4\n        with:\n          role-to-assume: arn:aws:iam::ACCOUNT_ID:role/github-actions-terraform\n          aws-region: ap-south-1\n      - run: terraform init\n      - run: terraform apply -auto-approve`} />

                <h3>4. Run it as a real team would</h3>
                <ol style={{ marginLeft: "20px" }}>
                  <li>Push this to a new branch, open a pull request → the <code>plan</code> job runs automatically and posts its output for review.</li>
                  <li>A reviewer reads the plan diff in the PR — checking for any unexpected <code>-/+</code> lines — and approves.</li>
                  <li>Merge to <code>main</code> → the <code>apply</code> job triggers, pauses on the <code>production</code> environment gate, and waits for a configured reviewer to click "Approve" in GitHub before running.</li>
                </ol>

                <p style={{ color: "var(--g-text-muted)" }}><em>This is the actual shape of how Terraform runs in most real engineering teams — no laptop applies, every change reviewable, production changes requiring an explicit human approval separate from the code review itself.</em></p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 5 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s5-1" /><label htmlFor="tf-s5-1">Mark sensitive variables correctly and explain what sensitive=true does NOT protect</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s5-2" /><label htmlFor="tf-s5-2">Write a least-privilege IAM policy instead of using admin credentials</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s5-3" /><label htmlFor="tf-s5-3">Set up OIDC federation so CI never stores a long-lived AWS secret</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s5-4" /><label htmlFor="tf-s5-4">Build a plan-on-PR, apply-on-merge GitHub Actions pipeline</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s5-5" /><label htmlFor="tf-s5-5">Add a manual approval gate before any production apply</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-s5-6" /><label htmlFor="tf-s5-6">Explain how scheduled drift detection would catch an out-of-band manual change</label></li>
                  </ul>
                </div>

                <div style={{ padding: "16px", backgroundColor: "#000", border: "1px solid var(--g-border)", borderRadius: "8px", marginTop: "32px", fontSize: "0.9rem", color: "var(--g-text-muted)" }}>
                  <strong>What this guide does NOT cover:</strong> Terraform Cloud/Enterprise's built-in run management (an alternative to the self-hosted S3+DynamoDB+GitHub Actions setup here), Sentinel/OPA policy-as-code enforcement, multi-account/multi-region module composition at scale, and Terragrunt for managing many environments DRY-ly. These are real next steps once you're comfortable with everything above — not gaps in what you've learned, just the edge of this guide's scope.
                </div>
              </div>
            );

          case "errors":
            return (
              <div>
                <h2>🚨 Master Error Reference</h2>
                <p className="guide-subtitle">Land here mid-panic? Find your error, read the plain-English meaning, apply the fix.</p>

                <ConceptBox title="The Golden Rule of Debugging Terraform">
                  <p style={{ margin: 0 }}>
                    Read the resource address in the error first (<code>aws_instance.web_server</code>), then the error type second. 90% of Terraform errors are either an AWS permissions problem, a state/reality mismatch, or a type error in your HCL — knowing which of the three you're looking at narrows the fix immediately. For deep debugging, run <code>TF_LOG=DEBUG terraform plan 2&gt;tf_debug.log</code> to capture every API call Terraform makes.
                  </p>
                </ConceptBox>

                <h3>1. Authentication Failures</h3>
                <ErrorCard 
                  error='Error: no valid credential sources for Terraform AWS Provider found'
                  meaning="Terraform's AWS provider looks for credentials in a fixed chain: environment variables (\`AWS_ACCESS_KEY_ID\`), then \`~/.aws/credentials\`, then an IAM instance role. None of these found anything usable."
                  fix="Run \`aws sts get-caller-identity\`. If that fails too, run \`aws configure\`. If the CLI works but Terraform still fails, check you're not in a shell session with a conflicting \`AWS_PROFILE\` or \`AWS_DEFAULT_REGION\` environment variable overriding your defaults."
                />

                <h3>2. State Lock Stuck</h3>
                <ErrorCard 
                  error='Error: Error acquiring the state lock'
                  meaning="Another apply is currently running, or a previous apply crashed without releasing its DynamoDB lock. The lock prevents two concurrent applies from corrupting the state file."
                  fix="First confirm nobody else is actually running an apply. Only then: \`terraform force-unlock <ID>\` using the ID from the error. Force-unlocking while a genuine apply is running can corrupt state — check before you unlock."
                />

                <h3>3. Resource Already Exists</h3>
                <ErrorCard 
                  error='Error: BucketAlreadyExists / EntityAlreadyExists'
                  meaning="Either a globally unique name is already taken by someone else (S3 bucket names are global across every AWS account on Earth), or the resource exists in AWS but isn't tracked in your state file — so Terraform tries to create it again."
                  fix="For naming collisions: add your AWS account ID or a unique suffix to the bucket name. For an existing-but-untracked resource: don't try to create it — use \`terraform import\` (Lab 13) to bring it under Terraform management instead."
                />

                <h3>4. Dependency Cycle</h3>
                <ErrorCard 
                  error='Error: Cycle detected in resource graph'
                  meaning="Two resources depend on each other — A references B, and B also references A — creating a loop Terraform can't resolve into an ordered execution plan."
                  fix="Run \`terraform graph | dot -Tpng > graph.png\` to visualize the full dependency tree and find the loop. Usually caused by two \`depends_on\` blocks pointing at each other, or a circular attribute reference. Remove one direction of the dependency and trust the implicit reference instead."
                />

                <h3>5. Permission Denied During Apply</h3>
                <ErrorCard 
                  error='Error: AccessDenied — not authorized to perform action'
                  meaning="The IAM identity Terraform is using doesn't have permission for the specific API call it's trying to make — common after correctly tightening to least-privilege credentials."
                  fix="Read the exact action name from the error (\`iam:CreateRole\`) and add precisely that action to your IAM policy. Don't expand to \`iam:*\` just to silence the error — that defeats the purpose of scoped permissions."
                />

                <h3>6. Unexpected Resource Replacement</h3>
                <ErrorCard 
                  error='Plan shows -/+ (destroy and recreate) on a resource you only meant to update'
                  meaning="You changed an attribute that AWS doesn't support updating in-place. The only way to change it is to destroy the current resource and create a new one — which can mean downtime or data loss for stateful resources."
                  fix="Never type 'yes' on an unexpected \`-/+\`. Check the provider docs for that attribute — they'll say 'Changing this forces a new resource.' If recreation is unacceptable, look for a \`lifecycle { create_before_destroy = true }\` block, or find an attribute you CAN change in-place to express the same intent."
                />

                <h3>7. Variable Type or Value Mismatch</h3>
                <ErrorCard 
                  error='Error: Inconsistent conditional result types / Invalid value for variable'
                  meaning="Either the two branches of a conditional expression return different types, or a value you supplied via \`-var\` or a \`.tfvars\` file doesn't match the \`type\` declared in \`variables.tf\`."
                  fix="Make both branches of a conditional return the same type. For variable mismatches, check the declared type — a quoted \`'3'\` is a string, not the number \`3\`, and Terraform's type system treats them differently. Use \`tostring()\` or \`tonumber()\` for explicit conversion."
                />

                <h3>8. State File Out of Sync with Reality</h3>
                <ErrorCard 
                  error='Plan wants to create everything that already exists'
                  meaning="Terraform has no memory of what it already built — the state file is empty, deleted, or points to the wrong backend. Without state, every resource looks like it needs to be created from scratch."
                  fix="Stop — do NOT apply this plan. Use \`terraform import\` (Lab 13) to rebuild state by matching existing AWS resources to your resource blocks one by one. Check your backend config in \`main.tf\` first — often the problem is a typo'd bucket name or key path causing Terraform to read an empty state instead of the real one."
                />

                <h3>9. Backend Init Fails After Config Change</h3>
                <ErrorCard 
                  error='Error: Backend configuration changed'
                  meaning="You changed the backend block (different bucket, key, or region) without re-running \`terraform init\`. Terraform detects the mismatch and refuses to proceed."
                  fix="Run \`terraform init\`. Terraform will ask if you want to migrate existing state to the new backend — type \`yes\` to copy it. After init completes, run \`terraform plan\` and confirm it shows zero changes before touching anything else."
                />

                <div style={{ textAlign: "center", margin: "56px 0", padding: "36px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "16px", border: "1px solid rgba(16, 185, 129, 0.5)" }}>
                  <h1 style={{ color: "rgb(16, 185, 129)", marginBottom: "14px", fontSize: "1.6rem" }}>🎓 You've completed Terraform Mastery</h1>
                  <p style={{ fontSize: "1.05rem", color: "var(--g-text)" }}>You can now provision, manage state for, modularize, and safely ship infrastructure changes through a real CI/CD pipeline. Don't forget to destroy your lab resources — head to the next section before you close this tab.</p>
                </div>
              </div>
            );

          case "destroy":
            return (
              <div>
                <h2>🗑️ Destroy Your AWS Resources</h2>
                <p className="guide-subtitle">Terraform's job is creating infrastructure — this is the equally important other half.</p>

                <ConceptBox title="Why This Section Exists">
                  <p style={{ margin: 0 }}>
                    Across this guide you created EC2 instances, security groups, VPCs, an S3 state bucket, and a DynamoDB table. None of these will delete themselves. Most are cheap individually, but left running for weeks, they add up — and the state-backend bucket/table are easy to forget because they don't live inside any of your lab project folders.
                  </p>
                </ConceptBox>

                <h3>Step 1: Destroy each lab project, in reverse order of creation</h3>
                <WarningBox>
                  <strong>⚠️ Destroy order matters when a remote backend is involved.</strong> Destroy every project that <em>uses</em> the S3+DynamoDB backend first. Only delete the backend bucket and table themselves last — they can't easily delete themselves while other state files still live inside that bucket.
                </WarningBox>

                <CodeBlock title="WSL Terminal — repeat for every lab folder you created" code={`cd ~/terraform-prod-pipeline && terraform destroy\ncd ~/terraform-vpc-capstone && terraform destroy\ncd ~/terraform-modules-lab && terraform destroy\ncd ~/terraform-migration-capstone && terraform destroy\ncd ~/terraform-web-stack && terraform destroy\ncd ~/terraform-ec2-capstone && terraform destroy\ncd ~/terraform-foundations && terraform destroy`} />
                <p style={{ color: "var(--g-text-muted)" }}><em>Each command will print a plan of everything to be deleted and ask for confirmation — type <code>yes</code> for each one. Review the plan exactly like you would an apply; destroy plans can also surprise you.</em></p>

                <h3>Step 2: Empty and delete the state backend bucket</h3>
                <p>S3 buckets with versioning enabled (which you turned on in Lab 12) won't delete via <code>terraform destroy</code> until every version of every object is removed first:</p>
                <CodeBlock title="WSL Terminal" code={`# Empty all versions and delete markers from the bucket\naws s3api list-object-versions --bucket raghu-terraform-state-changeme123 \\\n  --query '{Objects: Versions[].{Key:Key,VersionId:VersionId}}' --output json > /tmp/versions.json\n\naws s3api delete-objects --bucket raghu-terraform-state-changeme123 \\\n  --delete file:///tmp/versions.json\n\n# Then destroy the bootstrap project (S3 bucket + DynamoDB table)\ncd ~/terraform-backend-bootstrap\nterraform destroy`} />

                <ErrorCard 
                  error='🔥 Real-World Mistake: "I deleted everything but I"m still seeing charges"'
                  meaning="All your terraform destroy commands succeeded, but the next AWS bill still shows charges."
                  fix="Check for resources Terraform didn't create or doesn't know about: Elastic IPs not attached to a running instance bill hourly even when idle; if you ever flipped \`enable_nat_gateway = true\` on the Lab 19 VPC module, that NAT Gateway (~$30+/month) is a completely separate billable resource from the VPC itself and needs its own confirmed deletion; and EBS volumes sometimes survive an instance termination depending on the \`delete_on_termination\` setting."
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Final Cleanup Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-end-1" /><label htmlFor="tf-end-1">Ran terraform destroy on every lab project folder, in reverse order</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-end-2" /><label htmlFor="tf-end-2">Emptied and deleted the versioned S3 state backend bucket</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-end-3" /><label htmlFor="tf-end-3">Confirmed the DynamoDB lock table is deleted</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-end-4" /><label htmlFor="tf-end-4">Checked the EC2 console for any orphaned Elastic IPs</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-end-5" /><label htmlFor="tf-end-5">Checked for any NAT Gateways if you experimented beyond the guide's defaults</label></li>
                    <li className="g-checklist-item"><input type="checkbox" className="g-guide-cb" id="tf-end-6" /><label htmlFor="tf-end-6">Opened the AWS Billing Dashboard and confirmed no unexpected active resources remain</label></li>
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
