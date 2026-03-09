import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "./pages/NotFound";
import StepPage from "./pages/rb/StepPage";
import ProofPage from "./pages/rb/ProofPage";
import HomePage from "./pages/resume/HomePage";
import BuilderPage from "./pages/resume/BuilderPage";
import PreviewPage from "./pages/resume/PreviewPage";
import ResumeProofPage from "./pages/resume/ProofPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/builder" element={<BuilderPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/proof" element={<ResumeProofPage />} />
          <Route path="/rb" element={<Navigate to="/rb/01-problem" replace />} />
          <Route path="/rb/proof" element={<ProofPage />} />
          <Route path="/rb/:stepSlug" element={<StepPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
