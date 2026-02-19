import type { Resume } from '../../../backend';
import { Separator } from '@/components/ui/separator';
import { Languages, Briefcase, GraduationCap, Wrench, Award, Target } from 'lucide-react';

interface ResumePreviewProps {
  resume: Resume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  return (
    <div className="space-y-6">
      {/* Large prominent name header */}
      <div className="space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">{resume.name}</h1>
      </div>

      <Separator className="my-6" />

      {/* Languages section (first) */}
      {resume.languages.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-bold flex items-center gap-2">
            <Languages className="h-4 w-4" />
            Languages
          </h3>
          <ul className="space-y-1.5 pl-1">
            {resume.languages.map((language, index) => (
              <li key={index} className="text-sm leading-relaxed">
                • {language}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Work Experience section */}
      {resume.workExperience.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-bold flex items-center gap-2">
            <Briefcase className="h-4 w-4" />
            Work Experience
          </h3>
          <ul className="space-y-2.5 pl-1">
            {resume.workExperience.map((experience, index) => (
              <li key={index} className="text-sm leading-relaxed">
                • {experience}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Education section */}
      {resume.education.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-bold flex items-center gap-2">
            <GraduationCap className="h-4 w-4" />
            Education
          </h3>
          <ul className="space-y-2.5 pl-1">
            {resume.education.map((edu, index) => (
              <li key={index} className="text-sm leading-relaxed">
                • {edu}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills section */}
      {resume.skills.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-bold flex items-center gap-2">
            <Wrench className="h-4 w-4" />
            Skills
          </h3>
          <ul className="space-y-1.5 pl-1">
            {resume.skills.map((skill, index) => (
              <li key={index} className="text-sm leading-relaxed">
                • {skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Additional Information (Certificates) */}
      {resume.certificates.length > 0 && (
        <section className="space-y-3">
          <h3 className="text-base font-bold flex items-center gap-2">
            <Award className="h-4 w-4" />
            Additional Information
          </h3>
          <ul className="space-y-2.5 pl-1">
            {resume.certificates.map((cert, index) => (
              <li key={index} className="text-sm leading-relaxed">
                • {cert}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Career & Objectives (Summary + Position) */}
      {(resume.summary || resume.position) && (
        <section className="space-y-3">
          <h3 className="text-base font-bold flex items-center gap-2">
            <Target className="h-4 w-4" />
            Career & Objectives
          </h3>
          <div className="space-y-2 pl-1">
            {resume.position && (
              <p className="text-sm leading-relaxed">
                <span className="font-semibold">Position:</span> {resume.position}
              </p>
            )}
            {resume.summary && (
              <p className="text-sm leading-relaxed">{resume.summary}</p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
