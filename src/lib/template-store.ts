import { create } from "zustand";

export type TemplateName = "classic" | "modern" | "minimal";

const TEMPLATE_KEY = "resumeTemplate";

function loadTemplate(): TemplateName {
  try {
    const v = localStorage.getItem(TEMPLATE_KEY);
    if (v === "classic" || v === "modern" || v === "minimal") return v;
  } catch {}
  return "classic";
}

interface TemplateStore {
  template: TemplateName;
  setTemplate: (t: TemplateName) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  template: loadTemplate(),
  setTemplate: (t) => {
    try { localStorage.setItem(TEMPLATE_KEY, t); } catch {}
    set({ template: t });
  },
}));

/* Template-specific style maps — layout only, no color changes */
export const templateStyles = {
  classic: {
    headerAlign: "text-center" as const,
    sectionTitle: "font-[var(--font-heading)] text-xs font-semibold uppercase tracking-[0.2em] text-foreground mb-2 pb-1 border-b border-border",
    nameSize: "text-2xl",
    spacing: "space-y-6",
  },
  modern: {
    headerAlign: "text-left" as const,
    sectionTitle: "font-[var(--font-heading)] text-sm font-bold uppercase tracking-widest text-foreground mb-2",
    nameSize: "text-3xl",
    spacing: "space-y-5",
  },
  minimal: {
    headerAlign: "text-center" as const,
    sectionTitle: "font-[var(--font-body)] text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground mb-2",
    nameSize: "text-xl",
    spacing: "space-y-4",
  },
};
