import ResumeNav from "@/components/resume/ResumeNav";
import TemplateSelector from "@/components/resume/TemplateSelector";
import { useResumeStore } from "@/lib/resume-store";
import { useTemplateStore, templateStyles } from "@/lib/template-store";

const PreviewPage = () => {
  const { data } = useResumeStore();
  const { template } = useTemplateStore();
  const s = templateStyles[template];
  const hasContent = data.personalInfo.name || data.summary;

  return (
    <div className="min-h-screen bg-background">
      <ResumeNav />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex justify-end mb-4">
          <TemplateSelector />
        </div>
        <div className="bg-background border border-border rounded-md p-10 min-h-[800px]" style={{ fontFamily: "var(--font-body)" }}>
          {!hasContent ? (
            <div className="flex items-center justify-center h-full min-h-[600px] text-muted-foreground text-sm">
              No resume data yet. Go to the Builder to get started.
            </div>
          ) : (
            <div className={`${s.spacing} text-foreground`}>
              <div className={`${s.headerAlign} space-y-1 pb-6 border-b border-border`}>
                <h1 className={`font-[var(--font-heading)] ${s.nameSize} font-bold tracking-tight`}>
                  {data.personalInfo.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {(data.links.github || data.links.linkedin) && (
                  <p className="text-xs text-muted-foreground">
                    {[data.links.github, data.links.linkedin].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>

              {data.summary && (
                <ResumeSection title="Professional Summary" sectionClass={s.sectionTitle}>
                  <p className="text-sm leading-relaxed">{data.summary}</p>
                </ResumeSection>
              )}

              {data.experience.length > 0 && (
                <ResumeSection title="Experience" sectionClass={s.sectionTitle}>
                  <div className="space-y-4">
                    {data.experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex justify-between items-baseline">
                          <p className="font-medium text-sm">{exp.role}</p>
                          <p className="text-xs text-muted-foreground">{exp.startDate} — {exp.endDate}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{exp.company}</p>
                        <p className="text-sm mt-1 leading-relaxed text-muted-foreground">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </ResumeSection>
              )}

              {data.education.length > 0 && (
                <ResumeSection title="Education" sectionClass={s.sectionTitle}>
                  <div className="space-y-3">
                    {data.education.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-baseline">
                        <div>
                          <p className="font-medium text-sm">{edu.degree} in {edu.field}</p>
                          <p className="text-xs text-muted-foreground">{edu.institution}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{edu.startDate} — {edu.endDate}</p>
                      </div>
                    ))}
                  </div>
                </ResumeSection>
              )}

              {data.projects.length > 0 && (
                <ResumeSection title="Projects" sectionClass={s.sectionTitle}>
                  <div className="space-y-3">
                    {data.projects.map((proj) => (
                      <div key={proj.id}>
                        <p className="font-medium text-sm">{proj.name}</p>
                        <p className="text-xs text-muted-foreground">{proj.techStack}</p>
                        <p className="text-sm mt-1 leading-relaxed text-muted-foreground">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </ResumeSection>
              )}

              {data.skills && (
                <ResumeSection title="Skills" sectionClass={s.sectionTitle}>
                  <p className="text-sm text-muted-foreground">{data.skills}</p>
                </ResumeSection>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ResumeSection = ({ title, sectionClass, children }: { title: string; sectionClass: string; children: React.ReactNode }) => (
  <div>
    <h2 className={sectionClass}>{title}</h2>
    {children}
  </div>
);

export default PreviewPage;
