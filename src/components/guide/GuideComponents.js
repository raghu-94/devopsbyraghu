"use client";

import { useState } from "react";

// 1. CodeBlock Component with Copy Button
export function CodeBlock({ title, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  return (
    <div className="g-code-wrapper">
      <div className="g-code-header">
        <span>{title || "Code"}</span>
        <button 
          onClick={handleCopy} 
          className={`g-copy-btn ${copied ? "copied" : ""}`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="g-code-content">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}

// 2. ConceptBox Component
export function ConceptBox({ title, children }) {
  return (
    <div className="g-concept-box">
      {title && <h4>💡 {title}</h4>}
      <div>{children}</div>
    </div>
  );
}

// 3. TipBox Component
export function TipBox({ children }) {
  return (
    <div className="g-tip-box">
      {children}
    </div>
  );
}

// 4. WarningBox Component
export function WarningBox({ children }) {
  return (
    <div className="g-warning-box">
      {children}
    </div>
  );
}

// 5. ErrorCard Component
export function ErrorCard({ error, meaning, fix }) {
  return (
    <div className="g-error-card">
      <h4>❌ {error}</h4>
      {meaning && (
        <div className="g-error-detail">
          <strong>What it means:</strong>
          <p>{meaning}</p>
        </div>
      )}
      <div className="g-error-detail">
        <strong>Fix:</strong>
        <p>{fix}</p>
      </div>
    </div>
  );
}

// 6. Quiz Component
export function Quiz({ question, answer }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="g-quiz-card">
      <h4>✅ Check Your Understanding</h4>
      <p className="g-quiz-question">{question}</p>
      <button 
        onClick={() => setRevealed(!revealed)} 
        className="g-quiz-btn"
      >
        {revealed ? "Hide Answer" : "Show Answer"}
      </button>
      <div className={`g-quiz-answer ${revealed ? "visible" : ""}`}>
        {answer}
      </div>
    </div>
  );
}
