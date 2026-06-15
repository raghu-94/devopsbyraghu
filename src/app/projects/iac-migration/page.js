"use client";

import { useState } from "react";
import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox, TipBox, ErrorCard } from "@/components/guide/GuideComponents";

export default function IaCMigrationProject() {
  // Environment variables state
  const [vars, setVars] = useState({
    awsAccountId: "123456789012",
    awsRegion: "us-east-1",
    ecrRepo: "my-startup-app"
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
        { id: "overview", title: "1. Project Overview & Setup" }
      ]
    },
    {
      title: "Execution Stages",
      items: [
        { id: "stage1", title: "2. Dynamic Configuration" },
        { id: "stage2", title: "3. Terraform Infrastructure" },
        { id: "stage3", title: "4. Jenkins CI/CD Pipeline" }
      ]
    },
    {
      title: "Troubleshooting",
      items: [
        { id: "errors", title: "5. Real-World Debugging" },
        { id: "chaos", title: "🔥 Test Your Knowledge" },
        { id: "destroy", title: "6. 🗑️ Destroy AWS Resources" }
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
      title: "Scenario 1: The Accidental Firewall Drop",
      symptom: "Users are reporting that the website is completely unresponsive and timing out.",
      command: `# Manually delete the port 80 rule using AWS CLI\naws ec2 revoke-security-group-ingress --group-name allow_web --protocol tcp --port 80 --cidr 0.0.0.0/0 --region ${appliedVars.awsRegion}`,
      explanation: "Someone logged into the AWS console and accidentally deleted the HTTP rule on the Security Group. This caused Configuration Drift. Since you used IaC, the fix is trivial: just re-apply your Terraform state. Terraform will notice the rule is missing and add it back automatically.",
      fixCommand: "terraform apply --auto-approve"
    },
    {
      title: "Scenario 2: The Silent Container Crash",
      symptom: "The AWS Load Balancer says the target is 'Unhealthy'. The website returns a 502 Bad Gateway.",
      command: "# SSH into the EC2 instance and kill the Docker container\nssh -o StrictHostKeyChecking=no ubuntu@<YOUR_EC2_IP>\nsudo docker stop my-app\nsudo docker rm my-app",
      explanation: "The Docker container crashed or was manually killed. Because you are running raw Docker on EC2 instead of Kubernetes, it doesn't self-heal! To fix this, you must either SSH back in and run the container, OR simply trigger your Jenkins pipeline to run again.",
      fixCommand: `# Re-run the Jenkins pipeline, OR run this via SSH:\nsudo docker run -d -p 80:80 --name my-app ${appliedVars.awsAccountId}.dkr.ecr.${appliedVars.awsRegion}.amazonaws.com/${appliedVars.ecrRepo}:latest`
    }
  ];

  const generateChaos = () => {
    const randomIdx = Math.floor(Math.random() * chaosScenarios.length);
    setChaosScenario(chaosScenarios[randomIdx]);
    setShowChaosSolution(false);
  };

  return (
    <GuideWrapper 
      title="Project 1: The 'Lift & Shift' IaC Migration" 
      subtitle="Migrate a legacy manual application to a containerized infrastructure provisioned via Terraform."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case "overview":
            return (
              <div>
                <h2>The &quot;Lift & Shift&quot; IaC Migration</h2>
                <p className="guide-subtitle">
                  GitHub Repo Name: <code style={{ color: "var(--g-accent)", padding: "4px 8px", backgroundColor: "var(--g-surface)", borderRadius: "4px", border: "1px solid var(--g-border)" }}>aws-legacy-to-container-iac</code>
                </p>

                <TipBox>
                  <strong>🎯 The Scenario (Use this in interviews):</strong><br />
                  &quot;At my startup, developers were manually deploying an uncontainerized Node.js application directly to EC2 instances using the AWS Console. This caused configuration drift and downtime. My job was to containerize the app using Docker, write Terraform to automatically provision a secure AWS VPC and Application Load Balancer, and wire it all together with a zero-touch Jenkins CI/CD pipeline.&quot;
                </TipBox>

                <h3>Project Architecture</h3>
                <p>You are going to build the following production-grade pipeline:</p>
                <ul style={{ marginLeft: "20px", marginBottom: "24px" }}>
                  <li><strong>Code:</strong> A simple Node.js web app.</li>
                  <li><strong>IaC:</strong> Terraform scripts that create a VPC, 2 Public Subnets, an Internet Gateway, Security Groups, and an EC2 instance.</li>
                  <li><strong>CI/CD:</strong> A Jenkins pipeline that triggers on a git commit, builds the Docker image, pushes it to AWS ECR, and deploys it to the EC2 instance.</li>
                </ul>

                <h3>💰 AWS Cost Breakdown</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--g-text-muted)", marginBottom: "12px" }}>
                  <em>Disclaimer: AWS pricing varies by region. Costs below are rough estimates based on running the project for exactly <strong>1 hour</strong> and then destroying it. Many of these resources fall under the AWS Free Tier.</em>
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
                      <td style={{ padding: "12px" }}>EC2 Instance</td>
                      <td style={{ padding: "12px" }}>t2.micro</td>
                      <td style={{ padding: "12px" }}>$0.00 (Free Tier) or ~$0.0116/hr</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "12px" }}>Application Load Balancer</td>
                      <td style={{ padding: "12px" }}>Standard ALB</td>
                      <td style={{ padding: "12px" }}>~$0.0225/hr</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "12px" }}>Elastic Container Registry (ECR)</td>
                      <td style={{ padding: "12px" }}>Storage (~50MB)</td>
                      <td style={{ padding: "12px" }}>$0.00 (Free Tier limit: 50GB)</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid var(--g-border)" }}>
                      <td style={{ padding: "12px" }}>VPC, Subnets, IGW</td>
                      <td style={{ padding: "12px" }}>Networking</td>
                      <td style={{ padding: "12px" }}>Free</td>
                    </tr>
                    <tr style={{ backgroundColor: "var(--g-accent-glow)" }}>
                      <td style={{ padding: "12px", fontWeight: "bold", color: "var(--g-accent)" }}>Grand Total (for 1 hour)</td>
                      <td style={{ padding: "12px" }}></td>
                      <td style={{ padding: "12px", fontWeight: "bold", color: "var(--g-accent)" }}>~$0.034</td>
                    </tr>
                  </tbody>
                </table>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="iac-arch-read" />
                      <label htmlFor="iac-arch-read">I understand the proposed infrastructure and CI/CD layout</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage1":
            return (
              <div>
                <h2>Stage 1: Dynamic Configuration</h2>
                <p className="guide-subtitle">Ensuring your copy-pasted code is mistake-free.</p>

                <p>To make this project work on your laptop, the Terraform code and Jenkinsfiles need to know <em>your specific AWS account details</em>. Fill out the boxes below and click Apply. All the code blocks in this guide will instantly update to use your details.</p>

                <div className="var-config-box" style={configBoxStyle}>
                  <h4 style={{ margin: "0 0 16px 0", color: "var(--g-text-bright)" }}>⚙️ Your AWS Environment Variables</h4>
                  
                  <div className="var-row" style={varRowStyle}>
                    <label style={labelStyle}>AWS Account ID</label>
                    <input 
                      type="text" 
                      name="awsAccountId" 
                      value={vars.awsAccountId} 
                      onChange={handleVarChange}
                      style={inputStyle} 
                    />
                  </div>

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
                    <label style={labelStyle}>ECR Repo Name</label>
                    <input 
                      type="text" 
                      name="ecrRepo" 
                      value={vars.ecrRepo} 
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

                <h3>The Application Source Code</h3>
                <p>You need a real application to containerize and deploy. Here is a simple Node.js web server.</p>

                <CodeBlock 
                  title="app.js"
                  code={`const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello from the AWS EC2 Auto-Scaling Group! Deployment successful.\\n');
});

server.listen(80, () => {
  console.log('Server running on port 80');
});`}
                />

                <CodeBlock 
                  title="Dockerfile"
                  code={`FROM node:18-alpine
WORKDIR /app
COPY app.js .
EXPOSE 80
CMD ["node", "app.js"]`}
                />

                <ConceptBox title="🔍 Code Explanation: The Application & Container">
                  <ul style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                    <li style={{ marginBottom: "8px" }}><strong>app.js:</strong> A basic Node.js HTTP server. It listens on port 80 and returns a deployment success message.</li>
                    <li style={{ marginBottom: "8px" }}><strong>FROM node:18-alpine:</strong> We use an &apos;alpine&apos; base image because it is incredibly small (under 50MB) and secure compared to full OS images.</li>
                    <li style={{ margin: 0 }}><strong>WORKDIR /app:</strong> Sets the execution directory inside the container context.</li>
                  </ul>
                </ConceptBox>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="iac-vars-applied" />
                      <label htmlFor="iac-vars-applied">Configured environment variables and applied them to code blocks</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="iac-app-docker" />
                      <label htmlFor="iac-app-docker">Created app.js and Dockerfile locally</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage2":
            return (
              <div>
                <h2>Stage 2: Terraform Infrastructure</h2>
                <p className="guide-subtitle">Building the AWS environment with Infrastructure as Code.</p>

                <ConceptBox title="🎯 The Interview Answer:">
                  <p style={{ margin: 0 }}>
                    &quot;Instead of clicking through the AWS console, I wrote modular Terraform. I created a custom VPC with public subnets for High Availability, and deployed a firewall-restricted EC2 instance configured to install Docker on boot.&quot;
                  </p>
                </ConceptBox>

                <h3>1. Provider Configuration</h3>
                <p>Tell Terraform we are using AWS and which region to deploy to.</p>
                <CodeBlock 
                  title="provider.tf"
                  code={`terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "${appliedVars.awsRegion}"
}`}
                />

                <h3>2. The Custom VPC & Networking</h3>
                <p>We need a secure network. We will create a VPC, an Internet Gateway, and a Route Table.</p>
                <CodeBlock 
                  title="network.tf"
                  code={`# 1. The Main Virtual Private Cloud
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  tags = { Name = "Startup-VPC" }
}

# 2. Public Subnet in Availability Zone A
resource "aws_subnet" "public_1a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${appliedVars.awsRegion}a"
  map_public_ip_on_launch = true
  tags = { Name = "Public-Subnet-1A" }
}

# 3. Internet Gateway to allow web traffic
resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
}

# 4. Route Table sending 0.0.0.0/0 to the IGW
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.public_1a.id
  route_table_id = aws_route_table.public_rt.id
}`}
                />

                <h3>3. Security Groups (The Firewall)</h3>
                <p>We must explicitly allow Port 80 (HTTP) for users and Port 22 (SSH) for Jenkins deployments.</p>
                <CodeBlock 
                  title="security.tf"
                  code={`resource "aws_security_group" "web_sg" {
  name        = "allow_web"
  description = "Allow inbound HTTP and SSH"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "SSH from Jenkins"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # In real life, restrict this to Jenkins IP!
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`}
                />

                <h3>4. The EC2 Server</h3>
                <p>Finally, we provision the actual server that will run our Docker container.</p>
                <CodeBlock 
                  title="compute.tf"
                  code={`# Find the latest Ubuntu 22.04 AMI automatically
data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
  owners = ["099720109477"] # Canonical
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro" # Free Tier eligible!
  subnet_id     = aws_subnet.public_1a.id
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  # Install Docker immediately when the server boots
  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y docker.io
              sudo systemctl start docker
              sudo systemctl enable docker
              sudo usermod -aG docker ubuntu
              EOF

  tags = { Name = "Production-Docker-Server" }
}

output "server_public_ip" {
  value = aws_instance.web.public_ip
}`}
                />

                <h3>5. Deploy the Infrastructure</h3>
                <CodeBlock 
                  title="VS Code Terminal"
                  code={`terraform init\nterraform plan\nterraform apply --auto-approve`}
                />
                <p>When it finishes, it will print your <code>server_public_ip</code>. Save this IP for Jenkins!</p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="iac-tf-files" />
                      <label htmlFor="iac-tf-files">Created provider.tf, network.tf, security.tf, and compute.tf files</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="iac-tf-deployed" />
                      <label htmlFor="iac-tf-deployed">Ran terraform apply and successfully spun up EC2 instance in AWS VPC</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage3":
            return (
              <div>
                <h2>Stage 3: Jenkins CI/CD Pipeline</h2>
                <p className="guide-subtitle">Automating the deployment of the Docker container.</p>

                <ConceptBox title="🎯 The Interview Answer:">
                  <p style={{ margin: 0 }}>
                    &quot;After the Terraform was applied, I wrote a declarative Jenkins pipeline. When a developer pushes code to GitHub, Jenkins automatically checks out the code, builds a Docker image, authenticates with AWS, pushes the image to an ECR repository, and then SSHs into the EC2 instance to pull and run the new container.&quot;
                  </p>
                </ConceptBox>

                <h3>The Declarative Jenkinsfile</h3>
                <p>This is the exact pipeline script you would put in the root of your GitHub repository. It uses the variables you defined in Stage 1.</p>
                
                <CodeBlock 
                  title="Jenkinsfile"
                  code={`pipeline {
    agent any
    
    environment {
        AWS_ACCOUNT_ID = "${appliedVars.awsAccountId}"
        AWS_REGION     = "${appliedVars.awsRegion}"
        ECR_REPO       = "${appliedVars.ecrRepo}"
        IMAGE_TAG      = "\${env.BUILD_NUMBER}"
        EC2_PUBLIC_IP  = "REPLACE_WITH_TERRAFORM_OUTPUT_IP"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Docker Build') {
            steps {
                script {
                    echo "Building Docker Image..."
                    sh "docker build -t \${ECR_REPO}:\${IMAGE_TAG} ."
                    
                    echo "Tagging for AWS ECR..."
                    sh "docker tag \${ECR_REPO}:\${IMAGE_TAG} \${AWS_ACCOUNT_ID}.dkr.ecr.\${AWS_REGION}.amazonaws.com/\${ECR_REPO}:\${IMAGE_TAG}"
                    sh "docker tag \${ECR_REPO}:\${IMAGE_TAG} \${AWS_ACCOUNT_ID}.dkr.ecr.\${AWS_REGION}.amazonaws.com/\${ECR_REPO}:latest"
                }
            }
        }
        
        stage('Push to AWS ECR') {
            steps {
                script {
                    echo "Logging into AWS ECR..."
                    sh "aws ecr get-login-password --region \${AWS_REGION} | docker login --username AWS --password-stdin \${AWS_ACCOUNT_ID}.dkr.ecr.\${AWS_REGION}.amazonaws.com"
                    
                    echo "Pushing images..."
                    sh "docker push \${AWS_ACCOUNT_ID}.dkr.ecr.\${AWS_REGION}.amazonaws.com/\${ECR_REPO}:\${IMAGE_TAG}"
                    sh "docker push \${AWS_ACCOUNT_ID}.dkr.ecr.\${AWS_REGION}.amazonaws.com/\${ECR_REPO}:latest"
                }
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                script {
                    // Requires 'ssh-agent' Jenkins plugin and AWS PEM key added to Jenkins credentials
                    sshagent(['aws-ec2-ssh-key']) {
                        sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@\${EC2_PUBLIC_IP} '
                            aws ecr get-login-password --region \${AWS_REGION} | sudo docker login --username AWS --password-stdin \${AWS_ACCOUNT_ID}.dkr.ecr.\${AWS_REGION}.amazonaws.com
                            sudo docker pull \${AWS_ACCOUNT_ID}.dkr.ecr.\${AWS_REGION}.amazonaws.com/\${ECR_REPO}:latest
                            sudo docker stop my-app || true
                            sudo docker rm my-app || true
                            sudo docker run -d -p 80:80 --name my-app \${AWS_ACCOUNT_ID}.dkr.ecr.\${AWS_REGION}.amazonaws.com/\${ECR_REPO}:latest
                        '
                        """
                    }
                }
            }
        }
    }
}`}
                />

                <ConceptBox title="🔍 Code Explanation: Reading the Declarative Pipeline">
                  <ul style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                    <li style={{ marginBottom: "8px" }}><strong>agent any:</strong> Tells Jenkins it can run this job on any available executor node.</li>
                    <li style={{ marginBottom: "8px" }}><strong>aws ecr get-login-password:</strong> Before Jenkins can push the Docker image to AWS ECR, it must authenticate. This command gets a temporary token using the IAM credentials.</li>
                    <li style={{ marginBottom: "8px" }}><strong>docker build & push:</strong> Standard Docker commands to compile our application into an image and push it to the private AWS registry.</li>
                    <li style={{ margin: 0 }}><strong>Deploy to EC2:</strong> The pipeline SSHs into the production EC2 server, pulls the new image from ECR, kills the old container, and spins up the new one.</li>
                  </ul>
                </ConceptBox>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="iac-jenkinsfile" />
                      <label htmlFor="iac-jenkinsfile">Created Jenkinsfile and replaced placeholder EC2_PUBLIC_IP</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="iac-pipeline-trigger" />
                      <label htmlFor="iac-pipeline-trigger">Triggered Jenkins job and verified all pipeline stages run successfully</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "errors":
            return (
              <div>
                <h2>Real-World Debugging</h2>
                <p className="guide-subtitle">Common issues encountered during IaC lift-and-shift migrations.</p>

                <h3>1. Terraform State Lock Error</h3>
                <ErrorCard 
                  error="Error acquiring the state lock"
                  meaning="You run terraform apply, but your internet drops. You run it again and get this error."
                  fix="Terraform locks the state file so two people don't edit infrastructure at the same time. If it crashes, the lock is stuck. Run terraform force-unlock <LOCK_ID> (The lock ID will be printed in the error message)."
                />

                <h3>2. Jenkins ECR Login Failed</h3>
                <ErrorCard 
                  error="Cannot perform an interactive login from a non TTY device"
                  meaning="The Jenkins pipeline fails on the aws ecr get-login-password step."
                  fix="The Jenkins server does not have the AWS CLI configured, OR it doesn't have the proper IAM permissions. You must attach an IAM Role to the Jenkins EC2 server that has the AmazonEC2ContainerRegistryPowerUser policy attached."
                />

                <h3>3. EC2 Deployment Timeout</h3>
                <ErrorCard 
                  error="ssh: connect to host X.X.X.X port 22: Connection timed out"
                  meaning="The final 'Deploy to EC2' stage fails after hanging for 2 minutes."
                  fix="The Security Group (firewall) on the EC2 instance is blocking Port 22 from the Jenkins server. Go back to security.tf and ensure the Jenkins server's IP address is explicitly allowed in the ingress rule for Port 22."
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="iac-errors-read" />
                      <label htmlFor="iac-errors-read">I understand state locks, ECR permissions, and security group firewall configurations</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "chaos":
            return (
              <div>
                <h2>🔥 Test Your Knowledge (Chaos Engine)</h2>
                <p className="guide-subtitle">Real engineers are tested in production. Let&apos;s break your infrastructure.</p>

                <TipBox>
                  <strong>How it works:</strong> Click the button below to generate a random &quot;Chaos Scenario&quot;. Run the command to sabotage your system, then read the solution to fix it.
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
                    💥 Generate Production Outage
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
                      {showChaosSolution ? "👀 Hide Solution" : "👀 I give up, reveal the fix"}
                    </button>
                    
                    {showChaosSolution && (
                      <div className="chaos-solution" style={{ display: "block", borderLeft: "4px solid var(--g-green)", backgroundColor: "var(--g-surface)", padding: "16px", marginTop: "16px", borderRadius: "0 8px 8px 0" }}>
                        <h4 style={{ color: "var(--g-green)", marginBottom: "12px", marginTop: 0 }}>✅ The Fix</h4>
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
                      <input type="checkbox" className="g-guide-cb" id="iac-chaos-tested" />
                      <label htmlFor="iac-chaos-tested">Tested both chaos scenarios and verified fixes</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "destroy":
            return (
              <div>
                <h2>🗑️ Destroy AWS Resources</h2>
                <p className="guide-subtitle">The most important command in DevOps: Cleaning up.</p>

                <p>You used Terraform to create the infrastructure. Do not delete things manually in the AWS Console. You will orphan resources and get billed.</p>

                <h3>The Teardown Command</h3>
                <CodeBlock 
                  title="VS Code Terminal"
                  code="terraform destroy --auto-approve"
                />

                <h3>Wait, what about ECR?</h3>
                <p>Terraform did not create the ECR repository (we pushed to it via Jenkins). You must delete the Docker images manually to stop paying storage fees.</p>
                <CodeBlock 
                  title="VS Code Terminal"
                  code={`aws ecr delete-repository \\
    --repository-name ${appliedVars.ecrRepo} \\
    --region ${appliedVars.awsRegion} \\
    --force`}
                />

                <div style={{ textAlign: "center", margin: "64px 0", padding: "40px", backgroundColor: "var(--g-accent-glow)", borderRadius: "12px", border: "1px solid var(--g-accent)" }}>
                  <h3 style={{ color: "var(--g-accent)", margin: "0 0 16px 0" }}>🎓 Project 1 Complete!</h3>
                  <p style={{ fontSize: "1.1rem", color: "var(--g-text-bright)", margin: 0 }}>
                    You successfully migrated a legacy application using Terraform, Docker, and Jenkins.<br />
                    You are ready to confidently discuss IaC and CI/CD in your interviews.
                  </p>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="iac-deleted" />
                      <label htmlFor="iac-deleted">Tore down all AWS resources and ECR images</label>
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

                <h2>🎙️ Interview Q&A: IaC Migration</h2>
                <p className="guide-subtitle">Prepare for real-world interview questions about this project.</p>

                <div style={{
                  textAlign: "center", padding: "60px 40px",
                  background: "var(--g-surface)", border: "1px solid var(--g-border)",
                  borderRadius: "16px", position: "relative", overflow: "hidden"
                }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, var(--g-accent), #8b5cf6)" }} />
                  <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🚧</div>
                  <h3 style={{ color: "var(--g-text-bright)", fontSize: "1.2rem", marginBottom: "10px" }}>Interview Questions Coming Soon</h3>
                  <p style={{ color: "var(--g-text-muted)", fontSize: "0.9rem", maxWidth: "500px", margin: "0 auto", lineHeight: 1.7 }}>
                    We&apos;re preparing a curated set of interview Q&amp;A specifically for the IaC &amp; CI/CD Migration project. Check back soon!
                  </p>
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
