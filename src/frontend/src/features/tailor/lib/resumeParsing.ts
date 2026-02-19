import type { Resume } from '../../../backend';

/**
 * Parse resume text into a structured Resume object.
 * Handles various text formats and provides safe defaults for missing sections.
 * Preserves line structure for reliable section parsing.
 */
export function parseResumeText(text: string): Resume {
  // Normalize line endings but preserve line structure
  const normalizedText = text
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();

  const lines = normalizedText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
  
  const resume: Resume = {
    name: '',
    position: '',
    summary: '',
    education: [],
    workExperience: [],
    skills: [],
    certificates: [],
    languages: [],
  };

  let currentSection: keyof Resume | null = null;

  for (const line of lines) {
    const lowerLine = line.toLowerCase();

    // Detect section headers
    if (lowerLine.startsWith('name:')) {
      resume.name = line.substring(line.indexOf(':') + 1).trim();
      currentSection = null;
    } else if (lowerLine.startsWith('position:')) {
      resume.position = line.substring(line.indexOf(':') + 1).trim();
      currentSection = null;
    } else if (lowerLine.startsWith('summary:')) {
      resume.summary = line.substring(line.indexOf(':') + 1).trim();
      currentSection = 'summary';
    } else if (lowerLine.startsWith('education:')) {
      const content = line.substring(line.indexOf(':') + 1).trim();
      if (content) resume.education.push(content);
      currentSection = 'education';
    } else if (lowerLine.startsWith('work experience:') || lowerLine.startsWith('experience:')) {
      const content = line.substring(line.indexOf(':') + 1).trim();
      if (content) resume.workExperience.push(content);
      currentSection = 'workExperience';
    } else if (lowerLine.startsWith('skills:')) {
      const content = line.substring(line.indexOf(':') + 1).trim();
      if (content) {
        // Split by comma for skills
        const skills = content.split(',').map(s => s.trim()).filter(s => s.length > 0);
        resume.skills.push(...skills);
      }
      currentSection = 'skills';
    } else if (lowerLine.startsWith('certificates:') || lowerLine.startsWith('certifications:')) {
      const content = line.substring(line.indexOf(':') + 1).trim();
      if (content) resume.certificates.push(content);
      currentSection = 'certificates';
    } else if (lowerLine.startsWith('languages:')) {
      const content = line.substring(line.indexOf(':') + 1).trim();
      if (content) {
        // Split by comma for languages
        const languages = content.split(',').map(l => l.trim()).filter(l => l.length > 0);
        resume.languages.push(...languages);
      }
      currentSection = 'languages';
    } else if (currentSection) {
      // Continue adding to current section
      if (currentSection === 'summary') {
        resume.summary += ' ' + line;
      } else if (currentSection === 'skills') {
        // Check if line contains comma-separated values
        if (line.includes(',')) {
          const skills = line.split(',').map(s => s.trim()).filter(s => s.length > 0);
          resume.skills.push(...skills);
        } else {
          resume.skills.push(line);
        }
      } else if (currentSection === 'languages') {
        // Check if line contains comma-separated values
        if (line.includes(',')) {
          const languages = line.split(',').map(l => l.trim()).filter(l => l.length > 0);
          resume.languages.push(...languages);
        } else {
          resume.languages.push(line);
        }
      } else if (Array.isArray(resume[currentSection])) {
        (resume[currentSection] as string[]).push(line);
      }
    }
  }

  // Trim summary if it was built from multiple lines
  if (resume.summary) {
    resume.summary = resume.summary.trim();
  }

  // Fallback: infer name from first line if not explicitly set
  if (!resume.name && lines.length > 0) {
    const firstLine = lines[0];
    const lowerFirstLine = firstLine.toLowerCase();
    
    // Avoid using obvious section headers as name
    const sectionHeaders = [
      'name:', 'position:', 'summary:', 'education:', 'experience:', 
      'work experience:', 'skills:', 'certificates:', 'certifications:', 
      'languages:', 'objective:', 'profile:'
    ];
    
    const isHeader = sectionHeaders.some(header => lowerFirstLine.startsWith(header));
    
    if (!isHeader && firstLine.length > 0 && firstLine.length < 100) {
      resume.name = firstLine;
    }
  }

  return resume;
}
