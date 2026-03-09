import { useResumeStore } from "@/lib/resume-store";

const ResumePreviewPanel = () => {
  const { data } = useResumeStore();
  const hasContent = data.personalInfo.name || data.summary || data.experience.length > 0;

  return (
    <div className="bg-background border border-border rounded-md p-8 min-h-[600px] font-[var(--font-body)]">
      {!hasContent ? (
        <div className="flex items-center justify-center h-full min-h-[500px] text-muted-foreground text-sm">
          Fill in the form or load sample data to see your resume here.
        </div>
      ) : (
        <div className="space-y-6 text-foreground">
          {/* Header */}
          <div className="text-center space-y-1 pb-4 border-b border-border">
            <h2 className="font-[var(--font-heading)] text-2xl font-bold tracking-tight">
              {data.personalInfo.name || "Your Name"}
            </h2>
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

          {/* Summary */}
          {data.summary && (
            <div>
              <h3 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-widest text-foreground mb-2">
                Summary
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience.length > 0 && (
            <div>
              <h3 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-widest text-foreground mb-2">
                Experience
              </h3>
              <div className="space-y-3">
                {data.experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-medium">{exp.role}</p>
                      <p className="text-xs text-muted-foreground">{exp.startDate} — {exp.endDate}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div>
              <h3 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-widest text-foreground mb-2">
                Education
              </h3>
              <div className="space-y-2">
                {data.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between items-baseline">
                    <div>
                      <p className="text-sm font-medium">{edu.degree} in {edu.field}</p>
                      <p className="text-xs text-muted-foreground">{edu.institution}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{edu.startDate} — {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div>
              <h3 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-widest text-foreground mb-2">
                Projects
              </h3>
              <div className="space-y-2">
                {data.projects.map((proj) => (
                  <div key={proj.id}>
                    <p className="text-sm font-medium">{proj.name}</p>
                    <p className="text-xs text-muted-foreground">{proj.techStack}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {data.skills && (
            <div>
              <h3 className="font-[var(--font-heading)] text-sm font-semibold uppercase tracking-widest text-foreground mb-2">
                Skills
              </h3>
              <p className="text-sm text-muted-foreground">{data.skills}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumePreviewPanel;
