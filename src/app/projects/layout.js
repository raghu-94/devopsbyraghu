import "@/app/guides/guide-theme.css";

export const metadata = {
  title: "DevOps Projects — DevOps by Raghu",
  description: "Real-world, hands-on production-grade DevOps projects with step-by-step instructions.",
};

export default function ProjectsLayout({ children }) {
  return (
    <div className="projects-root">
      {children}
    </div>
  );
}
