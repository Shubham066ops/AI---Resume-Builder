import ResumeNav from "@/components/resume/ResumeNav";
import { useResumeStore } from "@/lib/resume-store";

const PreviewPage = () => {
  const { data } = useResumeStore();
  const hasContent = data.personalInfo.name || data.summary;

  return (
    <div className="min-h-screen bg-background">
      <ResumeNav />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="bg-background border border-border rounded-md p-10 min-h-[800px]" style={{ fontFamily: "var(--font-body)" }}>
          {!hasContent ? (
            <div className="flex items-center justify-center h-full min-h-[600px] text-muted-foreground text-sm">
              No resume data yet. Go to the Builder to get started.
            </div>
          ) : (
            <div className="space-y-8 text-foreground">
              {/* Header */}
              <div className="text-center space-y-1 pb-6 border-b border-border">
                <h1 className="font-[var(--font-heading)] text-3xl font-bold tracking-tight">
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
                <ResumeSection title="Professional Summary">
                  <p className="text-sm leading-relaxed">{data.summary}</p>
                </ResumeSection>
              )}

              {data.experience.length > 0 && (
                <ResumeSection title="Experience">
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
                <ResumeSection title="Education">
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
                <ResumeSection title="Projects">
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
                <ResumeSection title="Skills">
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

const ResumeSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div>
    <h2 className="font-[var(--font-heading)] text-xs font-semibold uppercase tracking-[0.2em] text-foreground mb-3 pb-1 border-b border-border">
      {title}
    </h2>
    {children}
  </div>
);

export default PreviewPage;
