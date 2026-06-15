"use client";

import GuideWrapper from "@/components/guide/GuideWrapper";
import { CodeBlock, ConceptBox, TipBox, ErrorCard } from "@/components/guide/GuideComponents";

export default function MonitoringMastery() {
  const navGroups = [
    {
      title: "Observability Intro",
      items: [
        { id: "overview", title: "1. Observability Architecture" }
      ]
    },
    {
      title: "Implementation",
      items: [
        { id: "stage1", title: "2. Docker Compose Setup" },
        { id: "stage2", title: "3. Prometheus & PromQL" },
        { id: "stage3", title: "4. Grafana Dashboards" },
        { id: "stage4", title: "5. Alertmanager Setup" }
      ]
    },
    {
      title: "Operations & Debugging",
      items: [
        { id: "stage5", title: "6. 🚀 Chaos Experiment" },
        { id: "errors", title: "7. Master Error Guide" },
        { id: "destroy", title: "8. 🗑️ Destroy Resources" }
      ]
    }
  ];

  return (
    <GuideWrapper 
      title="Monitoring & Observability Mastery" 
      subtitle="Zero to Grafana Expert — because you can't fix what you can't see."
      navGroups={navGroups}
    >
      {(activeSection) => {
        switch (activeSection) {
          case "overview":
            return (
              <div>
                <h2>Monitoring & Observability</h2>
                <p className="guide-subtitle">Understand the 3 pillars of observability and our proposed architecture.</p>
                
                <TipBox>
                  <strong>💡 The Golden Rule of DevOps:</strong><br />
                  If a server goes down in the forest and nobody gets a Slack alert, you are fired. Observability is the practice of understanding the internal state of your systems by looking at its external outputs (Metrics, Logs, and Traces).
                </TipBox>

                <h3>The 3 Pillars of Observability</h3>
                <ul style={{ marginLeft: "20px", marginBottom: "24px" }}>
                  <li><strong>Metrics (Prometheus):</strong> Numbers measured over time. (e.g., &quot;CPU is at 95%&quot;).</li>
                  <li><strong>Logs (ELK Stack):</strong> Text records of events. (e.g., &quot;User login failed for admin&quot;).</li>
                  <li><strong>Traces (Jaeger):</strong> The journey of a single request across 10 different microservices.</li>
                </ul>

                <div className="architecture-box" style={boxStyle}>
                  <h3 style={{ marginTop: 0, border: "none", padding: 0, color: "var(--g-accent)" }}>The Stack We Are Building</h3>
                  <p style={{ margin: 0 }}>
                    <code>Node Exporter</code> (Gathers CPU data) → <code>Prometheus</code> (Stores data) → <code>Grafana</code> (Draws graphs) → <code>Alertmanager</code> (Sends Slack alerts)
                  </p>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-pillars" />
                      <label htmlFor="mon-pillars">I understand the three pillars of observability</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-arch" />
                      <label htmlFor="mon-arch">I understand the Prometheus, Grafana, Alertmanager stack flow</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage1":
            return (
              <div>
                <h2>Stage 1: The 1-Click Setup</h2>
                <p className="guide-subtitle">Spinning up the entire Observability stack locally.</p>

                <p>Instead of installing these tools one by one on your Windows machine, we will use Docker Compose to spin up Prometheus, Grafana, Alertmanager, and Node Exporter in a single command.</p>

                <CodeBlock 
                  title="docker-compose.yml"
                  code={`version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_USER=admin
      - GF_SECURITY_ADMIN_PASSWORD=admin

  node_exporter:
    image: quay.io/prometheus/node-exporter:latest
    container_name: node_exporter
    ports:
      - "9100:9100"
    pid: "host"

  alertmanager:
    image: prom/alertmanager:latest
    container_name: alertmanager
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml`}
                />

                <ConceptBox title="🔍 Code Explanation: Why are we doing this?">
                  <ul style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                    <li style={{ marginBottom: "8px" }}><strong>The Goal:</strong> Instead of installing 4 different messy software packages on your computer, Docker Compose creates a private, isolated network where these 4 containers can talk to each other securely.</li>
                    <li style={{ marginBottom: "8px" }}><code>prometheus:</code> The central database. It runs on port 9090. We use a <code>volume</code> to inject our configuration file from our laptop into the container.</li>
                    <li style={{ marginBottom: "8px" }}><code>grafana:</code> The UI dashboard. It runs on port 3000. We pass <code>environment</code> variables to automatically set the admin password so we don&apos;t have to configure it manually on first boot.</li>
                    <li style={{ marginBottom: "8px" }}><code>node_exporter:</code> The agent. It runs on port 9100. It reads the CPU/RAM of your machine and exposes it on a web page for Prometheus to read.</li>
                    <li style={{ margin: 0 }}><code>alertmanager:</code> The messenger. It runs on port 9093. Prometheus sends it an alarm, and Alertmanager handles formatting it and pushing it to Slack.</li>
                  </ul>
                </ConceptBox>

                <p>Do not run this just yet! Prometheus and Alertmanager will crash if they don&apos;t have their configuration files (the <code>volumes</code> mapped in the YAML). We will create those in the next stage.</p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-dockercompose" />
                      <label htmlFor="mon-dockercompose">Created docker-compose.yml file with all 4 services</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage2":
            return (
              <div>
                <h2>Stage 2: Prometheus & Exporters</h2>
                <p className="guide-subtitle">How data is gathered using the &quot;Pull&quot; model.</p>

                <ConceptBox title="🎯 The Interview Answer:">
                  <p style={{ margin: 0 }}>
                    &quot;Prometheus uses a Pull model. Instead of configuring 1,000 servers to push their data to a central database, you install a tiny web server on each node called an <strong>Exporter</strong>. Prometheus simply makes an HTTP GET request to each server every 15 seconds to &apos;scrape&apos; the data.&quot;
                  </p>
                </ConceptBox>

                <h3>1. The Prometheus Configuration File</h3>
                <p>We must tell Prometheus where to scrape data from. We will tell it to scrape itself, and our Node Exporter (which gets CPU/RAM data).</p>

                <CodeBlock 
                  title="prometheus.yml"
                  code={`global:
  scrape_interval: 15s # How often to pull data

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node_exporter'
    static_configs:
      # In Docker Compose, services can talk to each other by container name!
      - targets: ['node_exporter:9100']`}
                />

                <ConceptBox title="🔍 Code Explanation: Understanding Prometheus Config">
                  <ul style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                    <li style={{ marginBottom: "8px" }}><code>scrape_interval: 15s</code>: This dictates how aggressively Prometheus pulls data. 15 seconds is standard. In massive production systems, you might increase this to 1 minute to save database storage.</li>
                    <li style={{ marginBottom: "8px" }}><code>job_name</code>: This is just a logical grouping. For example, you might have one job for &apos;web_servers&apos; and another for &apos;database_servers&apos;.</li>
                    <li style={{ margin: 0 }}><code>targets: [&apos;node_exporter:9100&apos;]</code>: This is the exact IP address and port where Prometheus will go looking for metrics. Because we are using Docker Compose, Prometheus can magically resolve the word <code>node_exporter</code> to the actual IP address of the container.</li>
                  </ul>
                </ConceptBox>

                <h3>2. The Alertmanager Configuration File</h3>
                <p>We also need a basic config for Alertmanager so it doesn&apos;t crash on boot. We will configure Slack routing in Stage 4.</p>

                <CodeBlock 
                  title="alertmanager.yml"
                  code={`route:
  receiver: 'dummy'
receivers:
  - name: 'dummy'`}
                />

                <h3>3. Boot the Stack!</h3>
                <CodeBlock 
                  title="WSL Terminal"
                  code="docker-compose up -d"
                />

                <h3>4. PromQL (Prometheus Query Language)</h3>
                <p>Open your browser to <a href="http://localhost:9090" target="_blank" style={{ color: "var(--g-accent)", textDecoration: "underline" }}>http://localhost:9090</a>. This is the raw data database.</p>
                <p>Try running these exact PromQL queries in the search bar:</p>
                <ul style={{ marginLeft: "20px", marginBottom: "24px" }}>
                  <li><code>up</code> — Shows a 1 if the server is healthy, 0 if it is dead.</li>
                  <li><code>node_memory_MemTotal_bytes</code> — Shows your total RAM in bytes.</li>
                  <li><code>100 - (avg by (instance) (rate(node_cpu_seconds_total&#123;mode=&quot;idle&quot;&#125;[5m])) * 100)</code> — This calculates your exact CPU Usage %.</li>
                </ul>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-promconfig" />
                      <label htmlFor="mon-promconfig">Created prometheus.yml and alertmanager.yml files</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-dockerup" />
                      <label htmlFor="mon-dockerup">Ran docker-compose up -d and stack booted successfully</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-promql" />
                      <label htmlFor="mon-promql">Checked PromQL queries in raw Prometheus UI</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage3":
            return (
              <div>
                <h2>Stage 3: Grafana Dashboards</h2>
                <p className="guide-subtitle">Making the data beautiful and actionable.</p>

                <p>Prometheus stores the data, but its UI is basic. Grafana connects to Prometheus and builds beautiful, interactive dashboards.</p>

                <h3>1. Log into Grafana</h3>
                <p>Open <a href="http://localhost:3000" target="_blank" style={{ color: "var(--g-accent)", textDecoration: "underline" }}>http://localhost:3000</a> in your browser.</p>
                <ul style={{ marginLeft: "20px", marginBottom: "24px" }}>
                  <li><strong>Username:</strong> <code>admin</code></li>
                  <li><strong>Password:</strong> <code>admin</code> (We set this in docker-compose.yml!)</li>
                </ul>

                <h3>2. Connect Prometheus (The Data Source)</h3>
                <p>Grafana needs to know where the database is.</p>
                <ol style={{ marginLeft: "20px", marginBottom: "24px" }}>
                  <li>Click <strong>Connections</strong> on the left menu, then <strong>Data sources</strong>.</li>
                  <li>Click <strong>Add data source</strong> and choose <strong>Prometheus</strong>.</li>
                  <li>In the <strong>Prometheus server URL</strong> box, type: <code style={{ color: "var(--g-accent)" }}>http://prometheus:9090</code> <br /><em>(Remember: Docker containers talk to each other using their container names!)</em></li>
                  <li>Scroll to the bottom and click <strong>Save & Test</strong>. It should say &quot;Data source is working&quot;.</li>
                </ol>

                <h3>3. Import an Open-Source Dashboard</h3>
                <p>Building dashboards from scratch takes hours. Real DevOps engineers use pre-built community dashboards.</p>
                <ol style={{ marginLeft: "20px", marginBottom: "24px" }}>
                  <li>Go to <a href="https://grafana.com/grafana/dashboards/" target="_blank" style={{ color: "var(--g-accent)", textDecoration: "underline" }}>Grafana Dashboards</a> (the community site).</li>
                  <li>Search for &quot;Node Exporter Full&quot; (Dashboard ID: <strong>1860</strong>).</li>
                  <li>Go back to your local Grafana. Click the <strong>+</strong> icon in the top right and select <strong>Import dashboard</strong>.</li>
                  <li>Type <code>1860</code> into the ID box and click Load.</li>
                  <li>Select your Prometheus data source at the bottom and click Import.</li>
                </ol>

                <TipBox>
                  <strong>🎉 Success!</strong><br />
                  You now have a massive, professional dashboard showing CPU, Memory, Disk Space, and Network traffic for your server. This exact dashboard is used in Fortune 500 companies.
                </TipBox>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-grafanalogin" />
                      <label htmlFor="mon-grafanalogin">Logged into Grafana (admin/admin)</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-grafanadatasource" />
                      <label htmlFor="mon-grafanadatasource">Added Prometheus data source successfully</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-grafanaimport" />
                      <label htmlFor="mon-grafanaimport">Imported dashboard 1860 and verified metrics view</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage4":
            return (
              <div>
                <h2>Stage 4: Alertmanager</h2>
                <p className="guide-subtitle">Waking up the on-call engineer when services fail.</p>

                <p>Dashboards are great, but nobody stares at them all day. We need Prometheus to automatically message us when a metric crosses a dangerous threshold.</p>

                <h3>1. Create an Alert Rule</h3>
                <p>We need to tell Prometheus what is considered &quot;bad&quot;. Let&apos;s create an alert that fires if the server is down for more than 1 minute.</p>
                
                <CodeBlock 
                  title="alert.rules.yml"
                  code={`groups:
- name: InstanceDown
  rules:
  - alert: InstanceDown
    expr: up == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "Instance {{ $labels.instance }} down"
      description: "{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 1 minute."`}
                />

                <ConceptBox title="🔍 Code Explanation: Reading the Alert Rule">
                  <ul style={{ marginLeft: "20px", color: "var(--g-text-muted)", fontSize: "0.9rem" }}>
                    <li style={{ marginBottom: "8px" }}><code>expr: up == 0</code>: This is the PromQL expression. Remember from Stage 2 that <code>up</code> returns a 1 if the server is healthy. If it hits 0, this rule triggers.</li>
                    <li style={{ marginBottom: "8px" }}><code>for: 1m</code>: This is critical to prevent &quot;Alert Fatigue&quot;. If there is a 5-second network hiccup, we don&apos;t want to wake up the engineer. This tells Prometheus to wait 60 seconds to ensure the server is <em>actually</em> dead before firing the alarm.</li>
                    <li style={{ margin: 0 }}><code>&#123;&#123; $labels.instance &#125;&#125;</code>: This uses Go templating to dynamically insert the exact container name or IP address of the server that failed into the Slack message.</li>
                  </ul>
                </ConceptBox>

                <h3>2. Link the Rules to Prometheus</h3>
                <p>Open your existing <code>prometheus.yml</code> and add this at the bottom:</p>

                <CodeBlock 
                  title="prometheus.yml (updated)"
                  code={`rule_files:
  - 'alert.rules.yml'

alerting:
  alertmanagers:
  - static_configs:
    - targets:
      - alertmanager:9093`}
                />

                <h3>3. Configure Slack Routing</h3>
                <p>Open your existing <code>alertmanager.yml</code> and replace it with this to send alerts to a Slack channel webhook.</p>

                <CodeBlock 
                  title="alertmanager.yml"
                  code={`route:
  receiver: 'slack-notifications'

receivers:
- name: 'slack-notifications'
  slack_configs:
  - api_url: 'https://hooks.slack.com/services/YOUR/WEBHOOK/HERE'
    channel: '#alerts'
    send_resolved: true`}
                />

                <p>Run <code>docker-compose restart prometheus alertmanager</code> to apply these changes!</p>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-rulesyml" />
                      <label htmlFor="mon-rulesyml">Created alert.rules.yml</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-ruleslink" />
                      <label htmlFor="mon-ruleslink">Linked rules inside prometheus.yml</label>
                    </li>
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-slackconfig" />
                      <label htmlFor="mon-slackconfig">Configured mock Slack Webhook in alertmanager.yml</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "stage5":
            return (
              <div>
                <h2>🚀 Stage 5: Mini Real-World Project</h2>
                <p className="guide-subtitle">Testing your incident response pipeline.</p>

                <ConceptBox title="🎯 The Scenario:">
                  <p style={{ margin: 0 }}>
                    &quot;Our production server crashed and nobody knew until a customer complained on Twitter. I implemented a Chaos Engineering test to ensure our new Prometheus alerts actually work before we put them into production.&quot;
                  </p>
                </ConceptBox>

                <h3>The Chaos Experiment</h3>
                <p>We wrote an alert in Stage 4 that triggers if the <code>node_exporter</code> goes down. Let&apos;s intentionally kill it to simulate a server crash and watch the alert fire.</p>

                <ol style={{ marginLeft: "20px", marginBottom: "24px" }}>
                  <li style={{ marginBottom: "8px" }}>Open your Grafana Dashboard (http://localhost:3000). Watch the CPU/Memory graphs.</li>
                  <li style={{ marginBottom: "8px" }}>Open another tab to Prometheus Alerts (http://localhost:9090/alerts). You will see your <code>InstanceDown</code> alert is currently <strong>GREEN (Inactive)</strong>.</li>
                  <li style={{ marginBottom: "8px" }}>Open your WSL terminal and simulate a catastrophic failure by killing the exporter:
                    <CodeBlock title="WSL Terminal" code="docker stop node_exporter" />
                  </li>
                  <li style={{ marginBottom: "8px" }}>Wait 15 seconds. Go back to Grafana. You will see the graphs suddenly stop drawing data.</li>
                  <li style={{ marginBottom: "8px" }}>Go to the Prometheus Alerts page. You will see the alert turn <strong>YELLOW (Pending)</strong>. It is waiting to make sure this isn&apos;t just a 5-second network blip.</li>
                  <li style={{ marginBottom: "8px" }}>Wait exactly 1 minute. The alert will turn <strong>RED (Firing)</strong>. Alertmanager will now send the HTTP POST request to your Slack Webhook!</li>
                  <li style={{ marginBottom: "8px" }}>Fix the outage:
                    <CodeBlock title="WSL Terminal" code="docker start node_exporter" />
                  </li>
                  <li style={{ margin: 0 }}>Watch the alert turn Green again, and Grafana resume drawing.</li>
                </ol>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-experiment" />
                      <label htmlFor="mon-experiment">Ran the chaos experiment and confirmed alert status stages</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "errors":
            return (
              <div>
                <h2>Master Error Guide</h2>
                <p className="guide-subtitle">How to debug Observability tools.</p>

                <h3>1. Target Down (Connection Refused)</h3>
                <ErrorCard 
                  error='Get "http://localhost:9100/metrics": dial tcp 127.0.0.1:9100: connect: connection refused'
                  meaning="You go to Prometheus -> Status -> Targets, and the node_exporter is marked as DOWN."
                  fix="If you are using Docker Compose, localhost inside the Prometheus container means the Prometheus container itself! You must change localhost:9100 to node_exporter:9100 in your prometheus.yml."
                />

                <h3>2. Grafana No Data</h3>
                <ErrorCard 
                  error="No Data / Blank Panels"
                  meaning="You imported Dashboard 1860, but all the panels say 'No Data'."
                  fix="Look at the top left of the Dashboard. There is a drop-down menu called 'Job'. It is likely looking for a job named 'node', but in our prometheus.yml, we named our job 'node_exporter'. Change the drop-down to match your job name, and the graphs will instantly populate."
                />

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-errorsread" />
                      <label htmlFor="mon-errorsread">I have read the troubleshooting guide and understand local network resolution in Docker</label>
                    </li>
                  </ul>
                </div>
              </div>
            );
          case "destroy":
            return (
              <div>
                <h2>🗑️ Destroy Resources</h2>
                <p className="guide-subtitle">Cleaning up your local machine.</p>

                <p>Because we ran everything using Docker Compose locally, this project costs $0.00 and uses zero AWS credits. To clean up the RAM and CPU it is using on your laptop, simply run:</p>

                <CodeBlock 
                  title="WSL Terminal"
                  code="docker-compose down -v"
                />

                <div style={{ textAlign: "center", margin: "64px 0", padding: "40px", backgroundColor: "var(--g-accent-glow)", borderRadius: "12px", border: "1px solid var(--g-accent)" }}>
                  <h3 style={{ color: "var(--g-accent)", margin: "0 0 16px 0" }}>🎓 Monitoring Mastery Complete!</h3>
                  <p style={{ fontSize: "1.1rem", color: "var(--g-text-bright)", margin: 0 }}>
                    You now know how to gather data with Prometheus, visualize it with Grafana, and route critical alerts via Alertmanager.<br />
                    You are officially ready to deploy production monitoring.
                  </p>
                </div>

                <div style={{ marginTop: "40px" }}>
                  <h3>🏆 Section Checklist</h3>
                  <ul className="g-checklist">
                    <li className="g-checklist-item">
                      <input type="checkbox" className="g-guide-cb" id="mon-destroyrun" />
                      <label htmlFor="mon-destroyrun">Cleaned up running containers using docker-compose down</label>
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

const boxStyle = {
  border: "1px solid var(--g-border)",
  backgroundColor: "var(--g-sidebar-bg)",
  borderRadius: "8px",
  padding: "20px",
  margin: "24px 0",
  textAlign: "center"
};
