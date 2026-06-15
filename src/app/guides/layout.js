import "./guide-theme.css";

export const metadata = {
  title: "DevOps Guides — DevOps by Raghu",
  description: "Interactive, hands-on learning guides for foundational DevOps tools.",
};

export default function GuidesLayout({ children }) {
  return (
    <div className="guides-root">
      {children}
    </div>
  );
}
