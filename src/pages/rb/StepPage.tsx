import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { STEPS, useBuildStore } from "@/lib/build-store";
import StepLayout from "@/components/rb/StepLayout";
import { FileText, Target, BarChart3, Layers, Code2, Hammer, FlaskConical, Rocket } from "lucide-react";

const STEP_ICONS: Record<number, React.ReactNode> = {
  1: <Target className="w-10 h-10" />,
  2: <BarChart3 className="w-10 h-10" />,
  3: <Layers className="w-10 h-10" />,
  4: <FileText className="w-10 h-10" />,
  5: <Code2 className="w-10 h-10" />,
  6: <Hammer className="w-10 h-10" />,
  7: <FlaskConical className="w-10 h-10" />,
  8: <Rocket className="w-10 h-10" />,
};

const STEP_DESCRIPTIONS: Record<number, string> = {
  1: "Define the core problem your AI Resume Builder will solve. Identify user pain points, current market gaps, and the value proposition.",
  2: "Research competitors, analyze market size, identify target users, and find opportunities for differentiation.",
  3: "Design the overall system architecture including frontend, backend, AI integration, and infrastructure components.",
  4: "Create module-level designs showing how Auth, Resume Editor, AI Engine, Templates, and Export work together.",
  5: "Define database schemas, API contracts, component hierarchies, and detailed state management patterns.",
  6: "Build the MVP following the designs. Start with core functionality and iterate.",
  7: "Write comprehensive tests covering auth flows, CRUD operations, AI features, and edge cases.",
  8: "Deploy to production. Configure domains, monitoring, SEO, and prepare for launch.",
};

const StepPage = () => {
  const navigate = useNavigate();
  const { stepSlug } = useParams<{ stepSlug: string }>();
  const { getHighestUnlockedStep, isStepComplete } = useBuildStore();

  const currentStep = STEPS.find((s) => s.slug === stepSlug);

  useEffect(() => {
    if (!currentStep) {
      navigate("/rb/01-problem");
      return;
    }
    const unlocked = getHighestUnlockedStep();
    if (currentStep.id > unlocked) {
      const lastUnlocked = STEPS[unlocked - 1] || STEPS[0];
      navigate(`/rb/${lastUnlocked.slug}`);
    }
  }, [currentStep, navigate, getHighestUnlockedStep]);

  if (!currentStep) return null;

  const complete = isStepComplete(currentStep.id);

  return (
    <StepLayout>
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col items-center text-center mb-10">
          <div className={`mb-6 ${complete ? "text-primary" : "text-muted-foreground"}`}>
            {STEP_ICONS[currentStep.id]}
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-3">
            Step {currentStep.id}: {currentStep.title}
          </h2>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            {STEP_DESCRIPTIONS[currentStep.id]}
          </p>
        </div>

        {complete ? (
          <div className="rounded-md border border-primary/20 bg-primary/5 p-6 text-center">
            <p className="text-sm font-medium text-primary">
              ✓ Artifact uploaded — Step complete
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              You can proceed to the next step or revisit this one.
            </p>
          </div>
        ) : (
          <div className="rounded-md border border-border bg-surface p-6 text-center">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use the Build Panel on the right to copy the prompt, build in Lovable, and mark this step complete.
            </p>
          </div>
        )}
      </div>
    </StepLayout>
  );
};

export default StepPage;
