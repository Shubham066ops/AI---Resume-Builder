import ResumeNav from "@/components/resume/ResumeNav";

const ProofPage = () => (
  <div className="min-h-screen bg-background">
    <ResumeNav />
    <div className="mx-auto max-w-3xl px-6 py-10 space-y-8">
      <div>
        <h1 className="font-[var(--font-heading)] text-2xl font-bold text-foreground tracking-tight">
          Proof of Completion
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          This page will hold your build artifacts and submission links once the project is complete.
        </p>
      </div>

      <div className="border border-border rounded-md p-10 flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground text-sm">Artifact collection coming soon.</p>
      </div>
    </div>
  </div>
);

export default ProofPage;
