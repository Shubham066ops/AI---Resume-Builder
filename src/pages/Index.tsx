import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-border bg-card">
          <span className="text-2xl font-bold text-primary font-[var(--font-heading)]">RB</span>
        </div>
        <h1 className="text-3xl font-semibold text-foreground tracking-tight">
          AI Resume Builder — Build Track
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          Project 3 of the KodNest Premium Build System. Complete 8 structured steps to build and ship your AI Resume Builder.
        </p>
        <button
          onClick={() => navigate("/rb/01-problem")}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          Start Building
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Index;
