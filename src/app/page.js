"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

const toolAssets = {
  docker: { name: "Docker", image: "/images/logos/docker.svg" },
  dockerfile: { name: "Dockerfile", image: "/images/logos/docker.svg" },
  jenkins: { name: "Jenkins", image: "/images/logos/jenkins.svg" },
  kubernetes: { name: "Kubernetes", image: "/images/logos/kubernetes.svg" },
  monitoring: { name: "Monitoring", image: "/images/logos/prometheus.svg" },
  python: { name: "Python", image: "/images/logos/python.svg" },
  terraform: { name: "Terraform", image: "/images/logos/terraform.svg" },
  aws: { name: "AWS", image: "/images/logos/aws.svg" },
  "github-actions": { name: "GitHub Actions", image: "/images/logos/github-actions.svg" },
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Stats counters state
  const [stats, setStats] = useState({ tools: 0, projects: 0, free: 0 });
  const statsSectionRef = useRef(null);
  const animationStarted = useRef(false);

  useEffect(() => {
    // 1. Navbar scroll handler
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // 2. Intersection Observer for Fade-in Animations
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.15,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".fade-in-section");
    animatedElements.forEach((el) => sectionObserver.observe(el));

    // 3. Stats Count-up Animation Observer
    const statsObserver = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !animationStarted.current) {
        animationStarted.current = true;
        animateStats();
      }
    }, { threshold: 0.5 });

    if (statsSectionRef.current) {
      statsObserver.observe(statsSectionRef.current);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sectionObserver.disconnect();
      statsObserver.disconnect();
    };
  }, []);

  const animateStats = () => {
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const targets = { tools: 10, projects: 3, free: 100 };

    const updateCounters = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing function outQuad
      const ease = progress * (2 - progress);

      setStats({
        tools: Math.floor(ease * targets.tools),
        projects: Math.floor(ease * targets.projects),
        free: Math.floor(ease * targets.free),
      });

      if (progress < 1) {
        requestAnimationFrame(updateCounters);
      }
    };

    requestAnimationFrame(updateCounters);
  };

  const toolsList = [
    {
      name: "DevOps Terminology",
      badge: "Beginner",
      badgeClass: "beginner",
      desc: "Get comfortable with foundational DevOps definitions, acronyms, and general concepts before writing code.",
      route: "/guides/terminology",
      meta: "1 Guide · Est. 1h",
      image: "/images/terminology.png"
    },
    {
      name: "Python Automation",
      badge: "Beginner",
      badgeClass: "beginner",
      desc: "Automate repetitive DevOps tasks. Write robust scripts using core library, file operations, APIs, and logs parsing.",
      route: "/guides/python",
      meta: "6 Labs · Est. 2.5h",
      image: "/images/logos/python.svg"
    },
    {
      name: "Docker Mastery",
      badge: "Beginner to Intermediate",
      badgeClass: "intermediate",
      desc: "Containerize applications from scratch. Understand layering, volume mounts, ports, and multi-stage builds.",
      route: "/guides/docker",
      meta: "12 Labs · Est. 4h",
      image: "/images/logos/docker.svg"
    },
    {
      name: "Dockerfile Best Practices",
      badge: "Intermediate",
      badgeClass: "intermediate",
      desc: "Optimize images for production. Multi-stage compilation, layer caching, security hardening, and minimized footprints.",
      route: "/guides/dockerfile-guide",
      meta: "8 Sections · Est. 2h",
      image: "/images/logos/docker.svg"
    },
    {
      name: "Jenkins CI/CD",
      badge: "Beginner to Expert",
      badgeClass: "expert",
      desc: "Automate build and deployment pipelines. Write scripted and declarative Jenkinsfiles, integrate webhooks & notifications.",
      route: "/guides/jenkins",
      meta: "10 Labs · Est. 6h",
      image: "/images/logos/jenkins.svg"
    },
    {
      name: "Kubernetes Mastery",
      badge: "Intermediate to Advanced",
      badgeClass: "advanced",
      desc: "Orchestrate containers at scale. Master pods, services, deployments, secrets, configmaps, persistent volumes & networking.",
      route: "/guides/kubernetes",
      meta: "15 Labs · Est. 7h",
      image: "/images/logos/kubernetes.svg"
    },
    {
      name: "Monitoring & Metrics",
      badge: "Intermediate",
      badgeClass: "intermediate",
      desc: "Implement complete stack visibility. Run Prometheus, Grafana, and node-exporter to track performance & alerts.",
      route: "/guides/monitoring",
      meta: "5 Labs · Est. 3h",
      image: "/images/logos/prometheus.svg"
    },
    {
      name: "AWS VPN Wizard",
      badge: "Advanced",
      badgeClass: "advanced",
      desc: "Generate a personalized strongSwan Site-to-Site VPN setup guide. Upload your AWS config — zero placeholders, zero errors.",
      route: "/guides/aws-vpn-wizard",
      meta: "31 Steps · Est. 3h",
      image: "/images/logos/aws.svg"
    },
    {
      name: "Terraform Mastery",
      badge: "Beginner to Expert",
      badgeClass: "expert",
      desc: "Learn Infrastructure as Code from scratch. Master the core workflow, state management, modules, and CI/CD pipelines.",
      route: "/guides/terraform",
      meta: "25 Labs · Est. 8h",
      image: "/images/logos/terraform.svg"
    },
    {
      name: "Git Mastery",
      badge: "Beginner to Advanced",
      badgeClass: "advanced",
      desc: "From first commit to production branching strategy — no fluff, just the commands working engineers actually use.",
      route: "/guides/git",
      meta: "5 Stages · Est. 4h",
      image: "/images/logos/git.svg"
    },
    {
      name: "GitHub Actions Mastery",
      badge: "Beginner to Advanced",
      badgeClass: "advanced",
      desc: "From just wanting tests to run automatically to running your production deploy pipeline.",
      route: "/guides/github-actions",
      meta: "5 Stages · Est. 4h",
      image: "/images/logos/github-actions.svg"
    }
  ];

  const projectsList = [
    {
      name: "Infrastructure as Code Migration",
      badge: "Advanced",
      badgeClass: "advanced",
      desc: "Migrate an existing AWS manual infrastructure stack into clean, reusable Terraform configurations with workspaces.",
      route: "/projects/iac-migration",
      meta: "Terraform · AWS · S3 · VPC",
      accent: "IaC Migration",
      tools: ["terraform", "aws"]
    },
    {
      name: "Kubernetes GitOps Deployment",
      badge: "Expert",
      badgeClass: "expert",
      desc: "Deploy a highly available application in Kubernetes. Automate the deployments using ArgoCD, Helm, and Git webhook triggers.",
      route: "/projects/k8s-gitops",
      meta: "ArgoCD · Helm · Minikube · Git",
      accent: "GitOps Flow",
      tools: ["kubernetes", "docker", "jenkins"]
    },
    {
      name: "Serverless CI/CD Pipeline",
      badge: "Advanced",
      badgeClass: "advanced",
      desc: "Create a fully automated continuous deployment pipeline for AWS Lambda, using GitHub Actions, Jest tests, and AWS SAM.",
      route: "/projects/serverless-pipeline",
      meta: "GitHub Actions · Lambda · SAM",
      accent: "Serverless CD",
      tools: ["python", "github-actions", "aws"]
    }
  ];

  return (
    <>
      {/* Sticky Header */}
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-brand">
          DevOps by <span>Raghu</span>
        </div>
        <ul className="nav-links">
          <li><Link href="#home" className="nav-link">Home</Link></li>
          <li><Link href="#guides" className="nav-link">Guides</Link></li>
          <li><Link href="#projects" className="nav-link">Projects</Link></li>
          <li><Link href="#about" className="nav-link">About</Link></li>
        </ul>
        <Link href="#guides" className="nav-cta-btn" onClick={() => document.getElementById('guides')?.scrollIntoView({ behavior: 'smooth' })}>Get started</Link>
        <button 
          className="mobile-nav-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div 
          style={{
            position: "fixed",
            top: "72px",
            left: 0,
            width: "100%",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid var(--light-border)",
            zIndex: 999,
            padding: "20px 4%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)"
          }}
        >
          <Link href="#home" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="#guides" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Guides</Link>
          <Link href="#projects" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
          <Link href="#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="#guides" className="nav-cta-btn" style={{ textAlign: "center" }} onClick={() => { setMobileMenuOpen(false); document.getElementById('guides')?.scrollIntoView({ behavior: 'smooth' }); }}>Get started</Link>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>
            Free, Hands-on <span>DevOps Guides</span> Built from Real Experience
          </h1>
          <p>
            No paywalls. No registrations. Just clean, production-grade interactive guides and step-by-step projects to master modern IT operations.
          </p>
          <div className="hero-buttons">
            <Link href="#guides" className="btn-primary">Explore Guides</Link>
            <Link href="#projects" className="btn-secondary">View Projects</Link>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section ref={statsSectionRef} className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{stats.tools}+</div>
            <div className="stat-label">Foundational Guides</div>
            <div className="stat-desc">Docker, Kubernetes, Jenkins, Python & more</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.projects}</div>
            <div className="stat-label">Real Projects</div>
            <div className="stat-desc">Complete end-to-end architectures build instructions</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{stats.free}%</div>
            <div className="stat-label">Free & Accessible</div>
            <div className="stat-desc">No login, no subscriptions, fully open-source</div>
          </div>
        </div>
      </section>

      {/* Foundational Tools Section */}
      <section id="guides" className="section fade-in-section">
        <div className="section-header">
          <span className="section-tag">Foundation</span>
          <h2 className="section-title">Core <span>DevOps Toolkits</span></h2>
        </div>
        <div className="cards-grid">
          {toolsList.map((tool, index) => (
            <div key={index} className="card">
              <div className="card-header-img">
                <img src={tool.image} alt={tool.name} className="card-header-banner" />
              </div>
              <div className="card-body">
                <span className={`card-badge ${tool.badgeClass}`}>{tool.badge}</span>
                <h3>{tool.name}</h3>
                <p>{tool.desc}</p>
                <div className="card-meta">
                  <span>{tool.meta}</span>
                  <Link href={tool.route} className="card-action">
                    Read Guide →
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Placeholder card */}
          <div className="card" style={{ opacity: 0.7, borderStyle: "dashed" }}>
            <div className="card-header-img" style={{ background: "rgba(0,0,0,0.02)", color: "var(--light-text-muted)" }}>
              🛠️
            </div>
            <div className="card-body">
              <span className="card-badge beginner" style={{ background: "rgba(0,0,0,0.05)", color: "var(--light-text-muted)" }}>
                Upcoming
              </span>
              <h3>More Tool Guides</h3>
              <p>Mastery guides for GitHub Actions, Ansible, and other essential DevOps tools are under development.</p>
              <div className="card-meta">
                <span>Coming Soon</span>
                <span className="card-action" style={{ color: "var(--light-text-muted)" }}>Locked</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hands-on Projects Section */}
      <section id="projects" className="section fade-in-section">
        <div className="section-header">
          <span className="section-tag">Scenario Labs</span>
          <h2 className="section-title">Production <span>Projects</span></h2>
        </div>
        <div className="cards-grid">
          {projectsList.map((proj, index) => (
            <div key={index} className="card">
              <div className="card-header-img" style={{ background: "radial-gradient(circle at center, #1f2937, #111827)" }}>
                <div className="project-tool-stack">
                  {proj.tools.map((toolKey, idx) => {
                    const tool = toolAssets[toolKey];
                    if (!tool) return null;
                    return (
                      <div 
                        key={toolKey} 
                        className="project-tool-avatar" 
                        style={{ zIndex: proj.tools.length - idx }}
                        title={tool.name}
                      >
                        <img src={tool.image} alt={tool.name} />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="card-body">
                <span className={`card-badge ${proj.badgeClass}`}>{proj.badge}</span>
                <h3>{proj.name}</h3>
                <p>{proj.desc}</p>
                <div className="card-meta">
                  <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--light-text-muted)" }}>
                    {proj.meta}
                  </span>
                  <Link href={proj.route} className="card-action">
                    View Project →
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Placeholder card */}
          <div className="card" style={{ opacity: 0.7, borderStyle: "dashed" }}>
            <div className="card-header-img" style={{ background: "rgba(0,0,0,0.02)", color: "var(--light-text-muted)" }}>
              🔒
            </div>
            <div className="card-body">
              <span className="card-badge intermediate" style={{ background: "rgba(0,0,0,0.05)", color: "var(--light-text-muted)" }}>
                Upcoming
              </span>
              <h3>GitOps & SecOps Pipeline</h3>
              <p>Adding container scanning, dependency auditing, and automated secrets rotation to existing pipelines.</p>
              <div className="card-meta">
                <span>Coming Soon</span>
                <span className="card-action" style={{ color: "var(--light-text-muted)" }}>Locked</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section fade-in-section">
        <div className="section-header">
          <span className="section-tag">The Creator</span>
          <h2 className="section-title">About <span>DevOps by Raghu</span></h2>
        </div>
        <div className="about-card">
          <div className="about-avatar-container">
            <img src="/images/about-r-logo.jpg" alt="Raghu" className="about-avatar" />
          </div>
          <div className="about-bio">
            <h3>Hi, I&apos;m Raghu</h3>
            <p>
              Most DevOps resources teach tools in isolation — I wanted to understand how they actually connect in a real production environment. No course or guide was giving me that, so I took a different approach.
            </p>
            <p>
              I started reverse engineering production-grade architectures myself — breaking them down, rebuilding them from scratch, and documenting every error, every fix, and every decision along the way.
            </p>
            <p>
              This platform is the result of that process. Every guide and project here is built the way I wished someone had taught me — hands-on, end-to-end, with real errors and real solutions, not just happy path walkthroughs.
            </p>
            <p>
              If you&apos;re tired of theoretical guides that fall apart the moment you try to actually build something — this is for you.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="cta-banner-content">
          <h2>Ready to Level Up Your Skills?</h2>
          <p>
            Start with the DevOps Terminology guide or dive straight into one of the containerization labs.
          </p>
          <Link href="#guides" onClick={() => document.getElementById('guides')?.scrollIntoView({ behavior: 'smooth' })}>
            <button>Get Started Now</button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3>DevOps by <span>Raghu</span></h3>
            <p>A free, open-source repository of DevOps tutorials, step-by-step guides, and containerized projects.</p>
          </div>
          <div>
            <h4 className="footer-title">Content</h4>
            <ul className="footer-links">
              <li><Link href="#guides" className="footer-link">Tool Guides</Link></li>
              <li><Link href="#projects" className="footer-link">Projects</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Legal & Contact</h4>
            <ul className="footer-links">
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} DevOps by Raghu. All rights reserved.</div>
          <div>Bengaluru, India</div>
        </div>
      </footer>
    </>
  );
}
