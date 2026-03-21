import { useResumeStore } from "@/lib/resume-store";
import { useTemplateStore, templateStyles } from "@/lib/template-store";

const ResumePreviewPanel = () => {
  const { data } = useResumeStore();
  const { template } = useTemplateStore();
  const s = templateStyles[template];
  const hasContent = data.personalInfo.name || data.summary || data.experience.length > 0;

  return (
    <div className="bg-background border border-border rounded-md p-8 min-h-[600px] font-[var(--font-body)]">
      {!hasContent ? (
        <div className="flex items-center justify-center h-full min-h-[500px] text-muted-foreground text-sm">
          Fill in the form or load sample data to see your resume here.
        </div>
      ) : (
        <div className={`${s.spacing} text-foreground`}>
          {/* Header */}
          <div className={`${s.headerAlign} space-y-1 pb-4 border-b border-border`}>
            <h2 className={`font-[var(--font-heading)] ${s.nameSize} font-bold tracking-tight`}>
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

          {data.summary && (
            <div>
              <h3 className={s.sectionTitle}>Summary</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{data.summary}</p>
            </div>
          )}

          {data.experience.length > 0 && (
            <div>
              <h3 className={s.sectionTitle}>Experience</h3>
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

          {data.education.length > 0 && (
            <div>
              <h3 className={s.sectionTitle}>Education</h3>
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

          {data.projects.length > 0 && (
            <div>
              <h3 className={s.sectionTitle}>Projects</h3>
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

          {data.skills && (
            <div>
              <h3 className={s.sectionTitle}>Skills</h3>
              <p className="text-sm text-muted-foreground">{data.skills}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumePreviewPanel;
