import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { STEPS, useBuildStore } from "@/lib/build-store";
import { CheckCircle2, XCircle, Copy, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const ProofPage = () => {
  const navigate = useNavigate();
  const { isStepComplete } = useBuildStore();
  const allComplete = STEPS.every((s) => isStepComplete(s.id));

  const [lovableLink, setLovableLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [deployLink, setDeployLink] = useState("");

  const handleCopySubmission = () => {
    const submission = `AI Resume Builder — Build Track Submission
============================================
${STEPS.map(
  (s) => `Step ${s.id}: ${s.title} — ${isStepComplete(s.id) ? "✅ Complete" : "❌ Incomplete"}`
).join("\n")}

Lovable Link: ${lovableLink || "N/A"}
GitHub Link: ${githubLink || "N/A"}
Deploy Link: ${deployLink || "N/A"}
============================================`;

    navigator.clipboard.writeText(submission);
    toast.success("Submission copied to clipboard!");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-topbar text-topbar-foreground border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md border border-topbar-foreground/20 flex items-center justify-center">
            <span className="text-xs font-bold font-[var(--font-heading)]">RB</span>
          </div>
          <span className="font-medium text-sm">AI Resume Builder</span>
        </div>
        <span className="text-xs text-topbar-foreground/60">Proof of Completion</span>
        {allComplete ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-badge-success/15 text-badge-success">
            ALL COMPLETE
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-badge-warning/15 text-badge-warning">
            INCOMPLETE
          </span>
        )}
      </div>

      <div className="flex-1 overflow-auto p-10">
        <div className="max-w-xl mx-auto space-y-8">
          <button
            onClick={() => navigate("/rb/01-problem")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Steps
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-foreground">Proof of Completion</h1>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              Review your progress and submit your project links.
            </p>
          </div>

          {/* Step status grid */}
          <div className="grid grid-cols-2 gap-3">
            {STEPS.map((step) => {
              const complete = isStepComplete(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => navigate(`/rb/${step.slug}`)}
                  className={`flex items-center gap-3 p-4 rounded-md border transition-colors text-left ${
                    complete
                      ? "border-primary/20 bg-primary/5"
                      : "border-border bg-surface"
                  }`}
                >
                  {complete ? (
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-step-locked flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">Step {step.id}</p>
                    <p className="text-xs text-muted-foreground">{step.title}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Link inputs */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">Project Links</h2>
            <InputField
              label="Lovable Project Link"
              value={lovableLink}
              onChange={setLovableLink}
              placeholder="https://lovable.dev/projects/..."
            />
            <InputField
              label="GitHub Repository"
              value={githubLink}
              onChange={setGithubLink}
              placeholder="https://github.com/..."
            />
            <InputField
              label="Deployed URL"
              value={deployLink}
              onChange={setDeployLink}
              placeholder="https://your-app.lovable.app"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleCopySubmission}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Copy className="w-4 h-4" />
            Copy Final Submission
          </button>
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) => (
  <div>
    <label className="text-xs font-medium text-muted-foreground mb-2 block">{label}</label>
    <input
      type="url"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-4 py-3 text-sm bg-surface border border-border rounded-md text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring"
    />
  </div>
);

export default ProofPage;
