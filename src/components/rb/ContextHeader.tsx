import { StepInfo } from "@/lib/build-store";

interface ContextHeaderProps {
  step: StepInfo;
}

const ContextHeader = ({ step }: ContextHeaderProps) => {
  return (
    <div className="px-6 py-4 border-b border-border bg-surface">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
          {step.id}
        </div>
        <div>
          <h1 className="text-lg font-bold text-foreground">{step.title}</h1>
          <p className="text-xs text-muted-foreground">
            Complete this step and upload your artifact to proceed
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContextHeader;
