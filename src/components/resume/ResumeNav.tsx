import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { to: "/builder", label: "Builder" },
  { to: "/preview", label: "Preview" },
  { to: "/proof", label: "Proof" },
];

const ResumeNav = () => (
  <nav className="sticky top-0 z-40 border-b border-border bg-background">
    <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
      <NavLink to="/" className="font-[var(--font-heading)] text-lg font-semibold text-foreground tracking-tight">
        AI Resume Builder
      </NavLink>
      <div className="flex items-center gap-6">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              cn(
                "text-sm font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </div>
  </nav>
);

export default ResumeNav;
