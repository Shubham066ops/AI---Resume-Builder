import { useResumeStore, Education, Experience, Project } from "@/lib/resume-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Sparkles } from "lucide-react";
import BulletGuidance from "./BulletGuidance";

const uid = () => crypto.randomUUID();

const BuilderForm = () => {
  const { data, setField, loadSample } = useResumeStore();

  const updatePersonal = (key: string, value: string) =>
    setField("personalInfo", { ...data.personalInfo, [key]: value });

  const updateLinks = (key: string, value: string) =>
    setField("links", { ...data.links, [key]: value });

  const addEducation = () =>
    setField("education", [
      ...data.education,
      { id: uid(), institution: "", degree: "", field: "", startDate: "", endDate: "" },
    ]);

  const removeEducation = (id: string) =>
    setField("education", data.education.filter((e) => e.id !== id));

  const updateEducation = (id: string, key: keyof Education, value: string) =>
    setField("education", data.education.map((e) => (e.id === id ? { ...e, [key]: value } : e)));

  const addExperience = () =>
    setField("experience", [
      ...data.experience,
      { id: uid(), company: "", role: "", startDate: "", endDate: "", description: "" },
    ]);

  const removeExperience = (id: string) =>
    setField("experience", data.experience.filter((e) => e.id !== id));

  const updateExperience = (id: string, key: keyof Experience, value: string) =>
    setField("experience", data.experience.map((e) => (e.id === id ? { ...e, [key]: value } : e)));

  const addProject = () =>
    setField("projects", [
      ...data.projects,
      { id: uid(), name: "", description: "", techStack: "", link: "" },
    ]);

  const removeProject = (id: string) =>
    setField("projects", data.projects.filter((p) => p.id !== id));

  const updateProject = (id: string, key: keyof Project, value: string) =>
    setField("projects", data.projects.map((p) => (p.id === id ? { ...p, [key]: value } : p)));

  return (
    <div className="space-y-8">
      {/* Load Sample */}
      <Button variant="outline" onClick={loadSample} className="gap-2">
        <Sparkles className="w-4 h-4" />
        Load Sample Data
      </Button>

      {/* Personal Info */}
      <Section title="Personal Info">
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Full Name" value={data.personalInfo.name} onChange={(e) => updatePersonal("name", e.target.value)} />
          <Input placeholder="Email" value={data.personalInfo.email} onChange={(e) => updatePersonal("email", e.target.value)} />
          <Input placeholder="Phone" value={data.personalInfo.phone} onChange={(e) => updatePersonal("phone", e.target.value)} />
          <Input placeholder="Location" value={data.personalInfo.location} onChange={(e) => updatePersonal("location", e.target.value)} />
        </div>
      </Section>

      {/* Summary */}
      <Section title="Summary">
        <Textarea
          placeholder="A brief professional summary..."
          value={data.summary}
          onChange={(e) => setField("summary", e.target.value)}
          rows={4}
        />
      </Section>

      {/* Education */}
      <Section title="Education" onAdd={addEducation}>
        {data.education.map((edu) => (
          <div key={edu.id} className="space-y-2 p-4 border border-border rounded-md relative">
            <button onClick={() => removeEducation(edu.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <Trash2 className="w-4 h-4" />
            </button>
            <Input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} />
              <Input placeholder="Field of Study" value={edu.field} onChange={(e) => updateEducation(edu.id, "field", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Start Year" value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} />
              <Input placeholder="End Year" value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} />
            </div>
          </div>
        ))}
      </Section>

      {/* Experience */}
      <Section title="Experience" onAdd={addExperience}>
        {data.experience.map((exp) => (
          <div key={exp.id} className="space-y-2 p-4 border border-border rounded-md relative">
            <button onClick={() => removeExperience(exp.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} />
              <Input placeholder="Role" value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Start Date" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} />
              <Input placeholder="End Date" value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} />
            </div>
            <Textarea placeholder="Description" value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} rows={3} />
            <BulletGuidance text={exp.description} />
          </div>
        ))}
      </Section>

      {/* Projects */}
      <Section title="Projects" onAdd={addProject}>
        {data.projects.map((proj) => (
          <div key={proj.id} className="space-y-2 p-4 border border-border rounded-md relative">
            <button onClick={() => removeProject(proj.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <Trash2 className="w-4 h-4" />
            </button>
            <Input placeholder="Project Name" value={proj.name} onChange={(e) => updateProject(proj.id, "name", e.target.value)} />
            <Input placeholder="Tech Stack" value={proj.techStack} onChange={(e) => updateProject(proj.id, "techStack", e.target.value)} />
            <Input placeholder="Link" value={proj.link} onChange={(e) => updateProject(proj.id, "link", e.target.value)} />
            <Textarea placeholder="Description" value={proj.description} onChange={(e) => updateProject(proj.id, "description", e.target.value)} rows={2} />
            <BulletGuidance text={proj.description} />
          </div>
        ))}
      </Section>

      {/* Skills */}
      <Section title="Skills">
        <Input
          placeholder="React, TypeScript, Node.js..."
          value={data.skills}
          onChange={(e) => setField("skills", e.target.value)}
        />
        <p className="text-xs text-muted-foreground">Comma-separated list</p>
      </Section>

      {/* Links */}
      <Section title="Links">
        <Input placeholder="GitHub URL" value={data.links.github} onChange={(e) => updateLinks("github", e.target.value)} />
        <Input placeholder="LinkedIn URL" value={data.links.linkedin} onChange={(e) => updateLinks("linkedin", e.target.value)} />
      </Section>
    </div>
  );
};

const Section = ({
  title,
  children,
  onAdd,
}: {
  title: string;
  children: React.ReactNode;
  onAdd?: () => void;
}) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h3 className="font-[var(--font-heading)] text-base font-semibold text-foreground">{title}</h3>
      {onAdd && (
        <Button variant="ghost" size="sm" onClick={onAdd} className="gap-1 text-xs text-muted-foreground">
          <Plus className="w-3 h-3" /> Add
        </Button>
      )}
    </div>
    {children}
  </div>
);

export default BuilderForm;
