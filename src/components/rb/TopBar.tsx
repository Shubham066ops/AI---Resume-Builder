import { STEPS, useBuildStore } from "@/lib/build-store";
import { CheckCircle2, Lock, Circle } from "lucide-react";

interface TopBarProps {
  currentStep: number;
}

const TopBar = ({ currentStep }: TopBarProps) => {
  const { isStepComplete, getHighestUnlockedStep } = useBuildStore();
  const unlocked = getHighestUnlockedStep();

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-topbar text-topbar-foreground border-b border-border">
      <div className="flex items-center gap-2">
        <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-xs font-bold">RB</span>
        </div>
        <span className="font-semibold text-sm tracking-tight">AI Resume Builder</span>
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
                  ? "bg-primary/15 text-primary"
                  : complete
                  ? "text-step-complete"
                  : locked
                  ? "text-step-locked"
                  : "text-muted-foreground"
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

      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">
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
      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-badge-success/15 text-badge-success">
        COMPLETE
      </span>
    );
  }

  if (isStepComplete(currentStep)) {
    return (
      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-badge-info/15 text-badge-info">
        DONE
      </span>
    );
  }

  return (
    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-badge-warning/15 text-badge-warning">
      IN PROGRESS
    </span>
  );
};

export default TopBar;
