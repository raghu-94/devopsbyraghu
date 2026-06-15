"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function GuideWrapper({ title, subtitle, navGroups, children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [progress, setProgress] = useState(0);
  
  const pathname = usePathname();
  const storageKey = `guide-progress-${pathname.replace(/\//g, "-")}`;
  const contentRef = useRef(null);

  // Flatten sections for navigation
  const flatSections = navGroups.flatMap(group => group.items);

  // Initialize active section from hash or first item
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && flatSections.some(sec => sec.id === hash)) {
        setActiveSection(hash);
      } else if (flatSections.length > 0) {
        setActiveSection(flatSections[0].id);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [navGroups]);

  // Load progress and set up event listener for checkbox changes
  useEffect(() => {
    const loadProgress = () => {
      const saved = localStorage.getItem(storageKey);
      if (saved && contentRef.current) {
        try {
          const checkboxStates = JSON.parse(saved);
          const checkboxes = contentRef.current.querySelectorAll('.g-guide-cb');
          checkboxes.forEach((cb, i) => {
            if (checkboxStates[i] !== undefined) {
              cb.checked = checkboxStates[i];
            }
          });
        } catch (e) {
          console.error("Failed to parse saved progress", e);
        }
      }
      updateProgress();
    };

    // Delay slightly to ensure children are fully rendered
    const timer = setTimeout(loadProgress, 100);
    return () => clearTimeout(timer);
  }, [activeSection]);

  const updateProgress = () => {
    if (!contentRef.current) return;
    const checkboxes = contentRef.current.querySelectorAll('.g-guide-cb');
    if (checkboxes.length === 0) {
      setProgress(0);
      return;
    }
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percent = Math.round((checked / checkboxes.length) * 100);
    setProgress(percent);

    // Save states
    const states = Array.from(checkboxes).map(cb => cb.checked);
    localStorage.setItem(storageKey, JSON.stringify(states));
  };

  const handleCheckboxChange = (e) => {
    if (e.target.classList.contains('g-guide-cb')) {
      updateProgress();
    }
  };

  const selectSection = (id) => {
    setActiveSection(id);
    window.location.hash = id;
    setMobileSidebarOpen(false);
    // Scroll content to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Find next/prev buttons
  const currentIndex = flatSections.findIndex(sec => sec.id === activeSection);
  const prevSection = currentIndex > 0 ? flatSections[currentIndex - 1] : null;
  const nextSection = currentIndex < flatSections.length - 1 ? flatSections[currentIndex + 1] : null;

  // Filtered groups based on search
  const filteredGroups = navGroups.map(group => {
    const items = group.items.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...group, items };
  }).filter(group => group.items.length > 0);

  return (
    <div className="guide-layout" onChange={handleCheckboxChange}>
      {/* Sidebar */}
      <aside className={`guide-sidebar ${sidebarCollapsed ? "collapsed" : ""} ${mobileSidebarOpen ? "mobile-open" : ""}`}>
        <div className="guide-sidebar-header">
          <h2>
            <Link href="/" style={{ color: "inherit", textDecoration: "none" }}>
              ← DevOps by <span>Raghu</span>
            </Link>
          </h2>
          <div style={{ fontSize: "0.85rem", color: "var(--g-text-muted)", marginTop: "4px" }}>
            {title}
          </div>
          
          {/* Progress Tracker */}
          <div className="guide-progress">
            <div className="guide-progress-bar-bg">
              <div className="guide-progress-bar-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="guide-progress-text">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
          </div>

          {/* Search bar */}
          <input 
            type="text" 
            placeholder="Search labs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              marginTop: "16px",
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid var(--g-border)",
              backgroundColor: "var(--g-bg)",
              color: "var(--g-text)",
              fontSize: "0.85rem"
            }}
          />
        </div>

        {/* Sidebar Nav */}
        <nav className="guide-sidebar-nav">
          {filteredGroups.map((group, gIdx) => (
            <div key={gIdx} style={{ marginBottom: "16px" }}>
              <div className="guide-nav-group-title">{group.title}</div>
              <ul className="guide-nav-list">
                {group.items.map((item) => (
                  <li 
                    key={item.id} 
                    className={`guide-nav-item ${activeSection === item.id ? "active" : ""}`}
                  >
                    <button onClick={() => selectSection(item.id)}>
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* Floating Hamburger Toggle Button on Mobile / Collapsed Toggle */}
      <button 
        className="guide-sidebar-toggle"
        onClick={() => {
          if (window.innerWidth <= 900) {
            setMobileSidebarOpen(!mobileSidebarOpen);
          } else {
            setSidebarCollapsed(!sidebarCollapsed);
          }
        }}
        aria-label="Toggle Sidebar"
      >
        {sidebarCollapsed || (window.innerWidth <= 900 && !mobileSidebarOpen) ? "☰" : "✕"}
      </button>

      {/* Main Content Area */}
      <main className={`guide-main ${sidebarCollapsed ? "expanded" : ""}`} ref={contentRef}>
        <div className="guide-container">
          <h1>{title}</h1>
          <p className="guide-subtitle">{subtitle}</p>

          {/* Render child sections */}
          {flatSections.map((sec) => (
            <div 
              key={sec.id} 
              id={sec.id}
              className={`guide-content-section ${activeSection === sec.id ? "active" : ""}`}
            >
              {/* Render content specific to this section */}
              {children(sec.id)}

              {/* Dynamic Next/Prev buttons */}
              <div className="g-nav-buttons">
                {prevSection ? (
                  <button onClick={() => selectSection(prevSection.id)} className="g-nav-btn">
                    ← {prevSection.title.split(":")[0]}
                  </button>
                ) : (
                  <div></div>
                )}
                {nextSection ? (
                  <button onClick={() => selectSection(nextSection.id)} className="g-nav-btn g-nav-btn-next">
                    {nextSection.title.split(":")[0]} →
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
