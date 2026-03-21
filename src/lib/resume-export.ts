import { ResumeData } from "./resume-store";

export function resumeToPlainText(data: ResumeData): string {
  const lines: string[] = [];

  // Name
  if (data.personalInfo.name) lines.push(data.personalInfo.name.toUpperCase());

  // Contact
  const contact = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean);
  if (contact.length) lines.push(contact.join(" | "));

  // Links
  const links = [data.links.github, data.links.linkedin].filter(Boolean);
  if (links.length) lines.push(links.join(" | "));

  if (lines.length) lines.push("");

  // Summary
  if (data.summary.trim()) {
    lines.push("SUMMARY");
    lines.push(data.summary.trim());
    lines.push("");
  }

  // Experience
  if (data.experience.length > 0) {
    lines.push("EXPERIENCE");
    data.experience.forEach((exp) => {
      lines.push(`${exp.role} — ${exp.company} (${exp.startDate} – ${exp.endDate})`);
      if (exp.description.trim()) lines.push(exp.description.trim());
      lines.push("");
    });
  }

  // Education
  if (data.education.length > 0) {
    lines.push("EDUCATION");
    data.education.forEach((edu) => {
      lines.push(`${edu.degree} in ${edu.field} — ${edu.institution} (${edu.startDate} – ${edu.endDate})`);
    });
    lines.push("");
  }

  // Projects
  if (data.projects.length > 0) {
    lines.push("PROJECTS");
    data.projects.forEach((proj) => {
      lines.push(`${proj.name}${proj.techStack ? ` [${proj.techStack}]` : ""}`);
      if (proj.description.trim()) lines.push(proj.description.trim());
      if (proj.link) lines.push(proj.link);
      lines.push("");
    });
  }

  // Skills
  if (data.skills.trim()) {
    lines.push("SKILLS");
    lines.push(data.skills.trim());
    lines.push("");
  }

  return lines.join("\n").trim();
}
