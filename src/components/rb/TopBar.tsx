import { STEPS, useBuildStore } from "@/lib/build-store";
import { CheckCircle2, Lock, Circle } from "lucide-react";

interface TopBarProps {
  currentStep: number;
}

const TopBar = ({ currentStep }: TopBarProps) => {
  const { isStepComplete, getHighestUnlockedStep } = useBuildStore();
  const unlocked = getHighestUnlockedStep();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-topbar text-topbar-foreground border-b border-border">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-md border border-topbar-foreground/20 flex items-center justify-center">
          <span className="text-xs font-bold font-[var(--font-heading)]">RB</span>
        </div>
        <span className="font-medium text-sm tracking-wide">AI Resume Builder</span>
      </div>

      <div className="hidden md:flex items-center gap-1">
        {STEPS.map((step) => {
          const complete = isStepComplete(step.id);
          const active = step.id === currentStep;
          const locked = step.id > unlocked;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                active
                  ? "text-primary"
                  : complete
                  ? "text-step-complete"
                  : locked
                  ? "text-step-locked"
                  : "text-topbar-foreground/50"
              }`}
            >
              {complete ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : locked ? (
                <Lock className="w-3.5 h-3.5" />
              ) : (
                <Circle className="w-3.5 h-3.5" />
              )}
              <span className="hidden lg:inline">{step.id}</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-topbar-foreground/60">
          Project 3 — Step {currentStep} of 8
        </span>
        <StatusBadge currentStep={currentStep} />
      </div>
    </div>
  );
};

const StatusBadge = ({ currentStep }: { currentStep: number }) => {
  const { isStepComplete, getHighestUnlockedStep } = useBuildStore();
  const unlocked = getHighestUnlockedStep();
  const allDone = unlocked > STEPS.length;

  if (allDone) {
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-badge-success/15 text-badge-success">
        COMPLETE
      </span>
    );
  }

  if (isStepComplete(currentStep)) {
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-semibold text-primary bg-primary/10">
        DONE
      </span>
    );
  }

  return (
    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-badge-warning/15 text-badge-warning">
      IN PROGRESS
    </span>
  );
};

export default TopBar;
