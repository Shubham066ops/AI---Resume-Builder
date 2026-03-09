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
  techStack: string;
  link: string;
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
  skills: string;
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
  skills: "",
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
      techStack: "React, Node.js, Socket.io, PostgreSQL",
      link: "https://github.com/arjun/devconnect",
    },
  ],
  skills: "React, TypeScript, Node.js, PostgreSQL, AWS, Docker, Git, Tailwind CSS, GraphQL",
  links: {
    github: "https://github.com/arjunmehta",
    linkedin: "https://linkedin.com/in/arjunmehta",
  },
};

function loadFromStorage(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...emptyResume, ...parsed };
    }
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

/* ── ATS Score v1 (deterministic) ── */

export interface ATSResult {
  score: number;
  suggestions: string[];
}

export function computeATSScore(data: ResumeData): ATSResult {
  let score = 0;
  const suggestions: string[] = [];

  // +15 summary 40-120 words
  const wordCount = data.summary.trim().split(/\s+/).filter(Boolean).length;
  if (wordCount >= 40 && wordCount <= 120) {
    score += 15;
  } else if (suggestions.length < 3) {
    suggestions.push("Write a stronger summary (target 40–120 words).");
  }

  // +10 at least 2 projects
  if (data.projects.length >= 2) {
    score += 10;
  } else if (suggestions.length < 3) {
    suggestions.push("Add at least 2 projects.");
  }

  // +10 at least 1 experience
  if (data.experience.length >= 1) {
    score += 10;
  } else if (suggestions.length < 3) {
    suggestions.push("Add at least 1 work experience entry.");
  }

  // +10 skills >= 8
  const skillCount = data.skills.split(",").map((s) => s.trim()).filter(Boolean).length;
  if (skillCount >= 8) {
    score += 10;
  } else if (suggestions.length < 3) {
    suggestions.push("Add more skills (target 8+).");
  }

  // +10 github or linkedin
  if (data.links.github || data.links.linkedin) {
    score += 10;
  } else if (suggestions.length < 3) {
    suggestions.push("Add a GitHub or LinkedIn link.");
  }

  // +15 measurable impact (numbers in experience/project descriptions)
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

  // +10 education complete
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
