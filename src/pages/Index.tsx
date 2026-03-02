import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-2">
          <span className="text-2xl font-bold">RB</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          AI Resume Builder — Build Track
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Project 3 of the KodNest Premium Build System. Complete 8 structured steps to build and ship your AI Resume Builder.
        </p>
        <button
          onClick={() => navigate("/rb/01-problem")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
        >
          Start Building
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Index;
