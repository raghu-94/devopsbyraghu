"use client";

import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox, TipBox, WarningBox, ErrorCard, Quiz } from "@/components/guide/GuideComponents";

export default function KubernetesMastery() {
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
        { id: "lab1", title: "Lab 1: K8s Architecture" },
        { id: "lab2", title: "Lab 2: Minikube vs AWS EKS" },
        { id: "lab3", title: "Lab 3: The kubectl CLI" },
        { id: "lab4", title: "Lab 4: Pods" },
        { id: "lab5", title: "Lab 5: Deployments & Scaling" },
        { id: "lab6", title: "Lab 6: Capstone (Self-Healing)" }
      ]
    },
    {
      title: "Stage 2: Networking",
      items: [
        { id: "lab7", title: "Lab 7: ClusterIP" },
        { id: "lab8", title: "Lab 8: NodePort" },
        { id: "lab9", title: "Lab 9: LoadBalancer" },
        { id: "lab10", title: "Lab 10: Ingress Controllers" },
        { id: "lab11", title: "Lab 11: Capstone (Routing)" }
      ]
    },
    {
      title: "Stage 3: Storage",
      items: [
        { id: "lab12", title: "Lab 12: ConfigMaps" },
        { id: "lab13", title: "Lab 13: Secrets" },
        { id: "lab14", title: "Lab 14: PV & PVCs" },
        { id: "lab15", title: "Lab 15: Capstone (Postgres)" }
      ]
    },
    {
      title: "Stage 4: Advanced",
      items: [
        { id: "lab16", title: "Lab 16: StatefulSets" },
        { id: "lab17", title: "Lab 17: DaemonSets" },
        { id: "lab18", title: "Lab 18: Helm Charts" },
        { id: "lab19", title: "Lab 19: Blue/Green Updates" },
        { id: "lab20", title: "Lab 20: Capstone (E-Commerce)" }
      ]
    },
    {
      title: "Stage 5: Production",
      items: [
        { id: "lab21", title: "Lab 21: RBAC Security" },
        { id: "lab22", title: "Lab 22: Resource Quotas" },
        { id: "lab23", title: "Lab 23: Network Policies" },
        { id: "lab24", title: "Lab 24: Cluster Autoscaler" },
        { id: "lab25", title: "Lab 25: Capstone (Audit)" }
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
      title="Kubernetes Mastery Guide" 
      subtitle="The ultimate 5-stage interactive guide for mastering cluster orchestration."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case "overview":
            return (
              <div>
                <h2>Kubernetes Mastery: Beginner to Expert</h2>
                <p className="guide-subtitle">Understand the roadmap and setup requirements.</p>
                
                <ConceptBox title="Why Kubernetes?">
                  <p style={{ margin: 0 }}>
                    Docker is great for running 3 containers on your laptop. But what happens when you need to run 5,000 containers across 200 servers? If a server dies, who restarts the containers? If traffic spikes, who scales them up? <strong>Kubernetes (K8s)</strong> is the &quot;Operating System&quot; for the cloud that automates deployment, scaling, and management of containerized applications.
                  </p>
                </ConceptBox>

                <h3>💰 Cost & Infrastructure Options</h3>
                <p>You can complete this entire course for <strong>100% Free</strong>. Choose your path:</p>

                <TipBox>
                  <strong>Option A: Local Development (Free)</strong><br />
                  Run a mini-cluster entirely on your Windows laptop using WSL2 and <code>minikube</code>. This costs $0 and is perfect for learning without worrying about AWS bills.
                </TipBox>

                <WarningBox>
                  <strong>Option B: AWS EKS Cloud (Using AWS Credits)</strong><br />
                  Use AWS credits to spin up a real, production-grade <strong>Elastic Kubernetes Service (EKS)</strong> cluster. EKS costs roughly $72/month for the control plane + EC2 worker nodes. If you use this option, you MUST use the &quot;Destroy Resources&quot; guide at the end of the day.
                </WarningBox>

                <h3>🛠️ Prerequisites — Install These First (WSL Setup)</h3>
                
                <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "24px 0" }}>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>1</div>
                    <div>
                      <strong>Docker Desktop & WSL2:</strong>
                      <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--g-text-muted)" }}>You must have Docker running in your WSL Ubuntu terminal first.</p>
                    </div>
                  </div>
                  
                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>2</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Install kubectl (The K8s Controller):</strong>
                      <CodeBlock 
                        title="WSL Terminal"
                        code={`curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"\nsudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl\nkubelet version --client`}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>3</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Install Minikube (Option A only):</strong>
                      <CodeBlock 
                        title="WSL Terminal"
                        code={`curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64\nsudo install minikube-linux-amd64 /usr/local/bin/minikube`}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px" }}>
                    <div style={{ minWidth: "24px", height: "24px", borderRadius: "50%", backgroundColor: "var(--g-accent)", color: "#000", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.85rem" }}>4</div>
                    <div style={{ flexGrow: 1 }}>
                      <strong>Install eksctl (Option B only):</strong>
                      <CodeBlock 
                        title="WSL Terminal"
                        code={`curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp\nsudo mv /tmp/eksctl /usr/local/bin`}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-prereq-kubectl" />
                      <label htmlFor="k8s-prereq-kubectl">Installed kubectl CLI tool</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-prereq-cluster" />
                      <label htmlFor="k8s-prereq-cluster">Installed Minikube or eksctl</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab1":
            return (
              <div>
                <h2>Lab 1: K8s Architecture</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | The Control Plane and Worker Nodes</p>

                <ConceptBox title="The Control Plane & Worker Nodes">
                  <p>Kubernetes operates on a Master/Slave architecture (now called Control Plane / Worker Nodes).</p>
                  <ul style={{ marginLeft: "20px" }}>
                    <li><strong>Control Plane (The Brain):</strong> Contains the API Server, Scheduler, and etcd (the database of state). You never run your apps here.</li>
                    <li><strong>Worker Nodes (The Muscle):</strong> Standard Linux VMs (like AWS EC2) that run your Docker containers (called Pods in K8s).</li>
                    <li><strong>Kubelet:</strong> The K8s agent installed on every Worker Node that talks to the Control Plane.</li>
                  </ul>
                </ConceptBox>

                <Quiz 
                  question="If a Worker Node crashes, what happens to your app?"
                  answer="The Control Plane detects the node failure. It immediately reschedules the Pods onto healthy Worker Nodes. Your app experiences zero downtime if you have multiple replicas."
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l1-arch" />
                      <label htmlFor="k8s-l1-arch">I understand the difference between Control Plane and Worker Nodes</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab2":
            return (
              <div>
                <h2>Lab 2: Minikube vs AWS EKS</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Starting the engines</p>

                <p>You need a cluster to play with. Pick ONE of the options below.</p>

                <h3>Option A: Minikube (Local, Free)</h3>
                <p>This creates a 1-node Kubernetes cluster running inside a Docker container on your laptop.</p>
                <CodeBlock 
                  title="WSL Terminal"
                  code={`# Start the cluster\nminikube start --driver=docker\n\n# Verify it's running\nkubectl get nodes`}
                />

                <h3>Option B: AWS EKS (Cloud, Costs $)</h3>
                <p>This provisions a real, production-ready cluster in AWS with 2 t3.medium EC2 worker nodes.</p>
                <CodeBlock 
                  title="WSL Terminal"
                  code={`# Create cluster in us-east-1 (Takes ~15 mins)\neksctl create cluster \\\n  --name my-eks-cluster \\\n  --region us-east-1 \\\n  --nodegroup-name standard-workers \\\n  --node-type t3.medium \\\n  --nodes 2 \\\n  --nodes-min 1 \\\n  --nodes-max 3 \\\n  --managed\n\n# Verify connection\nkubectl get nodes`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l2-start" />
                      <label htmlFor="k8s-l2-start">Booted a working cluster and ran kubectl get nodes</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab3":
            return (
              <div>
                <h2>Lab 3: The kubectl CLI</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | The Remote Control</p>

                <ConceptBox title="The Universal Tool">
                  <p style={{ margin: 0 }}>
                    <code>kubectl</code> (pronounced Kube-Control) is the only tool you need to manage a cluster. It communicates directly with the Control Plane&apos;s API server.
                  </p>
                </ConceptBox>

                <h3>The 3 commands you will type 100 times a day</h3>
                <CodeBlock 
                  title="WSL Terminal"
                  code={`# 1. See everything running in your default namespace\nkubectl get all\n\n# 2. Describe a specific resource to find out why it's failing\n# kubectl describe <type> <name>\nkubectl describe node minikube\n\n# 3. Get detailed logs from a specific container\n# kubectl logs <pod_name>`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l3-cmd" />
                      <label htmlFor="k8s-l3-cmd">Ran get, describe, and logs help commands in the terminal</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab4":
            return (
              <div>
                <h2>Lab 4: Pods</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | The atomic unit</p>

                <ConceptBox title="Why Pods and not Containers?">
                  <p style={{ margin: 0 }}>
                    Kubernetes does not run Docker containers directly. It wraps containers in a higher-level structure called a <strong>Pod</strong>. A Pod usually contains exactly 1 container, but it CAN contain multiple containers that share the exact same IP address and storage (like a main app container and a logging sidecar container).
                  </p>
                </ConceptBox>

                <h3>Running a naked Pod</h3>
                <CodeBlock 
                  title="WSL Terminal"
                  code={`# Imperative way (CLI only)\nkubectl run my-nginx --image=nginx:alpine\n\n# See it running\nkubectl get pods\n\n# Expose port 80 to localhost:8080\nkubectl port-forward pod/my-nginx 8080:80`}
                />
                <p style={{ fontSize: "0.9rem", color: "var(--g-text-muted)" }}><em>Open http://localhost:8080 in Chrome to see Nginx!</em></p>

                <ErrorCard 
                  error='Real-World Problem: "Never use naked pods"'
                  meaning="You deployed my-nginx directly. The Worker Node crashes."
                  fix="The Pod dies permanently. Naked pods are NOT self-healing. In production, you must NEVER deploy a Pod directly. You must deploy a Deployment."
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l4-naked" />
                      <label htmlFor="k8s-l4-naked">Deployed my-nginx pod and checked localhost:8080</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab5":
            return (
              <div>
                <h2>Lab 5: Deployments & Scaling</h2>
                <p className="guide-subtitle">Stage 1 — Foundations | Self-healing architecture</p>

                <ConceptBox title="The Deployment Controller">
                  <p style={{ margin: 0 }}>
                    A Deployment wraps a Pod. You tell the Deployment &quot;I want 3 replicas of Nginx&quot;. The Deployment creates a ReplicaSet, which ensures exactly 3 pods exist at all times. If you manually delete one, the ReplicaSet instantly creates a new one to replace it.
                  </p>
                </ConceptBox>

                <h3>Declarative Infrastructure (YAML)</h3>
                <p>In K8s, we write declarative YAML files instead of using CLI commands to create resources.</p>

                <CodeBlock 
                  title="nginx-deploy.yaml"
                  code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: nginx
        image: nginx:alpine
        ports:
        - containerPort: 80`}
                />

                <ConceptBox title="🔍 Code Explanation: Deployment YAML">
                  <ul style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                    <li style={{ marginBottom: "8px" }}><strong>replicas: 3:</strong> The target state. K8s will ensure exactly 3 instances of this Pod run across worker nodes.</li>
                    <li style={{ marginBottom: "8px" }}><strong>selector.matchLabels:</strong> K8s counts how many pods match <code>app: web</code> to maintain the desired count.</li>
                    <li style={{ margin: 0 }}><strong>template:</strong> The Pod blueprint. Defines image pulls and container port exposes.</li>
                  </ul>
                </ConceptBox>

                <h3>Apply the Deployment</h3>
                <CodeBlock 
                  title="WSL Terminal"
                  code={`# Apply the file\nkubectl apply -f nginx-deploy.yaml\n\n# Check deployments and pods\nkubectl get deployments\nkubectl get pods`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l5-deploy" />
                      <label htmlFor="k8s-l5-deploy">Created and applied nginx-deploy.yaml successfully</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab6":
            return (
              <div>
                <h2>Lab 6: Capstone — Self-Healing</h2>
                <p className="guide-subtitle">Stage 1 — Capstone Project | Prove it works</p>

                <p>You have 3 Nginx pods running. Let&apos;s prove that Kubernetes is truly self-healing by acting like a chaotic monkey.</p>

                <h3>The Chaos Test</h3>
                <CodeBlock 
                  title="WSL Terminal"
                  code={`# 1. Get the exact names of your 3 pods\nkubectl get pods\n\n# 2. Delete ONE of the pods aggressively\n# (Replace <pod-name> with the real name)\nkubectl delete pod <pod-name>\n\n# 3. Immediately check the pods again\nkubectl get pods`}
                />
                <p>
                  <strong>Result:</strong> You will see the deleted pod is &quot;Terminating&quot;, and a brand new pod with a different random ID is already &quot;ContainerCreating&quot; or &quot;Running&quot; to restore the count to 3.
                </p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 1 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c1-c1" />
                      <label htmlFor="k8s-c1-c1">Started a K8s cluster (Minikube or EKS)</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c1-c2" />
                      <label htmlFor="k8s-c1-c2">Executed kubectl get nodes to verify connection</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c1-c3" />
                      <label htmlFor="k8s-c1-c3">Ran a naked Pod and exposed it with port-forward</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c1-c4" />
                      <label htmlFor="k8s-c1-c4">Written a declarative Deployment YAML file</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c1-c5" />
                      <label htmlFor="k8s-c1-c5">Deleted a Pod and watched K8s automatically recreate it</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab7":
            return (
              <div>
                <h2>Lab 7: ClusterIP Services</h2>
                <p className="guide-subtitle">Stage 2 — Networking | Internal Microservice DNS</p>

                <ConceptBox title="The Moving Target Problem">
                  <p style={{ margin: 0 }}>
                    If you have 3 API pods, each has its own IP address. If a pod dies, the ReplicaSet creates a new one with a <strong>different IP</strong>. Your frontend cannot hardcode these IPs. A <strong>Service</strong> fixes this by providing a single, stable IP and DNS name that load-balances traffic to the underlying pods.
                  </p>
                </ConceptBox>

                <h3>The default: ClusterIP</h3>
                <p>A ClusterIP service is ONLY accessible from inside the cluster. It&apos;s perfect for databases or backend APIs.</p>

                <CodeBlock 
                  title="api-service.yaml"
                  code={`apiVersion: v1
kind: Service
metadata:
  name: backend-api
spec:
  type: ClusterIP
  selector:
    app: web   # This must EXACTLY match the labels on your Pods!
  ports:
    - port: 80      # The port the Service listens on
      targetPort: 80  # The port your Pods are listening on`}
                />

                <CodeBlock 
                  title="WSL Terminal"
                  code={`kubectl apply -f api-service.yaml\nkubectl get svc`}
                />
                <p style={{ fontSize: "0.9rem", color: "var(--g-text-muted)" }}>
                  <em>Any pod in the cluster can now send an HTTP request to <code>http://backend-api</code> and K8s will route it to one of your 3 Nginx pods.</em>
                </p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l7-svc" />
                      <label htmlFor="k8s-l7-svc">Created and applied ClusterIP service</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab8":
            return (
              <div>
                <h2>Lab 8: NodePort Services</h2>
                <p className="guide-subtitle">Stage 2 — Networking | Opening a hole in the firewall</p>

                <p>ClusterIPs are internal. How do you, sitting on your laptop, access the app? One quick and dirty way is a <strong>NodePort</strong>.</p>

                <ConceptBox title="What is a NodePort?">
                  <p style={{ margin: 0 }}>
                    K8s opens a high port (between 30000-32767) on EVERY worker node&apos;s IP address and routes traffic from that port to your service.
                  </p>
                </ConceptBox>

                <CodeBlock 
                  title="WSL Terminal"
                  code={`# Change type of existing service on the fly\nkubectl patch svc backend-api -p '{"spec": {"type": "NodePort"}}'\n\n# Check the assigned port\nkubectl get svc backend-api`}
                />
                <p>Look at the output. You will see something like <code>80:31456/TCP</code>. The 31456 is the NodePort.</p>

                <ErrorCard 
                  error='Real-World Problem: "NodePorts are not for Production"'
                  meaning="You use a NodePort and tell your users to visit http://your-ip:31456."
                  fix="Users don't type ports in the browser. If that node crashes, the IP changes. NodePorts are strictly for testing. For production, you need a LoadBalancer or Ingress."
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l8-nodeport" />
                      <label htmlFor="k8s-l8-nodeport">Patched service to NodePort and verified assigned high port</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab9":
            return (
              <div>
                <h2>Lab 9: LoadBalancer Services</h2>
                <p className="guide-subtitle">Stage 2 — Networking | AWS integration</p>

                <p>If you are using AWS EKS, you can ask Kubernetes to talk to AWS and automatically provision a real AWS Elastic Load Balancer (ELB).</p>

                <CodeBlock 
                  title="WSL Terminal"
                  code={`# Change the type to LoadBalancer\nkubectl patch svc backend-api -p '{"spec": {"type": "LoadBalancer"}}\'\n\n# Get the AWS DNS Name\nkubectl get svc backend-api`}
                />
                <p>Look at the <code>EXTERNAL-IP</code> column. If on EKS, it will show a long AWS hostname (e.g. <code>a1b2c3d4...elb.amazonaws.com</code>).</p>

                <ErrorCard 
                  error='Real-World Problem: "My AWS bill is huge!"'
                  meaning="You create 20 LoadBalancer services for 20 microservices. AWS charges you ~$20/month per LoadBalancer."
                  fix="Never use LoadBalancer for individual microservices. Keep them as ClusterIP, and use a single Ingress Controller to route traffic."
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l9-lb" />
                      <label htmlFor="k8s-l9-lb">Patched service to LoadBalancer type</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab10":
            return (
              <div>
                <h2>Lab 10: Ingress Controllers</h2>
                <p className="guide-subtitle">Stage 2 — Networking | The ultimate router</p>

                <ConceptBox title="One Router to Rule Them All">
                  <p style={{ margin: 0 }}>
                    An Ingress acts like an Nginx reverse proxy. You provision ONE AWS LoadBalancer, and the Ingress looks at the URL path to decide where to send the traffic (e.g., <code>/api</code> goes to the backend service, <code>/</code> goes to the frontend service).
                  </p>
                </ConceptBox>

                <h3>Step 1: Install the Nginx Ingress Controller</h3>
                <p>Before you can use Ingress resources, you must install the controller into your cluster.</p>
                <CodeBlock 
                  title="WSL Terminal"
                  code={`# If using Minikube:\nminikube addons enable ingress\n\n# If using AWS EKS:\nkubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.2/deploy/static/provider/aws/deploy.yaml`}
                />

                <h3>Step 2: Create the Ingress Rule</h3>
                <CodeBlock 
                  title="ingress.yaml"
                  code={`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: main-ingress
spec:
  rules:
  - http:
      paths:
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-api
            port:
              number: 80`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l10-ingress" />
                      <label htmlFor="k8s-l10-ingress">Enabled ingress addon or installed controller in EKS</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab11":
            return (
              <div>
                <h2>Lab 11: Capstone — Production Routing</h2>
                <p className="guide-subtitle">Stage 2 — Capstone Project | Path-based routing</p>

                <p>You are deploying a full web application. You need:</p>
                <ul style={{ marginLeft: "20px" }}>
                  <li><code>/api</code> to route to your backend pods.</li>
                  <li><code>/</code> (everything else) to route to your frontend pods.</li>
                </ul>

                <h3>The Ultimate Ingress YAML</h3>
                <CodeBlock 
                  title="full-ingress.yaml"
                  code={`apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: startup-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  rules:
  - host: myapp.local
    http:
      paths:
      # 1. Route API traffic to the backend Service
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend-api-service
            port:
              number: 80
              
      # 2. Route all other traffic to the frontend Service
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-web-service
            port:
              number: 80`}
                />

                <ConceptBox title="🔍 Code Explanation: Path-Based Routing">
                  <ul style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                    <li style={{ marginBottom: "8px" }}><strong>annotations:</strong> Ingress Controllers require specific annotations to behave correctly. <code>rewrite-target: /</code> strips the <code>/api</code> from the URL before passing it to the backend Pod.</li>
                    <li style={{ marginBottom: "8px" }}><strong>path: /api:</strong> Any request to <code>http://myapp.local/api/...</code> is routed to the backend.</li>
                    <li style={{ margin: 0 }}><strong>path: /:</strong> The default catch-all routes users to the frontend.</li>
                  </ul>
                </ConceptBox>

                <CodeBlock 
                  title="WSL Terminal"
                  code="kubectl apply -f full-ingress.yaml"
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 2 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c2-c1" />
                      <label htmlFor="k8s-c2-c1">Understand that Pod IPs change, so you must use Services</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c2-c2" />
                      <label htmlFor="k8s-c2-c2">Create a ClusterIP service for internal DNS</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c2-c3" />
                      <label htmlFor="k8s-c2-c3">Expose a service using a NodePort for testing</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c2-c4" />
                      <label htmlFor="k8s-c2-c4">Understand why LoadBalancers get expensive in AWS</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c2-c5" />
                      <label htmlFor="k8s-c2-c5">Install an Nginx Ingress Controller and write path routing YAML</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab12":
            return (
              <div>
                <h2>Lab 12: ConfigMaps</h2>
                <p className="guide-subtitle">Stage 3 — Storage | Decoupling configuration from code</p>

                <ConceptBox title="The 12-Factor App">
                  <p style={{ margin: 0 }}>
                    You should never hardcode configuration (like database URLs or log levels) inside your Docker image. A <strong>ConfigMap</strong> stores plain-text configuration data. You can then inject this data into your Pods as Environment Variables or mounted files.
                  </p>
                </ConceptBox>

                <h3>Creating a ConfigMap</h3>
                <CodeBlock 
                  title="configmap.yaml"
                  code={`apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  LOG_LEVEL: "debug"
  DB_HOST: "postgres-service.database.svc.cluster.local"`}
                />

                <h3>Injecting into a Pod</h3>
                <CodeBlock 
                  title="deployment.yaml snippet"
                  code={`spec:\n  containers:\n  - name: my-app\n    image: my-app:latest\n    envFrom:\n    - configMapRef:\n        name: app-config`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l12-cm" />
                      <label htmlFor="k8s-l12-cm">Created configmap.yaml and mapped environment variables</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab13":
            return (
              <div>
                <h2>Lab 13: Secrets</h2>
                <p className="guide-subtitle">Stage 3 — Storage | Don&apos;t put passwords in GitHub</p>

                <p>Secrets are exactly like ConfigMaps, but they are designed to hold sensitive data like passwords or SSH keys.</p>

                <ErrorCard 
                  error='Real-World Problem: "Base64 is NOT Encryption"'
                  meaning="You commit a Secret file containing base64 encoded strings to GitHub."
                  fix="Anyone can decode base64 in 1 second. K8s secrets are ONLY to hide data from logs. In production, use HashiCorp Vault or AWS Secrets Manager."
                />

                <h3>Creating a basic Secret</h3>
                <CodeBlock 
                  title="WSL Terminal"
                  code={`# Safe way to create secrets dynamically without files\nkubectl create secret generic db-passwords \\\n  --from-literal=username=admin \\\n  --from-literal=password='SuperSecret123!'`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l13-secret" />
                      <label htmlFor="k8s-l13-secret">Created db-passwords secret imperatively via kubectl</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab14":
            return (
              <div>
                <h2>Lab 14: Persistent Volumes (PV) & Claims (PVC)</h2>
                <p className="guide-subtitle">Stage 3 — Storage | Stop losing your database data</p>

                <ConceptBox title="The Storage Abstraction">
                  <p>
                    If you run a database Pod on an EC2 Worker Node, and the node dies, the data is gone forever. You must mount external hard drives (like AWS EBS volumes).
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>PV (Persistent Volume):</strong> The actual hard drive in the cloud.<br />
                    <strong>PVC (Persistent Volume Claim):</strong> A ticket your Pod submits saying &quot;I need a 10GB hard drive&quot;. K8s automatically provisions the PV for you.
                  </p>
                </ConceptBox>

                <h3>The PVC YAML</h3>
                <CodeBlock 
                  title="pvc.yaml"
                  code={`apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
    - ReadWriteOnce  # Only one node can mount this drive at a time
  resources:
    requests:
      storage: 10Gi  # Give me 10 Gigabytes!`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l14-pvc" />
                      <label htmlFor="k8s-l14-pvc">Created pvc.yaml file</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab15":
            return (
              <div>
                <h2>Lab 15: Capstone — Stateful DB</h2>
                <p className="guide-subtitle">Stage 3 — Capstone Project | A Database that survives</p>

                <p>You are going to deploy a PostgreSQL database. It will use a Secret for the password, and a PVC so that if the Pod is destroyed, the new Pod reconnects to the same AWS EBS hard drive and no data is lost.</p>

                <h3>The Stateful Deployment</h3>
                <CodeBlock 
                  title="postgres.yaml"
                  code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:15
        env:
        # Inject the Secret we created in Lab 13!
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-passwords
              key: password
        volumeMounts:
        - mountPath: /var/lib/postgresql/data
          name: postgredb
      volumes:
      - name: postgredb
        persistentVolumeClaim:
          claimName: postgres-pvc # The PVC from Lab 14!`}
                />

                <CodeBlock 
                  title="WSL Terminal"
                  code={`kubectl apply -f pvc.yaml\nkubectl apply -f postgres.yaml`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 3 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c3-c1" />
                      <label htmlFor="k8s-c3-c1">Store non-sensitive configuration in ConfigMaps</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c3-c2" />
                      <label htmlFor="k8s-c3-c2">Understand that base64 Secrets are NOT true encryption</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c3-c3" />
                      <label htmlFor="k8s-c3-c3">Request cloud storage (AWS EBS) using a PersistentVolumeClaim (PVC)</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c3-c4" />
                      <label htmlFor="k8s-c3-c4">Deploy a PostgreSQL database that injects Secrets and mounts a PVC</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab16":
            return (
              <div>
                <h2>Lab 16: StatefulSets</h2>
                <p className="guide-subtitle">Stage 4 — Advanced Deployments | Taming clustered databases</p>

                <ConceptBox title="Deployments vs StatefulSets">
                  <p style={{ margin: 0 }}>
                    If you scale a web <code>Deployment</code> to 3 replicas, K8s creates pods with random hashes. They are disposable. If you deploy a MongoDB cluster, the nodes must know who is the Primary and who are the Replicas. A <strong>StatefulSet</strong> creates pods with sticky identities: <code>mongo-0</code>, <code>mongo-1</code>, <code>mongo-2</code>, and guarantees they start in exact order.
                  </p>
                </ConceptBox>

                <h3>Creating a StatefulSet</h3>
                <CodeBlock 
                  title="stateful.yaml"
                  code={`apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongo
spec:
  serviceName: "mongo"
  replicas: 3
  selector:
    matchLabels:
      app: mongo
  template:
    metadata:
      labels:
        app: mongo
    spec:
      containers:
      - name: mongo
        image: mongo:latest`}
                />
                <p style={{ fontSize: "0.95rem", color: "var(--g-text-muted)" }}>
                  <em>Apply this and run <code>kubectl get pods</code>. You will watch <code>mongo-0</code> start. Only when it is fully ready will <code>mongo-1</code> start.</em>
                </p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l16-stateful" />
                      <label htmlFor="k8s-l16-stateful">Created stateful.yaml and understand sticky identity concepts</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab17":
            return (
              <div>
                <h2>Lab 17: DaemonSets</h2>
                <p className="guide-subtitle">Stage 4 — Advanced Deployments | One pod per node, exactly</p>

                <p>Sometimes you need to run exactly ONE copy of a pod on every single Worker Node in your cluster. Examples: Log collectors (Fluentd) or monitoring agents (Datadog).</p>

                <ConceptBox title="The DaemonSet Guarantee">
                  <p style={{ margin: 0 }}>
                    If you add a new EC2 worker node to your AWS EKS cluster, the DaemonSet instantly detects it and automatically schedules a new agent pod onto it. If you remove a node, the pod is destroyed automatically.
                  </p>
                </ConceptBox>

                <h3>Example: A Fluentd Log Collector</h3>
                <CodeBlock 
                  title="daemonset.yaml"
                  code={`apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: fluentd
spec:
  selector:
    matchLabels:
      name: fluentd
  template:
    metadata:
      labels:
        name: fluentd
    spec:
      containers:
      - name: fluentd
        image: fluent/fluentd:latest`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l17-daemon" />
                      <label htmlFor="k8s-l17-daemon">Created daemonset.yaml and understand node agent distribution</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab18":
            return (
              <div>
                <h2>Lab 18: Helm Charts</h2>
                <p className="guide-subtitle">Stage 4 — Advanced Deployments | The Package Manager</p>

                <p>You want to install a complex application like Prometheus. It requires 15 different YAML files. Instead of writing them by hand, use <strong>Helm</strong>.</p>

                <ConceptBox title="What is Helm?">
                  <p style={{ margin: 0 }}>
                    Helm is to Kubernetes what <code>apt</code> is to Ubuntu, or <code>npm</code> is to Node.js. It bundles all those YAML files into a single package called a <strong>Chart</strong>.
                  </p>
                </ConceptBox>

                <h3>1. Install the Helm CLI</h3>
                <CodeBlock 
                  title="WSL Terminal"
                  code="curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash"
                />

                <h3>2. Install a complex app in 1 command</h3>
                <CodeBlock 
                  title="WSL Terminal"
                  code={`# Add official Bitnami repo\nhelm repo add bitnami https://charts.bitnami.com/bitnami\nhelm repo update\n\n# Install Redis cluster\nhelm install my-redis bitnami/redis`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l18-helm" />
                      <label htmlFor="k8s-l18-helm">Installed Helm CLI and understood Helm charts</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab19":
            return (
              <div>
                <h2>Lab 19: Blue/Green Updates</h2>
                <p className="guide-subtitle">Stage 4 — Advanced Deployments | Zero-downtime releases</p>

                <ErrorCard 
                  error='Real-World Problem: "The site went down during deployment!"'
                  meaning="You run kubectl set image deployment/api. K8s does a rolling update but users experience transient 502 errors."
                  fix="Deploy v2 pods alongside v1. Once v2 is fully healthy, switch the Service selector to point to v2 instantly."
                />

                <h3>Executing a Blue/Green Cutover</h3>
                <p>Assuming v1 runs with label <code>version: blue</code>, and you deploy v2 with label <code>version: green</code>.</p>
                <CodeBlock 
                  title="WSL Terminal"
                  code={`# Patch Service selector to direct traffic to green\nkubectl patch service my-app -p '{"spec":{"selector":{"version":"green"}}}'`}
                />
                <p>Traffic switches instantly. If v2 crashes, patch it back to <code>blue</code> in 1 second.</p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l19-bg" />
                      <label htmlFor="k8s-l19-bg">Understand the logic of Blue/Green cutover patching</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab20":
            return (
              <div>
                <h2>Lab 20: Capstone — E-Commerce</h2>
                <p className="guide-subtitle">Stage 4 — Capstone Project | Deploying massive architectures</p>

                <p>You are going to deploy an entire microservice architecture (Frontend, API, Database, Cache) using a single Helm command.</p>

                <h3>Step 1: Write a values.yaml override file</h3>
                <p>Helm charts are customizable. We will configure a WordPress stack with a MariaDB database.</p>
                
                <CodeBlock 
                  title="custom-values.yaml"
                  code={`wordpressUsername: admin\nwordpressPassword: securepassword123!\nmariadb:\n  auth:\n    rootPassword: rootpassword123!\n    database: my_ecommerce\nservice:\n  type: LoadBalancer`}
                />

                <h3>Step 2: Deploy the entire stack</h3>
                <CodeBlock 
                  title="WSL Terminal"
                  code={`helm install ecommerce-store bitnami/wordpress -f custom-values.yaml\n\n# Watch K8s create Pods, Services, PVCs dynamically\nkubectl get all`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 4 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c4-c1" />
                      <label htmlFor="k8s-c4-c1">Deploy a StatefulSet for ordered, sticky pod identities</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c4-c2" />
                      <label htmlFor="k8s-c4-c2">Deploy a DaemonSet to ensure one pod runs on every single node</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c4-c3" />
                      <label htmlFor="k8s-c4-c3">Install the Helm CLI package manager</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c4-c4" />
                      <label htmlFor="k8s-c4-c4">Understand how to execute a Blue/Green traffic cutover</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c4-c5" />
                      <label htmlFor="k8s-c4-c5">Install a complex, multi-tier application using a single Helm command</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab21":
            return (
              <div>
                <h2>Lab 21: RBAC Security</h2>
                <p className="guide-subtitle">Stage 5 — Production & Security | Restricting access</p>

                <ConceptBox title="Role-Based Access Control">
                  <p style={{ margin: 0 }}>
                    By default, <code>kubectl</code> runs as a cluster admin. If you give a junior developer admin access, they might delete namespaces. You must create <strong>Roles</strong> (what you can do) and <strong>RoleBindings</strong> (who gets the role).
                  </p>
                </ConceptBox>

                <h3>Creating a Read-Only Role</h3>
                <CodeBlock 
                  title="readonly-role.yaml"
                  code={`apiVersion: rbac.authorization.k8s.io/v1\nkind: Role\nmetadata:\n  namespace: default\n  name: pod-reader\nrules:\n- apiGroups: [""]\n  resources: ["pods", "pods/log"]\n  verbs: ["get", "watch", "list"] # NO 'delete' or 'create' allowed!`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l21-rbac" />
                      <label htmlFor="k8s-l21-rbac">Created readonly-role.yaml and understand RBAC</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab22":
            return (
              <div>
                <h2>Lab 22: Resource Quotas</h2>
                <p className="guide-subtitle">Stage 5 — Production & Security | Preventing noisy neighbors</p>

                <ErrorCard 
                  error="OOMKilled"
                  meaning="A developer deploys an app with a memory leak. It consumes all RAM on a worker node and crashes it, impacting other microservices."
                  fix="Enforce CPU and Memory Limits on every single pod in production. If a pod exceeds the limit, K8s terminates that individual container context."
                />

                <h3>Enforcing Limits</h3>
                <CodeBlock 
                  title="deployment.yaml (resources block)"
                  code={`spec:\n  containers:\n  - name: java-app\n    image: my-app:latest\n    resources:\n      requests:\n        memory: "512Mi"  # K8s reserves this much RAM\n        cpu: "250m"      # 1/4th of a CPU core\n      limits:\n        memory: "1Gi"    # OOMKilled if exceeded\n        cpu: "500m"`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l22-quota" />
                      <label htmlFor="k8s-l22-quota">Understood limits vs requests and OOMKilled triggers</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab23":
            return (
              <div>
                <h2>Lab 23: Network Policies</h2>
                <p className="guide-subtitle">Stage 5 — Production & Security | Internal Firewalls</p>

                <p>By default, ANY pod in a cluster can talk to ANY other pod. If a hacker breaches your frontend, they can access your database.</p>

                <ConceptBox title="The Zero-Trust Network">
                  <p style={{ margin: 0 }}>
                    A NetworkPolicy acts as an internal firewall. You can explicitly state: &quot;The Database Pod only accepts traffic from the API Pod. Deny all other traffic.&quot;
                  </p>
                </ConceptBox>

                <h3>Locking down the DB</h3>
                <CodeBlock 
                  title="db-firewall.yaml"
                  code={`apiVersion: networking.k8s.io/v1\nkind: NetworkPolicy\nmetadata:\n  name: db-allow-api-only\nspec:\n  podSelector:\n    matchLabels:\n      app: database\n  policyTypes:\n  - Ingress\n  ingress:\n  - from:\n    - podSelector:\n        matchLabels:\n          app: backend-api # ONLY pods with this label can connect\n    ports:\n    - protocol: TCP\n      port: 5432`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l23-netpol" />
                      <label htmlFor="k8s-l23-netpol">Created db-firewall.yaml and understand Zero-Trust networking</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab24":
            return (
              <div>
                <h2>Lab 24: Cluster Autoscaler</h2>
                <p className="guide-subtitle">Stage 5 — Production & Security | Infinite scale</p>

                <p>What happens when you scale to 500 pods but your nodes don&apos;t have enough RAM/CPU? The pods go into a <code>Pending</code> state.</p>

                <ConceptBox title="HPA vs Cluster Autoscaler">
                  <p style={{ margin: 0 }}>
                    <strong>HPA (Horizontal Pod Autoscaler):</strong> Adds more Pods when CPU usage is high.<br />
                    <strong>Cluster Autoscaler:</strong> Talks to AWS. When it sees Pending pods due to resource depletion, it requests new EC2 Worker Nodes.
                  </p>
                </ConceptBox>

                <h3>Example HPA Configuration</h3>
                <CodeBlock 
                  title="WSL Terminal"
                  code={`# Automatically scale between 2 and 10 pods when CPU hits 70%\nkubectl autoscale deployment api --cpu-percent=70 --min=2 --max=10`}
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-l24-auto" />
                      <label htmlFor="k8s-l24-auto">Understand the difference between HPA and Cluster Autoscaler</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab25":
            return (
              <div>
                <h2>Lab 25: Capstone — Production Audit</h2>
                <p className="guide-subtitle">Stage 5 — Capstone Project | The Final Review</p>

                <p>Before you deploy any app to a production K8s cluster, it must pass a security and reliability audit.</p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Stage 5 Completion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c5-c1" />
                      <label htmlFor="k8s-c5-c1">Use RBAC to ensure developers do not have ClusterAdmin rights</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c5-c2" />
                      <label htmlFor="k8s-c5-c2">Apply Resource Limits (RAM/CPU) to every single Pod</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c5-c3" />
                      <label htmlFor="k8s-c5-c3">Create Network Policies so databases cannot be accessed by frontends</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c5-c4" />
                      <label htmlFor="k8s-c5-c4">Configure HPA to handle sudden traffic spikes</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-c5-c5" />
                      <label htmlFor="k8s-c5-c5">Run Liveness and Readiness probes on all containers</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "errors":
            return (
              <div>
                <h2>🚨 Master Error Reference</h2>
                <p className="guide-subtitle">Translating K8s errors into English.</p>

                <ConceptBox title="The Golden Rule of Debugging K8s">
                  <p style={{ margin: 0 }}>
                    If a pod is failing, run: <code>kubectl describe pod &lt;pod-name&gt;</code> and scroll to the <strong>Events</strong> at the very bottom. That is where the exact error lives.
                  </p>
                </ConceptBox>

                <h3>1. CrashLoopBackOff</h3>
                <ErrorCard 
                  error="CrashLoopBackOff"
                  meaning="The container started, immediately crashed, K8s restarted it, it crashed again, and K8s is now giving up and waiting before trying again."
                  fix="The issue is inside your code. Run kubectl logs <pod-name> --previous to see the error that caused the crash. It's usually a missing environment variable or a database connection failure."
                />

                <h3>2. ImagePullBackOff / ErrImagePull</h3>
                <ErrorCard 
                  error="ImagePullBackOff"
                  meaning="K8s cannot download your Docker image from the registry."
                  fix="1) You spelled the image name wrong. 2) The image tag doesn't exist. 3) It's a private repo and you forgot to provide an imagePullSecret."
                />

                <h3>3. Pending</h3>
                <ErrorCard 
                  error="Status: Pending"
                  meaning="The pod is waiting to be assigned to a Worker Node, but it can't be."
                  fix="Run kubectl describe pod. Usually, you requested 4GB of RAM, but none of your Worker Nodes have 4GB of free RAM left. You need to add more EC2 nodes to the cluster."
                />

                <h3>4. OOMKilled</h3>
                <ErrorCard 
                  error="Reason: OOMKilled"
                  meaning="Out Of Memory. Your app tried to use more RAM than its limits.memory allowed."
                  fix="Either your app has a memory leak, or you didn't give it enough RAM. Increase the limit in the Deployment YAML."
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-errors-read" />
                      <label htmlFor="k8s-errors-read">I understand the troubleshooting guides for CrashLoopBackOff, ImagePull, Resource constraints and OOMKilled errors</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "destroy":
            return (
              <div>
                <h2>🗑️ Destroy AWS Resources</h2>
                <p className="guide-subtitle">Protect your AWS credits.</p>

                <ConceptBox title="Why this is critical">
                  <p style={{ margin: 0 }}>
                    If you used Option B to spin up an AWS EKS cluster, you are paying ~$72/month just for the Control Plane, PLUS the hourly cost of your EC2 worker nodes. <strong>You must explicitly destroy the cluster when you are done learning.</strong>
                  </p>
                </ConceptBox>

                <h3>Step 1: Destroy the Cluster</h3>
                <p>Because EKS creates VPCs, Security Groups, and IAM Roles, you MUST use <code>eksctl</code> to delete it safely. Do not delete it from the AWS Web Console.</p>
                <CodeBlock 
                  title="WSL Terminal"
                  code="eksctl delete cluster --name my-eks-cluster --region us-east-1"
                />

                <h3>Step 2: Manual Verification</h3>
                <p>Sometimes LoadBalancers or PVCs (EBS Volumes) get left behind. You must manually check.</p>
                <ol style={{ marginLeft: "20px", marginBottom: "24px" }}>
                  <li>Log into the AWS Console.</li>
                  <li>Go to <strong>EC2 Dashboard -> Load Balancers</strong>. Ensure there are none.</li>
                  <li>Go to <strong>EC2 Dashboard -> Volumes</strong>. Ensure there are no stray 10GB volumes sitting around.</li>
                </ol>

                <div style={{ textAlign: "center", margin: "64px 0", padding: "40px", backgroundColor: "var(--g-accent-glow)", borderRadius: "12px", border: "1px solid var(--g-accent)" }}>
                  <h3 style={{ color: "var(--g-accent)", margin: "0 0 16px 0" }}>🎓 You are a Kubernetes Expert!</h3>
                  <p style={{ fontSize: "1.1rem", color: "var(--g-text-bright)", margin: 0 }}>
                    You have completed all 5 stages of the K8s Mastery Guide.<br />
                    You are now ready to orchestrate massive cloud-native architectures.
                  </p>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Deletion Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-destroy-eksctl" />
                      <label htmlFor="k8s-destroy-eksctl">Ran eksctl delete cluster</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="k8s-destroy-verify" />
                      <label htmlFor="k8s-destroy-verify">Verified that no stray EC2 nodes, Load Balancers, or EBS volumes remain</label>
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
