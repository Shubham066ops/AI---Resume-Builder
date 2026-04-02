import { useState } from "react";
import ResumeNav from "@/components/resume/ResumeNav";
import TemplateSelector from "@/components/resume/TemplateSelector";
import { ExternalLink, Github } from "lucide-react";
import { useResumeStore } from "@/lib/resume-store";
import { useTemplateStore, templateStyles } from "@/lib/template-store";
import { resumeToPlainText } from "@/lib/resume-export";
import { Button } from "@/components/ui/button";
import { Printer, Copy, Check } from "lucide-react";

const PreviewPage = () => {
  const { data } = useResumeStore();
  const { template } = useTemplateStore();
  const s = templateStyles[template];
  const hasContent = data.personalInfo.name || data.summary;
  const [copied, setCopied] = useState(false);

  const isIncomplete = !data.personalInfo.name.trim() || (data.projects.length === 0 && data.experience.length === 0);

  const handlePrint = () => window.print();

  const handleCopy = async () => {
    const text = resumeToPlainText(data);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <ResumeNav />
      <div className="mx-auto max-w-3xl px-6 py-10 print:p-0 print:max-w-none">
        {/* Toolbar — hidden in print */}
        <div className="flex items-center justify-between mb-4 print:hidden">
          <TemplateSelector />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleCopy}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy as Text"}
            </Button>
            <Button variant="outline" size="sm" className="gap-2" onClick={handlePrint}>
              <Printer className="w-4 h-4" />
              Print / Save as PDF
            </Button>
          </div>
        </div>

        {/* Validation warning — hidden in print */}
        {isIncomplete && hasContent && (
          <div className="mb-4 px-4 py-3 border border-border rounded-md bg-muted/50 text-sm text-muted-foreground print:hidden">
            Your resume may look incomplete. Consider adding your name and at least one project or experience.
          </div>
        )}

        {/* Resume — this is the printable area */}
        <div id="resume-print" className="bg-background border border-border rounded-md p-10 min-h-[800px] print:border-none print:rounded-none print:p-0 print:min-h-0" style={{ fontFamily: "var(--font-body)" }}>
          {!hasContent ? (
            <div className="flex items-center justify-center h-full min-h-[600px] text-muted-foreground text-sm print:hidden">
              No resume data yet. Go to the Builder to get started.
            </div>
          ) : (
            <div className={`${s.spacing} text-foreground print:text-black`}>
              <div className={`${s.headerAlign} space-y-1 pb-6 border-b border-border print:border-black/20`}>
                <h1 className={`font-[var(--font-heading)] ${s.nameSize} font-bold tracking-tight print:text-black`}>
                  {data.personalInfo.name}
                </h1>
                <p className="text-sm text-muted-foreground print:text-neutral-600">
                  {[data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                {(data.links.github || data.links.linkedin) && (
                  <p className="text-xs text-muted-foreground print:text-neutral-600">
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
                      <div key={exp.id} className="break-inside-avoid">
                        <div className="flex justify-between items-baseline">
                          <p className="font-medium text-sm">{exp.role}</p>
                          <p className="text-xs text-muted-foreground print:text-neutral-600">{exp.startDate} — {exp.endDate}</p>
                        </div>
                        <p className="text-xs text-muted-foreground print:text-neutral-600">{exp.company}</p>
                        <p className="text-sm mt-1 leading-relaxed text-muted-foreground print:text-neutral-700">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </ResumeSection>
              )}

              {data.education.length > 0 && (
                <ResumeSection title="Education" sectionClass={s.sectionTitle}>
                  <div className="space-y-3">
                    {data.education.map((edu) => (
                      <div key={edu.id} className="flex justify-between items-baseline break-inside-avoid">
                        <div>
                          <p className="font-medium text-sm">{edu.degree} in {edu.field}</p>
                          <p className="text-xs text-muted-foreground print:text-neutral-600">{edu.institution}</p>
                        </div>
                        <p className="text-xs text-muted-foreground print:text-neutral-600">{edu.startDate} — {edu.endDate}</p>
                      </div>
                    ))}
                  </div>
                </ResumeSection>
              )}

              {data.projects.length > 0 && (
                <ResumeSection title="Projects" sectionClass={s.sectionTitle}>
                  <div className="space-y-3">
                    {data.projects.map((proj) => (
                      <div key={proj.id} className="break-inside-avoid">
                        <p className="font-medium text-sm">{proj.name}</p>
                        <p className="text-xs text-muted-foreground print:text-neutral-600">{proj.techStack}</p>
                        <p className="text-sm mt-1 leading-relaxed text-muted-foreground print:text-neutral-700">{proj.description}</p>
                      </div>
                    ))}
                  </div>
                </ResumeSection>
              )}

              {data.skills && (
                <ResumeSection title="Skills" sectionClass={s.sectionTitle}>
                  <p className="text-sm text-muted-foreground print:text-neutral-700">{data.skills}</p>
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
  <div className="break-inside-avoid">
    <h2 className={`${sectionClass} print:text-black print:border-black/20`}>{title}</h2>
    {children}
  </div>
);

export default PreviewPage;
