import { useTemplateStore, TemplateName } from "@/lib/template-store";

const options: { value: TemplateName; label: string }[] = [
  { value: "classic", label: "Classic" },
  { value: "modern", label: "Modern" },
  { value: "minimal", label: "Minimal" },
];

const TemplateSelector = () => {
  const { template, setTemplate } = useTemplateStore();

  return (
    <div className="flex items-center gap-1 rounded-md bg-muted p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => setTemplate(o.value)}
          className={`px-3 py-1.5 text-sm rounded-sm transition-all ${
            template === o.value
              ? "bg-background text-foreground shadow-sm font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
