import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center space-y-8">
        <h1 className="font-[var(--font-heading)] text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
          Build a Resume<br />That Gets Read.
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
          A clean, structured resume builder with live preview and premium typography.
        </p>
        <button
          onClick={() => navigate("/builder")}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          Start Building
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
