"use client";

import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox, TipBox, WarningBox, ErrorCard, Quiz } from "@/components/guide/GuideComponents";

export default function ShopStreamCICD() {
  const navGroups = [
    {
        "title": "Stage 1 · Foundation & Architecture",
        "items": [
            {
                "id": "s1-1",
                "title": "1.1 Project & The CI/CD Problem"
            },
            {
                "id": "s1-2",
                "title": "1.2 Repository Architecture"
            },
            {
                "id": "s1-3",
                "title": "1.3 Prerequisites & Setup"
            },
            {
                "id": "s1-4",
                "title": "1.4 Kubernetes Cluster Setup"
            },
            {
                "id": "s1-5",
                "title": "1.5 Capstone: Validate Environment"
            }
        ]
    },
    {
        "title": "Stage 2 · GitHub Actions CI — Core",
        "items": [
            {
                "id": "s2-1",
                "title": "2.1 Workflow Anatomy"
            },
            {
                "id": "s2-2",
                "title": "2.2 Triggers: push, PR, dispatch"
            },
            {
                "id": "s2-3",
                "title": "2.3 Build & Push to Amazon ECR"
            },
            {
                "id": "s2-4",
                "title": "2.4 Running Tests in CI"
            },
            {
                "id": "s2-5",
                "title": "2.5 GitHub OIDC — No AWS Keys"
            },
            {
                "id": "s2-6",
                "title": "2.6 Capstone: Full CI Pipeline"
            }
        ]
    },
    {
        "title": "Stage 3 · GitHub Actions CI — Advanced",
        "items": [
            {
                "id": "s3-1",
                "title": "3.1 Matrix Builds: All Services at Once"
            },
            {
                "id": "s3-2",
                "title": "3.2 Caching: 4 min → 45 sec"
            },
            {
                "id": "s3-3",
                "title": "3.3 Reusable Workflows (DRY CI)"
            },
            {
                "id": "s3-4",
                "title": "3.4 PR Checks & Branch Protection"
            },
            {
                "id": "s3-5",
                "title": "3.5 Capstone: Matrix CI for All Services"
            }
        ]
    },
    {
        "title": "Stage 4 · ArgoCD & GitOps",
        "items": [
            {
                "id": "s4-1",
                "title": "4.1 Install ArgoCD on Kubernetes"
            },
            {
                "id": "s4-2",
                "title": "4.2 ArgoCD CLI & UI"
            },
            {
                "id": "s4-3",
                "title": "4.3 Your First ArgoCD Application"
            },
            {
                "id": "s4-4",
                "title": "4.4 Helm + ArgoCD Integration"
            },
            {
                "id": "s4-5",
                "title": "4.5 Sync Policies, Health & Hooks"
            },
            {
                "id": "s4-6",
                "title": "4.6 Capstone: Deploy via ArgoCD"
            }
        ]
    },
    {
        "title": "Stage 5 · Wiring CI → CD",
        "items": [
            {
                "id": "s5-1",
                "title": "5.1 The GitOps Image Update Loop"
            },
            {
                "id": "s5-2",
                "title": "5.2 Auto-Updating Helm Values from CI"
            },
            {
                "id": "s5-3",
                "title": "5.3 Environment Promotion"
            },
            {
                "id": "s5-4",
                "title": "5.4 ArgoCD ApplicationSets"
            },
            {
                "id": "s5-5",
                "title": "5.5 Capstone: Full GitOps Loop"
            }
        ]
    },
    {
        "title": "Stage 6 · Production Hardening",
        "items": [
            {
                "id": "s6-1",
                "title": "6.1 Secrets Management (ESO + Vault)"
            },
            {
                "id": "s6-2",
                "title": "6.2 Argo Rollouts: Canary Deployments"
            },
            {
                "id": "s6-3",
                "title": "6.3 ArgoCD RBAC & Multi-Team"
            },
            {
                "id": "s6-4",
                "title": "6.4 Notifications: Slack & PagerDuty"
            },
            {
                "id": "s6-5",
                "title": "6.5 Rollback Strategies"
            },
            {
                "id": "s6-6",
                "title": "6.6 Capstone: Prod-Ready Pipeline"
            }
        ]
    },
    {
        "title": "🗺️ Overview & Roadmap",
        "items": [
            {
                "id": "overview",
                "title": "🗺️ Overview & Roadmap"
            }
        ]
    },
    {
        "title": "🔥 Master Error Reference",
        "items": [
            {
                "id": "errors",
                "title": "🔥 Master Error Reference"
            }
        ]
    },
    {
        "title": "🧹 Resource Cleanup",
        "items": [
            {
                "id": "cleanup",
                "title": "🧹 Resource Cleanup"
            }
        ]
    }
];

  return (
    <GuideWrapper 
      title="ShopStream CI/CD Pipeline" 
      subtitle="GitHub Actions + ArgoCD · AWS EKS · Production-Grade GitOps"
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case 'overview':
            return (
              <div>
                
  <div className="hero-banner">
    <h1>⚙️ ShopStream CI/CD Pipeline</h1>
    <p>GitHub Actions + ArgoCD · AWS EKS · Production-Grade GitOps</p>
    <div className="hero-tags">
      <span className="hero-tag ci">GitHub Actions</span>
      <span className="hero-tag cd">ArgoCD</span>
      <span className="hero-tag k8s">Kubernetes EKS</span>
      <span className="hero-tag aws">Amazon ECR</span>
      <span className="hero-tag aws">Argo Rollouts</span>
    </div>
  </div>

  <ConceptBox title="What this project builds">
     ShopStream is a cloud-native e-commerce platform with 5 Node.js microservices. Right now, deployments are manual — a developer SSH-es into a server, pulls an image, restarts a container. It takes 20 minutes, breaks on Fridays, and nobody knows what version is running where. By the end of this guide, a <code>git push</code> to <code>main</code> will automatically test, build, tag, and ship a new version to Kubernetes — and ArgoCD will ensure production always matches what's in Git. That's the job.
  </ConceptBox>

  <h3>The Full Pipeline at a Glance</h3>
  <div className="diagram">
Developer pushes code
       │
       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    GITHUB ACTIONS (CI)                          │
│                                                                  │
│  ① Checkout  →  ② Test (Jest)  →  ③ Docker Build  →           │
│  ④ ECR Push (sha-tagged)  →  ⑤ Update Helm values.yaml        │
│  ⑥ Git commit + push to infra-config repo                      │
└──────────────────────────┬──────────────────────────────────────┘
                           │  values.yaml updated in Git
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ARGOCD (CD)                                  │
│                                                                  │
│  ① Detects drift between Git and cluster                        │
│  ② Applies Helm chart with new image tag                        │
│  ③ Kubernetes rolls out new Pods                                │
│  ④ Argo Rollouts runs canary (prod only)                        │
│  ⑤ Auto-rollback if health checks fail                         │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
              ✅ New version live in prod (zero downtime)</div>

  <h3>ShopStream Microservices</h3>
  <table>
    <tbody><tr><th>Service</th><th>Port</th><th>Language</th><th>Role</th></tr>
    <tr><td><code>api-gateway</code></td><td>3000</td><td>Node.js</td><td>Entry point, routing, rate limiting</td></tr>
    <tr><td><code>product-catalog</code></td><td>3001</td><td>Node.js</td><td>Products, search, inventory</td></tr>
    <tr><td><code>cart-service</code></td><td>3002</td><td>Node.js</td><td>Shopping cart, Redis-backed</td></tr>
    <tr><td><code>order-service</code></td><td>3003</td><td>Node.js</td><td>Order lifecycle, PostgreSQL</td></tr>
    <tr><td><code>notification-service</code></td><td>3004</td><td>Node.js</td><td>Email/SMS via SES, async</td></tr>
  </tbody></table>

  <h3>Stage Roadmap</h3>
  <div className="stage-table">
    <div className="stage-row"><div className="stage-num">1</div><div className="stage-name">Foundation</div><div className="stage-focus">Repo structure, cluster setup, tooling</div><div className="stage-build">Environment validated and ready</div></div>
    <div className="stage-row"><div className="stage-num">2</div><div className="stage-name">Actions CI Core</div><div className="stage-focus">Workflows, triggers, build, ECR push, OIDC</div><div className="stage-build">product-catalog CI pipeline live</div></div>
    <div className="stage-row"><div className="stage-num">3</div><div className="stage-name">Actions CI Advanced</div><div className="stage-focus">Matrix builds, caching, reusable workflows, PR checks</div><div className="stage-build">All 5 services built in parallel in CI</div></div>
    <div className="stage-row"><div className="stage-num">4</div><div className="stage-name">ArgoCD &amp; GitOps</div><div className="stage-focus">Install ArgoCD, Applications, Helm, sync policies</div><div className="stage-build">product-catalog running on EKS via ArgoCD</div></div>
    <div className="stage-row"><div className="stage-num">5</div><div className="stage-name">Wire CI → CD</div><div className="stage-focus">GitOps loop, values update, env promotion, ApplicationSets</div><div className="stage-build">Full end-to-end: push → cluster in &lt;5 min</div></div>
    <div className="stage-row"><div className="stage-num">6</div><div className="stage-name">Production</div><div className="stage-focus">Secrets, canary deploys, RBAC, rollback, notifications</div><div className="stage-build">Prod-ready pipeline with auto-rollback</div></div>
  </div>

  <WarningBox>
    <strong>⚠️ Cost awareness.</strong> This guide offers a <strong>local path</strong> (kind cluster, free) and an <strong>AWS path</strong> (EKS, ~$150/mo if left running). Every stage calls out which commands cost money. If you're learning: use kind locally. If you're building a portfolio to show employers: use EKS for at least Stage 4 onward, then tear it down using the Cleanup section. Never leave an EKS cluster running overnight by accident.
  </WarningBox>

  <h3>What You Need Before Starting</h3>
  <table>
    <tbody><tr><th>Tool</th><th>Version</th><th>Why</th></tr>
    <tr><td>WSL2 Ubuntu</td><td>22.04+</td><td>All commands run here</td></tr>
    <tr><td>Docker Desktop</td><td>24+</td><td>Build images locally</td></tr>
    <tr><td>kubectl</td><td>1.29+</td><td>Talk to Kubernetes</td></tr>
    <tr><td>Helm</td><td>3.14+</td><td>Package manager for K8s</td></tr>
    <tr><td>AWS CLI</td><td>2.x</td><td>ECR, EKS commands</td></tr>
    <tr><td>kind</td><td>0.22+</td><td>Local K8s cluster (free)</td></tr>
    <tr><td>argocd CLI</td><td>2.10+</td><td>Manage ArgoCD</td></tr>
    <tr><td>GitHub Account</td><td>—</td><td>Actions runner</td></tr>
    <tr><td>AWS Account</td><td>—</td><td>ECR + EKS (optional for local)</td></tr>
  </tbody></table>

  

              </div>
            );
          case 's1-1':
            return (
              <div>
                
  <h2>The CI/CD Problem ShopStream Has <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Foundation &amp; Architecture · Why manual deployments break teams</p>

  <ConceptBox title="Before CI/CD at ShopStream">
     The backend team at ShopStream has 5 developers. When someone wants to ship a fix to <code>order-service</code>, the process is: open a PR, merge it, then <em>manually</em> run a deploy script from their laptop that SSH-es into the EC2 instance, pulls the Docker image, and restarts the container. Three things go wrong constantly: (1) the deploy script only works if your laptop has the right AWS credentials, (2) nobody knows which version is actually running in prod, and (3) a failed deployment has no automatic rollback — someone has to SSH in and manually revert.
  </ConceptBox>

  <h3>The "It Works On My Machine" Deployment Chain</h3>
  <div className="diagram">
Developer A (works)         Developer B (breaks)
     │                           │
     │ aws configure              │ aws configure
     │ (their creds)              │ (different profile)
     ▼                           ▼
 deploy.sh → SSH → EC2       deploy.sh → SSH → EC2
     │                           │
     ✅ works                     ❌ credential error
                                  │
                              "I'll just push manually"
                                  │
                              💥 prod has 3 versions
                                 of order-service
                                 running simultaneously</div>

  <h3>What CI/CD Actually Solves</h3>
  <table>
    <tbody><tr><th>Without CI/CD</th><th>With GitHub Actions + ArgoCD</th></tr>
    <tr><td>"Works on my machine"</td><td>Runs in a clean, identical runner every time</td></tr>
    <tr><td>Tests run if the developer remembers</td><td>Tests are mandatory — PR can't merge without green CI</td></tr>
    <tr><td>Unknown what version is in prod</td><td>Git is the source of truth — every version is a commit SHA</td></tr>
    <tr><td>Rollback = SSH + manual work</td><td>Rollback = <code>git revert</code> + auto-deploy</td></tr>
    <tr><td>Dev/staging/prod drift silently</td><td>ArgoCD shows drift instantly and auto-corrects</td></tr>
    <tr><td>Deploy fails → half-deployed state</td><td>Kubernetes rolling update + Argo Rollouts = zero downtime</td></tr>
  </tbody></table>

  <h3>The Two Halves of This Pipeline</h3>
  <ConceptBox title="CI (Continuous Integration) — GitHub Actions">
     Every time code is pushed, GitHub Actions automatically runs your tests, builds a Docker image, and pushes it to Amazon ECR with a unique image tag (the git commit SHA). If tests fail, the pipeline stops — nothing broken ever reaches the registry.
  </ConceptBox>
  <ConceptBox title="CD (Continuous Delivery) — ArgoCD">
     ArgoCD watches your Git repository for changes to Kubernetes manifests (Helm values files in this project). When CI updates the image tag in the values file, ArgoCD detects the change and syncs the cluster automatically. <em>ArgoCD never pulls code from your developer's laptop</em> — it only ever deploys what's in Git.
  </ConceptBox>

  <Quiz question="❓ Quiz — Why does this pipeline commit the new image tag back to Git instead of just telling Kubernetes to deploy the new image directly from CI?" answer="Because Git becomes the source of truth for what's deployed. If CI deployed directly to Kubernetes with kubectl set image, the cluster state would diverge from Git — nobody would know what's actually running by looking at the repo. By committing the new tag to a values file, every deployed version is recorded in Git history. Rollback becomes git revert. Audits are trivial. ArgoCD can detect drift (someone manually changed the cluster) and auto-correct it. This is the core GitOps principle: Git is the only source of truth for cluster state."></Quiz>

  

              </div>
            );
          case 's1-2':
            return (
              <div>
                
  <h2>Repository Architecture <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Two-repo GitOps strategy — why and how</p>

  <ConceptBox title="Mono-repo vs. two-repo for GitOps">
     There are two common setups. You can put your app code and Kubernetes manifests in one repository, or you can split them. ShopStream uses a <strong>two-repo strategy</strong>: <code>shopstream/app</code> holds all service code, and <code>shopstream/infra-config</code> holds all Helm charts and environment values. The reason: you want CI commits (updating image tags) to be clearly separate from developer code commits. If they're in the same repo, your Git history becomes noise — every CI run creates a commit in the same timeline as feature work. With two repos, <code>infra-config</code>'s history is a clean audit log of <em>what was deployed when</em>.
  </ConceptBox>

  <h3>Repository 1: <code>shopstream/app</code></h3>
  <div className="diagram">
shopstream/app/
├── .github/
│   └── workflows/
│       ├── ci.yml                  ← Main CI pipeline
│       ├── ci-reusable.yml         ← Reusable workflow called per service
│       └── pr-checks.yml           ← PR validation
├── services/
│   ├── api-gateway/
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── product-catalog/
│   │   ├── src/
│   │   ├── tests/
│   │   ├── Dockerfile
│   │   └── package.json
│   ├── cart-service/
│   ├── order-service/
│   └── notification-service/
└── README.md</div>

  <h3>Repository 2: <code>shopstream/infra-config</code></h3>
  <div className="diagram">
shopstream/infra-config/
├── helm/
│   └── shopstream/                 ← One Helm chart, parameterized per service
│       ├── Chart.yaml
│       ├── values.yaml             ← Default values (overridden per env)
│       └── templates/
│           ├── deployment.yaml
│           ├── service.yaml
│           ├── hpa.yaml
│           └── _helpers.tpl
├── environments/
│   ├── dev/
│   │   ├── api-gateway.yaml        ← ArgoCD Application manifest
│   │   ├── product-catalog.yaml
│   │   └── values/
│   │       ├── api-gateway.yaml    ← Env-specific values (image tag lives here)
│   │       └── product-catalog.yaml
│   ├── staging/
│   │   └── (same structure)
│   └── prod/
│       └── (same structure)
├── argocd/
│   ├── applicationsets/            ← ArgoCD ApplicationSet manifests
│   │   └── shopstream-apps.yaml
│   └── projects/
│       └── shopstream.yaml
└── bootstrap/                      ← One-time cluster setup
    ├── argocd-install.yaml
    └── argocd-rbac.yaml</div>

  <TipBox title="📌 Create these repos now">
     Go to GitHub and create two repositories: <code>shopstream-app</code> (with a Node.js .gitignore) and <code>shopstream-infra-config</code> (no template). Clone both to <code>~/projects/</code> in your WSL terminal. All coding for this guide happens inside these two repos.
  </TipBox>

  <h3>Create the Directory Structure</h3>
  <p>Run this once in your WSL terminal to scaffold both repos:</p>
<CodeBlock code={`# In WSL Terminal — run from ~/projects/
cd ~/projects

# Scaffold app repo
mkdir -p shopstream-app/.github/workflows
mkdir -p shopstream-app/services/{api-gateway,product-catalog,cart-service,order-service,notification-service}/{src,tests}

# Scaffold infra-config repo
mkdir -p shopstream-infra-config/helm/shopstream/templates
mkdir -p shopstream-infra-config/environments/{dev,staging,prod}/values
mkdir -p shopstream-infra-config/argocd/{applicationsets,projects}
mkdir -p shopstream-infra-config/bootstrap

echo '✅ Directory structure created'`} title="Terminal"></CodeBlock>

  <WarningBox>
    <strong>⚠️ The infra-config repo needs a deploy key.</strong> When GitHub Actions (running in <code>shopstream-app</code>) commits image tags to <code>shopstream-infra-config</code>, it needs write access to a <em>different</em> repo. You'll set this up in Stage 5 using a GitHub Deploy Key. Don't skip it — this is where most people's pipelines silently fail. A Personal Access Token also works but is less secure for team setups.
  </WarningBox>

  

              </div>
            );
          case 's1-3':
            return (
              <div>
                
  <h2>Prerequisites &amp; Environment Setup <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Install and verify every tool before writing a single workflow</p>

  <TipBox title="📌 Where to run everything in this section">
     WSL2 Ubuntu terminal, unless explicitly noted. Open Windows Terminal → Ubuntu. Every command here is idempotent — safe to re-run if something fails halfway.
  </TipBox>

  <div className="steps">
    <div className="g-step"><div>1</div><div>
      <h4>Install kubectl</h4>
<CodeBlock code={`curl -LO 'https://dl.k8s.io/release/\$(curl -sL https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl'
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
kubectl version --client`} title="Install kubectl"></CodeBlock>
      <p>Expected: <code>Client Version: v1.29.x</code></p>
    </div></div>

    <div className="g-step"><div>2</div><div>
      <h4>Install Helm 3</h4>
<CodeBlock code={`curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash
helm version --short`} title="Install Helm 3"></CodeBlock>
      <p>Expected: <code>v3.14.x+g...</code></p>
    </div></div>

    <div className="g-step"><div>3</div><div>
      <h4>Install kind (local Kubernetes)</h4>
<CodeBlock code={`curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.22.0/kind-linux-amd64
chmod +x ./kind &amp;&amp; sudo mv ./kind /usr/local/bin/kind
kind version`} title="Install kind (local Kubernetes)"></CodeBlock>
      <p>Expected: <code>kind v0.22.0</code></p>
    </div></div>

    <div className="g-step"><div>4</div><div>
      <h4>Install AWS CLI v2</h4>
<CodeBlock code={`curl 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip' -o 'awscliv2.zip'
unzip awscliv2.zip
sudo ./aws/install
aws --version`} title="Install AWS CLI v2"></CodeBlock>
      <p>Expected: <code>aws-cli/2.x.x</code></p>
    </div></div>

    <div className="g-step"><div>5</div><div>
      <h4>Install ArgoCD CLI</h4>
<CodeBlock code={`curl -sSL -o argocd-linux-amd64 \\
  https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
sudo install -m 555 argocd-linux-amd64 /usr/local/bin/argocd
argocd version --client`} title="Install ArgoCD CLI"></CodeBlock>
      <p>Expected: <code>argocd: v2.10.x</code></p>
    </div></div>

    <div className="g-step"><div>6</div><div>
      <h4>Configure AWS credentials (for ECR + EKS path)</h4>
<CodeBlock code={`aws configure
# Enter when prompted:
# AWS Access Key ID: [your key]
# AWS Secret Access Key: [your secret]
# Default region name: ap-south-1
# Default output format: json

# Verify
aws sts get-caller-identity`} title="Configure AWS credentials (for ECR + EKS path)"></CodeBlock>
      <p>Expected: JSON with your AWS account ID, user ARN.</p>
      <WarningBox><strong>⚠️ These are temporary credentials for local use only.</strong> In Stage 2.5, you'll replace long-lived AWS keys with GitHub OIDC — the production-grade approach. Never commit <code>~/.aws/credentials</code> to Git.</WarningBox>
    </div></div>
  </div>

  <ErrorCard error="🔴 kubectl: command not found (after install)" meaning="-bash: kubectl: command not found" fix="Scenario: You installed kubectl but WSL can't find it. This happens when the install put the binary in a directory not in your $PATH, or you're in a new shell session.
      Fix: Check where it landed — which kubectl or ls /usr/local/bin/kubectl. If the file exists, add the directory to PATH: echo 'export PATH=$PATH:/usr/local/bin' >> ~/.bashrc &amp;&amp; source ~/.bashrc. If the file doesn't exist, re-run the install command as root (sudo prefix)."></ErrorCard>

  <ErrorCard error="🔴 aws sts get-caller-identity returns auth error" meaning="An error occurred (InvalidClientTokenId) when calling the GetCallerIdentity operation: The security token included in the request is invalid." fix="Scenario: Your AWS access key was entered incorrectly during aws configure, or the key has been deactivated in IAM.
      Fix: Run aws configure again and re-enter your credentials carefully (no leading/trailing spaces). Verify the key is active in AWS Console → IAM → Users → Security credentials tab. If you're using an IAM role or SSO, run aws configure sso instead."></ErrorCard>

  

              </div>
            );
          case 's1-4':
            return (
              <div>
                
  <h2>Kubernetes Cluster Setup <span className="badge beginner">Beginner</span></h2>
  <p className="subtitle">Stage 1 · Local (kind) or cloud (EKS) — choose your path</p>

  <ConceptBox title="Two valid paths, one guide">
     Everything in this guide works on both a local kind cluster and AWS EKS. Sections that differ between paths are clearly marked. For learning: start local with kind (free, takes 3 minutes). For your portfolio: provision EKS when you reach Stage 4 and tear it down immediately after with the Cleanup section.
  </ConceptBox>

  <h3>Path A — Local kind Cluster (Free)</h3>
<CodeBlock code={`# In WSL Terminal — from anywhere
# Create a kind cluster named 'shopstream'
cat > /tmp/kind-config.yaml << 'EOF'
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
name: shopstream
nodes:
  - role: control-plane
  - role: worker
  - role: worker
EOF

kind create cluster --config /tmp/kind-config.yaml
# Takes ~3 minutes

# Verify
kubectl get nodes
kubectl cluster-info`} title="Terminal"></CodeBlock>

  <p>Expected output from <code>kubectl get nodes</code>:</p>
<CodeBlock code={`NAME                       STATUS   ROLES           AGE   VERSION
shopstream-control-plane   Ready    control-plane   2m    v1.29.2
shopstream-worker          Ready    <none>          2m    v1.29.2
shopstream-worker2         Ready    <none>          2m    v1.29.2`} title="Terminal"></CodeBlock>

  <h3>Path B — AWS EKS Cluster (Portfolio-grade, ~$150/mo if left running)</h3>
<CodeBlock code={`# Install eksctl first
curl --silent --location \\
  'https://github.com/eksctl-io/eksctl/releases/latest/download/eksctl_Linux_amd64.tar.gz' | \\
  tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version

# Create EKS cluster (takes ~15 minutes, costs money from this point)
eksctl create cluster \\
  --name shopstream \\
  --region ap-south-1 \\
  --nodegroup-name workers \\
  --node-type t3.medium \\
  --nodes 2 \\
  --nodes-min 2 \\
  --nodes-max 4 \\
  --managed

# Update kubeconfig
aws eks update-kubeconfig \\
  --name shopstream \\
  --region ap-south-1

# Verify
kubectl get nodes`} title="Terminal"></CodeBlock>

  <WarningBox>
    <strong>⚠️ EKS costs start immediately.</strong> An EKS cluster with 2x t3.medium nodes costs ~$5/day (EC2) + $0.10/hr (EKS control plane). The moment <code>eksctl create cluster</code> completes, you're being billed. Set a calendar reminder to run the cleanup commands in the Resource Cleanup section when you're done.
  </WarningBox>

  <h3>Create Namespaces for ShopStream Environments</h3>
<CodeBlock code={`# Run in WSL Terminal against either cluster
kubectl create namespace shopstream-dev
kubectl create namespace shopstream-staging
kubectl create namespace shopstream-prod
kubectl create namespace argocd

# Verify
kubectl get namespaces | grep shopstream`} title="Terminal"></CodeBlock>

  <ErrorCard error="🔴 kind create cluster fails — 'address already in use'" meaning="ERROR: failed to create cluster: failed to ensure docker network: Error response from daemon: network with name kind already exists" fix="Scenario: You have a leftover kind cluster or Docker network from a previous run. Common after a failed install attempt or WSL restart.
      Fix: kind delete cluster --name shopstream (ignore 'not found' errors), then docker network rm kind 2>/dev/null || true, then re-run the create command. If Docker Desktop is not running, start it first."></ErrorCard>

  

              </div>
            );
          case 's1-5':
            return (
              <div>
                
  <h2>Capstone S1: Validate Your Environment <span className="badge intermediate">Capstone</span></h2>
  <p className="subtitle">Stage 1 · Run one command per tool — if all pass, you're ready for Stage 2</p>

  <ConceptBox title="Why validate before Stage 2">
     You're about to write GitHub Actions workflows that depend on every tool in this list being available and correctly configured. A broken kubectl context or misconfigured AWS profile will cause cryptic CI errors 45 minutes later. Running this validation now saves a debugging session later.
  </ConceptBox>

  <TipBox title="📌 WSL Terminal — run from anywhere">
    
  </TipBox>

<CodeBlock code={`#!/usr/bin/env bash
# Stage 1 Validation Script — run this in WSL Terminal
# Save as ~/projects/validate-env.sh and run with bash

set -e  # Stop on first failure

echo '=== ShopStream Environment Validation ==='
echo ''

# 1. Docker
echo -n 'Docker: '
docker info --format '{{.ServerVersion}}' 2>/dev/null &amp;&amp; echo '✅' || echo '❌ Docker not running'

# 2. kubectl
echo -n 'kubectl: '
kubectl version --client --short 2>/dev/null &amp;&amp; echo '✅' || echo '❌'

# 3. Cluster connectivity
echo -n 'Cluster (kubectl get nodes): '
kubectl get nodes --no-headers 2>/dev/null | grep -c Ready | xargs -I{} echo '{} nodes Ready ✅' || echo '❌ Cluster not reachable'

# 4. Helm
echo -n 'Helm: '
helm version --short 2>/dev/null &amp;&amp; echo '✅' || echo '❌'

# 5. AWS CLI + credentials
echo -n 'AWS identity: '
aws sts get-caller-identity --query 'Account' --output text 2>/dev/null | xargs -I{} echo 'Account {} ✅' || echo '❌ AWS not configured'

# 6. ArgoCD CLI
echo -n 'ArgoCD CLI: '
argocd version --client --short 2>/dev/null &amp;&amp; echo '✅' || echo '❌'

# 7. kind
echo -n 'kind: '
kind version 2>/dev/null &amp;&amp; echo '✅' || echo '❌'

echo ''
echo '=== Validation Complete ==='`} title="Terminal"></CodeBlock>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s1-5-0" /><label htmlfor="cicd-cb-s1-5-0">Two GitHub repos created: shopstream-app and shopstream-infra-config</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s1-5-1" /><label htmlfor="cicd-cb-s1-5-1">Directory structure scaffolded in both repos</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s1-5-2" /><label htmlfor="cicd-cb-s1-5-2">kubectl, Helm, kind/eksctl, AWS CLI, ArgoCD CLI all installed and verified</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s1-5-3" /><label htmlfor="cicd-cb-s1-5-3">Kubernetes cluster running with 3 nodes (or 2 EKS nodes)</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s1-5-4" /><label htmlfor="cicd-cb-s1-5-4">Namespaces shopstream-dev, staging, prod, argocd created</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s1-5-5" /><label htmlfor="cicd-cb-s1-5-5">Validation script passes all checks</label></li></ul></div>

  

              </div>
            );
          case 's2-1':
            return (
              <div>
                
  <h2>Workflow Anatomy <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · GitHub Actions CI — every line of a workflow file explained</p>

  <ConceptBox title="GitHub Actions is event-driven YAML">
     You define workflows in <code>.github/workflows/</code> inside your repo. Each workflow runs when an event fires (a push, a pull request, a schedule). The workflow contains jobs, each job runs on a GitHub-hosted runner (a fresh Ubuntu VM), and each job contains steps — individual shell commands or reusable Actions. Everything in this section applies to the <code>shopstream-app</code> repo.
  </ConceptBox>

  <TipBox title="📌 Where to create these files">
     Inside <code>~/projects/shopstream-app/.github/workflows/</code> in your WSL Terminal. GitHub Actions picks up any YAML file in this directory automatically.
  </TipBox>

  <h3>Anatomy of a Workflow File</h3>
<CodeBlock code={`# .github/workflows/ci.yml — every field explained
name: CI Pipeline          # Shown in GitHub Actions UI tab

on:                        # What triggers this workflow
  push:
    branches: [main]       # Only on pushes to main
  pull_request:
    branches: [main]       # And on PRs targeting main

env:                       # Workflow-level environment variables
  NODE_ENV: test
  AWS_REGION: ap-south-1

jobs:                      # One or more parallel jobs
  test:                    # Job ID (used for dependency references)
    name: Run Tests        # Human-readable name in UI
    runs-on: ubuntu-latest # The runner VM (fresh Ubuntu 22.04)

    steps:
      # Step 1: Get your code onto the runner
      - name: Checkout code
        uses: actions/checkout@v4    # Official GitHub action

      # Step 2: Set up Node.js runtime
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'               # Automatically caches node_modules

      # Step 3: Install dependencies
      - name: Install dependencies
        run: npm ci                  # Faster than npm install, uses lockfile

      # Step 4: Run tests
      - name: Run unit tests
        run: npm test -- --coverage
        working-directory: ./services/product-catalog

      # Step 5: Upload coverage (optional but good practice)
      - name: Upload coverage
        uses: codecov/codecov-action@v4
        if: always()                 # Run even if tests fail`} title="Terminal"></CodeBlock>

  <h3>Key Concepts You'll Use Every Day</h3>
  <table>
    <tbody><tr><th>Concept</th><th>What it is</th><th>Example</th></tr>
    <tr><td><code>uses:</code></td><td>Run a pre-built action from the marketplace</td><td><code>uses: actions/checkout@v4</code></td></tr>
    <tr><td><code>run:</code></td><td>Run any shell command on the runner</td><td><code>run: npm test</code></td></tr>
    <tr><td><code>with:</code></td><td>Pass inputs to an action</td><td><code>with: node-version: '20'</code></td></tr>
    <tr><td><code>env:</code></td><td>Set environment variables</td><td><code>env: NODE_ENV: test</code></td></tr>
    <tr><td><code>if:</code></td><td>Conditional step execution</td><td><code>if: github.ref == 'refs/heads/main'</code></td></tr>
    <tr><td><code>needs:</code></td><td>Job depends on another job passing</td><td><code>needs: [test]</code></td></tr>
    <tr><td><code>outputs:</code></td><td>Pass values between jobs</td><td>Used to pass image tags between jobs</td></tr>
    <tr><td><code>secrets:</code></td><td>Encrypted values from repo settings</td><td><code>secrets.AWS_ACCOUNT_ID</code></td></tr>
  </tbody></table>

  <h3>How GitHub Expressions Work</h3>
  <ConceptBox title="Expressions let you make workflows dynamic">
     You'll use them constantly. The syntax is <code>${"{"}{"{"} expression {"}"}{"}"}</code>. These are evaluated at runtime on the runner.
  </ConceptBox>
<CodeBlock code={`# Common expressions you'll use in ShopStream
\${{ github.sha }}           # Full commit SHA (e.g. a3f8d92c...) — used as image tag
\${{ github.sha[0:7] }}      # Short SHA (first 7 chars)
\${{ github.ref_name }}      # Branch name (e.g. main, feature/new-checkout)
\${{ github.event_name }}    # What triggered the run (push, pull_request)
\${{ github.actor }}         # Username who triggered the workflow
\${{ github.repository }}    # owner/repo (e.g. shopstream/app)

# Context objects
\${{ env.AWS_REGION }}       # From env: block
\${{ secrets.ECR_REGISTRY }} # From repo Settings → Secrets
\${{ vars.ENVIRONMENT }}     # From repo Settings → Variables (non-secret)
\${{ steps.build.outputs.image_tag }}  # Output from a previous step named 'build'`} title="Terminal"></CodeBlock>

  <Quiz question="❓ Quiz — A workflow has two jobs: test and build. You add needs: [test] to the build job. What happens if the test job fails?" answer="The build job is skipped entirely. When you use needs:, GitHub Actions won't start the dependent job if any of its dependencies fail or are skipped. This is exactly what you want: if tests fail, don't build a broken image. The workflow will show as failed (red) because the test job failed, even though the build job was never attempted. You can override this with if: always() on specific steps (e.g. for cleanup), but for production pipelines you always want failures to block downstream jobs."></Quiz>

  

              </div>
            );
          case 's2-2':
            return (
              <div>
                
  <h2>Triggers: push, PR, dispatch <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · Controlling exactly when your pipeline runs</p>

  <ConceptBox title="Triggers are your pipeline's entry points">
     ShopStream uses three trigger patterns: (1) <code>push</code> to <code>main</code> triggers the full CI + image build, (2) <code>pull_request</code> to <code>main</code> triggers tests only (no image push — PR images are ephemeral), and (3) <code>workflow_dispatch</code> allows manual runs for emergencies or on-demand staging deploys.
  </ConceptBox>

  <TipBox title="📌 WSL Terminal — edit files in ~/projects/shopstream-app/.github/workflows/">
    
  </TipBox>

<CodeBlock code={`# .github/workflows/ci.yml — production trigger setup
name: ShopStream CI

on:
  push:
    branches:
      - main           # Deploy path: tests + build + ECR push
    paths:
      # Only trigger when service code or workflow changes
      # Prevents CI running when you update README.md
      - 'services/**'
      - '.github/workflows/**'

  pull_request:
    branches:
      - main           # PR path: tests only, no image push
    types: [opened, synchronize, reopened]
    paths:
      - 'services/**'

  workflow_dispatch:   # Manual trigger from GitHub Actions UI
    inputs:
      service:
        description: 'Which service to deploy (leave empty for all)'
        required: false
        default: 'all'
      environment:
        description: 'Target environment'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - prod

  schedule:
    - cron: '0 2 * * 1'  # Every Monday at 2am — dependency audit
`} title="Terminal"></CodeBlock>

  <h3>Using Context to Branch Behaviour</h3>
  <p>The same workflow file handles both PR and push events — you use conditions to skip expensive steps on PRs:</p>
<CodeBlock code={`jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Run tests
        run: npm test
        working-directory: ./services/product-catalog

      # This step ONLY runs on push to main, not on PRs
      - name: Build and push Docker image
        if: github.event_name == 'push' &amp;&amp; github.ref == 'refs/heads/main'
        run: |
          echo 'Building image — this is a real push to main'
          # docker build / push commands here

      # This step ONLY runs on PRs
      - name: Add test summary to PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ Tests passed for this PR'
            })`} title="Terminal"></CodeBlock>

  <h3>The <code>paths:</code> Filter — Why It Matters for Monorepos</h3>
  <ConceptBox title="Without paths: filtering, every commit triggers CI for all services">
     If you update the README in <code>shopstream-app</code>, there's no reason to rebuild the <code>order-service</code> Docker image. With <code>paths:</code>, GitHub only triggers the workflow if files matching the pattern actually changed. This cuts CI time and AWS costs significantly on an active team.
  </ConceptBox>
<CodeBlock code={`# Service-specific trigger — only rebuild product-catalog when it changes
on:
  push:
    branches: [main]
    paths:
      - 'services/product-catalog/**'
      - '.github/workflows/product-catalog-ci.yml'`} title="Terminal"></CodeBlock>

  

              </div>
            );
          case 's2-3':
            return (
              <div>
                
  <h2>Build &amp; Push Docker Images to ECR <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · Multi-stage Dockerfile + ECR push with build caching</p>

  <ConceptBox title="The image tagging strategy determines your ability to roll back">
     ShopStream tags every image with the full git commit SHA (<code>a3f8d92c</code>). Never use <code>latest</code> in production — it's a mutable tag that tells you nothing about what code is actually running. With SHA-based tags, you can trace any running Pod back to the exact commit that built it, and ArgoCD can tell if the cluster drifted from what Git says should be deployed.
  </ConceptBox>

  <h3>Step 1: Create ECR Repositories</h3>
  <TipBox title="📌 WSL Terminal — run once, costs nothing (ECR is free until you push images)">
    
  </TipBox>
<CodeBlock code={`# Create one ECR repository per service
REGION=ap-south-1
ACCOUNT=\$(aws sts get-caller-identity --query Account --output text)

for service in api-gateway product-catalog cart-service order-service notification-service; do
  aws ecr create-repository \\
    --repository-name shopstream/\$service \\
    --region \$REGION \\
    --image-scanning-configuration scanOnPush=true \\
    --encryption-configuration encryptionType=AES256
  echo '✅ Created ECR repo for \$service'
done

# List created repos
aws ecr describe-repositories --query 'repositories[].repositoryUri' --output table`} title="Terminal"></CodeBlock>

  <h3>Step 2: Production Dockerfile (Multi-Stage)</h3>
  <p>Create this in <code>services/product-catalog/Dockerfile</code>:</p>
<CodeBlock code={`# services/product-catalog/Dockerfile
# Stage 1: Install dependencies (cached separately from app code)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production &amp;&amp; npm cache clean --force

# Stage 2: Build / transpile (if using TypeScript)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build 2>/dev/null || true  # Skip if no build step

# Stage 3: Production image (minimal, no dev dependencies)
FROM node:20-alpine AS runner
WORKDIR /app

# Non-root user — required for most production Kubernetes setups
RUN addgroup --system --gid 1001 nodejs &amp;&amp; \\
    adduser --system --uid 1001 nodeuser

COPY --from=deps --chown=nodeuser:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodeuser:nodejs /app/src ./src
COPY --from=builder --chown=nodeuser:nodejs /app/package.json ./

USER nodeuser

EXPOSE 3001
ENV PORT=3001
ENV NODE_ENV=production

# Use exec form (not shell form) for proper signal handling
CMD ['node', 'src/index.js']`} title="Terminal"></CodeBlock>

  <h3>Step 3: The Build &amp; Push Workflow Job</h3>
<CodeBlock code={`# .github/workflows/ci.yml — build job (add after test job)
  build-push:
    name: Build &amp; Push to ECR
    runs-on: ubuntu-latest
    needs: [test]          # Only run if tests pass
    if: github.event_name == 'push' &amp;&amp; github.ref == 'refs/heads/main'

    permissions:
      id-token: write      # Required for OIDC (covered in 2.5)
      contents: read

    outputs:
      image_tag: \${{ steps.meta.outputs.tag }}   # Pass tag to next job

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Configure AWS credentials (OIDC)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::\${{ secrets.AWS_ACCOUNT_ID }}:role/github-actions-ecr-role
          aws-region: ap-south-1

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      # Generate image tag from commit SHA (first 8 chars)
      - name: Generate image metadata
        id: meta
        run: |
          SHORT_SHA=\$(echo '\${{ github.sha }}' | cut -c1-8)
          TAG='\${SHORT_SHA}'
          REGISTRY='\${{ steps.login-ecr.outputs.registry }}'
          IMAGE='\${REGISTRY}/shopstream/product-catalog:\${TAG}'
          echo 'tag=\${TAG}' >> \$GITHUB_OUTPUT
          echo 'image=\${IMAGE}' >> \$GITHUB_OUTPUT
          echo 'registry=\${REGISTRY}' >> \$GITHUB_OUTPUT

      # Set up Docker Buildx for layer caching
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      # Build with ECR cache — dramatically speeds up subsequent builds
      - name: Build and push image
        uses: docker/build-push-action@v5
        with:
          context: ./services/product-catalog
          push: true
          tags: \${{ steps.meta.outputs.image }}
          cache-from: type=registry,ref=\${{ steps.meta.outputs.registry }}/shopstream/product-catalog:cache
          cache-to: type=registry,ref=\${{ steps.meta.outputs.registry }}/shopstream/product-catalog:cache,mode=max

      # Image vulnerability scan — block deploy if CRITICAL CVEs found
      - name: Run ECR image scan
        run: |
          aws ecr wait image-scan-complete \\
            --repository-name shopstream/product-catalog \\
            --image-id imageTag=\${{ steps.meta.outputs.tag }} \\
            --region ap-south-1

          CRITICAL=\$(aws ecr describe-image-scan-findings \\
            --repository-name shopstream/product-catalog \\
            --image-id imageTag=\${{ steps.meta.outputs.tag }} \\
            --query 'imageScanFindings.findingSeverityCounts.CRITICAL' \\
            --output text)

          if [ '\$CRITICAL' != 'None' ] &amp;&amp; [ '\$CRITICAL' -gt 0 ]; then
            echo '❌ CRITICAL CVEs found: \$CRITICAL — blocking deployment'
            exit 1
          fi
          echo '✅ No CRITICAL CVEs found'`} title="Terminal"></CodeBlock>

  <ErrorCard error="🔴 ECR push fails — 'no basic auth credentials'" meaning="failed to solve: failed to push image: unexpected status code 401 Unauthorized: no basic auth credentials" fix="Scenario: The ECR login step ran, but the Docker build-push step is running in a different environment context (Buildx uses a separate daemon). The auth token from amazon-ecr-login isn't being passed to Buildx automatically.
      Fix: Add DOCKER_CONFIG: ~/.docker as an environment variable to the build step, or ensure aws-actions/amazon-ecr-login@v2 is at v2 (not v1) — v2 handles Buildx auth correctly. Also check that uses: docker/setup-buildx-action@v3 comes before the build step."></ErrorCard>

  <WarningBox>
    <strong>⚠️ ECR image scans cost money.</strong> AWS charges $0.09/image/scan after the free tier (first 1,000 scans/month free per account). For a team pushing 50 builds/day, this adds up. Use Enhanced Scanning (once) rather than basic scanning on every push, or only scan on pushes to main. The <code>scanOnPush=true</code> in the ECR repo creation above is sufficient for this guide.
  </WarningBox>

  

              </div>
            );
          case 's2-4':
            return (
              <div>
                
  <h2>Running Tests in CI <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 2 · Unit tests, integration tests, and making CI actually enforce quality</p>

  <ConceptBox title="A CI pipeline without tests is just a build server">
     The point of CI is to catch broken code before it reaches production. For ShopStream, every service runs unit tests (fast, no dependencies) and a limited integration test suite (hits a real PostgreSQL or Redis, spun up in CI via <code>services:</code>). If any test fails, the whole pipeline stops — nothing reaches ECR.
  </ConceptBox>

  <h3>Create a Real Test for product-catalog</h3>
  <p>Create <code>services/product-catalog/tests/product.test.js</code>:</p>
<CodeBlock code={`// services/product-catalog/tests/product.test.js
const { getProductById, searchProducts } = require('../src/services/productService');

describe('ProductService', () => {
  describe('getProductById', () => {
    it('returns a product when ID exists', async () => {
      const product = await getProductById('prod-001');
      expect(product).toBeDefined();
      expect(product.id).toBe('prod-001');
      expect(product.price).toBeGreaterThan(0);
    });

    it('throws NotFoundError when product does not exist', async () => {
      await expect(getProductById('does-not-exist'))
        .rejects.toThrow('Product not found');
    });
  });

  describe('searchProducts', () => {
    it('returns empty array when no results match', async () => {
      const results = await searchProducts('xyzzy-nonexistent-query-123');
      expect(results).toEqual([]);
    });

    it('returns results sorted by relevance', async () => {
      const results = await searchProducts('laptop');
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].score).toBeGreaterThanOrEqual(results[1]?.score ?? 0);
    });
  });
});`} title="Terminal"></CodeBlock>

  <h3>CI Job with a Real PostgreSQL Database</h3>
  <ConceptBox title="The services: block in GitHub Actions spins up Docker containers alongside your runner">
     Your test job can connect to a real PostgreSQL instance — not a mock — using <code>localhost:5432</code>. This catches SQL query bugs that unit mocks would miss.
  </ConceptBox>
<CodeBlock code={`# .github/workflows/ci.yml — test job with services
  test:
    name: Test Suite
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: shopstream_test
          POSTGRES_USER: shopstream
          POSTGRES_PASSWORD: testpassword
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
        options: >-
          --health-cmd 'redis-cli ping'
          --health-interval 10s
          --health-timeout 3s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: services/product-catalog/package-lock.json

      - name: Install dependencies
        run: npm ci
        working-directory: ./services/product-catalog

      - name: Run database migrations
        run: npm run migrate
        working-directory: ./services/product-catalog
        env:
          DATABASE_URL: postgresql://shopstream:testpassword@localhost:5432/shopstream_test

      - name: Run unit tests
        run: npm test -- --coverage --coverageReporters=json-summary
        working-directory: ./services/product-catalog
        env:
          DATABASE_URL: postgresql://shopstream:testpassword@localhost:5432/shopstream_test
          REDIS_URL: redis://localhost:6379
          NODE_ENV: test

      # Post coverage as PR comment
      - name: Report coverage
        if: github.event_name == 'pull_request'
        uses: davelosert/vitest-coverage-report-action@v2
        with:
          working-directory: ./services/product-catalog`} title="Terminal"></CodeBlock>

  <ErrorCard error="🔴 Integration tests fail — 'connect ECONNREFUSED 127.0.0.1:5432'" meaning="Error: connect ECONNREFUSED 127.0.0.1:5432
    at TCPConnectWrap.afterConnect [as oncomplete]" fix="Scenario: Your test job starts before the PostgreSQL service container is healthy. The service takes a few seconds to start, and if the first test runs immediately, the connection fails. This happens when you forget the options: --health-cmd block, or when your test code doesn't retry the connection.
      Fix: Add the --health-cmd pg_isready option to the service (shown above). GitHub Actions waits until the health check passes before running your steps. Also verify you're using localhost (not postgres) as the hostname — services are exposed on the runner's localhost, not via their container name."></ErrorCard>

  

              </div>
            );
          case 's2-5':
            return (
              <div>
                
  <h2>GitHub OIDC — No Long-Lived AWS Keys <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 2 · The production-grade way to authenticate GitHub Actions to AWS</p>

  <ConceptBox title="Storing AWS_ACCESS_KEY_ID in GitHub Secrets is the old way — and it's a security risk">
     If that secret is ever leaked (misconfigured public fork, log exposure, Actions vulnerability), someone has permanent AWS access until you manually rotate. GitHub OIDC is different: Actions requests a short-lived JWT token from GitHub's identity provider, exchanges it for a temporary AWS credential (valid 1 hour), and never stores a long-lived key anywhere. This is the approach AWS, HashiCorp, and every security-conscious team now uses.
  </ConceptBox>

  <h3>Step 1: Create the OIDC Identity Provider in AWS</h3>
  <TipBox title="📌 WSL Terminal — run once per AWS account">
    
  </TipBox>
<CodeBlock code={`# Create GitHub OIDC provider in your AWS account
aws iam create-open-id-connect-provider \\
  --url https://token.actions.githubusercontent.com \\
  --client-id-list sts.amazonaws.com \\
  --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1

echo '✅ OIDC provider created'`} title="Terminal"></CodeBlock>

  <h3>Step 2: Create IAM Role That GitHub Can Assume</h3>
<CodeBlock code={`# Step 2a: Create the trust policy
# This policy says: 'GitHub Actions workflows in shopstream/app repo can assume this role'
ACCOUNT=\$(aws sts get-caller-identity --query Account --output text)

cat > /tmp/github-trust-policy.json << EOF
{
  'Version': '2012-10-17',
  'Statement': [
    {
      'Effect': 'Allow',
      'Principal': {
        'Federated': 'arn:aws:iam::\${ACCOUNT}:oidc-provider/token.actions.githubusercontent.com'
      },
      'Action': 'sts:AssumeRoleWithWebIdentity',
      'Condition': {
        'StringEquals': {
          'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com'
        },
        'StringLike': {
          'token.actions.githubusercontent.com:sub': 'repo:YOUR_GITHUB_ORG/shopstream-app:*'
        }
      }
    }
  ]
}
EOF

# Replace YOUR_GITHUB_ORG with your actual GitHub username/org
sed -i 's/YOUR_GITHUB_ORG/your-github-username/' /tmp/github-trust-policy.json

# Step 2b: Create the role
aws iam create-role \\
  --role-name github-actions-shopstream \\
  --assume-role-policy-document file:///tmp/github-trust-policy.json

# Step 2c: Attach permissions — ECR push + EKS read
aws iam create-policy \\
  --policy-name shopstream-ci-policy \\
  --policy-document '{
    'Version': '2012-10-17',
    'Statement': [
      {
        'Effect': 'Allow',
        'Action': [
          'ecr:GetAuthorizationToken',
          'ecr:BatchCheckLayerAvailability',
          'ecr:InitiateLayerUpload',
          'ecr:UploadLayerPart',
          'ecr:CompleteLayerUpload',
          'ecr:PutImage',
          'ecr:DescribeImageScanFindings',
          'ecr:DescribeRepositories'
        ],
        'Resource': '*'
      }
    ]
  }'

aws iam attach-role-policy \\
  --role-name github-actions-shopstream \\
  --policy-arn arn:aws:iam::\${ACCOUNT}:policy/shopstream-ci-policy

echo '✅ IAM role created: github-actions-shopstream'
echo 'Role ARN: arn:aws:iam::\${ACCOUNT}:role/github-actions-shopstream'`} title="Terminal"></CodeBlock>

  <h3>Step 3: Store the Role ARN as a GitHub Secret</h3>
  <p>Go to your <code>shopstream-app</code> GitHub repo → Settings → Secrets and variables → Actions → New repository secret:</p>
  <table>
    <tbody><tr><th>Secret Name</th><th>Value</th></tr>
    <tr><td><code>AWS_ACCOUNT_ID</code></td><td>Your 12-digit AWS account ID</td></tr>
    <tr><td><code>AWS_ROLE_ARN</code></td><td><code>arn:aws:iam::123456789012:role/github-actions-shopstream</code></td></tr>
  </tbody></table>

  <h3>Step 4: Use OIDC in Your Workflow</h3>
<CodeBlock code={`# .github/workflows/ci.yml — OIDC authentication (replace static credentials)
jobs:
  build-push:
    runs-on: ubuntu-latest
    permissions:
      id-token: write   # ← THIS IS REQUIRED for OIDC. Without it, the token request fails
      contents: read

    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS credentials via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_ROLE_ARN }}
          role-session-name: shopstream-ci-\${{ github.run_id }}
          aws-region: ap-south-1
          # No access-key-id or secret-access-key needed!

      - name: Verify AWS identity
        run: aws sts get-caller-identity`} title="Terminal"></CodeBlock>

  <ErrorCard error="🔴 OIDC token request fails — 'Not authorized to perform sts:AssumeRoleWithWebIdentity'" meaning="Error: Not authorized to perform sts:AssumeRoleWithWebIdentity
    Could not assume role arn:aws:iam::123456789012:role/github-actions-shopstream" fix="Scenario: The trust policy's StringLike condition doesn't match the workflow's subject. Common causes: (1) you put your username in but the repo is in an org, (2) you used StringEquals instead of StringLike for the subject, (3) the OIDC provider thumbprint is wrong.
      Fix: Check the exact sub value GitHub is sending by adding a step: run: echo '$ACTIONS_ID_TOKEN_REQUEST_TOKEN' | cut -d. -f2 | base64 -d 2>/dev/null | python3 -m json.tool | grep sub. Ensure your trust policy subject matches exactly — format is repo:OWNER/REPO:ref:refs/heads/main for branch-specific locks, or repo:OWNER/REPO:* to allow all triggers."></ErrorCard>

  <WarningBox>
    <strong>⚠️ Don't forget <code>permissions: id-token: write</code>.</strong> This is the single most common mistake with GitHub OIDC. Without it, GitHub refuses to issue the OIDC token at all. The error message doesn't clearly say "missing permission" — it just says the role assumption failed, which sends everyone down the wrong debugging path (the IAM role). Always check permissions first.
  </WarningBox>

  

              </div>
            );
          case 's2-6':
            return (
              <div>
                
  <h2>Capstone S2: Full CI Pipeline for product-catalog <span className="badge intermediate">Capstone</span></h2>
  <p className="subtitle">Stage 2 · One complete workflow file from checkout to ECR push</p>

  <ConceptBox title="This is the file you'll reference for every service">
     It combines everything from Stage 2: OIDC auth, test job with PostgreSQL, multi-stage Docker build, ECR push with build cache, and image scanning. Commit this, push to main, and watch GitHub Actions run the full pipeline.
  </ConceptBox>

  <TipBox title="📌 Create this file at: ~/projects/shopstream-app/.github/workflows/product-catalog-ci.yml">
    
  </TipBox>

<CodeBlock code={`# .github/workflows/product-catalog-ci.yml
name: product-catalog CI

on:
  push:
    branches: [main]
    paths:
      - 'services/product-catalog/**'
      - '.github/workflows/product-catalog-ci.yml'
  pull_request:
    branches: [main]
    paths:
      - 'services/product-catalog/**'
  workflow_dispatch:

env:
  SERVICE: product-catalog
  AWS_REGION: ap-south-1

jobs:
  # ──────────────────────────────────────────────
  # JOB 1: Test
  # ──────────────────────────────────────────────
  test:
    name: 🧪 Test
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: shopstream_test
          POSTGRES_USER: shopstream
          POSTGRES_PASSWORD: testpassword
        ports: [5432:5432]
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: services/\${{ env.SERVICE }}/package-lock.json

      - name: Install dependencies
        run: npm ci
        working-directory: services/\${{ env.SERVICE }}

      - name: Lint
        run: npm run lint
        working-directory: services/\${{ env.SERVICE }}

      - name: Unit + integration tests
        run: npm test -- --coverage
        working-directory: services/\${{ env.SERVICE }}
        env:
          DATABASE_URL: postgresql://shopstream:testpassword@localhost:5432/shopstream_test
          NODE_ENV: test

  # ──────────────────────────────────────────────
  # JOB 2: Build &amp; Push (only on main branch push)
  # ──────────────────────────────────────────────
  build-push:
    name: 🐳 Build &amp; Push
    runs-on: ubuntu-latest
    needs: [test]
    if: github.event_name == 'push' &amp;&amp; github.ref == 'refs/heads/main'

    permissions:
      id-token: write
      contents: read

    outputs:
      image_tag: \${{ steps.meta.outputs.tag }}
      image_uri: \${{ steps.meta.outputs.uri }}

    steps:
      - uses: actions/checkout@v4

      - name: Configure AWS via OIDC
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_ROLE_ARN }}
          role-session-name: ci-\${{ env.SERVICE }}-\${{ github.run_id }}
          aws-region: \${{ env.AWS_REGION }}

      - name: Login to ECR
        id: ecr-login
        uses: aws-actions/amazon-ecr-login@v2

      - name: Generate image metadata
        id: meta
        run: |
          SHORT_SHA=\$(echo '\${{ github.sha }}' | cut -c1-8)
          REGISTRY='\${{ steps.ecr-login.outputs.registry }}'
          URI='\${REGISTRY}/shopstream/\${{ env.SERVICE }}:\${SHORT_SHA}'
          echo 'tag=\${SHORT_SHA}' >> \$GITHUB_OUTPUT
          echo 'uri=\${URI}' >> \$GITHUB_OUTPUT
          echo 'registry=\${REGISTRY}' >> \$GITHUB_OUTPUT
          echo 'Image will be: \$URI'

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: services/\${{ env.SERVICE }}
          push: true
          tags: |
            \${{ steps.meta.outputs.uri }}
            \${{ steps.ecr-login.outputs.registry }}/shopstream/\${{ env.SERVICE }}:latest
          cache-from: type=registry,ref=\${{ steps.ecr-login.outputs.registry }}/shopstream/\${{ env.SERVICE }}:cache
          cache-to: type=registry,ref=\${{ steps.ecr-login.outputs.registry }}/shopstream/\${{ env.SERVICE }}:cache,mode=max
          labels: |
            git.commit=\${{ github.sha }}
            git.branch=\${{ github.ref_name }}
            built.at=\${{ github.run_id }}

      - name: Wait for ECR scan &amp; verify
        run: |
          echo 'Waiting for vulnerability scan...'
          aws ecr wait image-scan-complete \\
            --repository-name shopstream/\${{ env.SERVICE }} \\
            --image-id imageTag=\${{ steps.meta.outputs.tag }} \\
            --region \${{ env.AWS_REGION }} || true

          CRITICAL=\$(aws ecr describe-image-scan-findings \\
            --repository-name shopstream/\${{ env.SERVICE }} \\
            --image-id imageTag=\${{ steps.meta.outputs.tag }} \\
            --query 'imageScanFindings.findingSeverityCounts.CRITICAL' \\
            --output text 2>/dev/null || echo '0')

          echo 'Critical CVEs: \$CRITICAL'
          [ '\$CRITICAL' = 'None' ] || [ '\$CRITICAL' = '0' ] || \\
            (echo '❌ CRITICAL CVEs detected — blocking deploy' &amp;&amp; exit 1)
          echo '✅ Image scan passed'

      - name: Summary
        run: |
          echo '## 🐳 Image Published' >> \$GITHUB_STEP_SUMMARY
          echo '| Key | Value |' >> \$GITHUB_STEP_SUMMARY
          echo '|-----|-------|' >> \$GITHUB_STEP_SUMMARY
          echo '| Service | \${{ env.SERVICE }} |' >> \$GITHUB_STEP_SUMMARY
          echo '| Tag | \\\`\${{ steps.meta.outputs.tag }}\\\` |' >> \$GITHUB_STEP_SUMMARY
          echo '| Image URI | \\\`\${{ steps.meta.outputs.uri }}\\\` |' >> \$GITHUB_STEP_SUMMARY
          echo '| Commit | \${{ github.sha }} |' >> \$GITHUB_STEP_SUMMARY`} title="Terminal"></CodeBlock>

  <h3>Push and Watch It Run</h3>
<CodeBlock code={`# In WSL Terminal — from ~/projects/shopstream-app/
git add .github/workflows/product-catalog-ci.yml
git add services/product-catalog/
git commit -m 'feat: add product-catalog CI pipeline'
git push origin main

# Open in browser
echo 'Visit: https://github.com/YOUR_ORG/shopstream-app/actions'`} title="Terminal"></CodeBlock>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s2-6-0" /><label htmlfor="cicd-cb-s2-6-0">Understand workflow anatomy: trigger, job, step, uses/run</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s2-6-1" /><label htmlfor="cicd-cb-s2-6-1">OIDC trust relationship configured between GitHub and AWS (no static keys)</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s2-6-2" /><label htmlfor="cicd-cb-s2-6-2">ECR repositories created for all 5 ShopStream services</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s2-6-3" /><label htmlfor="cicd-cb-s2-6-3">product-catalog-ci.yml committed and running green in GitHub Actions</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s2-6-4" /><label htmlfor="cicd-cb-s2-6-4">Docker image visible in ECR with SHA-based tag</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s2-6-5" /><label htmlfor="cicd-cb-s2-6-5">ECR image scan passes with no CRITICAL CVEs</label></li></ul></div>

  

              </div>
            );
          case 's3-1':
            return (
              <div>
                
  <h2>Matrix Builds: All 5 Services in Parallel <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 3 · GitHub Actions CI Advanced · Stop writing one workflow per service</p>

  <ConceptBox title="The problem with per-service workflow files">
     You just wrote a workflow for product-catalog. If you copy it 4 more times for the other services, you now have 5 nearly-identical files. When the ECR login action releases a new version, you update it in 5 places. When a security issue requires changing the image scan logic, same. Matrix builds solve this: one workflow file, parameterized by service name, runs the same steps for every service in parallel.
  </ConceptBox>

  <TipBox title="📌 WSL Terminal — create file at ~/projects/shopstream-app/.github/workflows/ci-all-services.yml">
    
  </TipBox>

<CodeBlock code={`# .github/workflows/ci-all-services.yml
# One file builds all 5 ShopStream services in parallel
name: All Services CI

on:
  push:
    branches: [main]
    paths:
      - 'services/**'
      - '.github/workflows/ci-all-services.yml'
  pull_request:
    branches: [main]
    paths:
      - 'services/**'

env:
  AWS_REGION: ap-south-1

jobs:
  # Detect which services actually changed (don't rebuild unchanged ones)
  changed-services:
    name: Detect Changed Services
    runs-on: ubuntu-latest
    outputs:
      matrix: \${{ steps.changes.outputs.matrix }}
      any_changed: \${{ steps.changes.outputs.any_changed }}

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2  # Need previous commit to detect changes

      - name: Detect changed services
        id: changes
        run: |
          SERVICES=('api-gateway' 'product-catalog' 'cart-service' 'order-service' 'notification-service')
          CHANGED=()

          for svc in '\${SERVICES[@]}'; do
            if git diff --name-only HEAD~1 HEAD -- 'services/\$svc/' | grep -q .; then
              CHANGED+=('\\'\$svc\\'')
              echo 'Changed: \$svc'
            fi
          done

          # On workflow_dispatch, build all services
          if [ '\${{ github.event_name }}' = 'workflow_dispatch' ]; then
            CHANGED=()
            for svc in '\${SERVICES[@]}'; do
              CHANGED+=('\\'\$svc\\'')
            done
            echo 'Manual trigger: building all services'
          fi

          if [ \${#CHANGED[@]} -eq 0 ]; then
            echo 'No service changes detected'
            echo 'any_changed=false' >> \$GITHUB_OUTPUT
            echo 'matrix={'service':[]}' >> \$GITHUB_OUTPUT
          else
            MATRIX=\$(printf '%s\\n' '\${CHANGED[@]}' | paste -sd,)
            echo 'any_changed=true' >> \$GITHUB_OUTPUT
            echo 'matrix={\\'service\\':[\$MATRIX]}' >> \$GITHUB_OUTPUT
            echo 'Matrix: {\\'service\\':[\$MATRIX]}'
          fi

  # Build and test each changed service in parallel
  build-test:
    name: 🔧 \${{ matrix.service }}
    needs: changed-services
    if: needs.changed-services.outputs.any_changed == 'true'
    runs-on: ubuntu-latest
    strategy:
      matrix: \${{ fromJson(needs.changed-services.outputs.matrix) }}
      fail-fast: false    # Don't cancel other services if one fails

    permissions:
      id-token: write
      contents: read

    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: shopstream_test
          POSTGRES_USER: shopstream
          POSTGRES_PASSWORD: testpassword
        ports: [5432:5432]
        options: --health-cmd pg_isready --health-interval 10s --health-timeout 5s --health-retries 5

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: services/\${{ matrix.service }}/package-lock.json

      - name: Install &amp; Test
        run: |
          cd services/\${{ matrix.service }}
          npm ci
          npm run lint
          npm test -- --coverage
        env:
          DATABASE_URL: postgresql://shopstream:testpassword@localhost:5432/shopstream_test
          NODE_ENV: test

      - name: Configure AWS (OIDC)
        if: github.event_name == 'push' &amp;&amp; github.ref == 'refs/heads/main'
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_ROLE_ARN }}
          role-session-name: ci-\${{ matrix.service }}-\${{ github.run_id }}
          aws-region: \${{ env.AWS_REGION }}

      - name: Build &amp; Push Image
        if: github.event_name == 'push' &amp;&amp; github.ref == 'refs/heads/main'
        run: |
          SHORT_SHA=\$(echo '\${{ github.sha }}' | cut -c1-8)
          REGISTRY=\$(aws ecr get-authorization-token --query 'authorizationData[0].proxyEndpoint' --output text | sed 's|https://||')

          aws ecr get-login-password | docker login --username AWS --password-stdin \$REGISTRY

          docker buildx build \\
            --platform linux/amd64 \\
            --cache-from type=registry,ref=\$REGISTRY/shopstream/\${{ matrix.service }}:cache \\
            --cache-to type=registry,ref=\$REGISTRY/shopstream/\${{ matrix.service }}:cache,mode=max \\
            --tag \$REGISTRY/shopstream/\${{ matrix.service }}:\$SHORT_SHA \\
            --push \\
            services/\${{ matrix.service }}

          echo '✅ Pushed: \$REGISTRY/shopstream/\${{ matrix.service }}:\$SHORT_SHA'
          echo 'IMAGE_TAG=\$SHORT_SHA' >> \$GITHUB_ENV
          echo 'IMAGE_URI=\$REGISTRY/shopstream/\${{ matrix.service }}:\$SHORT_SHA' >> \$GITHUB_ENV`} title="Terminal"></CodeBlock>

  <ConceptBox title="The fail-fast: false line is important">
     Without it, if <code>cart-service</code> fails its tests, GitHub cancels the matrix jobs for <code>order-service</code>, <code>notification-service</code>, and the rest. You lose visibility — you don't know if the other services have problems too. With <code>fail-fast: false</code>, all services run to completion, and you see every failure in one CI run instead of debugging one-at-a-time.
  </ConceptBox>

  

              </div>
            );
          case 's3-2':
            return (
              <div>
                
  <h2>Caching: 4 Minutes → 45 Seconds <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 3 · Node modules cache + Docker layer cache — why builds are slow and how to fix it</p>

  <ConceptBox title="Every CI run starts on a fresh VM">
     That means npm downloads 500 packages from scratch every time. A single <code>npm ci</code> for a Node.js service can take 90 seconds. With 5 services in your matrix build, that's 7.5 minutes just on <code>npm install</code>. Caching stores the <code>node_modules</code> contents between runs and restores them if the lockfile hasn't changed.
  </ConceptBox>

<CodeBlock code={`# Fast caching setup — add to any job that runs npm
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          # Critical: point to the service's lockfile, not the root
          # Without this, cache is invalidated whenever ANY service's lockfile changes
          cache-dependency-path: services/\${{ matrix.service }}/package-lock.json

# This tells GitHub: 'cache node_modules unless package-lock.json changes'
# GitHub stores the cache keyed by a hash of package-lock.json
# Cache hit: npm ci completes in ~3 seconds
# Cache miss: full download (~90 seconds), then stored for next run`} title="Terminal"></CodeBlock>

  <h3>Docker Layer Caching to ECR</h3>
  <ConceptBox title="Multi-stage Docker builds cache at the layer level">
     Your Dockerfile installs Node dependencies in the <code>deps</code> stage. If you didn't change <code>package.json</code>, that layer is identical to last build — it doesn't need to run again. But by default, every CI run builds from scratch because Docker's layer cache only lives on the runner's disk, and the runner is fresh each time. The fix: push your build cache to ECR itself.
  </ConceptBox>
<CodeBlock code={`# Using Docker Buildx with ECR cache — add to your build step
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Build with registry cache
        uses: docker/build-push-action@v5
        with:
          context: services/\${{ matrix.service }}
          push: true
          tags: \${{ env.IMAGE_URI }}
          # Pull layers from last successful build
          cache-from: |
            type=registry,ref=\${{ env.REGISTRY }}/shopstream/\${{ matrix.service }}:cache
          # Push layers for next build to use
          cache-to: |
            type=registry,ref=\${{ env.REGISTRY }}/shopstream/\${{ matrix.service }}:cache,mode=max
          # mode=max: cache ALL layers (not just final stage)
          # mode=min: only cache layers used in final image (smaller, less useful)`} title="Terminal"></CodeBlock>

  <h3>Real Build Time Improvement</h3>
  <table>
    <tbody><tr><th>Scenario</th><th>Without Cache</th><th>With Cache (no code change)</th><th>With Cache (code change only)</th></tr>
    <tr><td>npm install</td><td>~90s</td><td>~4s (cache hit)</td><td>~4s (lockfile unchanged)</td></tr>
    <tr><td>Docker deps layer</td><td>~45s</td><td>~2s (cache hit)</td><td>~2s (package.json unchanged)</td></tr>
    <tr><td>Docker build layer</td><td>~30s</td><td>~1s (cache hit)</td><td>~30s (code changed)</td></tr>
    <tr><td>Total for 5 services</td><td>~825s (~14min)</td><td>~35s total</td><td>~180s (~3min)</td></tr>
  </tbody></table>

  <WarningBox>
    <strong>⚠️ ECR cache images cost money.</strong> The <code>:cache</code> tag is a real ECR image that stores Docker layers. These can grow to 500MB+ per service. Add an ECR lifecycle policy to expire cache images older than 7 days: <code>aws ecr put-lifecycle-policy --repository-name shopstream/product-catalog --lifecycle-policy-text '{"{"}"rules":[{"{"}"rulePriority":1,"selection":{"{"}"tagStatus":"tagged","tagPrefixList":["cache"],"countType":"sinceImagePushed","countUnit":"days","countNumber":7{"}"},"action":{"{"}"type":"expire"{"}"}{"}"}]{"}"}'</code>
  </WarningBox>

  

              </div>
            );
          case 's3-3':
            return (
              <div>
                
  <h2>Reusable Workflows (DRY CI) <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 3 · Extract your build logic once, call it everywhere</p>

  <ConceptBox title="Reusable workflows let you call a workflow from another workflow">
     You define the build-and-push logic once in a <code>_reusable-build.yml</code> file, then each service's workflow calls it with just the service name as input. When you need to change something (update a base image, add a new security scan), you change it in one file.
  </ConceptBox>

<CodeBlock code={`# .github/workflows/_reusable-build.yml
# The underscore prefix (_) is a convention meaning 'not triggered directly'
name: Reusable — Build &amp; Push Service

on:
  workflow_call:              # This is what makes it reusable
    inputs:
      service:
        required: true
        type: string
        description: 'Service name (e.g. product-catalog)'
      aws_region:
        required: false
        type: string
        default: 'ap-south-1'
    secrets:
      AWS_ROLE_ARN:
        required: true
    outputs:
      image_tag:
        description: 'SHA-based image tag'
        value: \${{ jobs.build.outputs.image_tag }}
      image_uri:
        description: 'Full ECR image URI'
        value: \${{ jobs.build.outputs.image_uri }}

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read
    outputs:
      image_tag: \${{ steps.meta.outputs.tag }}
      image_uri: \${{ steps.meta.outputs.uri }}

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: services/\${{ inputs.service }}/package-lock.json

      - name: Install &amp; Test
        run: cd services/\${{ inputs.service }} &amp;&amp; npm ci &amp;&amp; npm test
        env:
          NODE_ENV: test

      - name: Configure AWS
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_ROLE_ARN }}
          aws-region: \${{ inputs.aws_region }}

      - name: Login to ECR
        id: ecr
        uses: aws-actions/amazon-ecr-login@v2

      - name: Build metadata
        id: meta
        run: |
          SHA=\$(echo '\${{ github.sha }}' | cut -c1-8)
          URI='\${{ steps.ecr.outputs.registry }}/shopstream/\${{ inputs.service }}:\${SHA}'
          echo 'tag=\${SHA}' >> \$GITHUB_OUTPUT
          echo 'uri=\${URI}' >> \$GITHUB_OUTPUT

      - uses: docker/setup-buildx-action@v3
      - uses: docker/build-push-action@v5
        with:
          context: services/\${{ inputs.service }}
          push: true
          tags: \${{ steps.meta.outputs.uri }}
          cache-from: type=registry,ref=\${{ steps.ecr.outputs.registry }}/shopstream/\${{ inputs.service }}:cache
          cache-to: type=registry,ref=\${{ steps.ecr.outputs.registry }}/shopstream/\${{ inputs.service }}:cache,mode=max`} title="Terminal"></CodeBlock>

  <h3>Calling the Reusable Workflow</h3>
<CodeBlock code={`# .github/workflows/order-service-ci.yml
# Clean, 12-line caller — all logic is in the reusable workflow
name: order-service CI

on:
  push:
    branches: [main]
    paths: ['services/order-service/**']
  pull_request:
    branches: [main]
    paths: ['services/order-service/**']

jobs:
  build:
    if: github.event_name == 'push' &amp;&amp; github.ref == 'refs/heads/main'
    uses: ./.github/workflows/_reusable-build.yml
    with:
      service: order-service
    secrets:
      AWS_ROLE_ARN: \${{ secrets.AWS_ROLE_ARN }}`} title="Terminal"></CodeBlock>

  

              </div>
            );
          case 's3-4':
            return (
              <div>
                
  <h2>PR Checks &amp; Branch Protection <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 3 · Make CI mandatory — nobody merges broken code</p>

  <ConceptBox title="CI is only useful if it's enforced">
     Right now, someone on the ShopStream team could push directly to main, bypass all tests, and ship broken code to production. Branch protection rules in GitHub make this impossible: you configure <code>main</code> to require all CI checks to pass before a PR can be merged, and require PR review.
  </ConceptBox>

  <h3>Set Up Branch Protection via GitHub CLI</h3>
<CodeBlock code={`# Install GitHub CLI (gh) if not already installed
sudo apt install gh -y
gh auth login   # Follow the prompts

# Set branch protection on main
gh api repos/:owner/:repo/branches/main/protection \\
  --method PUT \\
  --field required_status_checks='{'strict':true,'contexts':['🔧 api-gateway','🔧 product-catalog','🔧 cart-service','🔧 order-service','🔧 notification-service']}' \\
  --field enforce_admins=false \\
  --field required_pull_request_reviews='{'required_approving_review_count':1}' \\
  --field restrictions=null

# Verify
gh api repos/:owner/:repo/branches/main/protection | jq '.required_status_checks'`} title="Terminal"></CodeBlock>

  <p>Or set it in the UI: <strong>Repo → Settings → Branches → Add rule → main</strong> → check "Require status checks" → add each CI job name.</p>

  <h3>PR Workflow: Lightweight and Fast</h3>
<CodeBlock code={`# .github/workflows/pr-checks.yml
# Fast checks for PRs — no image push, no ECR, just validate
name: PR Checks

on:
  pull_request:
    branches: [main]

jobs:
  detect-changes:
    runs-on: ubuntu-latest
    outputs:
      services: \${{ steps.detect.outputs.services }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2
      - id: detect
        run: |
          CHANGED=\$(git diff --name-only origin/main...HEAD -- 'services/' | \\
            cut -d/ -f2 | sort -u | jq -R . | jq -sc .)
          echo 'services=\$CHANGED' >> \$GITHUB_OUTPUT

  pr-test:
    needs: detect-changes
    runs-on: ubuntu-latest
    strategy:
      matrix:
        service: \${{ fromJson(needs.detect-changes.outputs.services) }}
      fail-fast: false
    name: 🔧 \${{ matrix.service }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: services/\${{ matrix.service }}/package-lock.json
      - run: cd services/\${{ matrix.service }} &amp;&amp; npm ci &amp;&amp; npm run lint &amp;&amp; npm test
        env:
          NODE_ENV: test`} title="Terminal"></CodeBlock>

  

              </div>
            );
          case 's3-5':
            return (
              <div>
                
  <h2>Capstone S3: Matrix CI for All ShopStream Services <span className="badge advanced">Capstone</span></h2>
  <p className="subtitle">Stage 3 · Trigger a push that builds all 5 services in parallel, watch the matrix</p>

  <TipBox title="📌 WSL Terminal — ~/projects/shopstream-app/">
    
  </TipBox>

<CodeBlock code={`# Touch all service directories to trigger matrix build
for svc in api-gateway product-catalog cart-service order-service notification-service; do
  echo '// bump: \$(date -u +%Y%m%dT%H%M%S)' >> services/\$svc/src/version.js
done

git add services/
git commit -m 'ci: trigger matrix build for all services'
git push origin main`} title="Terminal"></CodeBlock>

  <p>In GitHub Actions UI, you'll see 5 parallel jobs running simultaneously. Total CI time should be close to the time of the <em>slowest single service</em>, not the sum of all services.</p>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s3-5-0" /><label htmlfor="cicd-cb-s3-5-0">Matrix workflow detects which services changed (doesn't rebuild everything on every push)</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s3-5-1" /><label htmlfor="cicd-cb-s3-5-1">Node modules cache works — second run is 5x faster than first</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s3-5-2" /><label htmlfor="cicd-cb-s3-5-2">Reusable workflow created — service workflows call it with uses: ./.github/workflows/_reusable-build.yml</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s3-5-3" /><label htmlfor="cicd-cb-s3-5-3">Branch protection enabled — PRs require passing CI</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s3-5-4" /><label htmlfor="cicd-cb-s3-5-4">All 5 service images pushed to ECR with SHA tags</label></li></ul></div>

  

              </div>
            );
          case 's4-1':
            return (
              <div>
                
  <h2>Install ArgoCD on Kubernetes <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 4 · ArgoCD &amp; GitOps · Get ArgoCD running and accessible</p>

  <ConceptBox title="ArgoCD is a Kubernetes operator that watches Git and reconciles cluster state">
     You install it into its own namespace on your cluster. It then runs as Pods and continuously compares what's in Git (your Helm charts and values files) against what's actually running in Kubernetes. When it detects a difference, it either alerts you or auto-syncs depending on your policy. The key insight: you never run <code>kubectl apply</code> from CI. You commit to Git, and ArgoCD handles the rest.
  </ConceptBox>

  <TipBox title="📌 WSL Terminal — pointed at your kind or EKS cluster">
    
  </TipBox>

<CodeBlock code={`# Install ArgoCD into the argocd namespace
kubectl apply -n argocd \\
  -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

# Wait for ArgoCD pods to be ready (takes ~2 minutes)
kubectl wait --for=condition=Ready pods \\
  -l app.kubernetes.io/name=argocd-server \\
  -n argocd \\
  --timeout=300s

# Verify all ArgoCD pods are running
kubectl get pods -n argocd`} title="Terminal"></CodeBlock>

  <p>Expected — all pods should show <code>Running</code>:</p>
<CodeBlock code={`NAME                                                READY   STATUS    RESTARTS
argocd-application-controller-0                     1/1     Running   0
argocd-applicationset-controller-7d9c4b9b8c-x4g9t  1/1     Running   0
argocd-dex-server-5b9c7cfff7-v9qz8                 1/1     Running   0
argocd-notifications-controller-5c9c7cfff7-hxz2j   1/1     Running   0
argocd-redis-6d89d4f87b-sdmpk                      1/1     Running   0
argocd-repo-server-6d5c9c8f7b-q7zjf                1/1     Running   0
argocd-server-7c85c8b97f-bpk2l                     1/1     Running   0`} title="Terminal"></CodeBlock>

  <h3>Access the ArgoCD UI</h3>
<CodeBlock code={`# Port-forward the ArgoCD API server to your local machine
kubectl port-forward svc/argocd-server -n argocd 8080:443 &amp;

# Get the initial admin password (auto-generated)
ARGOCD_PASSWORD=\$(kubectl -n argocd get secret argocd-initial-admin-secret \\
  -o jsonpath='{.data.password}' | base64 -d)
echo 'ArgoCD admin password: \$ARGOCD_PASSWORD'

# Open browser: https://localhost:8080
# Username: admin
# Password: (from above)
echo 'UI: https://localhost:8080'`} title="Terminal"></CodeBlock>

  <ErrorCard error="🔴 ArgoCD UI shows 'cert error' in browser" meaning="NET::ERR_CERT_AUTHORITY_INVALID — Your connection is not private" fix="Scenario: ArgoCD uses a self-signed TLS certificate by default. This is expected and safe for local and internal use. The browser is warning you it can't verify the certificate against a CA.
      Fix: Click 'Advanced' → 'Proceed to localhost (unsafe)' in Chrome, or type thisisunsafe while the browser window is focused (this bypasses the block in Chrome). For production, replace the self-signed cert with a cert-manager issued certificate. For this guide, the self-signed cert is fine."></ErrorCard>

  <h3>Log in via CLI</h3>
<CodeBlock code={`# Login with argocd CLI
ARGOCD_PASSWORD=\$(kubectl -n argocd get secret argocd-initial-admin-secret \\
  -o jsonpath='{.data.password}' | base64 -d)

argocd login localhost:8080 \\
  --username admin \\
  --password '\$ARGOCD_PASSWORD' \\
  --insecure   # Skip TLS verification for self-signed cert

# Change the admin password to something you'll remember
argocd account update-password \\
  --current-password '\$ARGOCD_PASSWORD' \\
  --new-password 'ShopStream@Argo2024'

echo '✅ ArgoCD CLI authenticated'`} title="Terminal"></CodeBlock>

  

              </div>
            );
          case 's4-2':
            return (
              <div>
                
  <h2>ArgoCD CLI &amp; UI Tour <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 4 · The commands you'll run every day and what they mean</p>

  <ConceptBox title="ArgoCD has four core concepts">
     An <em>Application</em> is the unit of deployment (one per microservice per environment). An <em>AppProject</em> is a grouping that controls what repos and clusters a team can deploy to. A <em>Repository</em> is a Git repo ArgoCD has access to. And <em>Sync</em> is the action of applying the Git state to the cluster. Everything else is a variation on these four.
  </ConceptBox>

  <h3>Essential CLI Commands</h3>
<CodeBlock code={`# List all applications ArgoCD is managing
argocd app list

# Get detailed status of a specific app
argocd app get shopstream-product-catalog

# Manually trigger a sync (apply Git state to cluster)
argocd app sync shopstream-product-catalog

# Watch sync status in real time
argocd app wait shopstream-product-catalog --sync

# Roll back to previous deployed revision
argocd app rollback shopstream-product-catalog 0  # 0 = previous

# See revision history
argocd app history shopstream-product-catalog

# Force refresh (re-fetch from Git without waiting for the poll interval)
argocd app get shopstream-product-catalog --refresh

# Diff: what would change if you synced right now?
argocd app diff shopstream-product-catalog

# See resource tree (what Kubernetes objects this app manages)
argocd app resources shopstream-product-catalog`} title="Terminal"></CodeBlock>

  <h3>Understanding ArgoCD App Status</h3>
  <table>
    <tbody><tr><th>Status</th><th>Sync State</th><th>Health</th><th>What it means</th></tr>
    <tr><td><span className="hl-green">Synced + Healthy</span></td><td>Synced</td><td>Healthy</td><td>Cluster matches Git, all Pods running ✅</td></tr>
    <tr><td><span className="hl-yellow">OutOfSync + Healthy</span></td><td>OutOfSync</td><td>Healthy</td><td>Git changed (new image tag), cluster hasn't caught up yet</td></tr>
    <tr><td><span className="hl-red">Syncing + Degraded</span></td><td>Syncing</td><td>Degraded</td><td>ArgoCD is applying changes, some Pods unhealthy (normal during rollout)</td></tr>
    <tr><td><span className="hl-red">Synced + Degraded</span></td><td>Synced</td><td>Degraded</td><td>Cluster matches Git but app is broken — your code or config has a bug</td></tr>
    <tr><td><span className="hl-purple">Unknown</span></td><td>Unknown</td><td>Unknown</td><td>ArgoCD can't reach the cluster or the app has no health checks defined</td></tr>
  </tbody></table>

  <Quiz question="❓ Quiz — Your ArgoCD app shows 'Synced + Degraded'. Someone asks 'did the deployment succeed?' What's the right answer?" answer="'The deployment applied successfully, but the application itself is unhealthy.' Synced means ArgoCD successfully applied your Kubernetes manifests to the cluster — the YAML was valid and accepted by the API server. Degraded means at least one resource is not healthy. Common causes: a Pod is in CrashLoopBackOff (your app code crashed on startup), an ImagePullBackOff (image tag not found in ECR), or a health check is failing. The fix is in your app or config, not in ArgoCD."></Quiz>

  

              </div>
            );
          case 's4-3':
            return (
              <div>
                
  <h2>Your First ArgoCD Application <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 4 · Connect your infra-config repo and define your first Application manifest</p>

  <ConceptBox title="An ArgoCD Application is a Kubernetes custom resource that declares: 'Watch this Git path, render these manifests with this tool, and apply them to this namespace.'">
     You create Application manifests the same way you create any Kubernetes resource — via YAML. This means your ArgoCD configuration is itself stored in Git and can be managed by ArgoCD (the App-of-Apps pattern, covered in Stage 5).
  </ConceptBox>

  <h3>Step 1: Add Your infra-config Repo to ArgoCD</h3>
<CodeBlock code={`# Connect the infra-config repo using an SSH deploy key
# (HTTPS with a GitHub token also works, shown below)

# Generate a deploy key for infra-config
ssh-keygen -t ed25519 -C 'argocd@shopstream' -f ~/.ssh/argocd_deploy_key -N ''
cat ~/.ssh/argocd_deploy_key.pub
# → Copy this public key to: github.com/YOUR_ORG/shopstream-infra-config
#   Settings → Deploy keys → Add key (read-only is fine)

# Add repo to ArgoCD via CLI
argocd repo add git@github.com:YOUR_ORG/shopstream-infra-config.git \\
  --ssh-private-key-path ~/.ssh/argocd_deploy_key \\
  --name shopstream-infra-config

# Verify
argocd repo list`} title="Terminal"></CodeBlock>

  <h3>Step 2: Create Your First Application Manifest</h3>
  <p>Create this file in <code>~/projects/shopstream-infra-config/environments/dev/product-catalog.yaml</code>:</p>
<CodeBlock code={`# environments/dev/product-catalog.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: shopstream-product-catalog-dev
  namespace: argocd
  labels:
    app.kubernetes.io/part-of: shopstream
    environment: dev
    team: backend
  # Cascade delete: when this Application is deleted, delete its resources too
  finalizers:
    - resources-finalizer.argocd.argoproj.io
spec:
  project: default   # We'll create a custom project in Stage 6

  # Source: where ArgoCD reads the desired state from
  source:
    repoURL: git@github.com:YOUR_ORG/shopstream-infra-config.git
    targetRevision: HEAD    # Track latest commit on default branch
    path: helm/shopstream   # Helm chart location in the repo
    helm:
      valueFiles:
        # Base values, then environment-specific overrides
        - values.yaml
        - ../../environments/dev/values/product-catalog.yaml

  # Destination: where to deploy
  destination:
    server: https://kubernetes.default.svc  # The cluster ArgoCD itself runs in
    namespace: shopstream-dev

  # Sync policy: what ArgoCD does when it detects drift
  syncPolicy:
    automated:
      prune: true      # Delete resources removed from Git
      selfHeal: true   # Re-apply if someone manually changes the cluster
    syncOptions:
      - CreateNamespace=true         # Create namespace if it doesn't exist
      - PrunePropagationPolicy=foreground
      - RespectIgnoreDifferences=true
    retry:
      limit: 3
      backoff:
        duration: 5s
        factor: 2
        maxDuration: 3m

  # What ArgoCD ignores when comparing Git vs cluster
  # (Kubernetes adds some fields automatically that aren't in your YAML)
  ignoreDifferences:
    - group: apps
      kind: Deployment
      jsonPointers:
        - /spec/replicas   # HPA may change this; don't revert it`} title="Terminal"></CodeBlock>

  <h3>Step 3: Apply and Watch</h3>
<CodeBlock code={`# Apply the Application manifest to the cluster
kubectl apply -f environments/dev/product-catalog.yaml

# ArgoCD picks it up immediately
argocd app list
# Should show: shopstream-product-catalog-dev | OutOfSync | Missing

# Trigger first sync
argocd app sync shopstream-product-catalog-dev

# Watch the sync progress
argocd app wait shopstream-product-catalog-dev --sync --health --timeout 120`} title="Terminal"></CodeBlock>

  <ErrorCard error="🔴 ArgoCD app stuck 'OutOfSync' — ComparisonError" meaning="ComparisonError: rpc error: code = Unknown desc = error converting YAML to JSON: yaml: line 14: mapping values are not allowed in this context" fix="Scenario: Your Helm chart or values file has a YAML syntax error. ArgoCD renders the Helm chart and applies it, but if the template produces invalid YAML, it errors before applying anything. The pod gets no update, but ArgoCD reports a confusing 'rpc error'.
      Fix: Run helm template shopstream ./helm/shopstream -f environments/dev/values/product-catalog.yaml locally first. This renders the templates without applying them — YAML errors show up here with line numbers. Fix the syntax error, push to Git, ArgoCD will pick up the fix automatically."></ErrorCard>

  

              </div>
            );
          case 's4-4':
            return (
              <div>
                
  <h2>Helm + ArgoCD Integration <span className="badge intermediate">Intermediate</span></h2>
  <p className="subtitle">Stage 4 · Write the Helm chart that packages all ShopStream services</p>

  <ConceptBox title="One Helm chart, five services, three environments">
     Instead of writing separate Kubernetes YAML for each service, ShopStream uses a single generic Helm chart (<code>helm/shopstream/</code>) that's parameterized. Each service gets its own <code>values.yaml</code> override file per environment. This is the configuration that ArgoCD renders into real Kubernetes manifests.
  </ConceptBox>

  <h3>The Helm Chart Structure</h3>
<CodeBlock code={`# Create these files in ~/projects/shopstream-infra-config/helm/shopstream/

# 1. Chart.yaml
cat > helm/shopstream/Chart.yaml << 'EOF'
apiVersion: v2
name: shopstream
description: ShopStream microservice deployment chart
type: application
version: 1.0.0
appVersion: '1.0.0'
EOFCopy`} title="Terminal"></CodeBlock>

<CodeBlock code={`# 2. helm/shopstream/values.yaml — defaults (overridden per service per env)
# helm/shopstream/values.yaml
replicaCount: 2

image:
  repository: ''       # Set per service
  tag: 'latest'        # Overridden by CI with commit SHA
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 3000           # Overridden per service

resources:
  requests:
    cpu: '100m'
    memory: '128Mi'
  limits:
    cpu: '500m'
    memory: '512Mi'

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 70

env: {}                # Additional env vars injected per service

livenessProbe:
  httpGet:
    path: /health
    port: http
  initialDelaySeconds: 15
  periodSeconds: 20
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /ready
    port: http
  initialDelaySeconds: 5
  periodSeconds: 10`} title="Terminal"></CodeBlock>

<CodeBlock code={`# 3. helm/shopstream/templates/deployment.yaml
# helm/shopstream/templates/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: {{ include 'shopstream.fullname' . }}
  labels:
    {{- include 'shopstream.labels' . | nindent 4 }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include 'shopstream.selectorLabels' . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include 'shopstream.selectorLabels' . | nindent 8 }}
      annotations:
        # Force pod restart when configmap changes
        checksum/config: {{ include (print \$.Template.BasePath '/configmap.yaml') . | sha256sum }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: '{{ .Values.image.repository }}:{{ .Values.image.tag }}'
          imagePullPolicy: {{ .Values.image.pullPolicy }}
          ports:
            - name: http
              containerPort: {{ .Values.service.port }}
              protocol: TCP
          env:
            - name: NODE_ENV
              value: 'production'
            - name: PORT
              value: '{{ .Values.service.port }}'
          {{- range \$key, \$val := .Values.env }}
            - name: {{ \$key }}
              value: {{ \$val | quote }}
          {{- end }}
          livenessProbe:
            {{- toYaml .Values.livenessProbe | nindent 12 }}
          readinessProbe:
            {{- toYaml .Values.readinessProbe | nindent 12 }}
          resources:
            {{- toYaml .Values.resources | nindent 12 }}
      securityContext:
        runAsNonRoot: true
        runAsUser: 1001`} title="Terminal"></CodeBlock>

  <h3>Per-Service Values File (the key file CI updates)</h3>
<CodeBlock code={`# environments/dev/values/product-catalog.yaml
# This is the file GitHub Actions updates with new image tags

image:
  repository: 123456789012.dkr.ecr.ap-south-1.amazonaws.com/shopstream/product-catalog
  tag: 'a3f8d92c'    # ← CI updates this line on every successful build

replicaCount: 1      # Dev: only 1 replica to save resources

service:
  port: 3001         # product-catalog runs on 3001

env:
  DATABASE_URL: 'postgresql://shopstream:dev_password@postgres-svc:5432/shopstream_dev'
  REDIS_URL: 'redis://redis-svc:6379'
  LOG_LEVEL: 'debug'

autoscaling:
  enabled: false     # No autoscaling in dev`} title="Terminal"></CodeBlock>

  <TipBox title="📌 The tag field on line 5 is the only thing that changes between deployments">
     When CI builds a new image, it runs <code>sed -i "s/tag: .*/tag: \"$SHA\"/" environments/dev/values/product-catalog.yaml</code>, commits, and pushes. ArgoCD detects the change and syncs. That's the entire GitOps loop.
  </TipBox>

  

              </div>
            );
          case 's4-5':
            return (
              <div>
                
  <h2>Sync Policies, Health Checks &amp; Sync Hooks <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 4 · Control when ArgoCD syncs, how it verifies success, and how to run migrations</p>

  <ConceptBox title="Auto-sync without guardrails is dangerous in production">
     In dev, <code>automated: selfHeal: true</code> is fine — you want rapid iteration. In staging and prod, you want auto-sync to deploy new code but not overwrite manual emergency changes (selfHeal: false in staging, manual sync approval in prod). Sync hooks let you run database migrations before the new Pods start.
  </ConceptBox>

  <h3>Sync Policy by Environment</h3>
<CodeBlock code={`# Dev — fully automated, self-heals
syncPolicy:
  automated:
    prune: true
    selfHeal: true    # Reverts manual kubectl changes

# Staging — auto-deploys new code, preserves emergency manual changes
syncPolicy:
  automated:
    prune: true
    selfHeal: false   # Won't revert manual kubectl apply commands

# Production — manual approval required before sync
syncPolicy: {}        # No automation — argocd app sync must be run explicitly
                      # (or you approve in the UI)`} title="Terminal"></CodeBlock>

  <h3>Database Migrations as Sync Hooks</h3>
  <ConceptBox title="Sync hooks are Jobs that ArgoCD runs at specific points in the sync lifecycle">
     A <code>PreSync</code> hook runs before ArgoCD applies your Deployment. This is where you run database migrations — the new schema is in place before any Pod running new code starts up.
  </ConceptBox>
<CodeBlock code={`# helm/shopstream/templates/migration-job.yaml
# This Job runs db migrations before every deployment
{{- if .Values.migrations.enabled }}
apiVersion: batch/v1
kind: Job
metadata:
  name: {{ include 'shopstream.fullname' . }}-migration-{{ now | unixEpoch }}
  annotations:
    argocd.argoproj.io/hook: PreSync          # Run before sync
    argocd.argoproj.io/hook-delete-policy: BeforeHookCreation  # Clean up old job
spec:
  ttlSecondsAfterFinished: 300    # Clean up after 5 minutes
  template:
    spec:
      restartPolicy: Never
      containers:
        - name: migrate
          image: '{{ .Values.image.repository }}:{{ .Values.image.tag }}'
          command: ['node', 'src/migrations/run.js']
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: shopstream-db-secret
                  key: url
{{- end }}Copy`} title="Terminal"></CodeBlock>

  <h3>Custom Health Checks</h3>
<CodeBlock code={`# Tell ArgoCD how to determine if a custom resource is healthy
# Add to ArgoCD ConfigMap: argocd-cm
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
data:
  # Custom health check for Argo Rollouts (covered in Stage 6)
  resource.customizations.health.argoproj.io_Rollout: |
    hs = {}
    if obj.status ~= nil then
      if obj.status.phase == 'Paused' then
        hs.status = 'Suspended'
        hs.message = 'Rollout is paused, awaiting promotion'
        return hs
      end
      if obj.status.phase == 'Healthy' then
        hs.status = 'Healthy'
        return hs
      end
      if obj.status.phase == 'Degraded' then
        hs.status = 'Degraded'
        hs.message = obj.status.message
        return hs
      end
    end
    hs.status = 'Progressing'
    hs.message = 'Rollout in progress'
    return hs`} title="Terminal"></CodeBlock>

  

              </div>
            );
          case 's4-6':
            return (
              <div>
                
  <h2>Capstone S4: Deploy product-catalog via ArgoCD <span className="badge intermediate">Capstone</span></h2>
  <p className="subtitle">Stage 4 · End-to-end: write YAML, push to Git, watch ArgoCD sync the cluster</p>

  <TipBox title="📌 WSL Terminal — ~/projects/shopstream-infra-config/">
    
  </TipBox>

<CodeBlock code={`# 1. Create all required files (shown in previous sections)
# Commit the Helm chart and dev Application manifest

cd ~/projects/shopstream-infra-config

git add helm/ environments/dev/
git commit -m 'feat: add shopstream Helm chart and product-catalog dev app'
git push origin main

# 2. Apply the ArgoCD Application manifest
kubectl apply -f environments/dev/product-catalog.yaml

# 3. Watch ArgoCD sync
argocd app get shopstream-product-catalog-dev --refresh
argocd app sync shopstream-product-catalog-dev
argocd app wait shopstream-product-catalog-dev --health --timeout 180

# 4. Verify deployment
kubectl get pods -n shopstream-dev
kubectl get svc -n shopstream-dev

# 5. Test the running service
kubectl port-forward svc/shopstream-product-catalog 3001:3001 -n shopstream-dev &amp;
curl http://localhost:3001/health
# Expected: {'status':'ok','service':'product-catalog'}`} title="Terminal"></CodeBlock>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s4-6-0" /><label htmlfor="cicd-cb-s4-6-0">ArgoCD installed and all 7 pods running in argocd namespace</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s4-6-1" /><label htmlfor="cicd-cb-s4-6-1">shopstream-infra-config repo connected to ArgoCD via SSH deploy key</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s4-6-2" /><label htmlfor="cicd-cb-s4-6-2">Helm chart created with generic Deployment, Service, HPA templates</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s4-6-3" /><label htmlfor="cicd-cb-s4-6-3">ArgoCD Application manifest for product-catalog dev created and applied</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s4-6-4" /><label htmlfor="cicd-cb-s4-6-4">ArgoCD shows "Synced + Healthy" for product-catalog-dev</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s4-6-5" /><label htmlfor="cicd-cb-s4-6-5">GET /health returns 200 from the running Pod</label></li></ul></div>

  

              </div>
            );
          case 's5-1':
            return (
              <div>
                
  <h2>The GitOps Image Update Loop <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 5 · Wiring CI → CD · The exact mechanism that connects GitHub Actions to ArgoCD</p>

  <ConceptBox title="This is the section that makes everything click">
     CI builds an image and pushes it to ECR. ArgoCD watches a Git repo. These two systems never talk directly — Git is the bridge. When CI finishes building, it updates the image tag in a values file, commits that change to <code>shopstream-infra-config</code>, and pushes. ArgoCD detects the new commit, re-renders the Helm chart with the new tag, and applies it to Kubernetes. The whole loop takes under 5 minutes from <code>git push</code> to running Pods.
  </ConceptBox>

  <h3>The Full Loop — Annotated</h3>
  <div className="diagram">
Developer
   │
   │ git push origin main
   ▼
shopstream-app repo (GitHub)
   │
   │ triggers ci-all-services.yml
   ▼
GitHub Actions Runner
   │
   ├─ [test job] npm test ────────────────── fails here = pipeline stops
   │
   ├─ [build-push job] docker build + ECR push
   │   Tag: a3f8d92c
   │
   └─ [update-gitops job]
         │
         │ git clone shopstream-infra-config
         │ sed -i "s/tag: .*/tag: \"a3f8d92c\"/" \
         │     environments/staging/values/product-catalog.yaml
         │ git commit -m "ci: product-catalog → a3f8d92c"
         │ git push
         ▼
shopstream-infra-config repo (GitHub)
   │
   │ ArgoCD polls every 3 minutes (or webhook = instant)
   ▼
ArgoCD (running in cluster)
   │
   ├─ Detects: environments/staging/values/product-catalog.yaml changed
   ├─ Re-renders Helm chart with tag: a3f8d92c
   ├─ Compares rendered YAML vs cluster state → OutOfSync
   ├─ Applies new Deployment
   └─ Kubernetes rolling update: old Pods out, new Pods in
         │
         ▼
      ✅ product-catalog:a3f8d92c live in staging</div>

  <WarningBox>
    <strong>⚠️ Never use <code>kubectl set image</code> in CI to deploy.</strong> This bypasses Git entirely. The cluster state diverges from what's in your values files, ArgoCD immediately reverts it (if selfHeal is on) or shows OutOfSync (if not). This confuses engineers who then fight ArgoCD, thinking it's broken. The rule is simple: CI writes to Git; ArgoCD writes to Kubernetes. They don't cross lanes.
  </WarningBox>

  <Quiz question="❓ Quiz — ArgoCD polls Git every 3 minutes by default. Your team wants deployments to reach the cluster within 30 seconds of a commit. What's the right solution?" answer="Configure an ArgoCD webhook. GitHub can send a webhook to ArgoCD's /api/webhook endpoint every time a commit is pushed to shopstream-infra-config. ArgoCD triggers an immediate reconciliation on webhook receipt instead of waiting for the next poll cycle. Setup: GitHub repo → Settings → Webhooks → Add webhook → URL: https://your-argocd-server/api/webhook → Content type: application/json → Secret: set one and store it in ArgoCD's config. This reduces 'commit to deployed' from ~3 minutes to ~20 seconds."></Quiz>

  

              </div>
            );
          case 's5-2':
            return (
              <div>
                
  <h2>Auto-Updating Helm Values from CI <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 5 · The exact GitHub Actions job that commits new image tags to infra-config</p>

  <ConceptBox title="CI needs write access to a different repo">
     Your workflow runs in <code>shopstream-app</code> but needs to commit to <code>shopstream-infra-config</code>. You can't use the default <code>GITHUB_TOKEN</code> for this — it only has access to the repo the workflow is running in. You need either a GitHub Deploy Key (recommended for team setups) or a GitHub App token. This section uses a Deploy Key.
  </ConceptBox>

  <TipBox title="📌 WSL Terminal — generate the deploy key, then add it to GitHub">
    
  </TipBox>

  <h3>Step 1: Create and Register the Deploy Key</h3>
<CodeBlock code={`# Generate the deploy key
ssh-keygen -t ed25519 \\
  -C 'github-actions-ci-writer' \\
  -f ~/.ssh/ci_infra_deploy_key \\
  -N ''

echo '=== PUBLIC KEY (add to infra-config repo) ==='
cat ~/.ssh/ci_infra_deploy_key.pub

echo ''
echo '=== PRIVATE KEY (add as GitHub Secret in app repo) ==='
cat ~/.ssh/ci_infra_deploy_key`} title="Terminal"></CodeBlock>

  <p>Now register both:</p>
  <ul>
    <li><strong>Public key</strong> → <code>shopstream-infra-config</code> → Settings → Deploy keys → Add key → name: "CI Writer" → paste public key → check "Allow write access" ✅</li>
    <li><strong>Private key</strong> → <code>shopstream-app</code> → Settings → Secrets → New secret → name: <code>INFRA_CONFIG_DEPLOY_KEY</code> → paste private key</li>
  </ul>

  <h3>Step 2: The update-gitops Job in CI</h3>
<CodeBlock code={`# .github/workflows/ci-all-services.yml — add this job after build-push
  update-gitops:
    name: 📝 Update GitOps Config
    runs-on: ubuntu-latest
    needs: [build-push]
    if: github.event_name == 'push' &amp;&amp; github.ref == 'refs/heads/main'
    # Only run if build-push succeeded and produced an image tag

    steps:
      - name: Setup SSH agent
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: \${{ secrets.INFRA_CONFIG_DEPLOY_KEY }}

      - name: Clone infra-config repo
        run: |
          git clone git@github.com:YOUR_ORG/shopstream-infra-config.git
          cd shopstream-infra-config
          git config user.email 'github-actions@shopstream.io'
          git config user.name 'GitHub Actions CI'

      - name: Update image tags for changed services
        run: |
          cd shopstream-infra-config

          SHORT_SHA=\$(echo '\${{ github.sha }}' | cut -c1-8)

          # Update staging values for each service that was built
          # \${{ needs.build-push.outputs.services }} is a JSON array from matrix
          SERVICES='\${{ needs.build-push.outputs.built_services }}'

          for SERVICE in \$(echo \$SERVICES | jq -r '.[]'); do
            VALUES_FILE='environments/staging/values/\${SERVICE}.yaml'

            if [ -f '\$VALUES_FILE' ]; then
              # Atomically update the image tag line
              sed -i 's/  tag: .*/  tag: \\'\${SHORT_SHA}\\'/' '\$VALUES_FILE'
              echo '✅ Updated \$VALUES_FILE → tag: \$SHORT_SHA'
            else
              echo '⚠️ Values file not found: \$VALUES_FILE'
            fi
          done

      - name: Commit and push
        run: |
          cd shopstream-infra-config

          SHORT_SHA=\$(echo '\${{ github.sha }}' | cut -c1-8)

          git add environments/staging/values/
          git diff --staged --quiet &amp;&amp; echo 'No changes to commit' &amp;&amp; exit 0

          git commit -m 'ci: deploy shopstream services → \${SHORT_SHA}

          Triggered by: \${{ github.actor }}
          Source commit: \${{ github.sha }}
          Workflow run: \${{ github.server_url }}/\${{ github.repository }}/actions/runs/\${{ github.run_id }}'

          # Retry push up to 3 times (handles concurrent CI runs)
          for i in 1 2 3; do
            git pull --rebase origin main &amp;&amp; git push origin main &amp;&amp; break
            echo 'Push attempt \$i failed, retrying...'
            sleep \$((i * 5))
          done

      - name: Summary
        run: |
          echo '## 📝 GitOps Config Updated' >> \$GITHUB_STEP_SUMMARY
          echo 'Staging environment updated with new image tags.' >> \$GITHUB_STEP_SUMMARY
          echo 'ArgoCD will sync within 3 minutes (or immediately via webhook).' >> \$GITHUB_STEP_SUMMARY`} title="Terminal"></CodeBlock>

  <ErrorCard error="🔴 Git push fails — 'rejected: stale info' during concurrent CI runs" meaning="To git@github.com:YOUR_ORG/shopstream-infra-config.git
 ! [rejected]        main &rarr; main (fetch first)
error: failed to push some refs to 'git@github.com:YOUR_ORG/shopstream-infra-config.git'" fix="Scenario: Two CI runs finish within seconds of each other (e.g. two services both changed and both pipelines finish building at the same time). Both clone the repo, both modify their respective values files, but the second push fails because the first one already advanced the HEAD.
      Fix: The retry loop with git pull --rebase in the job above handles this. It fetches the latest commit, rebases your change on top, then pushes. For high-frequency teams (10+ pushes/day), consider serializing the update-gitops job with a mutex via a GitHub Action like ben-z/gh-action-mutex, or use ArgoCD Image Updater (Stage 5.4) which handles concurrent updates natively."></ErrorCard>

  

              </div>
            );
          case 's5-3':
            return (
              <div>
                
  <h2>Environment Promotion: dev → staging → prod <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 5 · Controlled rollout across environments with approval gates</p>

  <ConceptBox title="Promotion means deliberately moving a known-good image tag from one environment to the next">
     CI doesn't auto-deploy to prod — it deploys to dev first (auto, fast), then to staging (auto, but requires staging tests to pass), then to prod (manual approval via GitHub Environments). The image tag is the artifact that moves through environments. You're not rebuilding or re-testing the code — you're promoting the same container image you already verified.
  </ConceptBox>

  <h3>GitHub Environments for Approval Gates</h3>
  <TipBox title="📌 Set up in GitHub UI: Repo → Settings → Environments → New environment">
    
  </TipBox>
  <p>Create three environments: <code>dev</code>, <code>staging</code>, <code>prod</code>.</p>
  <p>For <code>prod</code>: enable "Required reviewers" → add yourself or a team. This creates a manual approval gate — the workflow pauses and waits for a human to click "Approve".</p>

  <h3>The Promotion Workflow</h3>
<CodeBlock code={`# .github/workflows/promote.yml
# Manually promote a specific image tag to a target environment
name: Promote to Environment

on:
  workflow_dispatch:
    inputs:
      service:
        description: 'Service to promote'
        required: true
        type: choice
        options: [api-gateway, product-catalog, cart-service, order-service, notification-service]
      image_tag:
        description: 'Image tag (commit SHA) to promote'
        required: true
        type: string
      environment:
        description: 'Target environment'
        required: true
        type: choice
        options: [staging, prod]

jobs:
  verify-image:
    name: 🔍 Verify Image Exists in ECR
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read

    steps:
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: \${{ secrets.AWS_ROLE_ARN }}
          aws-region: ap-south-1

      - name: Verify image tag exists
        run: |
          aws ecr describe-images \\
            --repository-name shopstream/\${{ inputs.service }} \\
            --image-ids imageTag=\${{ inputs.image_tag }} \\
            --region ap-south-1 > /dev/null
          echo '✅ Image \${{ inputs.service }}:\${{ inputs.image_tag }} verified in ECR'

  promote:
    name: 🚀 Promote to \${{ inputs.environment }}
    needs: [verify-image]
    runs-on: ubuntu-latest
    environment: \${{ inputs.environment }}  # ← This triggers approval for prod

    steps:
      - name: Setup SSH agent
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: \${{ secrets.INFRA_CONFIG_DEPLOY_KEY }}

      - name: Clone infra-config
        run: |
          git clone git@github.com:YOUR_ORG/shopstream-infra-config.git
          cd shopstream-infra-config
          git config user.email 'github-actions@shopstream.io'
          git config user.name 'GitHub Actions (Promotion)'

      - name: Update image tag
        run: |
          cd shopstream-infra-config
          VALUES_FILE='environments/\${{ inputs.environment }}/values/\${{ inputs.service }}.yaml'
          sed -i 's/  tag: .*/  tag: \\'\${{ inputs.image_tag }}\\'/' '\$VALUES_FILE'
          cat '\$VALUES_FILE'

      - name: Commit promotion
        run: |
          cd shopstream-infra-config
          git add environments/\${{ inputs.environment }}/values/
          git commit -m 'promote: \${{ inputs.service }} → \${{ inputs.environment }} @ \${{ inputs.image_tag }}

          Promoted by: \${{ github.actor }}
          Approved via: GitHub Environment (\${{ inputs.environment }})
          Source tag: \${{ inputs.image_tag }}'
          git push origin main

      - name: Wait for ArgoCD sync
        run: |
          echo '⏳ ArgoCD will sync within 3 minutes'
          echo 'Monitor: https://argocd.shopstream.io/applications/shopstream-\${{ inputs.service }}-\${{ inputs.environment }}'`} title="Terminal"></CodeBlock>

  <h3>Branch Strategy for GitOps</h3>
  <div className="diagram">
infra-config branch strategy:

  main ──────────────────────────────────────────────────► (always deployable)
   │                                                         ArgoCD watches this
   │
   │  CI auto-commits here (image tag updates)
   │  Engineers merge infra changes here via PRs
   │
   │  Environments track different paths in the SAME branch:
   │
   │  environments/dev/values/*.yaml    ← auto-updated by CI on every push to app/main
   │  environments/staging/values/*.yaml ← auto-updated by CI after dev tests pass
   │  environments/prod/values/*.yaml   ← updated only via promote.yml with approval

  Separate branches per environment = complexity without benefit for GitOps.
  One branch, separate directories = clear history, simple merges.</div>

  

              </div>
            );
          case 's5-4':
            return (
              <div>
                
  <h2>ArgoCD ApplicationSets <span className="badge advanced">Advanced</span></h2>
  <p className="subtitle">Stage 5 · Generate 15 ArgoCD Applications (5 services × 3 envs) from one manifest</p>

  <ConceptBox title="Without ApplicationSets, you need one Application manifest per service per environment">
     For ShopStream that's 5 services × 3 environments = 15 Application manifests. When you add a new service, you write 3 new manifests. With ApplicationSets, you write one manifest with generators, and ArgoCD creates all 15 Applications automatically. Add a service by adding its name to a list.
  </ConceptBox>

  <TipBox title="📌 Create this file in ~/projects/shopstream-infra-config/argocd/applicationsets/shopstream-apps.yaml">
    
  </TipBox>

<CodeBlock code={`# argocd/applicationsets/shopstream-apps.yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: shopstream-services
  namespace: argocd
spec:
  generators:
    # Matrix generator: cartesian product of environments × services
    - matrix:
        generators:
          - list:
              elements:
                - environment: dev
                  namespace: shopstream-dev
                  syncPolicy: automated
                  selfHeal: 'true'
                  replicaCount: '1'
                - environment: staging
                  namespace: shopstream-staging
                  syncPolicy: automated
                  selfHeal: 'false'
                  replicaCount: '2'
                - environment: prod
                  namespace: shopstream-prod
                  syncPolicy: manual
                  selfHeal: 'false'
                  replicaCount: '3'

          - list:
              elements:
                - service: api-gateway
                  port: '3000'
                - service: product-catalog
                  port: '3001'
                - service: cart-service
                  port: '3002'
                - service: order-service
                  port: '3003'
                - service: notification-service
                  port: '3004'

  template:
    metadata:
      name: 'shopstream-{{service}}-{{environment}}'
      namespace: argocd
      labels:
        app.kubernetes.io/part-of: shopstream
        environment: '{{environment}}'
        service: '{{service}}'
      finalizers:
        - resources-finalizer.argocd.argoproj.io
    spec:
      project: shopstream
      source:
        repoURL: git@github.com:YOUR_ORG/shopstream-infra-config.git
        targetRevision: HEAD
        path: helm/shopstream
        helm:
          valueFiles:
            - values.yaml
            - '../../environments/{{environment}}/values/{{service}}.yaml'

      destination:
        server: https://kubernetes.default.svc
        namespace: '{{namespace}}'

      syncPolicy:
        {{- if eq .syncPolicy 'automated' }}
        automated:
          prune: true
          selfHeal: {{ .selfHeal }}
        {{- end }}
        syncOptions:
          - CreateNamespace=true
          - PrunePropagationPolicy=foreground`} title="Terminal"></CodeBlock>

<CodeBlock code={`# Apply the ApplicationSet — ArgoCD creates all 15 Applications
kubectl apply -f argocd/applicationsets/shopstream-apps.yaml

# Watch them get created
kubectl get applications -n argocd --watch

# Should see all 15:
# shopstream-api-gateway-dev         Synced   Healthy
# shopstream-api-gateway-staging     Synced   Healthy
# shopstream-api-gateway-prod        Synced   Healthy
# shopstream-product-catalog-dev     Synced   Healthy
# ... 11 more`} title="Terminal"></CodeBlock>

  

              </div>
            );
          case 's5-5':
            return (
              <div>
                
  <h2>Capstone S5: Full End-to-End GitOps Loop <span className="badge advanced">Capstone</span></h2>
  <p className="subtitle">Stage 5 · One <code>git push</code> — watch it go all the way to a running Pod in staging</p>

  <ConceptBox title="This is the moment the whole guide builds toward">
     Make a code change, push it, and watch the complete automated pipeline: test → build → ECR → infra-config commit → ArgoCD sync → Kubernetes deploy. Time yourself. A well-built pipeline completes in under 5 minutes.
  </ConceptBox>

  <TipBox title="📌 WSL Terminal — ~/projects/shopstream-app/">
    
  </TipBox>

<CodeBlock code={`# Step 1: Make a real change to product-catalog
cat >> services/product-catalog/src/index.js << 'EOF'

// Pipeline test — \$(date)
app.get('/pipeline-test', (req, res) => {
  res.json({
    message: 'GitOps pipeline working!',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});
EOF

# Step 2: Commit and push
git add services/product-catalog/
git commit -m 'feat: add pipeline-test endpoint to verify CI/CD'
git push origin main

# Step 3: Watch CI in real time (requires gh CLI)
gh run watch --exit-status

# Step 4: Verify the infra-config was updated
cd ~/projects/shopstream-infra-config
git pull
git log --oneline -3
# Should show a ci: commit at the top

# Step 5: Watch ArgoCD sync
argocd app get shopstream-product-catalog-staging --refresh
argocd app wait shopstream-product-catalog-staging --health --timeout 300

# Step 6: Test the new endpoint
kubectl port-forward svc/shopstream-product-catalog 3001:3001 \\
  -n shopstream-staging &amp;
curl http://localhost:3001/pipeline-testCopy`} title="Terminal"></CodeBlock>

  <p>Expected response:</p>
<CodeBlock code={`{
  'message': 'GitOps pipeline working!',
  'timestamp': '2024-11-15T10:23:45.000Z',
  'version': '1.0.0'
}`} title="Terminal"></CodeBlock>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s5-5-0" /><label htmlfor="cicd-cb-s5-5-0">update-gitops job added to CI workflow — runs after successful build</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s5-5-1" /><label htmlfor="cicd-cb-s5-5-1">Deploy key configured — CI can write to shopstream-infra-config</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s5-5-2" /><label htmlfor="cicd-cb-s5-5-2">promote.yml workflow created with GitHub Environment approval gate for prod</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s5-5-3" /><label htmlfor="cicd-cb-s5-5-3">ApplicationSet deployed — all 15 ArgoCD Applications created automatically</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s5-5-4" /><label htmlfor="cicd-cb-s5-5-4">Full end-to-end loop verified: push → CI green → infra-config commit → ArgoCD synced → new Pod running</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s5-5-5" /><label htmlfor="cicd-cb-s5-5-5">New endpoint reachable in staging within 5 minutes of git push</label></li></ul></div>

  

              </div>
            );
          case 's6-1':
            return (
              <div>
                
  <h2>Secrets Management: ESO + AWS Secrets Manager <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 6 · Production Hardening · Never put a database password in a values file</p>

  <ConceptBox title="The values files in your infra-config repo are not the right place for secrets">
     A database URL with credentials, an API key for Stripe, a Redis password — these cannot live in plaintext in a Git repo, even a private one. The production pattern is: store secrets in AWS Secrets Manager, and use External Secrets Operator (ESO) to pull them into Kubernetes Secrets automatically. Your Helm chart references the Secret by name, not by value. The actual secret is never in Git.
  </ConceptBox>

  <h3>Step 1: Store Secrets in AWS Secrets Manager</h3>
  <TipBox title="📌 WSL Terminal — one-time setup">
    
  </TipBox>
<CodeBlock code={`# Store ShopStream secrets in AWS Secrets Manager
REGION=ap-south-1

aws secretsmanager create-secret \\
  --name 'shopstream/staging/product-catalog' \\
  --description 'Staging secrets for product-catalog service' \\
  --secret-string '{
    'DATABASE_URL': 'postgresql://shopstream:REAL_PASSWORD@rds-endpoint:5432/shopstream_staging',
    'REDIS_URL': 'redis://:REAL_REDIS_PASSWORD@elasticache-endpoint:6379',
    'STRIPE_API_KEY': 'YOUR_STRIPE_LIVE_KEY_HERE'
  }' \\
  --region \$REGION

echo '✅ Secret created in Secrets Manager'`} title="Terminal"></CodeBlock>

  <h3>Step 2: Install External Secrets Operator</h3>
<CodeBlock code={`# Add the ESO Helm repo
helm repo add external-secrets https://charts.external-secrets.io
helm repo update

# Install ESO
helm install external-secrets \\
  external-secrets/external-secrets \\
  -n external-secrets \\
  --create-namespace \\
  --set installCRDs=true

# Verify
kubectl get pods -n external-secrets`} title="Terminal"></CodeBlock>

  <h3>Step 3: Create SecretStore (Auth to AWS)</h3>
<CodeBlock code={`# Add to helm/shopstream/templates/secret-store.yaml
apiVersion: external-secrets.io/v1beta1
kind: SecretStore
metadata:
  name: aws-secrets-manager
  namespace: {{ .Release.Namespace }}
spec:
  provider:
    aws:
      service: SecretsManager
      region: ap-south-1
      auth:
        # Uses the Pod's IAM role (IRSA) — no credentials needed in the manifest
        jwt:
          serviceAccountRef:
            name: external-secrets-saCopy`} title="Terminal"></CodeBlock>

  <h3>Step 4: ExternalSecret — Pulls Secret from AWS into Kubernetes</h3>
<CodeBlock code={`# helm/shopstream/templates/external-secret.yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: {{ include 'shopstream.fullname' . }}-secrets
  namespace: {{ .Release.Namespace }}
spec:
  refreshInterval: 1h          # Refresh secrets from AWS every hour
  secretStoreRef:
    name: aws-secrets-manager
    kind: SecretStore

  target:
    name: {{ include 'shopstream.fullname' . }}-app-secret
    creationPolicy: Owner      # ESO owns and manages this Secret's lifecycle

  data:
    - secretKey: DATABASE_URL  # Key in the Kubernetes Secret
      remoteRef:
        key: shopstream/{{ .Values.environment }}/{{ .Values.serviceName }}
        property: DATABASE_URL  # Key within the JSON blob in Secrets Manager

    - secretKey: REDIS_URL
      remoteRef:
        key: shopstream/{{ .Values.environment }}/{{ .Values.serviceName }}
        property: REDIS_URL`} title="Terminal"></CodeBlock>

  <h3>Step 5: Reference the Secret in Your Deployment</h3>
<CodeBlock code={`# In helm/shopstream/templates/deployment.yaml — update env section
          env:
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  # ESO creates this Secret automatically
                  name: {{ include 'shopstream.fullname' . }}-app-secret
                  key: DATABASE_URL
            - name: REDIS_URL
              valueFrom:
                secretKeyRef:
                  name: {{ include 'shopstream.fullname' . }}-app-secret
                  key: REDIS_URL`} title="Terminal"></CodeBlock>

  <ErrorCard error="🔴 ExternalSecret shows 'SecretSyncedError' — access denied" meaning="SecretSyncedError  1 error(s) occurred: ... AccessDeniedException: User: arn:aws:sts::123456789012:assumed-role/... is not authorized to perform: secretsmanager:GetSecretValue on resource: shopstream/staging/product-catalog" fix="Scenario: The ESO controller Pod's IAM role doesn't have permission to read the specific secret. This happens when the IAM policy is attached but the resource ARN is wrong, or when IRSA (IAM Roles for Service Accounts) isn't configured for the ESO service account.
      Fix: Attach the policy {'Action':'secretsmanager:GetSecretValue','Effect':'Allow','Resource':'arn:aws:secretsmanager:ap-south-1:ACCOUNT:secret:shopstream/*'} to the IAM role that ESO's service account is annotated to use. Check with: kubectl describe sa external-secrets-sa -n shopstream-staging | grep eks.amazonaws.com — the annotation must point to a valid IAM role with the Secrets Manager permission."></ErrorCard>

  

              </div>
            );
          case 's6-2':
            return (
              <div>
                
  <h2>Argo Rollouts: Canary Deployments <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 6 · Ship to 10% of traffic first — roll back automatically if error rate spikes</p>

  <ConceptBox title="A standard Kubernetes Deployment replaces all Pods as fast as possible">
     On an e-commerce platform, a bug in the payment flow or product search impacts 100% of users the moment the rollout finishes. Argo Rollouts replaces the Deployment controller with one that understands canary logic: send 10% of traffic to the new version, wait, check Prometheus for error rate spikes, then either promote (100%) or automatically roll back. This is how Shopify, Airbnb, and every serious e-commerce platform ships to production.
  </ConceptBox>

  <h3>Step 1: Install Argo Rollouts</h3>
<CodeBlock code={`kubectl create namespace argo-rollouts

kubectl apply -n argo-rollouts \\
  -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml

# Install the kubectl plugin
curl -LO https://github.com/argoproj/argo-rollouts/releases/latest/download/kubectl-argo-rollouts-linux-amd64
chmod +x kubectl-argo-rollouts-linux-amd64
sudo mv kubectl-argo-rollouts-linux-amd64 /usr/local/bin/kubectl-argo-rollouts

kubectl argo rollouts version`} title="Terminal"></CodeBlock>

  <h3>Step 2: Replace Deployment with Rollout for order-service (Prod)</h3>
<CodeBlock code={`# helm/shopstream/templates/rollout.yaml
# Used only in production (controlled by values.yaml flag)
{{- if .Values.rollout.enabled }}
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: {{ include 'shopstream.fullname' . }}
  namespace: {{ .Release.Namespace }}
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      {{- include 'shopstream.selectorLabels' . | nindent 6 }}
  template:
    metadata:
      labels:
        {{- include 'shopstream.selectorLabels' . | nindent 8 }}
    spec:
      containers:
        - name: {{ .Chart.Name }}
          image: '{{ .Values.image.repository }}:{{ .Values.image.tag }}'
          ports:
            - name: http
              containerPort: {{ .Values.service.port }}
          livenessProbe:
            {{- toYaml .Values.livenessProbe | nindent 12 }}
          readinessProbe:
            {{- toYaml .Values.readinessProbe | nindent 12 }}

  strategy:
    canary:
      # Traffic split via your ingress controller
      canaryService: {{ include 'shopstream.fullname' . }}-canary
      stableService: {{ include 'shopstream.fullname' . }}-stable

      steps:
        # Step 1: 10% canary for 5 minutes
        - setWeight: 10
        - pause: {duration: 5m}

        # Step 2: Automated analysis — check error rate against Prometheus
        - analysis:
            templates:
              - templateName: success-rate

        # Step 3: If analysis passed, go to 50%
        - setWeight: 50
        - pause: {duration: 5m}

        # Step 4: Final analysis before 100%
        - analysis:
            templates:
              - templateName: success-rate

        # Step 5: Full rollout (100%)
        - setWeight: 100

  # Analysis template — queries Prometheus for 5xx error rate
  analysis:
    successfulRunHistoryLimit: 3
    unsuccessfulRunHistoryLimit: 3
{{- end }}`} title="Terminal"></CodeBlock>

  <h3>Step 3: Prometheus Analysis Template</h3>
<CodeBlock code={`# helm/shopstream/templates/analysis-template.yaml
{{- if .Values.rollout.enabled }}
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: success-rate
  namespace: {{ .Release.Namespace }}
spec:
  args:
    - name: service-name
  metrics:
    - name: success-rate
      # Run this analysis every 30 seconds for 5 minutes
      interval: 30s
      count: 10
      # Fail if success rate drops below 95%
      successCondition: result[0] >= 0.95
      failureLimit: 2    # Allow 2 bad readings before auto-rollback

      provider:
        prometheus:
          address: http://prometheus-operated.monitoring.svc:9090
          query: |
            sum(rate(http_requests_total{
              job='{{ args.service-name }}',
              status!~'5.*'
            }[2m]))
            /
            sum(rate(http_requests_total{
              job='{{ args.service-name }}'
            }[2m]))
{{- end }}`} title="Terminal"></CodeBlock>

  <h3>Watching a Canary Rollout in Real Time</h3>
<CodeBlock code={`# Watch the canary progression live
kubectl argo rollouts get rollout shopstream-order-service \\
  -n shopstream-prod --watch

# Output shows:
# Name:            shopstream-order-service
# Namespace:       shopstream-prod
# Status:          ॥ Paused
# Strategy:        Canary
#   Step:          2/6 (setWeight: 10 → waiting pause 5m)
#   Weight:        10
#   Canary Pods:   1/3
#   Stable Pods:   3/3

# Manually promote past the pause (if you're confident)
kubectl argo rollouts promote shopstream-order-service -n shopstream-prod

# Manually abort and roll back
kubectl argo rollouts abort shopstream-order-service -n shopstream-prod`} title="Terminal"></CodeBlock>

  <WarningBox>
    <strong>⚠️ Argo Rollouts requires Prometheus for automated analysis.</strong> If Prometheus isn't installed, the AnalysisRun will fail immediately with "no data points" and trigger a rollback. Either install Prometheus (kube-prometheus-stack via Helm) before enabling analysis, or use a <code>pause: {"{"}duration: 10m{"}"}</code> step with manual promotion for the initial setup. Never skip the analysis in production — the whole point of canary is automatic rollback.
  </WarningBox>

  

              </div>
            );
          case 's6-3':
            return (
              <div>
                
  <h2>ArgoCD RBAC &amp; Multi-Team Setup <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 6 · Who can sync what — per-team access control with AppProjects</p>

  <ConceptBox title="By default, any ArgoCD user can sync any application in any namespace">
     For ShopStream with multiple teams (backend team owns order-service, frontend team owns api-gateway), you need to ensure the frontend team can't accidentally sync or delete the order-service — and vice versa. ArgoCD Projects (AppProjects) define exactly which repos, clusters, and namespaces each team can deploy to.
  </ConceptBox>

  <h3>Create an AppProject for ShopStream</h3>
<CodeBlock code={`# argocd/projects/shopstream.yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: shopstream
  namespace: argocd
spec:
  description: ShopStream microservices platform

  # Source repos this project can deploy from
  sourceRepos:
    - git@github.com:YOUR_ORG/shopstream-infra-config.git

  # Destinations this project can deploy to
  destinations:
    - namespace: shopstream-dev
      server: https://kubernetes.default.svc
    - namespace: shopstream-staging
      server: https://kubernetes.default.svc
    - namespace: shopstream-prod
      server: https://kubernetes.default.svc

  # Kubernetes resource types allowed (prevent creating ClusterRoles etc.)
  namespaceResourceWhitelist:
    - group: 'apps'
      kind: Deployment
    - group: 'apps'
      kind: ReplicaSet
    - group: ''
      kind: Service
    - group: ''
      kind: ConfigMap
    - group: ''
      kind: Secret
    - group: 'autoscaling'
      kind: HorizontalPodAutoscaler
    - group: 'argoproj.io'
      kind: Rollout

  # What cluster-scoped resources can be created
  clusterResourceWhitelist:
    - group: ''
      kind: Namespace

  # RBAC roles within this project
  roles:
    - name: backend-team
      description: Backend engineers — can sync all services except prod
      policies:
        - p, proj:shopstream:backend-team, applications, sync, shopstream/shopstream-*-dev, allow
        - p, proj:shopstream:backend-team, applications, sync, shopstream/shopstream-*-staging, allow
        - p, proj:shopstream:backend-team, applications, get, shopstream/shopstream-*-prod, allow
        # ↑ Can VIEW prod but not sync it
      groups:
        - shopstream:backend

    - name: platform-team
      description: Platform/SRE team — full access including prod sync
      policies:
        - p, proj:shopstream:platform-team, applications, *, shopstream/*, allow
      groups:
        - shopstream:platform

    - name: read-only
      description: Read-only access for all team members
      policies:
        - p, proj:shopstream:read-only, applications, get, shopstream/*, allow
      groups:
        - shopstream:everyoneCopy`} title="Terminal"></CodeBlock>

<CodeBlock code={`# Apply and verify
kubectl apply -f argocd/projects/shopstream.yaml
argocd proj get shopstream
argocd proj role list shopstreamCopy`} title="Terminal"></CodeBlock>

  

              </div>
            );
          case 's6-4':
            return (
              <div>
                
  <h2>Notifications: Slack &amp; PagerDuty <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 6 · Get alerted when deployments succeed, fail, or degrade in production</p>

  <ConceptBox title="Silent failures are the most dangerous failures">
     ArgoCD can notify your team on Slack when a sync fails, when an application degrades, or when a canary auto-rollback fires. Without notifications, an engineer checks ArgoCD 30 minutes after a deployment and discovers it's been in a crash loop since the push. With notifications, the right person is paged within 60 seconds.
  </ConceptBox>

  <h3>Configure ArgoCD Notifications</h3>
<CodeBlock code={`# Add to argocd-notifications-cm ConfigMap
# kubectl edit configmap argocd-notifications-cm -n argocd
# Or apply this manifest:

apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-notifications-cm
  namespace: argocd
data:
  # Slack notification template
  template.app-deployed: |
    message: |
      :rocket: *{{.app.metadata.name}}* deployed to {{index .app.metadata.labels 'environment'}}
      Revision: \`{{.app.status.sync.revision | truncate 7 ''}}\`
      Status: *{{.app.status.health.status}}*
    slack:
      attachments: |
        [{
          'color': 'good',
          'fields': [
            {'title': 'Application', 'value': '{{.app.metadata.name}}', 'short': true},
            {'title': 'Environment', 'value': '{{index .app.metadata.labels \\'environment\\'}}', 'short': true}
          ]
        }]

  template.app-health-degraded: |
    message: |
      :red_circle: *DEGRADED* — {{.app.metadata.name}} in {{index .app.metadata.labels 'environment'}}
      *Health Message:* {{.app.status.conditions | toJson}}
    slack:
      attachments: |
        [{
          'color': 'danger',
          'title': 'Application Degraded — Immediate Attention Required'
        }]

  template.app-sync-failed: |
    message: |
      :x: *SYNC FAILED* — {{.app.metadata.name}}
      *Error:* {{.app.status.conditions | toJson}}

  # Triggers — when to send which template
  trigger.on-deployed: |
    - description: Notify on successful deployment
      send: [app-deployed]
      when: app.status.operationState.phase in ['Succeeded']

  trigger.on-health-degraded: |
    - description: Notify when health degrades
      send: [app-health-degraded]
      when: app.status.health.status == 'Degraded'

  trigger.on-sync-failed: |
    - description: Notify on sync failure
      send: [app-sync-failed]
      when: app.status.operationState.phase in ['Error', 'Failed']Copy`} title="Terminal"></CodeBlock>

  <h3>Add Slack Token to ArgoCD Secrets</h3>
<CodeBlock code={`# Store Slack webhook URL in a Kubernetes secret
kubectl create secret generic argocd-notifications-secret \\
  --from-literal=slack-token=xoxb-YOUR-SLACK-BOT-TOKEN \\
  -n argocd

# Add Slack service to notification config
kubectl patch configmap argocd-notifications-cm -n argocd \\
  --type merge \\
  -p '{'data':{'service.slack':'{\\'token\\':\\'\$slack-token\\',\\'username\\':\\'ArgoCD\\',\\'icon\\':\\'https://argoproj.github.io/argo-cd/assets/logo.png\\'}'}}'Copy`} title="Terminal"></CodeBlock>

  <h3>Subscribe Applications to Notifications</h3>
<CodeBlock code={`# Add annotations to Application manifests to subscribe them to notifications
# Add to argocd/applicationsets/shopstream-apps.yaml template.metadata.annotations:

metadata:
  annotations:
    # Subscribe to all triggers
    notifications.argoproj.io/subscribe.on-deployed.slack: 'shopstream-deployments'
    notifications.argoproj.io/subscribe.on-health-degraded.slack: 'shopstream-alerts'
    notifications.argoproj.io/subscribe.on-sync-failed.slack: 'shopstream-alerts'
    # For production apps, also page PagerDuty on degradation
    notifications.argoproj.io/subscribe.on-health-degraded.pagerduty: 'shopstream-pagerduty'Copy`} title="Terminal"></CodeBlock>

  

              </div>
            );
          case 's6-5':
            return (
              <div>
                
  <h2>Rollback Strategies <span className="badge expert">Expert</span></h2>
  <p className="subtitle">Stage 6 · Four ways to roll back — when to use each one</p>

  <ConceptBox title="In a GitOps pipeline, rollback is always a forward commit">
     You don't revert cluster state directly — you update Git and let ArgoCD reconcile. This preserves the audit trail and avoids the cluster state diverging from Git. Argo Rollouts auto-rollback handles the fast case; the rest are for different failure modes.
  </ConceptBox>

  <table>
    <tbody><tr><th>Method</th><th>Speed</th><th>When to use</th><th>Command</th></tr>
    <tr><td>Argo Rollouts auto-rollback</td><td>~2 min</td><td>Canary analysis fails (error rate spike)</td><td>Automatic</td></tr>
    <tr><td>ArgoCD UI/CLI rollback</td><td>~3 min</td><td>App degraded, need to go to last good revision</td><td><code>argocd app rollback</code></td></tr>
    <tr><td>Git revert + push</td><td>~5 min</td><td>Bad code change — revert the application commit</td><td><code>git revert HEAD &amp;&amp; git push</code></td></tr>
    <tr><td>Promote old tag</td><td>~5 min</td><td>Image tag rollback — run promote.yml with previous SHA</td><td>GitHub Actions dispatch</td></tr>
  </tbody></table>

  <h3>Method 2: ArgoCD CLI Rollback (Fastest Manual)</h3>
<CodeBlock code={`# See deployment history for the production app
argocd app history shopstream-order-service-prod

# ID  DATE                           REVISION
# 0   2024-11-15 10:23:45 +0530 IST  abc12345 (HEAD)   ← current (broken)
# 1   2024-11-14 18:02:12 +0530 IST  def67890            ← last known good
# 2   2024-11-13 14:11:03 +0530 IST  ghi01234

# Roll back to the previous deployment (ID 1)
argocd app rollback shopstream-order-service-prod 1

# ArgoCD deploys revision def67890 immediately
# Takes ~2 minutes (Kubernetes rolling update)

# Monitor
argocd app wait shopstream-order-service-prod --health`} title="Terminal"></CodeBlock>

  <WarningBox>
    <strong>⚠️ ArgoCD rollback is temporary unless you also update Git.</strong> If auto-sync is enabled, ArgoCD will detect that the cluster is now running a different revision than what's in Git, and re-sync to the broken version. After rolling back via CLI, immediately run <code>argocd app set shopstream-order-service-prod --sync-policy none</code> to pause auto-sync, then update the Git values file to the old image tag so Git and cluster agree.
  </WarningBox>

  <h3>Method 3: Git Revert (Safest, Full Audit Trail)</h3>
<CodeBlock code={`# In ~/projects/shopstream-infra-config/
git log --oneline environments/prod/values/order-service.yaml

# a3f8d92 ci: order-service → a3f8d92c   ← broken deploy (HEAD)
# def6789 ci: order-service → def67890   ← last good

# Revert the bad commit (creates a new commit — safe for shared branches)
git revert a3f8d92 --no-edit
git push origin main

# ArgoCD picks up the revert commit → re-deploys def67890
# Full history preserved: you can see exactly when the rollback happened and whyCopy`} title="Terminal"></CodeBlock>

  

              </div>
            );
          case 's6-6':
            return (
              <div>
                
  <h2>Capstone S6: Production-Ready Pipeline <span className="badge expert">Capstone</span></h2>
  <p className="subtitle">Stage 6 · Simulate a production incident: bad deploy → auto-rollback → Slack alert</p>

  <ConceptBox title="This capstone simulates a real production incident">
     You deploy a version of <code>order-service</code> that has a high 5xx error rate. Argo Rollouts detects this from Prometheus analysis, automatically aborts the canary, and rolls back to stable. Slack gets a notification. You verify the incident and resolution in ArgoCD history.
  </ConceptBox>

  <TipBox title="📌 WSL Terminal — this runs against your prod-equivalent cluster (staging is fine for the simulation)">
    
  </TipBox>

<CodeBlock code={`# Step 1: Inject a deliberate bug into order-service (simulate bad deploy)
cat > services/order-service/src/orders.js << 'EOF'
// Simulated bug: 80% of requests return 500
app.get('/api/orders', (req, res) => {
  if (Math.random() < 0.8) {
    return res.status(500).json({ error: 'database connection failed' });
  }
  return res.json({ orders: [] });
});
EOF

git add services/order-service/
git commit -m 'feat: new order caching (intentional bug for pipeline test)'
git push origin main

# Step 2: CI builds and pushes the broken image (tag: BADSHA1)
# Watch in GitHub Actions: should succeed (unit tests may not catch runtime bugs)

# Step 3: CI updates infra-config with new tag
# ArgoCD detects change, starts canary in stagingCopy`} title="Terminal"></CodeBlock>

<CodeBlock code={`# Step 4: Watch Argo Rollouts analyze the canary
kubectl argo rollouts get rollout shopstream-order-service \\
  -n shopstream-staging --watch

# You'll see:
# Status: ॥ Paused
# Step: 2/6 — waiting for analysis
# ...
# Status: ✖ Degraded (auto-rollback triggered)
# Message: RolloutAborted: Metric 'success-rate' assessed Failed
#          due to failed (1) > failureLimit (2)

# Step 5: Verify stable version is back
argocd app get shopstream-order-service-staging
# Status: Synced + Healthy (running the previous stable tag)

# Step 6: Check Slack — should have received an alert
echo 'Check #shopstream-alerts channel in Slack'

# Step 7: Fix the bug, re-deploy
# (revert the bad commit)
git revert HEAD --no-edit
git push origin mainCopy`} title="Terminal"></CodeBlock>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s6-6-0" /><label htmlfor="cicd-cb-s6-6-0">External Secrets Operator installed — no plaintext secrets in Git</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s6-6-1" /><label htmlfor="cicd-cb-s6-6-1">Argo Rollouts installed — order-service uses canary strategy with Prometheus analysis</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s6-6-2" /><label htmlfor="cicd-cb-s6-6-2">AppProject created — backend-team scoped to dev/staging, platform-team has prod access</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s6-6-3" /><label htmlfor="cicd-cb-s6-6-3">Slack notifications working — received deployment and degradation alerts</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s6-6-4" /><label htmlfor="cicd-cb-s6-6-4">Canary auto-rollback verified — bad deploy triggered automatic rollback in under 10 minutes</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-s6-6-5" /><label htmlfor="cicd-cb-s6-6-5">Rollback leaves audit trail in ArgoCD history and infra-config Git log</label></li></ul></div>

  

              </div>
            );
          case 'errors':
            return (
              <div>
                
  <h2>🔥 Master Error Reference</h2>
  <p className="subtitle">10 real errors — searchable, scannable, written for someone mid-incident</p>

  <ConceptBox title="Bookmark this page">
     These are the errors engineers actually hit in production GitHub Actions + ArgoCD pipelines. Each error is shown exactly as it appears in logs, with the real cause and the real fix.
  </ConceptBox>

  <ErrorCard error="🔴 1 · GitHub Actions OIDC — 'Not authorized to perform sts:AssumeRoleWithWebIdentity'" meaning="Error: Not authorized to perform sts:AssumeRoleWithWebIdentity
Unable to assume the role arn:aws:iam::123456789012:role/github-actions-shopstream" fix="Root cause: Either (a) permissions: id-token: write is missing from the job, (b) the trust policy's sub condition doesn't match the workflow's identity, or (c) the OIDC provider was never created in the AWS account.
      Fix: (1) Add permissions: id-token: write to the job block. (2) Decode the OIDC token to see the actual sub: add step run: echo $ACTIONS_ID_TOKEN_REQUEST_TOKEN | cut -d. -f2 | base64 -d. (3) Verify the trust policy condition matches — use StringLike not StringEquals for the sub. (4) Run aws iam list-open-id-connect-providers to verify the provider exists in your account."></ErrorCard>

  <ErrorCard error="🔴 2 · ECR Push — 'no basic auth credentials' with Buildx" meaning="ERROR [auth] failed to fetch oauth token: unexpected status: 401 Unauthorized
failed to solve: failed to push image: unexpected status code 401 Unauthorized: no basic auth credentials" fix="Root cause: Docker Buildx uses a separate daemon from the Docker CLI. When amazon-ecr-login@v1 runs, it authenticates the CLI daemon, not Buildx. Version 1 of the action doesn't handle this. Also triggered by running Buildx before ECR login in your steps.
      Fix: (1) Upgrade to aws-actions/amazon-ecr-login@v2 — it handles Buildx auth. (2) Ensure step order: setup-buildx → ecr-login → build-push. (3) Confirm docker/build-push-action is at v5+. If still failing, add env: DOCKER_CONFIG: /root/.docker to the build step."></ErrorCard>

  <ErrorCard error="🔴 3 · ArgoCD 'ComparisonError' — Helm template render failure" meaning="ComparisonError: rpc error: code = Unknown desc = error converting YAML to JSON: yaml: unmarshal errors:
  line 34: field resources not found in type v1.Container" fix="Root cause: Your Helm chart template produces invalid YAML or references a field that doesn't exist in the Kubernetes API version your cluster supports. Often caused by a typo in a template helper ({{- toYaml .Values.resources | nindent 12 }} wrong indent), or using a resource type that's in a different API group than templated.
      Fix: Run helm template shopstream ./helm/shopstream -f environments/dev/values/product-catalog.yaml 2>&amp;1 locally. The error will include line numbers in the rendered output. Common fixes: check nindent values (must match the YAML depth), verify apiVersion matches your cluster's supported API groups (kubectl api-resources | grep deployment)."></ErrorCard>

  <ErrorCard error="🔴 4 · ImagePullBackOff — ECR image not found or no pull permissions" meaning="Failed to pull image '123456789012.dkr.ecr.ap-south-1.amazonaws.com/shopstream/product-catalog:a3f8d92c':
rpc error: code = Unknown desc = failed to pull and unpack image: failed to resolve reference
'123456789012.dkr.ecr.ap-south-1.amazonaws.com/shopstream/product-catalog:a3f8d92c': unexpected status code 401 Unauthorized" fix="Root cause: The Kubernetes node cannot authenticate to ECR. On EKS, this means the node's IAM role is missing the ecr:GetAuthorizationToken and ecr:BatchGetImage permissions. On kind (local), ECR images aren't accessible without explicitly loading them or configuring imagePullSecrets.
      Fix (EKS): Add the AmazonEC2ContainerRegistryReadOnly managed policy to your EKS node group's IAM role: aws iam attach-role-policy --role-name eksctl-shopstream-nodegroup-workers-NodeInstanceRole-XXX --policy-arn arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly. Fix (kind): Either push to Docker Hub (public) or load image into kind directly: kind load docker-image shopstream/product-catalog:a3f8d92c --name shopstream."></ErrorCard>

  <ErrorCard error="🔴 5 · ArgoCD App Stuck 'Progressing' — rollout never finishes" meaning="Message: Waiting for deployment 'shopstream-product-catalog' rollout to finish:
1 old replicas are pending termination...
(stuck here for 10+ minutes)" fix="Root cause: A Pod from the old ReplicaSet won't terminate because it has active connections. This happens when your app doesn't handle SIGTERM correctly (using shell form CMD instead of exec form), or when Kubernetes terminationGracePeriodSeconds is too short for the in-flight requests to complete. In worst cases, a PodDisruptionBudget is preventing termination.
      Fix: (1) Change CMD npm start to CMD ['node', 'src/index.js'] in Dockerfile (exec form handles SIGTERM correctly). (2) Add graceful shutdown to your Node.js app: process.on('SIGTERM', () => { server.close(() => process.exit(0)); });. (3) Check PDBs: kubectl get pdb -n shopstream-staging. (4) Force termination as last resort: kubectl delete pod POD_NAME --grace-period=0 --force."></ErrorCard>

  <ErrorCard error="🔴 6 · GitHub Actions CI push to infra-config rejected — 'Permission denied'" meaning="ERROR: Permission to YOUR_ORG/shopstream-infra-config.git denied to github-actions-bot.
fatal: Could not read from remote repository.
Please make sure you have the correct access rights and the repository exists." fix="Root cause: The SSH deploy key in INFRA_CONFIG_DEPLOY_KEY secret either (a) wasn't added to the infra-config repo's Deploy Keys, (b) was added as read-only (forgot to check 'Allow write access'), or (c) the webfactory/ssh-agent action loaded the wrong key.
      Fix: Go to shopstream-infra-config → Settings → Deploy keys. Verify the public key is listed and 'Allow write access' is ticked. Test the key manually: ssh -T git@github.com -i ~/.ssh/ci_infra_deploy_key from WSL. Also verify the secret name matches exactly — GitHub secret names are case-sensitive."></ErrorCard>

  <ErrorCard error="🔴 7 · Argo Rollouts — 'AnalysisRun Failed: no data points'" meaning="AnalysisRun 'shopstream-order-service-a3f8d92c-1' Failed
Metric 'success-rate' assessed as Failed
No datapoints were received from the provider (count: 0)" fix="Root cause: The Prometheus query in your AnalysisTemplate returns no data. This happens when: (a) the Prometheus server URL is wrong or unreachable from the ArgoCD namespace, (b) the metric name in the query (http_requests_total) doesn't match what your app actually exports, or (c) the canary has been running for under 2 minutes and there's not enough data for the rate()[2m] window.
      Fix: Port-forward Prometheus and run the query manually: kubectl port-forward svc/prometheus-operated 9090:9090 -n monitoring &amp; then open http://localhost:9090 and paste your query. Verify the metric name with curl http://localhost:3003/metrics | grep http_requests from inside the Pod. Extend the analysis window from 2m to 5m in the AnalysisTemplate if traffic is low."></ErrorCard>

  <ErrorCard error="🔴 8 · Git conflict in infra-config — concurrent CI runs" meaning="To git@github.com:YOUR_ORG/shopstream-infra-config.git
 ! [rejected]        main &rarr; main (non-fast-forward)
error: failed to push some refs to 'git@github.com:YOUR_ORG/shopstream-infra-config.git'
hint: Updates were rejected because the tip of your current branch is behind its remote counterpart." fix="Root cause: Two CI runs finished building at almost the same time (e.g. api-gateway and product-catalog both pushed within seconds of each other). Both cloned infra-config at the same commit, modified their respective values files, and the second push is rejected because the first one advanced HEAD.
      Fix: Add the git pull --rebase &amp;&amp; git push retry loop (shown in Stage 5.2). For teams with very high push frequency, use ArgoCD Image Updater instead of a CI commit — it handles concurrent updates natively with a proper queuing mechanism."></ErrorCard>

  <ErrorCard error="🔴 9 · ExternalSecret — 'SecretSyncedError: context deadline exceeded'" meaning="SecretSyncedError: 1 error(s) occurred: could not get secret shopstream/staging/product-catalog
from provider: context deadline exceeded (Client.Timeout exceeded while awaiting headers)" fix="Root cause: The External Secrets Operator Pod cannot reach the AWS Secrets Manager API endpoint. On EKS with private cluster configuration or restrictive security groups, the ESO Pod may not have outbound HTTPS to the AWS API. Also caused by the ESO Pod not having IRSA (IAM Roles for Service Accounts) configured correctly.
      Fix: (1) Verify network connectivity: kubectl exec -n external-secrets $(kubectl get pod -n external-secrets -o name | head -1) -- curl -s https://secretsmanager.ap-south-1.amazonaws.com/. (2) Check IRSA annotation on the ESO service account: kubectl get sa -n external-secrets -o yaml | grep eks.amazonaws.com. (3) If using a VPC endpoint for Secrets Manager, verify the endpoint is in the right subnets and has DNS resolution enabled."></ErrorCard>

  <ErrorCard error="🔴 10 · Helm upgrade fails — 'another operation is in progress'" meaning="Error: UPGRADE FAILED: another operation (install/upgrade/rollback) is in progress
Error: cannot re-use a name that is still in use" fix="Root cause: A previous Helm release attempt got stuck in a pending-upgrade or pending-install state. This happens when ArgoCD was interrupted mid-sync (pod restart, network blip), or when someone ran helm upgrade manually while ArgoCD was also syncing.
      Fix: Check the stuck release: helm history shopstream-product-catalog -n shopstream-staging. If the latest entry shows pending-upgrade, roll it back: helm rollback shopstream-product-catalog -n shopstream-staging. Then re-trigger ArgoCD sync. If the chart was never successfully installed, delete it: helm uninstall shopstream-product-catalog -n shopstream-staging and let ArgoCD reinstall. Never run manual helm upgrade on ArgoCD-managed releases."></ErrorCard>

  

              </div>
            );
          case 'cleanup':
            return (
              <div>
                
  <h2>🧹 Resource Cleanup &amp; Cost Control</h2>
  <p className="subtitle">Tear down everything you created — in the right order to avoid orphaned resources</p>

  <WarningBox>
    <strong>⚠️ Do this before you sleep.</strong> An EKS cluster with 2 nodes costs ~$5/day. An ECR repo costs $0.10/GB/month (minor). NAT gateways cost $0.045/hr (~$32/month). The EKS cluster is the main cost. If you're done learning for the day, delete it.
  </WarningBox>

  <TipBox title="📌 WSL Terminal — ensure you're pointing at the correct cluster first">
     Run <code>kubectl config current-context</code> and verify it shows your shopstream cluster, not a production context from another project.
  </TipBox>

  <h3>Step 1: Remove ArgoCD Applications</h3>
<CodeBlock code={`# Delete ApplicationSet first (removes all 15 generated Applications)
kubectl delete applicationset shopstream-services -n argocd

# Verify all applications are gone
argocd app list | grep shopstream
# Should return nothing

# If any Applications remain (from manual kubectl apply), delete them
argocd app delete shopstream-product-catalog-dev --cascade=true
# --cascade=true also deletes the Kubernetes resources the app manages`} title="Terminal"></CodeBlock>

  <h3>Step 2: Delete Kubernetes Namespaces</h3>
<CodeBlock code={`kubectl delete namespace shopstream-dev shopstream-staging shopstream-prod
kubectl delete namespace argocd argo-rollouts external-secrets

# These namespaces (and all their Pods, Services, Secrets) are now gone
kubectl get namespaces | grep shopstream
# Should return nothingCopy`} title="Terminal"></CodeBlock>

  <h3>Step 3: Delete ECR Repositories</h3>
<CodeBlock code={`REGION=ap-south-1

for service in api-gateway product-catalog cart-service order-service notification-service; do
  aws ecr delete-repository \\
    --repository-name shopstream/\$service \\
    --region \$REGION \\
    --force    # --force deletes the repo even if it has images
  echo '✅ Deleted ECR repo: shopstream/\$service'
doneCopy`} title="Terminal"></CodeBlock>

  <h3>Step 4: Delete Secrets Manager Secrets</h3>
<CodeBlock code={`REGION=ap-south-1

for env in dev staging prod; do
  for svc in product-catalog order-service; do
    aws secretsmanager delete-secret \\
      --secret-id 'shopstream/\$env/\$svc' \\
      --force-delete-without-recovery \\
      --region \$REGION
    echo '✅ Deleted secret: shopstream/\$env/\$svc'
  done
doneCopy`} title="Terminal"></CodeBlock>

  <h3>Step 5: Delete the EKS Cluster (biggest cost)</h3>
<CodeBlock code={`# This takes ~15 minutes
# eksctl deletes: EC2 nodes, node groups, VPC, subnets, NAT gateway, etc.

eksctl delete cluster \\
  --name shopstream \\
  --region ap-south-1 \\
  --wait    # Wait for completion — don't run this in background

echo '✅ EKS cluster and all associated resources deleted'

# Verify the cluster is gone
aws eks list-clusters --region ap-south-1Copy`} title="Terminal"></CodeBlock>

  <h3>Step 6: Delete IAM Resources</h3>
<CodeBlock code={`ACCOUNT=\$(aws sts get-caller-identity --query Account --output text)

# Detach policy from role
aws iam detach-role-policy \\
  --role-name github-actions-shopstream \\
  --policy-arn arn:aws:iam::\${ACCOUNT}:policy/shopstream-ci-policy

# Delete the role
aws iam delete-role --role-name github-actions-shopstream

# Delete the policy
aws iam delete-policy \\
  --policy-arn arn:aws:iam::\${ACCOUNT}:policy/shopstream-ci-policy

# Delete the OIDC provider (only if you're not using it for other projects)
OIDC_ARN=\$(aws iam list-open-id-connect-providers \\
  --query 'OpenIDConnectProviderList[?contains(Arn, \`token.actions.githubusercontent.com\`)].Arn' \\
  --output text)
aws iam delete-open-id-connect-provider --open-id-connect-provider-arn \$OIDC_ARN

echo '✅ IAM resources cleaned up'Copy`} title="Terminal"></CodeBlock>

  <h3>Step 7: Delete kind Cluster (local path)</h3>
<CodeBlock code={`# If you used kind instead of EKS
kind delete cluster --name shopstream
echo '✅ kind cluster deleted'Copy`} title="Terminal"></CodeBlock>

  <ErrorCard error="🔴 eksctl delete fails — 'cluster still has nodegroups'" meaning="Error: unable to delete cluster 'shopstream', err: operation error EKS: DeleteCluster,
https response error StatusCode: 409, RequestID: ...,
ResourceInUseException: Cluster has nodegroup(s)" fix="Root cause: You tried to delete the EKS cluster directly before deleting the node groups. AWS requires node groups to be removed before the control plane can be deleted. This happens when using the AWS console instead of eksctl.
      Fix: Delete node groups first: eksctl delete nodegroup --cluster shopstream --name workers --region ap-south-1 --wait, then delete the cluster: eksctl delete cluster --name shopstream --region ap-south-1. If you created additional node groups, list them first: eksctl get nodegroup --cluster shopstream."></ErrorCard>

  <div className="g-checklist"><ul classname="g-checklist"><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-cleanup-0" /><label htmlfor="cicd-cb-cleanup-0">All ArgoCD Applications deleted</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-cleanup-1" /><label htmlfor="cicd-cb-cleanup-1">All Kubernetes namespaces (shopstream-*, argocd) deleted</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-cleanup-2" /><label htmlfor="cicd-cb-cleanup-2">All ECR repositories deleted (aws ecr describe-repositories shows none)</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-cleanup-3" /><label htmlfor="cicd-cb-cleanup-3">Secrets Manager secrets deleted</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-cleanup-4" /><label htmlfor="cicd-cb-cleanup-4">EKS cluster deleted OR kind cluster deleted</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-cleanup-5" /><label htmlfor="cicd-cb-cleanup-5">IAM role and policy deleted</label></li><li classname="g-checklist-item"><input type="checkbox" classname="g-guide-cb" id="cicd-cb-cleanup-6" /><label htmlfor="cicd-cb-cleanup-6">✅ AWS Billing Console checked 24 hours later — confirm $0 new charges related to shopstream resources</label></li></ul></div>

  <hr />

  <h3>What This Guide Does Not Cover</h3>
  <p>In the interest of honesty: there's a meaningful amount of advanced CI/CD territory this guide deliberately scoped out:</p>
  <ul>
    <li><strong>ArgoCD Image Updater</strong> — an ArgoCD plugin that watches ECR for new tags and updates Git automatically, eliminating the CI → infra-config commit step. Better for large teams with high push frequency.</li>
    <li><strong>Multi-cluster ArgoCD</strong> — deploying to multiple EKS clusters (different regions or accounts) from a single ArgoCD control plane. The ApplicationSet generator supports this but wasn't covered here.</li>
    <li><strong>Self-hosted GitHub Actions runners</strong> — running CI jobs on your own EC2 instances instead of GitHub-hosted runners. Required for accessing private VPC resources from CI (e.g. internal Artifactory).</li>
    <li><strong>Tekton / Jenkins alternative CI backends</strong> — if your organisation mandates a different CI tool, the GitOps CD half (ArgoCD) is unchanged; only the CI half changes.</li>
    <li><strong>Progressive delivery with Flagger</strong> — an alternative to Argo Rollouts for canary analysis that integrates with Istio service mesh traffic shaping.</li>
  </ul>
  <p>Knowing the edges of your knowledge is a senior engineer skill. The pipeline you've built here is what the majority of production Kubernetes teams run — and being able to build, debug, and explain it is exactly what DevOps interviews test.</p>

  

              </div>
            );
          default:
            return <div>Select a section from the sidebar.</div>;
        }
      }}
    </GuideWrapper>
  );
}
