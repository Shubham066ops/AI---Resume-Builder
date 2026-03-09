import { useResumeStore, computeATSScore } from "@/lib/resume-store";

const ATSScorePanel = () => {
  const { data } = useResumeStore();
  const { score, suggestions } = computeATSScore(data);

  const getColor = () => {
    if (score >= 70) return "hsl(var(--chart-2))";
    if (score >= 40) return "hsl(var(--chart-4))";
    return "hsl(var(--primary))";
  };

  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="space-y-6">
      <div>
        <p className="font-[var(--font-heading)] text-xs font-semibold uppercase tracking-[0.2em] text-foreground mb-4">
          ATS Readiness Score
        </p>
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
              <circle
                cx="48" cy="48" r="40"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="6"
              />
              <circle
                cx="48" cy="48" r="40"
                fill="none"
                stroke={getColor()}
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-[var(--font-heading)] text-2xl font-bold text-foreground">
                {score}
              </span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {score >= 70 ? "Strong resume — ready to submit." :
             score >= 40 ? "Getting there — a few improvements needed." :
             "Needs work — follow the suggestions below."}
          </div>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Suggestions
          </p>
          <ul className="space-y-1.5">
            {suggestions.map((s, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ATSScorePanel;
