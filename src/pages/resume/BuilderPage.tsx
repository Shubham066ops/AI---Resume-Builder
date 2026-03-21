import ResumeNav from "@/components/resume/ResumeNav";
import BuilderForm from "@/components/resume/BuilderForm";
import ResumePreviewPanel from "@/components/resume/ResumePreviewPanel";
import ATSScorePanel from "@/components/resume/ATSScorePanel";
import TemplateSelector from "@/components/resume/TemplateSelector";

const BuilderPage = () => (
  <div className="min-h-screen bg-background">
    <ResumeNav />
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Form */}
        <div className="space-y-2">
          <h2 className="font-[var(--font-heading)] text-xl font-semibold text-foreground">Resume Builder</h2>
          <p className="text-sm text-muted-foreground mb-4">Fill in each section. Your resume updates live on the right.</p>
          <BuilderForm />
        </div>

        {/* Right: Live Preview + ATS */}
        <div className="lg:sticky lg:top-20 lg:self-start space-y-8">
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Live Preview</p>
              <TemplateSelector />
            </div>
            <ResumePreviewPanel />
          </div>
          <div className="border border-border rounded-md p-6 bg-background">
            <ATSScorePanel />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BuilderPage;
