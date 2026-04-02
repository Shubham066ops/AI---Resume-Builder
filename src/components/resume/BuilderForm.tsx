import { useState } from "react";
import { useResumeStore, Education, Experience, Project, SkillCategories } from "@/lib/resume-store";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Sparkles, ChevronDown, ChevronRight, ExternalLink, Github, Loader2 } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import BulletGuidance from "./BulletGuidance";
import TagInput from "./TagInput";

const uid = () => crypto.randomUUID();

const SUGGESTED_SKILLS = {
  technical: ["TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"],
  soft: ["Team Leadership", "Problem Solving"],
  tools: ["Git", "Docker", "AWS"],
};

const BuilderForm = () => {
  const { data, setField, loadSample } = useResumeStore();
  const [suggesting, setSuggesting] = useState(false);
  const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({});

  const updatePersonal = (key: string, value: string) =>
    setField("personalInfo", { ...data.personalInfo, [key]: value });

  const updateLinks = (key: string, value: string) =>
    setField("links", { ...data.links, [key]: value });

  // Education
  const addEducation = () =>
    setField("education", [
      ...data.education,
      { id: uid(), institution: "", degree: "", field: "", startDate: "", endDate: "" },
    ]);
  const removeEducation = (id: string) =>
    setField("education", data.education.filter((e) => e.id !== id));
  const updateEducation = (id: string, key: keyof Education, value: string) =>
    setField("education", data.education.map((e) => (e.id === id ? { ...e, [key]: value } : e)));

  // Experience
  const addExperience = () =>
    setField("experience", [
      ...data.experience,
      { id: uid(), company: "", role: "", startDate: "", endDate: "", description: "" },
    ]);
  const removeExperience = (id: string) =>
    setField("experience", data.experience.filter((e) => e.id !== id));
  const updateExperience = (id: string, key: keyof Experience, value: string) =>
    setField("experience", data.experience.map((e) => (e.id === id ? { ...e, [key]: value } : e)));

  // Projects
  const addProject = () => {
    const id = uid();
    setField("projects", [
      ...data.projects,
      { id, name: "", description: "", techStack: [], link: "", githubUrl: "" },
    ]);
    setOpenProjects((prev) => ({ ...prev, [id]: true }));
  };
  const removeProject = (id: string) =>
    setField("projects", data.projects.filter((p) => p.id !== id));
  const updateProject = (id: string, key: string, value: any) =>
    setField("projects", data.projects.map((p) => (p.id === id ? { ...p, [key]: value } : p)));

  // Skills
  const updateSkillCategory = (category: keyof SkillCategories, tags: string[]) =>
    setField("skills", { ...data.skills, [category]: tags });

  const suggestSkills = () => {
    setSuggesting(true);
    setTimeout(() => {
      const merged: SkillCategories = {
        technical: [...new Set([...data.skills.technical, ...SUGGESTED_SKILLS.technical])],
        soft: [...new Set([...data.skills.soft, ...SUGGESTED_SKILLS.soft])],
        tools: [...new Set([...data.skills.tools, ...SUGGESTED_SKILLS.tools])],
      };
      setField("skills", merged);
      setSuggesting(false);
    }, 1000);
  };

  const toggleProject = (id: string) =>
    setOpenProjects((prev) => ({ ...prev, [id]: !prev[id] }));

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

      {/* Skills */}
      <Section title="Skills">
        <div className="space-y-4">
          <Button variant="outline" size="sm" onClick={suggestSkills} disabled={suggesting} className="gap-2">
            {suggesting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {suggesting ? "Adding..." : "✨ Suggest Skills"}
          </Button>

          {(["technical", "soft", "tools"] as const).map((cat) => {
            const label = cat === "technical" ? "Technical Skills" : cat === "soft" ? "Soft Skills" : "Tools & Technologies";
            return (
              <div key={cat} className="space-y-1.5">
                <p className="text-sm font-medium text-foreground">
                  {label} ({data.skills[cat].length})
                </p>
                <TagInput
                  tags={data.skills[cat]}
                  onChange={(tags) => updateSkillCategory(cat, tags)}
                  placeholder={`Add ${label.toLowerCase()}…`}
                />
              </div>
            );
          })}
        </div>
      </Section>

      {/* Projects */}
      <Section title="Projects" onAdd={addProject}>
        {data.projects.map((proj) => (
          <Collapsible key={proj.id} open={openProjects[proj.id] ?? false} onOpenChange={() => toggleProject(proj.id)}>
            <div className="border border-border rounded-md overflow-hidden">
              <CollapsibleTrigger className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left">
                <div className="flex items-center gap-2">
                  {openProjects[proj.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span className="text-sm font-medium">{proj.name || "Untitled Project"}</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeProject(proj.id); }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="space-y-3 p-4 pt-0">
                  <Input placeholder="Project Title" value={proj.name} onChange={(e) => updateProject(proj.id, "name", e.target.value)} />
                  <div className="relative">
                    <Textarea
                      placeholder="Description (max 200 chars)"
                      value={proj.description}
                      onChange={(e) => {
                        if (e.target.value.length <= 200) updateProject(proj.id, "description", e.target.value);
                      }}
                      rows={2}
                    />
                    <span className="absolute bottom-2 right-3 text-[10px] text-muted-foreground">
                      {proj.description.length}/200
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Tech Stack</p>
                    <TagInput tags={proj.techStack} onChange={(tags) => updateProject(proj.id, "techStack", tags)} placeholder="Add tech…" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Live URL</p>
                      <Input placeholder="https://..." value={proj.link} onChange={(e) => updateProject(proj.id, "link", e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><Github className="w-3 h-3" /> GitHub URL</p>
                      <Input placeholder="https://github.com/..." value={proj.githubUrl} onChange={(e) => updateProject(proj.id, "githubUrl", e.target.value)} />
                    </div>
                  </div>
                  <BulletGuidance text={proj.description} />
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        ))}
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
