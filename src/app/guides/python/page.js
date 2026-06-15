"use client";

import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox } from "@/components/guide/GuideComponents";

export default function PythonMastery() {
  const navGroups = [
    {
      title: "Course Intro",
      items: [
        { id: "overview", title: "📘 Roadmap & Setup" }
      ]
    },
    {
      title: "Stage 1: Basics",
      items: [
        { id: "lab1", title: "Lab 1: Python for DevOps" }
      ]
    },
    {
      title: "Stage 2: Real-World",
      items: [
        { id: "project", title: "🚀 AWS Cost Saver" }
      ]
    }
  ];

  return (
    <GuideWrapper 
      title="Python Automation Mastery" 
      subtitle="The interactive guide for writing robust AWS automation using Boto3."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case "overview":
            return (
              <div>
                <h2>Python Automation: Scripting the Cloud</h2>
                <p className="guide-subtitle">Understand the roadmap and set up your scripting workspace.</p>
                
                <ConceptBox title="Why Python?">
                  <p style={{ margin: 0 }}>
                    While tools like Terraform are great for declaring infrastructure, DevOps engineers often need to write custom logic. What if you need a script that runs every night, finds all unused AWS Elastic IPs, and deletes them to save money? What if you need to parse gigabytes of logs to find a specific error? Python is the undisputed king of DevOps automation.
                  </p>
                </ConceptBox>

                <h3>What we will build</h3>
                <p>
                  In this mastery course, we will focus heavily on <strong>Boto3</strong> (the AWS SDK for Python). You will learn to programmatically control AWS infrastructure, leading up to a mini real-world project where we build an automated AWS cost-saving script.
                </p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="py-roadmap" />
                      <label htmlFor="py-roadmap">I have read the course introduction and roadmap</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "lab1":
            return (
              <div>
                <h2>Lab 1: Python for DevOps</h2>
                <p className="guide-subtitle">Stage 1 — Basics | Variables, JSON, and Boto3</p>

                <ConceptBox title="The Holy Trinity of DevOps Python">
                  <p>As a DevOps engineer, you don&apos;t need to know how to build machine learning models or complex web apps. You only need to master three things in Python:</p>
                  <ul style={{ marginLeft: "20px", marginTop: "8px" }}>
                    <li><strong>Dictionaries & Lists:</strong> How Python stores data (matches perfectly with JSON).</li>
                    <li><strong>The <code>json</code> module:</strong> Parsing API responses.</li>
                    <li><strong>The <code>boto3</code> library:</strong> The official AWS SDK that lets you control AWS resources with Python code instead of clicking in the console.</li>
                  </ul>
                </ConceptBox>

                <h3>1. Data Structures (The Foundation)</h3>
                <p>In DevOps, everything is JSON. A Python <strong>Dictionary</strong> is exactly the same as a JSON object.</p>

                <CodeBlock 
                  title="basics.py" 
                  code={`# This is a Dictionary (JSON) describing an AWS Server
ec2_instance = {
    "InstanceId": "i-1234567890abcdef0",
    "InstanceType": "t2.micro",
    "State": {
        "Name": "running"
    },
    "Tags": [
        {"Key": "Environment", "Value": "Production"},
        {"Key": "Owner", "Value": "DevOpsTeam"}
    ]
}

# How to extract data from it:
print(f"Server ID: {ec2_instance['InstanceId']}")
print(f"Current State: {ec2_instance['State']['Name']}")

# Loop through a List of dictionaries
for tag in ec2_instance['Tags']:
    if tag['Key'] == "Environment":
        print(f"This server is in: {tag['Value']}")`}
                />

                <div className="g-concept-box" style={{ borderLeftColor: "var(--g-accent)", backgroundColor: "var(--g-surface)" }}>
                  <h4 style={{ color: "var(--g-accent)" }}>🔍 Code Explanation: Python Syntax</h4>
                  <div style={{ fontSize: "0.9rem", color: "var(--g-text-muted)" }}>
                    <p style={{ marginBottom: "8px" }}><strong>Dictionaries &#123;&#125;:</strong> Use curly braces to store key-value pairs. You access values using square brackets <code>[&apos;KeyName&apos;]</code>.</p>
                    <p style={{ marginBottom: "8px" }}><strong>f-strings:</strong> <code>f&quot;Text &#123;variable&#125;&quot;</code> is the modern, cleanest way to inject variables into strings in Python.</p>
                    <p style={{ margin: 0 }}><strong>Indentation:</strong> Python does not use curly braces for loops or if statements. It strictly uses indentation (4 spaces). If your spacing is wrong, the code will crash.</p>
                  </div>
                </div>

                <h3>2. Installing Boto3</h3>
                <p>To talk to AWS, we need to install the SDK using Python&apos;s package manager, <code>pip</code>.</p>
                
                <CodeBlock 
                  title="WSL Terminal"
                  code="pip install boto3"
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="py-basics-run" />
                      <label htmlFor="py-basics-run">Created basics.py and ran it successfully</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="py-boto-install" />
                      <label htmlFor="py-boto-install">Installed Boto3 library in local environment</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "project":
            return (
              <div>
                <h2>Mini Real-World Project</h2>
                <p className="guide-subtitle">Stage 2 — The &quot;Ghost Buster&quot; AWS Cost Saver</p>

                <div className="g-concept-box" style={{ borderLeftColor: "var(--g-green)" }}>
                  <h4 style={{ color: "var(--g-green)" }}>🎯 The Scenario (Use this in interviews):</h4>
                  <p style={{ margin: 0 }}>
                    &quot;At my previous company, developers kept spinning up EC2 instances for testing and forgetting to turn them off on Friday afternoons. It was costing us hundreds of dollars over the weekend. I wrote a Python script using Boto3 that runs automatically via a cron job every Friday at 6 PM. It scans all AWS regions, finds any EC2 instance tagged with &apos;Environment: Dev&apos;, and automatically stops them.&quot;
                  </p>
                </div>

                <h3>The Automation Script</h3>

                <CodeBlock 
                  title="cost_saver.py"
                  code={`import boto3

def stop_dev_instances():
    print("Starting AWS Cost Saver Script...")
    
    # 1. Initialize the Boto3 EC2 Client
    # It automatically uses your AWS CLI credentials (~/.aws/credentials)
    ec2 = boto3.client('ec2', region_name='us-east-1')

    # 2. Ask AWS to return instances that match our specific filter
    # We only want instances that are currently "running" AND tagged as "Dev"
    response = ec2.describe_instances(
        Filters=[
            {'Name': 'instance-state-name', 'Values': ['running']},
            {'Name': 'tag:Environment', 'Values': ['Dev']}
        ]
    )

    instances_to_stop = []

    # 3. Parse the massive JSON response
    for reservation in response['Reservations']:
        for instance in reservation['Instances']:
            instance_id = instance['InstanceId']
            instances_to_stop.append(instance_id)
            print(f"Found running Dev instance: {instance_id}")

    # 4. Stop the instances if we found any
    if len(instances_to_stop) > 0:
        print(f"Stopping {len(instances_to_stop)} instances to save money...")
        
        # This is the actual command that shuts them down
        ec2.stop_instances(InstanceIds=instances_to_stop)
        
        print("Success! Have a great weekend.")
    else:
        print("No running Dev instances found. No action taken.")

# Execute the function
if __name__ == '__main__':
    stop_dev_instances()`}
                />

                <div className="g-concept-box" style={{ borderLeftColor: "var(--g-accent)", backgroundColor: "var(--g-surface)" }}>
                  <h4 style={{ color: "var(--g-accent)" }}>🔍 Code Explanation: Boto3 Logic</h4>
                  <div style={{ fontSize: "0.9rem", color: "var(--g-text-muted)" }}>
                    <p style={{ marginBottom: "8px" }}><strong>boto3.client(&apos;ec2&apos;):</strong> This establishes a connection to the AWS API. It&apos;s the equivalent of logging into the AWS Console.</p>
                    <p style={{ marginBottom: "8px" }}><strong>Filters=[]:</strong> Instead of pulling down a list of 10,000 servers and using Python <code>if</code> statements to sort them, we pass filters directly to AWS. This makes the script incredibly fast and uses less memory.</p>
                    <p style={{ marginBottom: "8px" }}><strong>[&apos;Reservations&apos;][&apos;Instances&apos;]:</strong> The AWS API wraps the instances inside a &apos;Reservations&apos; array. This nested <code>for</code> loop is the standard boilerplate required to dig down into the actual server data.</p>
                    <p style={{ margin: 0 }}><strong>if __name__ == &apos;__main__&apos;:</strong> This is a Python best practice. It ensures the script only runs if you execute it directly (e.g., <code>python3 cost_saver.py</code>), but prevents it from running automatically if you try to import it into another file.</p>
                  </div>
                </div>

                <div style={{ textAlign: "center", margin: "64px 0", padding: "40px", backgroundColor: "var(--g-accent-glow)", borderRadius: "12px", border: "1px solid var(--g-accent)" }}>
                  <h3 style={{ color: "var(--g-accent)", margin: "0 0 16px 0" }}>🎓 Python Automation Complete!</h3>
                  <p style={{ fontSize: "1.1rem", margin: 0 }}>
                    You now understand how to programmatically control the cloud.<br />
                    You can automate any manual AWS task to save time, reduce human error, and save money.
                  </p>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="py-costsaver-code" />
                      <label htmlFor="py-costsaver-code">Created and populated cost_saver.py file</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="py-costsaver-concept" />
                      <label htmlFor="py-costsaver-concept">I understand how Boto3 filters and nested loops work</label>
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
