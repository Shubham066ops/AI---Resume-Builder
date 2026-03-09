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

interface ResumeStore {
  data: ResumeData;
  setField: <K extends keyof ResumeData>(key: K, value: ResumeData[K]) => void;
  loadSample: () => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  data: { ...emptyResume },
  setField: (key, value) =>
    set((state) => ({ data: { ...state.data, [key]: value } })),
  loadSample: () => set({ data: { ...sampleResume } }),
  reset: () => set({ data: { ...emptyResume } }),
}));
