import { create } from "zustand";

export interface StepInfo {
  id: number;
  slug: string;
  title: string;
  artifactKey: string;
}

export const STEPS: StepInfo[] = [
  { id: 1, slug: "01-problem", title: "Problem Statement", artifactKey: "rb_step_1_artifact" },
  { id: 2, slug: "02-market", title: "Market Research", artifactKey: "rb_step_2_artifact" },
  { id: 3, slug: "03-architecture", title: "Architecture", artifactKey: "rb_step_3_artifact" },
  { id: 4, slug: "04-hld", title: "High-Level Design", artifactKey: "rb_step_4_artifact" },
  { id: 5, slug: "05-lld", title: "Low-Level Design", artifactKey: "rb_step_5_artifact" },
  { id: 6, slug: "06-build", title: "Build", artifactKey: "rb_step_6_artifact" },
  { id: 7, slug: "07-test", title: "Test", artifactKey: "rb_step_7_artifact" },
  { id: 8, slug: "08-ship", title: "Ship", artifactKey: "rb_step_8_artifact" },
];

interface BuildStore {
  artifacts: Record<string, string>;
  setArtifact: (key: string, value: string) => void;
  getHighestUnlockedStep: () => number;
  isStepComplete: (stepId: number) => boolean;
}

export const useBuildStore = create<BuildStore>((set, get) => ({
  artifacts: JSON.parse(localStorage.getItem("rb_artifacts") || "{}"),

  setArtifact: (key, value) => {
    set((state) => {
      const updated = { ...state.artifacts, [key]: value };
      localStorage.setItem("rb_artifacts", JSON.stringify(updated));
      return { artifacts: updated };
    });
  },

  getHighestUnlockedStep: () => {
    const { artifacts } = get();
    for (let i = 0; i < STEPS.length; i++) {
      if (!artifacts[STEPS[i].artifactKey]) return i + 1;
    }
    return STEPS.length + 1; // all complete
  },

  isStepComplete: (stepId: number) => {
    const step = STEPS.find((s) => s.id === stepId);
    if (!step) return false;
    return !!get().artifacts[step.artifactKey];
  },
}));
