import React from 'react';
import type { ResumeData, ResumeTheme } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export const MinimalistTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;
  const primaryColor = theme.primaryColor || '#18181b';

  return (
    <div className="resume-sheet minimalist-template w-full h-full bg-white text-zinc-800 p-8 sm:p-12 font-sans flex flex-col justify-between">
      <div>
        {/* Minimal Header */}
        <header className="mb-6">
          <h1
            className="text-2xl sm:text-3xl font-light tracking-tight text-zinc-900"
            style={{ color: primaryColor }}
          >
            <span className="font-semibold">{personalInfo.fullName?.split(' ')[0]}</span>{' '}
            {personalInfo.fullName?.split(' ').slice(1).join(' ')}
          </h1>
          {personalInfo.headline && (
            <p className="text-xs sm:text-sm text-zinc-500 font-normal tracking-wide mt-0.5">
              {personalInfo.headline}
            </p>
          )}

          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-[11px] text-zinc-400">
            {personalInfo.email && <span className="text-zinc-600">{personalInfo.email}</span>}
            {personalInfo.phone && <span>/</span>}
            {personalInfo.phone && <span className="text-zinc-600">{personalInfo.phone}</span>}
            {personalInfo.location && <span>/</span>}
            {personalInfo.location && <span className="text-zinc-600">{personalInfo.location}</span>}
            {personalInfo.website && <span>/</span>}
            {personalInfo.website && (
              <span className="text-zinc-600">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
            )}
            {personalInfo.github && <span>/</span>}
            {personalInfo.github && <span className="text-zinc-600">{personalInfo.github}</span>}
          </div>

          {personalInfo.summary && (
            <p className="mt-3 text-xs text-zinc-500 leading-relaxed font-light">
              {personalInfo.summary}
            </p>
          )}
        </header>

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">
              Experience
            </h2>
            <div className="space-y-4">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-semibold text-zinc-900">{exp.position}</span>
                      <span className="text-xs text-zinc-500 font-light"> — {exp.company}</span>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-light">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.bullets && exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1.5 space-y-1 list-none text-xs text-zinc-600 font-light leading-relaxed">
                      {exp.bullets.filter(Boolean).map((bullet, idx) => (
                        <li key={idx} className="relative pl-3 before:content-['–'] before:absolute before:left-0 before:text-zinc-400">
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

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-3">
              Selected Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-zinc-900">{proj.title}</span>
                    {proj.link && (
                      <span className="text-[11px] text-zinc-400 font-mono">
                        {proj.link.replace(/^https?:\/\//, '')}
                      </span>
                    )}
                  </div>
                  {proj.bullets && proj.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1 space-y-0.5 list-none text-xs text-zinc-600 font-light leading-relaxed">
                      {proj.bullets.filter(Boolean).map((b, idx) => (
                        <li key={idx} className="relative pl-3 before:content-['–'] before:absolute before:left-0 before:text-zinc-400">
                          {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Skills Split */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-zinc-100">
          {education.length > 0 && (
            <section>
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="text-xs font-semibold text-zinc-900">{edu.institution}</div>
                    <div className="text-xs text-zinc-500 font-light">
                      {edu.degree}
                      {edu.endDate && ` (${edu.endDate})`}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(skills.length > 0 || certifications.length > 0) && (
            <section>
              {skills.length > 0 && (
                <div className="mb-3">
                  <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-2">
                    Skills & Tech
                  </h2>
                  <p className="text-xs text-zinc-600 font-light leading-relaxed">
                    {skills.join('  /  ')}
                  </p>
                </div>
              )}

              {certifications.length > 0 && (
                <div>
                  <h2 className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 mb-1.5">
                    Certifications
                  </h2>
                  <div className="space-y-1 text-xs text-zinc-600 font-light">
                    {certifications.map((c) => (
                      <div key={c.id}>
                        <span className="font-normal text-zinc-800">{c.name}</span> — {c.issuer}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
