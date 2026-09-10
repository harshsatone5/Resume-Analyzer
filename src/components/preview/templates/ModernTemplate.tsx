import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../icons/SocialIcons';
import type { ResumeData, ResumeTheme } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;
  const primaryColor = theme.primaryColor || '#2563eb';

  return (
    <div className="resume-sheet modern-template w-full h-full bg-white text-zinc-800 p-8 sm:p-10 font-sans flex flex-col justify-between select-text">
      <div>
        {/* Top Header */}
        <header className="border-b pb-4 mb-4" style={{ borderColor: `${primaryColor}40` }}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900" style={{ color: primaryColor }}>
                {personalInfo.fullName || 'Your Name'}
              </h1>
              {personalInfo.headline && (
                <p className="text-xs sm:text-sm font-medium text-zinc-600 mt-0.5 tracking-tight">
                  {personalInfo.headline}
                </p>
              )}
            </div>
          </div>

          {/* Contact Details Bar */}
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 mt-2.5 text-[11px] text-zinc-500">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-zinc-400" />
                <a href={`mailto:${personalInfo.email}`} className="hover:underline text-zinc-700">
                  {personalInfo.email}
                </a>
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-zinc-400" />
                <span>{personalInfo.phone}</span>
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-zinc-400" />
                <span>{personalInfo.location}</span>
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-zinc-400" />
                <a href={personalInfo.website} target="_blank" rel="noreferrer" className="hover:underline text-zinc-700">
                  {personalInfo.website.replace(/^https?:\/\//, '')}
                </a>
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <LinkedinIcon className="w-3 h-3 text-zinc-400" />
                <span className="text-zinc-700">{personalInfo.linkedin.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                <GithubIcon className="w-3 h-3 text-zinc-400" />
                <span className="text-zinc-700">{personalInfo.github.replace(/^https?:\/\//, '')}</span>
              </span>
            )}
          </div>

          {/* Summary */}
          {personalInfo.summary && (
            <p className="mt-2.5 text-[11.5px] text-zinc-600 leading-relaxed">
              {personalInfo.summary}
            </p>
          )}
        </header>

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-4">
            <h2
              className="text-[11px] font-bold uppercase tracking-wider mb-2 pb-0.5 border-b border-zinc-200"
              style={{ color: primaryColor }}
            >
              Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-zinc-900">
                      {exp.position}{' '}
                      {exp.company && <span className="font-normal text-zinc-600">· {exp.company}</span>}
                    </span>
                    <span className="text-[10.5px] text-zinc-500 font-mono">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      {exp.location && ` · ${exp.location}`}
                    </span>
                  </div>
                  {exp.bullets && exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1 space-y-0.5 list-disc list-outside pl-3.5 text-[11.5px] text-zinc-600 leading-relaxed">
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
          <section className="mb-4">
            <h2
              className="text-[11px] font-bold uppercase tracking-wider mb-2 pb-0.5 border-b border-zinc-200"
              style={{ color: primaryColor }}
            >
              Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-zinc-900">{proj.title}</span>
                      {proj.subtitle && (
                        <span className="text-[10.5px] text-zinc-500 italic">({proj.subtitle})</span>
                      )}
                    </div>
                    {proj.link && (
                      <span className="text-[10.5px] text-zinc-500 font-mono">
                        {proj.link.replace(/^https?:\/\//, '')}
                      </span>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="text-[10.5px] text-zinc-500 mt-0.5">
                      {proj.technologies.join(' · ')}
                    </div>
                  )}
                  {proj.bullets && proj.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-0.5 space-y-0.5 list-disc list-outside pl-3.5 text-[11.5px] text-zinc-600 leading-relaxed">
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

        {/* 2-Column: Education & Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2
                className="text-[11px] font-bold uppercase tracking-wider mb-2 pb-0.5 border-b border-zinc-200"
                style={{ color: primaryColor }}
              >
                Education
              </h2>
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-semibold text-zinc-900">{edu.institution}</span>
                      <span className="text-[10.5px] text-zinc-500 font-mono">{edu.endDate}</span>
                    </div>
                    <div className="text-[11.5px] text-zinc-600">
                      {edu.degree}
                      {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                    </div>
                    {(edu.gpa || edu.honors) && (
                      <div className="text-[10.5px] text-zinc-500 mt-0.5">
                        {edu.gpa && `GPA: ${edu.gpa}`}
                        {edu.gpa && edu.honors && ' · '}
                        {edu.honors}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills & Certifications */}
          <section>
            {skills.length > 0 && (
              <div className="mb-2.5">
                <h2
                  className="text-[11px] font-bold uppercase tracking-wider mb-2 pb-0.5 border-b border-zinc-200"
                  style={{ color: primaryColor }}
                >
                  Skills
                </h2>
                <div className="flex flex-wrap gap-1">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[10.5px] font-medium bg-zinc-100 text-zinc-700 rounded border border-zinc-200/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h3 className="text-[11px] font-bold uppercase tracking-wider mb-1 text-zinc-700">
                  Certifications
                </h3>
                <ul className="text-[11px] text-zinc-600 space-y-0.5">
                  {certifications.map((c) => (
                    <li key={c.id} className="flex justify-between">
                      <span className="font-medium text-zinc-800">{c.name}</span>
                      <span className="text-zinc-500">
                        {c.issuer} {c.date && `(${c.date})`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};
