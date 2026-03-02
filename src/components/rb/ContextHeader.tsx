import { StepInfo } from "@/lib/build-store";

interface ContextHeaderProps {
  step: StepInfo;
}

const ContextHeader = ({ step }: ContextHeaderProps) => {
  return (
    <div className="px-6 py-4 border-b border-border bg-surface">
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-md border border-primary/20 text-primary font-bold text-sm font-[var(--font-heading)]">
          {step.id}
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">{step.title}</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Complete this step and upload your artifact to proceed
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContextHeader;
