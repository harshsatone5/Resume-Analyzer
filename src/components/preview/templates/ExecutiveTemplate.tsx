import React from 'react';
import type { ResumeData, ResumeTheme } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export const ExecutiveTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;
  const primaryColor = theme.primaryColor || '#0f172a';

  return (
    <div className="resume-sheet executive-template w-full h-full bg-white text-zinc-900 p-8 sm:p-11 font-serif flex flex-col justify-between">
      <div>
        {/* Executive Centered Header */}
        <header className="text-center pb-4 mb-5 border-b-2 border-zinc-900">
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-wide uppercase"
            style={{ color: primaryColor }}
          >
            {personalInfo.fullName || 'YOUR NAME'}
          </h1>

          {personalInfo.headline && (
            <p className="text-xs sm:text-sm font-semibold tracking-widest text-zinc-600 uppercase mt-1">
              {personalInfo.headline}
            </p>
          )}

          {/* Contact Details String */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2.5 text-xs text-zinc-600 font-sans">
            {personalInfo.location && <span>{personalInfo.location}</span>}
            {personalInfo.location && personalInfo.phone && <span>•</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.phone && personalInfo.email && <span>•</span>}
            {personalInfo.email && (
              <a href={`mailto:${personalInfo.email}`} className="text-zinc-800 hover:underline">
                {personalInfo.email}
              </a>
            )}
            {personalInfo.linkedin && (
              <>
                <span>•</span>
                <span className="text-zinc-700">{personalInfo.linkedin}</span>
              </>
            )}
            {personalInfo.website && (
              <>
                <span>•</span>
                <span className="text-zinc-700">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </>
            )}
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <p className="mt-3 text-xs text-zinc-700 italic leading-relaxed max-w-3xl mx-auto font-serif">
              "{personalInfo.summary}"
            </p>
          )}
        </header>

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2
              className="text-xs font-bold tracking-widest uppercase pb-1 mb-2 border-b border-zinc-400 font-sans"
              style={{ color: primaryColor }}
            >
              Executive & Professional Experience
            </h2>
            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between font-sans">
                    <span className="text-xs font-bold text-zinc-900">
                      {exp.position}, <span className="font-semibold text-zinc-700">{exp.company}</span>
                    </span>
                    <span className="text-[11px] text-zinc-600 font-medium">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      {exp.location && ` | ${exp.location}`}
                    </span>
                  </div>
                  {exp.bullets && exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1.5 space-y-1 list-disc list-outside pl-4 text-xs text-zinc-700 leading-relaxed font-serif">
                      {exp.bullets.filter(Boolean).map((bullet, idx) => (
                        <li key={idx} className="pl-0.5">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects.length > 0 && (
          <section className="mb-5">
            <h2
              className="text-xs font-bold tracking-widest uppercase pb-1 mb-2 border-b border-zinc-400 font-sans"
              style={{ color: primaryColor }}
            >
              Key Projects & Strategic Initiatives
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between font-sans">
                    <span className="text-xs font-bold text-zinc-900">
                      {proj.title}
                      {proj.subtitle && <span className="font-normal text-zinc-600"> — {proj.subtitle}</span>}
                    </span>
                    {proj.link && (
                      <span className="text-[11px] text-zinc-500 font-mono">
                        {proj.link.replace(/^https?:\/\//, '')}
                      </span>
                    )}
                  </div>
                  {proj.bullets && proj.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1 space-y-1 list-disc list-outside pl-4 text-xs text-zinc-700 leading-relaxed font-serif">
                      {proj.bullets.filter(Boolean).map((bullet, idx) => (
                        <li key={idx} className="pl-0.5">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Credentials */}
        {education.length > 0 && (
          <section className="mb-5">
            <h2
              className="text-xs font-bold tracking-widest uppercase pb-1 mb-2 border-b border-zinc-400 font-sans"
              style={{ color: primaryColor }}
            >
              Education & Academic Honors
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-zinc-900">{edu.institution}</span>
                    <span className="text-xs text-zinc-700">
                      {' '}— {edu.degree}
                      {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                    </span>
                    {(edu.gpa || edu.honors) && (
                      <span className="text-[11px] text-zinc-500 italic ml-2">
                        ({edu.honors || `GPA: ${edu.gpa}`})
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-zinc-600 font-sans font-medium">{edu.endDate}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section className="mb-5">
            <h2
              className="text-xs font-bold tracking-widest uppercase pb-1 mb-2 border-b border-zinc-400 font-sans"
              style={{ color: primaryColor }}
            >
              Professional Certifications
            </h2>
            <div className="space-y-1 text-xs">
              {certifications.map((c) => (
                <div key={c.id} className="flex justify-between font-sans">
                  <span className="font-semibold text-zinc-900">{c.name} — <span className="font-normal text-zinc-600">{c.issuer}</span></span>
                  <span className="text-zinc-600">{c.date}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Core Competencies */}
        {skills.length > 0 && (
          <section>
            <h2
              className="text-xs font-bold tracking-widest uppercase pb-1 mb-2 border-b border-zinc-400 font-sans"
              style={{ color: primaryColor }}
            >
              Core Competencies & Technical Acumen
            </h2>
            <p className="text-xs text-zinc-800 leading-relaxed font-sans">
              <span className="font-semibold">Technologies: </span>
              {skills.join(' • ')}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};
