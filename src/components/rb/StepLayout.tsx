import { useNavigate, useParams } from "react-router-dom";
import { STEPS, useBuildStore } from "@/lib/build-store";
import TopBar from "./TopBar";
import ContextHeader from "./ContextHeader";
import BuildPanel from "./BuildPanel";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";

interface StepLayoutProps {
  children: React.ReactNode;
}

const StepLayout = ({ children }: StepLayoutProps) => {
  const navigate = useNavigate();
  const params = useParams<{ stepSlug: string }>();
  const { isStepComplete, getHighestUnlockedStep } = useBuildStore();

  const currentStep = STEPS.find((s) => s.slug === params.stepSlug);
  if (!currentStep) return null;

  const unlocked = getHighestUnlockedStep();
  const prevStep = STEPS.find((s) => s.id === currentStep.id - 1);
  const nextStep = STEPS.find((s) => s.id === currentStep.id + 1);
  const canGoNext = isStepComplete(currentStep.id) && nextStep;
  const isLastStep = currentStep.id === STEPS.length;

  return (
    <div className="flex flex-col h-screen bg-background">
      <TopBar currentStep={currentStep.id} />
      <ContextHeader step={currentStep} />

      <div className="flex flex-1 overflow-hidden">
        {/* Main workspace */}
        <div className="flex-[7] flex flex-col overflow-auto">
          <div className="flex-1 p-6">{children}</div>

          {/* Navigation footer */}
          <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-surface">
            <button
              onClick={() => prevStep && navigate(`/rb/${prevStep.slug}`)}
              disabled={!prevStep}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-1">
              {STEPS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => s.id <= unlocked && navigate(`/rb/${s.slug}`)}
                  disabled={s.id > unlocked}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    s.id === currentStep.id
                      ? "bg-primary"
                      : isStepComplete(s.id)
                      ? "bg-step-complete/50"
                      : s.id <= unlocked
                      ? "bg-muted-foreground/30"
                      : "bg-step-locked/30"
                  }`}
                />
              ))}
            </div>

            {isLastStep ? (
              <button
                onClick={() => navigate("/rb/proof")}
                disabled={!isStepComplete(currentStep.id)}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                View Proof
              </button>
            ) : (
              <button
                onClick={() => canGoNext && navigate(`/rb/${nextStep.slug}`)}
                disabled={!canGoNext}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                {!isStepComplete(currentStep.id) && <Lock className="w-3 h-3" />}
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Build panel - 30% */}
        <div className="flex-[3] hidden md:flex flex-col">
          <BuildPanel step={currentStep} />
        </div>
      </div>
    </div>
  );
};

export default StepLayout;
