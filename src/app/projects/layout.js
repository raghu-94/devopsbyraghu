import "@/app/guides/guide-theme.css";

export const metadata = {
  title: "DevOps Projects — DevOps by Raghu",
  description: "Real-world, hands-on production-grade DevOps projects with step-by-step instructions.",
};

import DisclaimerModal from "@/components/DisclaimerModal";

export default function ProjectsLayout({ children }) {
  return (
    <div className="projects-root">
      <DisclaimerModal />
      {children}
    </div>
  );
}
