import { useState } from "react";
import { useBuildStore, StepInfo } from "@/lib/build-store";
import { Copy, ExternalLink, CheckCircle2, XCircle, ImagePlus } from "lucide-react";
import { toast } from "sonner";

interface BuildPanelProps {
  step: StepInfo;
}

const STEP_PROMPTS: Record<number, string> = {
  1: "Analyze the AI Resume Builder market. Define the core problem statement: why do job seekers need an AI-powered resume builder? What pain points exist with current solutions?",
  2: "Research the AI Resume Builder market. List top 5 competitors, their pricing, key features, and gaps we can exploit. Include market size data.",
  3: "Design the system architecture for an AI Resume Builder. Include: frontend (React), backend (Node/Supabase), AI layer (OpenAI), storage, and auth flow. Provide a diagram description.",
  4: "Create a High-Level Design for the AI Resume Builder. Define modules: Auth, Resume Editor, AI Suggestions, Template Engine, Export (PDF/DOCX). Show data flow between modules.",
  5: "Create a Low-Level Design. Define database schema (users, resumes, sections, templates), API endpoints, component tree, and state management approach.",
  6: "Build the AI Resume Builder MVP. Start with: user auth, resume CRUD, section editor (experience, education, skills), and one template. Use React + Supabase.",
  7: "Write tests for the AI Resume Builder. Cover: auth flow, resume creation, section editing, template rendering, and PDF export. Include unit and integration tests.",
  8: "Ship the AI Resume Builder. Deploy to production. Set up: custom domain, SEO meta tags, analytics, error monitoring, and a launch checklist.",
};

const BuildPanel = ({ step }: BuildPanelProps) => {
  const { setArtifact, isStepComplete } = useBuildStore();
  const [status, setStatus] = useState<"idle" | "worked" | "error">("idle");
  const prompt = STEP_PROMPTS[step.id] || "";
  const complete = isStepComplete(step.id);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    toast.success("Copied to clipboard!");
  };

  const handleWorked = () => {
    setArtifact(step.artifactKey, `completed_${Date.now()}`);
    setStatus("worked");
    toast.success(`Step ${step.id} marked as complete!`);
  };

  return (
    <div className="flex flex-col h-full border-l border-border bg-panel">
      <div className="px-4 py-4 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Build Panel</h2>
        <p className="text-[11px] text-muted-foreground mt-1">
          Copy the prompt below and paste it into Lovable
        </p>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Prompt textarea */}
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-2 block">
            Copy This Into Lovable
          </label>
          <textarea
            readOnly
            value={prompt}
            className="w-full h-36 p-4 text-xs bg-surface border border-border rounded-md resize-none text-foreground focus:outline-none focus:ring-1 focus:ring-ring leading-relaxed"
          />
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-border bg-card text-foreground text-sm font-medium hover:bg-secondary transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copy Prompt
        </button>

        {/* Build in Lovable */}
        <a
          href="https://lovable.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
        >
          <ExternalLink className="w-4 h-4" />
          Build in Lovable
        </a>

        {/* Status buttons */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Mark Result</p>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleWorked}
              disabled={complete}
              className={`flex flex-col items-center gap-1 p-3 rounded-md text-[11px] font-medium transition-colors border ${
                status === "worked" || complete
                  ? "border-primary/30 bg-primary/5 text-primary"
                  : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              It Worked
            </button>
            <button
              onClick={() => setStatus("error")}
              className={`flex flex-col items-center gap-1 p-3 rounded-md text-[11px] font-medium transition-colors border ${
                status === "error"
                  ? "border-destructive/30 bg-destructive/5 text-destructive"
                  : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-destructive/30"
              }`}
            >
              <XCircle className="w-4 h-4" />
              Error
            </button>
            <button
              className="flex flex-col items-center gap-1 p-3 rounded-md text-[11px] font-medium transition-colors border border-border bg-card text-muted-foreground hover:text-foreground"
            >
              <ImagePlus className="w-4 h-4" />
              Screenshot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildPanel;
