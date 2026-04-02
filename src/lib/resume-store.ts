import { create } from "zustand";

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
  githubUrl: string;
}

export interface SkillCategories {
  technical: string[];
  soft: string[];
  tools: string[];
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: SkillCategories;
  links: {
    github: string;
    linkedin: string;
  };
}

const STORAGE_KEY = "resumeBuilderData";

const emptyResume: ResumeData = {
  personalInfo: { name: "", email: "", phone: "", location: "" },
  summary: "",
  education: [],
  experience: [],
  projects: [],
  skills: { technical: [], soft: [], tools: [] },
  links: { github: "", linkedin: "" },
};

const sampleResume: ResumeData = {
  personalInfo: {
    name: "Arjun Mehta",
    email: "arjun.mehta@email.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
  },
  summary:
    "Full-stack developer with 3+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud-native architectures. Passionate about clean code and developer experience.",
  education: [
    {
      id: "edu-1",
      institution: "Indian Institute of Technology, Bangalore",
      degree: "B.Tech",
      field: "Computer Science",
      startDate: "2018",
      endDate: "2022",
    },
  ],
  experience: [
    {
      id: "exp-1",
      company: "Flipkart",
      role: "Software Engineer II",
      startDate: "Jul 2022",
      endDate: "Present",
      description:
        "Built micro-frontend architecture serving 10M+ daily users. Led migration from monolithic to microservices, reducing deployment time by 60%.",
    },
    {
      id: "exp-2",
      company: "Zoho",
      role: "Junior Developer",
      startDate: "Jan 2021",
      endDate: "Jun 2022",
      description:
        "Developed REST APIs and React dashboards for CRM product. Improved page load performance by 40% through code splitting.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "DevConnect",
      description:
        "A developer networking platform with real-time chat, project showcasing, and job matching.",
      techStack: ["React", "Node.js", "Socket.io", "PostgreSQL"],
      link: "https://devconnect.app",
      githubUrl: "https://github.com/arjun/devconnect",
    },
  ],
  skills: {
    technical: ["React", "TypeScript", "Node.js", "PostgreSQL", "GraphQL"],
    soft: ["Team Leadership", "Problem Solving"],
    tools: ["Git", "Docker", "AWS", "Tailwind CSS"],
  },
  links: {
    github: "https://github.com/arjunmehta",
    linkedin: "https://linkedin.com/in/arjunmehta",
  },
};

/** Migrate old string-based skills/projects to new format */
function migrateData(parsed: any): ResumeData {
  // Migrate skills from string to categories
  if (typeof parsed.skills === "string") {
    const arr = parsed.skills.split(",").map((s: string) => s.trim()).filter(Boolean);
    parsed.skills = { technical: arr, soft: [], tools: [] };
  } else if (!parsed.skills || typeof parsed.skills !== "object") {
    parsed.skills = { technical: [], soft: [], tools: [] };
  }

  // Migrate projects techStack from string to array, add githubUrl
  if (Array.isArray(parsed.projects)) {
    parsed.projects = parsed.projects.map((p: any) => ({
      ...p,
      techStack: typeof p.techStack === "string"
        ? p.techStack.split(",").map((s: string) => s.trim()).filter(Boolean)
        : (p.techStack || []),
      githubUrl: p.githubUrl || "",
    }));
  }

  return { ...emptyResume, ...parsed };
}

function loadFromStorage(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return migrateData(JSON.parse(raw));
  } catch {
    // ignore
  }
  return { ...emptyResume };
}

function saveToStorage(data: ResumeData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

interface ResumeStore {
  data: ResumeData;
  setField: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void;
  loadSample: () => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  data: loadFromStorage(),
  setField: (key, value) =>
    set((state) => {
      const next = { ...state.data, [key]: value };
      saveToStorage(next);
      return { data: next };
    }),
  loadSample: () => {
    saveToStorage({ ...sampleResume });
    return set({ data: { ...sampleResume } });
  },
  reset: () => {
    saveToStorage({ ...emptyResume });
    return set({ data: { ...emptyResume } });
  },
}));

/* ── Helpers ── */

/** Flatten all skills into a single array */
export function allSkills(skills: SkillCategories): string[] {
  return [...skills.technical, ...skills.soft, ...skills.tools];
}

/* ── ATS Score v1 (deterministic) ── */

export interface ATSResult {
  score: number;
  suggestions: string[];
}

export function computeATSScore(data: ResumeData): ATSResult {
  let score = 0;
  const suggestions: string[] = [];

  const wordCount = data.summary.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount >= 40 && wordCount <= 120) {
    score += 15;
  } else if (suggestions.length < 3) {
    suggestions.push("Write a stronger summary (target 40–120 words).");
  }

  if (data.projects.length >= 2) {
    score += 10;
  } else if (suggestions.length < 3) {
    suggestions.push("Add at least 2 projects.");
  }

  if (data.experience.length >= 1) {
    score += 10;
  } else if (suggestions.length < 3) {
    suggestions.push("Add at least 1 work experience entry.");
  }

  const skillCount = allSkills(data.skills).length;
  if (skillCount >= 8) {
    score += 10;
  } else if (suggestions.length < 3) {
    suggestions.push("Add more skills (target 8+).");
  }

  if (data.links.github || data.links.linkedin) {
    score += 10;
  } else if (suggestions.length < 3) {
    suggestions.push("Add a GitHub or LinkedIn link.");
  }

  const hasNumbers = /\d+%|\d+x|\d+k|\d+\+|\d+M/i;
  const allBullets = [
    ...data.experience.map((e) => e.description),
    ...data.projects.map((p) => p.description),
  ];
  if (allBullets.some((b) => hasNumbers.test(b))) {
    score += 15;
  } else if (suggestions.length < 3) {
    suggestions.push("Add measurable impact (numbers) in bullets.");
  }

  const eduComplete = data.education.length > 0 && data.education.every(
    (e) => e.institution && e.degree && e.field && e.startDate && e.endDate
  );
  if (eduComplete) {
    score += 10;
  } else if (suggestions.length < 3) {
    suggestions.push("Complete all education fields.");
  }

  return { score: Math.min(score, 100), suggestions: suggestions.slice(0, 3) };
}
