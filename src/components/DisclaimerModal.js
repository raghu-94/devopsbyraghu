"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show the modal every time the route changes
  useEffect(() => {
    if (mounted) {
      setIsOpen(true);
    }
  }, [pathname, mounted]);

  if (!mounted || !isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      zIndex: 9999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "var(--g-bg, #0a0a0a)",
        border: "1px solid var(--g-border, #333)",
        borderRadius: "12px",
        padding: "32px",
        maxWidth: "600px",
        width: "100%",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.75)"
      }}>
        <h2 style={{ marginTop: 0, marginBottom: "16px", color: "var(--g-text, #fff)", display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ fontSize: "1.5rem" }}>⚠️</span> Real-World Learning Disclaimer
        </h2>
        <div style={{ color: "var(--g-text-muted, #a3a3a3)", lineHeight: "1.6", fontSize: "1.05rem" }}>
          <p style={{ marginBottom: "16px", marginTop: 0 }}>
            This mastery guide/project might contain some errors or outdated steps. You may encounter them during your practice.
          </p>
          <p style={{ marginBottom: "32px", marginTop: 0 }}>
            We want you to tackle these errors by yourself or by using an AI assistant. Troubleshooting and debugging are crucial real-world skills for your IT career, where you will need to solve these kinds of errors independently.
          </p>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          style={{
            width: "100%",
            padding: "14px 24px",
            backgroundColor: "var(--g-accent, #3b82f6)",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            fontSize: "1.05rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "opacity 0.2s ease"
          }}
          onMouseOver={(e) => e.target.style.opacity = "0.9"}
          onMouseOut={(e) => e.target.style.opacity = "1"}
        >
          I Understand
        </button>
      </div>
    </div>
  );
}
