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
    <div className="resume-sheet modern-template w-full h-full bg-white text-zinc-800 p-8 sm:p-10 font-sans flex flex-col justify-between">
      <div>
        {/* Top Header */}
        <header className="border-b-2 pb-5 mb-5" style={{ borderColor: primaryColor }}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900" style={{ color: primaryColor }}>
                {personalInfo.fullName || 'Your Name'}
              </h1>
              {personalInfo.headline && (
                <p className="text-sm sm:text-base font-semibold text-zinc-700 mt-0.5">
                  {personalInfo.headline}
                </p>
              )}
            </div>
          </div>

          {/* Contact Details Bar */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-zinc-600">
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

          {/* Professional Summary */}
          {personalInfo.summary && (
            <p className="mt-3 text-xs text-zinc-600 leading-relaxed">
              {personalInfo.summary}
            </p>
          )}
        </header>

        {/* Experience Section */}
        {experience.length > 0 && (
          <section className="mb-5">
            <h2
              className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b border-zinc-200 flex items-center gap-2"
              style={{ color: primaryColor }}
            >
              <span>Work Experience</span>
            </h2>
            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-zinc-900">
                      {exp.position}{' '}
                      {exp.company && <span className="font-normal text-zinc-600">| {exp.company}</span>}
                    </span>
                    <span className="text-[11px] font-medium text-zinc-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      {exp.location && ` • ${exp.location}`}
                    </span>
                  </div>
                  {exp.bullets && exp.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1.5 space-y-1 list-disc list-outside pl-4 text-xs text-zinc-600 leading-relaxed">
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
              className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b border-zinc-200"
              style={{ color: primaryColor }}
            >
              Projects & Initiatives
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900">{proj.title}</span>
                      {proj.subtitle && (
                        <span className="text-[11px] text-zinc-500 italic">({proj.subtitle})</span>
                      )}
                    </div>
                    {proj.link && (
                      <span className="text-[11px] text-zinc-500 font-mono">
                        {proj.link.replace(/^https?:\/\//, '')}
                      </span>
                    )}
                  </div>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="text-[11px] font-medium text-zinc-500 mt-0.5">
                      Tech: {proj.technologies.join(', ')}
                    </div>
                  )}
                  {proj.bullets && proj.bullets.filter(Boolean).length > 0 && (
                    <ul className="mt-1 space-y-1 list-disc list-outside pl-4 text-xs text-zinc-600 leading-relaxed">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b border-zinc-200"
                style={{ color: primaryColor }}
              >
                Education
              </h2>
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-bold text-zinc-900">{edu.institution}</span>
                      <span className="text-[11px] text-zinc-500">{edu.endDate}</span>
                    </div>
                    <div className="text-xs text-zinc-600">
                      {edu.degree}
                      {edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}
                    </div>
                    {(edu.gpa || edu.honors) && (
                      <div className="text-[11px] text-zinc-500 italic mt-0.5">
                        {edu.gpa && `GPA: ${edu.gpa}`}
                        {edu.gpa && edu.honors && ' • '}
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
              <div className="mb-3">
                <h2
                  className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b border-zinc-200"
                  style={{ color: primaryColor }}
                >
                  Technical Skills
                </h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 text-[11px] font-medium bg-zinc-100 text-zinc-800 rounded border border-zinc-200/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider mb-1.5 text-zinc-700">
                  Certifications
                </h3>
                <ul className="text-xs text-zinc-600 space-y-1">
                  {certifications.map((c) => (
                    <li key={c.id} className="flex justify-between text-[11px]">
                      <span className="font-semibold text-zinc-800">{c.name}</span>
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
