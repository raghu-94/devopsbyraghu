"use client";

import { useState } from "react";
import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox, TipBox, ErrorCard } from "@/components/guide/GuideComponents";

export default function K8sGitOpsProject() {
  // Environment variables state
  const [vars, setVars] = useState({
    awsRegion: "us-east-1",
    clusterName: "prod-gitops-cluster",
    githubRepo: "https://github.com/YOUR_GITHUB_USERNAME/my-k8s-manifests"
  });

  const [appliedVars, setAppliedVars] = useState({ ...vars });
  const [applyButtonText, setApplyButtonText] = useState("Apply to Code Blocks");
  const [applyButtonColor, setApplyButtonColor] = useState("var(--g-accent)");

  // Chaos engine state
  const [chaosScenario, setChaosScenario] = useState(null);
  const [showChaosSolution, setShowChaosSolution] = useState(false);

  const navGroups = [
    {
      title: "Project Intro",
      items: [
        { id: "overview", title: "1. Project Overview & Config" }
      ]
    },
    {
      title: "Execution Stages",
      items: [
        { id: "stage1", title: "2. EKS & ArgoCD Setup" },
        { id: "stage2", title: "3. App Manifests (YAML)" },
        { id: "stage3", title: "4. The GitOps Magic" }
      ]
    },
    {
      title: "Troubleshooting",
      items: [
        { id: "errors", title: "5. Real-World Debugging" },
        { id: "chaos", title: "🔥 Test Your Knowledge" },
        { id: "destroy", title: "6. 🗑️ Destroy EKS" }
      ]
    },
    {
      title: "Interview Prep",
      items: [
        { id: "interview", title: "🎙️ Interview Q&A" }
      ]
    }
  ];

  const handleVarChange = (e) => {
    const { name, value } = e.target;
    setVars(prev => ({ ...prev, [name]: value }));
  };

  const applyVariables = () => {
    setAppliedVars({ ...vars });
    setApplyButtonText("Applied!");
    setApplyButtonColor("var(--g-green)");
    setTimeout(() => {
      setApplyButtonText("Apply to Code Blocks");
      setApplyButtonColor("var(--g-accent)");
    }, 2000);
  };

  // Chaos Engine data
  const chaosScenarios = [
    {
      title: "Scenario 1: The Rogue Developer",
      symptom: "All 3 Nginx pods instantly terminate. The website briefly returns 502 Bad Gateway.",
      command: "# Manually delete the Deployment to simulate a catastrophic error\nkubectl delete deployment gitops-webapp",
      explanation: "In a normal cluster, deleting the Deployment causes total downtime until an engineer runs `kubectl apply` again. But watch what happens... ArgoCD immediately detects the missing Deployment. Because 'selfHeal: true' is enabled, ArgoCD instantly re-creates the Deployment pulling the YAML from GitHub. Zero touch recovery.",
      fixCommand: "# Just watch it heal itself! Or verify the recreation:\nkubectl get pods -w"
    },
    {
      title: "Scenario 2: The Replica Override",
      symptom: "No downtime, but the number of pods running locally doesn't match what the developer thinks is running.",
      command: "# Someone logs into the cluster and tries to scale down the pods manually\nkubectl scale deployment gitops-webapp --replicas=0",
      explanation: "Someone tried to scale down the pods to save money without updating the GitHub repository. This is Configuration Drift. ArgoCD detects that the cluster state (0 replicas) differs from the Git state (3 replicas). It immediately overrides the manual command and scales back up to 3.",
      fixCommand: "# Check ArgoCD UI, it will show a 'Sync' event fighting the manual change."
    }
  ];

  const generateChaos = () => {
    const randomIdx = Math.floor(Math.random() * chaosScenarios.length);
    setChaosScenario(chaosScenarios[randomIdx]);
    setShowChaosSolution(false);
  };

  return (
    <GuideWrapper 
      title="Project 2: K8s GitOps Platform" 
      subtitle="Configure EKS and ArgoCD to establish a modern declarative deployment workflow."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case "overview":
            return (
              <div>
                <h2>The Kubernetes GitOps Platform</h2>
                <p className="guide-subtitle">
                  GitHub Repo Name: <code style={{ color: "var(--g-accent)", padding: "4px 8px", backgroundColor: "var(--g-surface)", borderRadius: "4px", border: "1px solid var(--g-border)" }}>k8s-argocd-customer-dashboard</code>
                </p>

                <TipBox>
                  <strong>🎯 The Scenario (Use this in interviews):</strong><br />
                  &quot;Our developers were manually applying Kubernetes YAML files using <code>kubectl</code>. It caused massive configuration drift, and when production broke, nobody knew who ran what command. I re-architected our deployment strategy using GitOps. I installed ArgoCD inside our EKS cluster to constantly monitor our GitHub repository. Now, developers just merge a PR, and ArgoCD automatically syncs the exact state of GitHub into the cluster.&quot;
                </TipBox>

                <h3>💰 AWS Cost Breakdown</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--g-text-muted)", marginBottom: "12px" }}>
                  <em>Disclaimer: AWS pricing varies by region. <strong>EKS is not covered by the Free Tier.</strong> It is critical that you run the Destroy command immediately after testing to protect your credits.</em>
                </p>

                <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px", fontSize: "0.95rem" }}>
                  <thead>
                    <tr style={{ backgroundColor: "var(--g-sidebar-bg)", borderBottom: "1px solid var(--g-border)", textAlign: "left" }}>
                      <th style={{ padding: "12px" }}>AWS Resource</th>
                      <th style={{ padding: "12px" }}>Type / Tier</th>
                      <th style={{ padding: "12px" }}>Est. Hourly Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "12px" }}>EKS Control Plane</td>
                      <td style={{ padding: "12px" }}>Managed K8s</td>
                      <td style={{ padding: "12px" }}>$0.10/hr</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "12px" }}>Worker Nodes (EC2)</td>
                      <td style={{ padding: "12px" }}>2x t3.medium</td>
                      <td style={{ padding: "12px" }}>$0.0832/hr ($0.0416 ea)</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "12px" }}>Load Balancer</td>
                      <td style={{ padding: "12px" }}>Classic/Network LB</td>
                      <td style={{ padding: "12px" }}>~$0.0225/hr</td>
                    </tr>
                    <tr style={{ backgroundColor: "var(--g-accent-glow)" }}>
                      <td style={{ padding: "12px", fontWeight: "bold", color: "var(--g-accent)" }}>Grand Total (for 1 hour)</td>
                      <td style={{ padding: "12px" }}></td>
                      <td style={{ padding: "12px", fontWeight: "bold", color: "var(--g-accent)" }}>~$0.205</td>
                    </tr>
                  </tbody>
                </table>

                <p>To begin, configure your environment to make the code blocks accurate.</p>

                <div className="var-config-box" style={configBoxStyle}>
                  <h4 style={{ margin: "0 0 16px 0", color: "var(--g-text-bright)" }}>⚙️ Your Environment Variables</h4>
                  
                  <div className="var-row" style={varRowStyle}>
                    <label style={labelStyle}>AWS Region</label>
                    <input 
                      type="text" 
                      name="awsRegion" 
                      value={vars.awsRegion} 
                      onChange={handleVarChange}
                      style={inputStyle} 
                    />
                  </div>
                  
                  <div className="var-row" style={varRowStyle}>
                    <label style={labelStyle}>Cluster Name</label>
                    <input 
                      type="text" 
                      name="clusterName" 
                      value={vars.clusterName} 
                      onChange={handleVarChange}
                      style={inputStyle} 
                    />
                  </div>

                  <div className="var-row" style={varRowStyle}>
                    <label style={labelStyle}>GitHub Repo URL</label>
                    <input 
                      type="text" 
                      name="githubRepo" 
                      value={vars.githubRepo} 
                      onChange={handleVarChange}
                      style={inputStyle} 
                    />
                  </div>

                  <button 
                    onClick={applyVariables}
                    style={{
                      backgroundColor: applyButtonColor,
                      color: "#000000",
                      border: "none",
                      padding: "10px 20px",
                      borderRadius: "6px",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                  >
                    {applyButtonText}
                  </button>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="gitops-config" />
                      <label htmlFor="gitops-config">Configured variables and applied them to code blocks</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage1":
            return (
              <div>
                <h2>Stage 1: EKS & ArgoCD Setup</h2>
                <p className="guide-subtitle">Creating the cluster and installing the GitOps controller.</p>

                <h3>1. Provision the AWS EKS Cluster</h3>
                <p>We use <code>eksctl</code> to spin up a Kubernetes cluster. <em>(Takes ~15 minutes).</em></p>
                
                <CodeBlock 
                  title="WSL Terminal"
                  code={`eksctl create cluster \\
  --name ${appliedVars.clusterName} \\
  --region ${appliedVars.awsRegion} \\
  --nodegroup-name standard-workers \\
  --node-type t3.medium \\
  --nodes 2 \\
  --managed`}
                />

                <h3>2. Install ArgoCD</h3>
                <p>ArgoCD runs inside your cluster. We install it by applying its official manifest directly.</p>
                
                <CodeBlock 
                  title="WSL Terminal"
                  code={`# Create a dedicated namespace for ArgoCD
kubectl create namespace argocd

# Install the ArgoCD controllers
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml`}
                />

                <h3>3. Access the ArgoCD Dashboard</h3>
                <p>By default, ArgoCD is not exposed to the public internet. We port-forward it locally.</p>
                
                <CodeBlock 
                  title="WSL Terminal"
                  code="kubectl port-forward svc/argocd-server -n argocd 8080:443"
                />
                <p>
                  Open <strong>https://localhost:8080</strong> in your browser.<br />
                  (Chrome will show a warning about self-signed certificate. Click Advanced &rarr; Proceed).
                </p>

                <h3>4. Get the Admin Password</h3>
                <p>ArgoCD auto-generates a secure password and stores it as a Kubernetes Secret.</p>
                
                <CodeBlock 
                  title="WSL Terminal (New tab)"
                  code='kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d; echo'
                />
                <p>Log in with the username: <code>admin</code> and the password printed above.</p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="gitops-eks-up" />
                      <label htmlFor="gitops-eks-up">EKS cluster provisioned successfully via eksctl</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="gitops-argocd-install" />
                      <label htmlFor="gitops-argocd-install">Installed ArgoCD controllers in cluster</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="gitops-argocd-login" />
                      <label htmlFor="gitops-argocd-login">Retrieved secret and logged into ArgoCD Dashboard</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage2":
            return (
              <div>
                <h2>Stage 2: Application Manifests</h2>
                <p className="guide-subtitle">Pushing the desired state to GitHub.</p>

                <p>For GitOps to work, you need a repository containing the Kubernetes YAML files that describe your application. ArgoCD will watch these.</p>

                <h3>1. Create the GitHub Repository</h3>
                <p>
                  Create a public GitHub repository. This should match the URL you entered: <code>{appliedVars.githubRepo}</code>
                </p>

                <h3>2. The Web Application Deployment</h3>
                <p>Create a folder locally, write this file, and push it to the repo.</p>

                <CodeBlock 
                  title="deployment.yaml"
                  code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: gitops-webapp
  labels:
    app: gitops-webapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: gitops-webapp
  template:
    metadata:
      labels:
        app: gitops-webapp
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
        ports:
        - containerPort: 80`}
                />

                <h3>3. The LoadBalancer Service</h3>
                <p>Expose the Nginx pods to the internet via an AWS Load Balancer.</p>

                <CodeBlock 
                  title="service.yaml"
                  code={`apiVersion: v1
kind: Service
metadata:
  name: gitops-webapp-svc
spec:
  type: LoadBalancer
  selector:
    app: gitops-webapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80`}
                />

                <ConceptBox title="🔍 Code Explanation: Kubernetes YAMLs">
                  <ul style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                    <li style={{ marginBottom: "8px" }}><strong>Deployment (replicas: 3):</strong> We tell Kubernetes we want exactly 3 identical copies (Pods) of our Nginx web server running at all times. If one crashes, K8s automatically spins up a replacement.</li>
                    <li style={{ margin: 0 }}><strong>Service (type: LoadBalancer):</strong> Because Pods constantly die and get new IP addresses, we cannot link users directly to them. This Service creates a static AWS Load Balancer that distributes traffic across the 3 Pods.</li>
                  </ul>
                </ConceptBox>

                <div className="g-error-card" style={{ backgroundColor: "rgba(210, 153, 34, 0.08)", borderColor: "var(--g-yellow)" }}>
                  <h4 style={{ color: "var(--g-yellow)" }}>⚠️ CRITICAL RULE</h4>
                  <p style={{ margin: 0, fontSize: "0.95rem" }}>
                    Do NOT run <code>kubectl apply -f deployment.yaml</code>. The whole point of GitOps is that you never run kubectl manually. Commit these files to GitHub, and we will let ArgoCD do the rest.
                  </p>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="gitops-repo" />
                      <label htmlFor="gitops-repo">GitHub repo created and matches variable settings</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="gitops-manifests" />
                      <label htmlFor="gitops-manifests">Pushed deployment.yaml and service.yaml to the repository</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage3":
            return (
              <div>
                <h2>Stage 3: The GitOps Magic</h2>
                <p className="guide-subtitle">Connecting ArgoCD to GitHub.</p>

                <ConceptBox title="🎯 The Interview Answer:">
                  <p style={{ margin: 0 }}>
                    &quot;Instead of running kubectl commands, I wrote an ArgoCD <code>Application.yaml</code> manifest. This file tells the ArgoCD controller inside EKS to constantly poll our GitHub repository every 3 minutes. If the YAML in GitHub differs from what is running in the cluster (for example, if a developer changed the replicas from 3 to 5), ArgoCD automatically triggers a sync to make the cluster match GitHub.&quot;
                  </p>
                </ConceptBox>

                <h3>The ArgoCD Application Manifest</h3>
                <p>This is the ONLY file you manually apply to the cluster. This wires everything together.</p>

                <CodeBlock 
                  title="argocd-app.yaml"
                  code={`apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: my-gitops-app
  namespace: argocd
spec:
  project: default
  source:
    repoURL: '${appliedVars.githubRepo}'
    targetRevision: HEAD
    path: . # Look for YAML files in the root of the repo
  destination:
    server: 'https://kubernetes.default.svc'
    namespace: default
  syncPolicy:
    automated:
      prune: true    # Automatically delete resources if removed from Git
      selfHeal: true # Automatically fix resources if someone manually edits them via kubectl`}
                />

                <ConceptBox title="🔍 Code Explanation: The GitOps Magic">
                  <ul style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                    <li style={{ marginBottom: "8px" }}><strong>source.repoURL:</strong> This points the ArgoCD controller directly at your GitHub repository.</li>
                    <li style={{ marginBottom: "8px" }}><strong>destination:</strong> This tells ArgoCD to deploy the code into the same Kubernetes cluster that ArgoCD is currently living inside.</li>
                    <li style={{ margin: 0 }}><strong>syncPolicy (automated):</strong> This is the holy grail. It means ArgoCD will constantly poll GitHub. If it sees a manual change in K8s (e.g. someone ran a rogue <code>kubectl</code> command), <code>selfHeal: true</code> immediately overrides it and reverts the cluster back to the state defined in GitHub.</li>
                  </ul>
                </ConceptBox>

                <h3>Kick off the Magic</h3>
                <CodeBlock 
                  title="WSL Terminal"
                  code="kubectl apply -f argocd-app.yaml"
                />

                <p>
                  Now, go back to your browser (https://localhost:8080). You will see your application pop up. It will start spinning up the Nginx Pods and the LoadBalancer automatically! If you change <code>replicas: 3</code> to <code>replicas: 10</code> in GitHub, ArgoCD will immediately spin up 7 more pods.
                </p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="gitops-app-applied" />
                      <label htmlFor="gitops-app-applied">Applied argocd-app.yaml manifest to local kubectl context</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="gitops-app-verify" />
                      <label htmlFor="gitops-app-verify">Verified ArgoCD UI shows synced healthy state</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "errors":
            return (
              <div>
                <h2>Real-World Debugging</h2>
                <p className="guide-subtitle">Troubleshooting a GitOps environment.</p>

                <h3>1. ArgoCD Status: OutOfSync</h3>
                <ErrorCard 
                  error="App remains OutOfSync and won't deploy"
                  meaning="You pushed valid YAML to GitHub, but ArgoCD shows a yellow 'OutOfSync' badge."
                  fix="If you are using a Private GitHub repository, ArgoCD cannot read it. You must go into the ArgoCD UI -> Settings -> Repositories, and add an SSH Key or GitHub Personal Access Token so ArgoCD has permission to pull your private repo."
                />

                <h3>2. Configuration Drift</h3>
                <ErrorCard 
                  error="Scenario: A developer manually edited a pod via kubectl."
                  meaning="Developer bypassed GitOps processes."
                  fix="Because we set selfHeal: true in our Application.yaml, ArgoCD immediately notices that the cluster state differs from the GitHub state. ArgoCD will instantly override the developer's manual change and revert the cluster back to match GitHub. This is why GitOps is so powerful."
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="gitops-errors-read" />
                      <label htmlFor="gitops-errors-read">I understand private repo setups and selfHeal behaviors</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "chaos":
            return (
              <div>
                <h2>🔥 Test Your Knowledge (Chaos Engine)</h2>
                <p className="guide-subtitle">GitOps is designed to survive chaos. Let&apos;s prove it.</p>

                <TipBox>
                  <strong>How it works:</strong> Click the button below to generate a random &quot;Chaos Scenario&quot;. Run the command to break your Kubernetes cluster. See how GitOps reacts.
                </TipBox>

                <div style={{ display: "flex", justifyContent: "center", margin: "40px 0" }}>
                  <button 
                    onClick={generateChaos}
                    style={{
                      backgroundColor: "var(--g-red)",
                      color: "#ffffff",
                      border: "none",
                      padding: "14px 28px",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(248, 81, 73, 0.4)",
                      transition: "all 0.2s"
                    }}
                  >
                    💥 Generate Cluster Outage
                  </button>
                </div>

                {chaosScenario && (
                  <div className="chaos-card" style={{ display: "block", border: "1px solid rgba(248,81,73,0.3)", backgroundColor: "rgba(248,81,73,0.02)", padding: "24px", borderRadius: "8px", marginTop: "24px" }}>
                    <h3 style={{ color: "var(--g-red)", marginTop: 0, border: "none" }}>{chaosScenario.title}</h3>
                    <p><strong>🚨 The Symptom:</strong> {chaosScenario.symptom}</p>
                    
                    <p style={{ marginTop: "24px", marginBottom: "8px" }}><strong>Run this command to sabotage your cluster:</strong></p>
                    <CodeBlock title="WSL Terminal" code={chaosScenario.command} />
                    
                    <button 
                      onClick={() => setShowChaosSolution(!showChaosSolution)}
                      style={{
                        background: "transparent",
                        border: "1px solid var(--g-border)",
                        color: "var(--g-text)",
                        padding: "8px 16px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        marginTop: "16px"
                      }}
                    >
                      {showChaosSolution ? "👀 Hide Explanation" : "👀 What just happened?"}
                    </button>
                    
                    {showChaosSolution && (
                      <div className="chaos-solution" style={{ display: "block", borderLeft: "4px solid var(--g-green)", backgroundColor: "var(--g-surface)", padding: "16px", marginTop: "16px", borderRadius: "0 8px 8px 0" }}>
                        <h4 style={{ color: "var(--g-green)", marginBottom: "12px", marginTop: 0 }}>✅ The GitOps Solution</h4>
                        <p>{chaosScenario.explanation}</p>
                        <CodeBlock title="WSL Terminal" code={chaosScenario.fixCommand} />
                      </div>
                    )}
                  </div>
                )}

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="gitops-chaos-tested" />
                      <label htmlFor="gitops-chaos-tested">Tested both chaos scenarios and read explanations</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "destroy":
            return (
              <div>
                <h2>🗑️ Destroy AWS Resources</h2>
                <p className="guide-subtitle">Protecting your AWS Credits.</p>

                <p>You used <code>eksctl</code> to create the EKS cluster. EKS costs roughly $72/month just to sit idle. You must destroy it.</p>

                <h3>The Teardown Command</h3>
                <CodeBlock 
                  title="WSL Terminal"
                  code={`eksctl delete cluster --name ${appliedVars.clusterName} --region ${appliedVars.awsRegion}`}
                />

                <h3>Manual Verification</h3>
                <p>If ArgoCD created an AWS LoadBalancer for your Nginx app, sometimes K8s fails to delete it before the cluster goes down. <strong>Always check manually:</strong></p>
                <ol style={{ marginLeft: "20px", marginBottom: "24px" }}>
                  <li>Go to the AWS Console.</li>
                  <li>Open the EC2 Dashboard.</li>
                  <li>Click &quot;Load Balancers&quot; on the left.</li>
                  <li>Ensure there are no stray Load Balancers costing you money.</li>
                </ol>

                <div style={{ textAlign: "center", margin: "64px 0", padding: "40px", backgroundColor: "var(--g-accent-glow)", borderRadius: "12px", border: "1px solid var(--g-accent)" }}>
                  <h3 style={{ color: "var(--g-accent)", margin: "0 0 16px 0" }}>🎓 Project 2 Complete!</h3>
                  <p style={{ fontSize: "1.1rem", margin: 0 }}>
                    You successfully implemented a modern GitOps pipeline using EKS and ArgoCD.<br />
                    You are ready to deploy production Kubernetes.
                  </p>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="gitops-deleted" />
                      <label htmlFor="gitops-deleted">Tore down EKS cluster and verified no stray load balancers remain in AWS Console</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "interview":
            return (
              <div>
                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "0 0 32px" }}>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, var(--g-border), transparent)" }} />
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--g-text-muted)" }}>Interview Preparation</span>
                  <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, var(--g-border), transparent)" }} />
                </div>

                <h2>🎙️ Interview Q&A: K8s GitOps Platform</h2>
                <p className="guide-subtitle">GitOps is a senior-level topic. Nailing these questions proves you understand modern cloud-native architectures.</p>

                {[
                  {
                    q: "Q1. What exactly is GitOps, and why is it better than standard CI/CD?",
                    a: "GitOps is an operating model where a Git repository is the Single Source of Truth for your infrastructure and applications. In standard CI/CD, Jenkins \"pushes\" deployments into the cluster via `kubectl apply`. In GitOps, an agent like ArgoCD lives inside the cluster and \"pulls\" the desired state from Git.",
                    tip: "Mention that this removes the need to give Jenkins direct admin access to the Kubernetes cluster, making it significantly more secure."
                  },
                  {
                    q: "Q2. What happens if a developer logs into the cluster and manually deletes a pod?",
                    a: "If ArgoCD is configured with `selfHeal: true`, it will detect the \"Configuration Drift\" (the cluster state no longer matches the Git state). ArgoCD will instantly reconcile the difference by spinning the pod back up to ensure the cluster strictly matches what is in GitHub."
                  },
                  {
                    q: "Q3. What is the difference between a Kubernetes Deployment and a StatefulSet?",
                    a: "A Deployment is used for stateless applications (like a React frontend or Node.js web server) where the pods are completely interchangeable and can be killed/restarted randomly. A StatefulSet is used for stateful applications (like PostgreSQL or MongoDB) where pods require persistent storage, ordered scaling, and stable network identifiers (e.g., db-0, db-1)."
                  },
                  {
                    q: "Q4. How do you handle Kubernetes Secrets in a GitOps workflow? You can't put plain passwords in GitHub, right?",
                    a: "Exactly, you never commit plain Base64 Kubernetes secrets to Git. To solve this, I use Sealed Secrets (Bitnami) or External Secrets Operator. External Secrets allows K8s to fetch passwords dynamically from AWS Secrets Manager at runtime, keeping the Git repository completely free of sensitive data."
                  },
                  {
                    q: "Q5. Your pod is stuck in \"CrashLoopBackOff\". How do you debug it?",
                    a: "CrashLoopBackOff means the container starts, immediately crashes, and Kubernetes keeps trying to restart it. First, I run `kubectl logs <pod-name> --previous` to see the application crash logs. If the logs are empty, I run `kubectl describe pod <pod-name>` and check the \"Events\" section at the bottom for issues like missing ConfigMaps, OOMKilled (Out of Memory), or bad readiness probes."
                  }
                ].map((item, i) => (
                  <div key={i} style={{
                    background: "var(--g-surface)", border: "1px solid var(--g-border)",
                    borderRadius: "12px", padding: "20px 24px", marginBottom: "16px"
                  }}>
                    <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--g-text-bright)", marginBottom: "12px", display: "flex", gap: "10px" }}>
                      <span style={{ color: "var(--g-accent)" }}>{item.q.split('.')[0]}.</span>
                      <span>{item.q.split('.').slice(1).join('.')}</span>
                    </div>
                    <div style={{ color: "var(--g-text-muted)", fontSize: "0.88rem", paddingLeft: "36px", lineHeight: 1.7 }}>
                      <p><strong>Answer:</strong> {item.a}</p>
                      {item.tip && (
                        <p style={{ color: "#86efac", fontStyle: "italic", marginTop: "8px" }}>
                          <em>Pro Tip: {item.tip}</em>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          default:
            return null;
        }
      }}
    </GuideWrapper>
  );
}

// Custom styles
const configBoxStyle = {
  backgroundColor: "var(--g-surface)",
  border: "1px solid var(--g-border)",
  borderRadius: "8px",
  padding: "24px",
  margin: "24px 0"
};

const varRowStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "12px",
  marginBottom: "16px"
};

const labelStyle = {
  width: "140px",
  fontWeight: "600",
  color: "var(--g-text-muted)",
  fontSize: "0.95rem"
};

const inputStyle = {
  flex: 1,
  maxWidth: "300px",
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid var(--g-border)",
  backgroundColor: "#090c10",
  color: "#ffffff",
  outline: "none"
};
