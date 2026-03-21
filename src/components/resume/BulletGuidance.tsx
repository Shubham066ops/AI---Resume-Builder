const ACTION_VERBS = /^(built|developed|designed|implemented|led|improved|created|optimized|automated|managed|launched|delivered|architected|reduced|increased|migrated|refactored|deployed|integrated|maintained)/i;
const HAS_NUMBERS = /\d+%|\d+x|\d+k|\d+\+|\d+M|\d+m|\d+ /i;

const BulletGuidance = ({ text }: { text: string }) => {
  if (!text.trim()) return null;

  const needsVerb = !ACTION_VERBS.test(text.trim());
  const needsNumbers = !HAS_NUMBERS.test(text);

  if (!needsVerb && !needsNumbers) return null;

  return (
    <div className="flex flex-wrap gap-3 mt-1">
      {needsVerb && (
        <span className="text-xs text-muted-foreground italic">
          ↳ Start with a strong action verb.
        </span>
      )}
      {needsNumbers && (
        <span className="text-xs text-muted-foreground italic">
          ↳ Add measurable impact (numbers).
        </span>
      )}
    </div>
  );
};

export default BulletGuidance;
