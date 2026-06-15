"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

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
    const targets = { tools: 7, projects: 3, free: 100 };

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
      name: "Docker Mastery",
      badge: "Beginner to Intermediate",
      badgeClass: "intermediate",
      desc: "Containerize applications from scratch. Understand layering, volume mounts, ports, and multi-stage builds.",
      route: "/guides/docker",
      meta: "12 Labs · Est. 4h",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      )
    },
    {
      name: "Dockerfile Best Practices",
      badge: "Intermediate",
      badgeClass: "intermediate",
      desc: "Optimize images for production. Multi-stage compilation, layer caching, security hardening, and minimized footprints.",
      route: "/guides/dockerfile-guide",
      meta: "8 Sections · Est. 2h",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      )
    },
    {
      name: "Jenkins CI/CD",
      badge: "Beginner to Expert",
      badgeClass: "expert",
      desc: "Automate build and deployment pipelines. Write scripted and declarative Jenkinsfiles, integrate webhooks & notifications.",
      route: "/guides/jenkins",
      meta: "10 Labs · Est. 6h",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      )
    },
    {
      name: "Kubernetes Mastery",
      badge: "Intermediate to Advanced",
      badgeClass: "advanced",
      desc: "Orchestrate containers at scale. Master pods, services, deployments, secrets, configmaps, persistent volumes & networking.",
      route: "/guides/kubernetes",
      meta: "15 Labs · Est. 7h",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
        </svg>
      )
    },
    {
      name: "Monitoring & Metrics",
      badge: "Intermediate",
      badgeClass: "intermediate",
      desc: "Implement complete stack visibility. Run Prometheus, Grafana, and node-exporter to track performance & alerts.",
      route: "/guides/monitoring",
      meta: "5 Labs · Est. 3h",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
        </svg>
      )
    },
    {
      name: "Python Automation",
      badge: "Beginner",
      badgeClass: "beginner",
      desc: "Automate repetitive DevOps tasks. Write robust scripts using core library, file operations, APIs, and logs parsing.",
      route: "/guides/python",
      meta: "6 Labs · Est. 2.5h",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
        </svg>
      )
    },
    {
      name: "DevOps Terminology",
      badge: "Beginner",
      badgeClass: "beginner",
      desc: "Get comfortable with foundational DevOps definitions, acronyms, and general concepts before writing code.",
      route: "/guides/terminology",
      meta: "1 Guide · Est. 1h",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      )
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
      accent: "IaC Migration"
    },
    {
      name: "Kubernetes GitOps Deployment",
      badge: "Expert",
      badgeClass: "expert",
      desc: "Deploy a highly available application in Kubernetes. Automate the deployments using ArgoCD, Helm, and Git webhook triggers.",
      route: "/projects/k8s-gitops",
      meta: "ArgoCD · Helm · Minikube · Git",
      accent: "GitOps Flow"
    },
    {
      name: "Serverless CI/CD Pipeline",
      badge: "Advanced",
      badgeClass: "advanced",
      desc: "Create a fully automated continuous deployment pipeline for AWS Lambda, using GitHub Actions, Jest tests, and AWS SAM.",
      route: "/projects/serverless-pipeline",
      meta: "GitHub Actions · Lambda · SAM",
      accent: "Serverless CD"
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
        <Link href="#guides" className="nav-cta-btn">Get started</Link>
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
          <Link href="#guides" className="nav-cta-btn" style={{ textAlign: "center" }} onClick={() => setMobileMenuOpen(false)}>Get started</Link>
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
          <h2 className="section-title">Core DevOps Toolkits</h2>
        </div>
        <div className="cards-grid">
          {toolsList.map((tool, index) => (
            <div key={index} className="card">
              <div className="card-header-img">
                {tool.icon}
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
        </div>
      </section>

      {/* Hands-on Projects Section */}
      <section id="projects" className="section fade-in-section">
        <div className="section-header">
          <span className="section-tag">Scenario Labs</span>
          <h2 className="section-title">Production Projects</h2>
        </div>
        <div className="cards-grid">
          {projectsList.map((proj, index) => (
            <div key={index} className="card">
              <div className="card-header-img" style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
                <span style={{ fontSize: "1.5rem", letterSpacing: "-0.5px" }}>{proj.accent}</span>
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
          <h2 className="section-title">About DevOps by Raghu</h2>
        </div>
        <div className="about-card">
          <div className="about-avatar-container">
            <div className="about-avatar">R</div>
          </div>
          <div className="about-bio">
            <h3>Hi, I&apos;m Raghu</h3>
            <p>
              I build and scale infrastructure. Over the years, I noticed that breaking into DevOps is tough because guides are either too theoretical or locked behind expensive subscriptions and corporate walls.
            </p>
            <p>
              I created this platform to share completely free, highly technical, and production-tested guides. Every guide here is structured as an interactive lab so you learn by doing, troubleshooting errors, and deploying real code.
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
          <Link href="#guides">
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
