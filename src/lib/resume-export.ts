import { ResumeData, allSkills } from "./resume-store";

export function resumeToPlainText(data: ResumeData): string {
  const lines: string[] = [];

  if (data.personalInfo.name) lines.push(data.personalInfo.name.toUpperCase());

  const contact = [data.personalInfo.email, data.personalInfo.phone, data.personalInfo.location].filter(Boolean);
  if (contact.length) lines.push(contact.join(" | "));

  const links = [data.links.github, data.links.linkedin].filter(Boolean);
  if (links.length) lines.push(links.join(" | "));

  if (lines.length) lines.push("");

  if (data.summary.trim()) {
    lines.push("SUMMARY");
    lines.push(data.summary.trim());
    lines.push("");
  }

  if (data.experience.length > 0) {
    lines.push("EXPERIENCE");
    data.experience.forEach((exp) => {
      lines.push(`${exp.role} — ${exp.company} (${exp.startDate} – ${exp.endDate})`);
      if (exp.description.trim()) lines.push(exp.description.trim());
      lines.push("");
    });
  }

  if (data.education.length > 0) {
    lines.push("EDUCATION");
    data.education.forEach((edu) => {
      lines.push(`${edu.degree} in ${edu.field} — ${edu.institution} (${edu.startDate} – ${edu.endDate})`);
    });
    lines.push("");
  }

  if (data.projects.length > 0) {
    lines.push("PROJECTS");
    data.projects.forEach((proj) => {
      const tech = proj.techStack.length > 0 ? ` [${proj.techStack.join(", ")}]` : "";
      lines.push(`${proj.name}${tech}`);
      if (proj.description.trim()) lines.push(proj.description.trim());
      if (proj.link) lines.push(proj.link);
      if (proj.githubUrl) lines.push(proj.githubUrl);
      lines.push("");
    });
  }

  const skills = allSkills(data.skills);
  if (skills.length > 0) {
    lines.push("SKILLS");
    lines.push(skills.join(", "));
    lines.push("");
  }

  return lines.join("\n").trim();
}
