import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../../icons/SocialIcons';
import type { ResumeData, ResumeTheme } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ data, theme }) => {
  const { personalInfo, experience, education, skills, projects, certifications } = data;
  const primaryColor = theme.primaryColor || '#7c3aed';

  return (
    <div className="resume-sheet creative-template w-full h-full bg-white text-zinc-800 font-sans flex flex-col md:flex-row min-h-full">
      {/* Left Sidebar */}
      <aside
        className="w-full md:w-[34%] p-6 sm:p-7 text-white flex flex-col justify-between"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="space-y-6">
          {/* Header on Sidebar */}
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
              {personalInfo.fullName || 'Your Name'}
            </h1>
            {personalInfo.headline && (
              <p className="text-xs text-white/80 font-medium mt-1">
                {personalInfo.headline}
              </p>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-2.5 text-xs text-white/90">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/60 border-b border-white/20 pb-1">
              Contact
            </h2>
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-white/80 flex-shrink-0" />
                <span className="truncate">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white/80 flex-shrink-0" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-white/80 flex-shrink-0" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-white/80 flex-shrink-0" />
                <span className="truncate">{personalInfo.website.replace(/^https?:\/\//, '')}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <LinkedinIcon className="w-3.5 h-3.5 text-white/80 flex-shrink-0" />
                <span className="truncate">{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-center gap-2">
                <GithubIcon className="w-3.5 h-3.5 text-white/80 flex-shrink-0" />
                <span className="truncate">{personalInfo.github}</span>
              </div>
            )}
          </div>

          {/* Skills on Sidebar */}
          {skills.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/60 border-b border-white/20 pb-1 mb-2.5">
                Technical Stack
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-[10px] font-medium bg-white/15 text-white rounded-md backdrop-blur-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education on Sidebar */}
          {education.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/60 border-b border-white/20 pb-1 mb-2">
                Education
              </h2>
              <div className="space-y-2 text-xs">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="font-bold text-white text-xs">{edu.institution}</div>
                    <div className="text-white/80 text-[11px]">
                      {edu.degree}
                      {edu.fieldOfStudy && ` - ${edu.fieldOfStudy}`}
                    </div>
                    <div className="text-white/60 text-[10px]">{edu.endDate}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-white/60 border-b border-white/20 pb-1 mb-2">
                Certifications
              </h2>
              <div className="space-y-1.5 text-xs">
                {certifications.map((c) => (
                  <div key={c.id} className="text-[11px]">
                    <div className="font-semibold text-white">{c.name}</div>
                    <div className="text-white/70 text-[10px]">{c.issuer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Right Main Content */}
      <main className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
        <div>
          {/* Summary */}
          {personalInfo.summary && (
            <div className="mb-6">
              <h2
                className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"
                style={{ color: primaryColor }}
              >
                <span>Profile Overview</span>
              </h2>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {personalInfo.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h2
                className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b border-zinc-200"
                style={{ color: primaryColor }}
              >
                Experience & Roles
              </h2>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-3 border-l-2 border-zinc-200">
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-bold text-zinc-900">{exp.position}</span>
                      <span className="text-[11px] text-zinc-500 font-medium">
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-zinc-600 mb-1">
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                    {exp.bullets && exp.bullets.filter(Boolean).length > 0 && (
                      <ul className="space-y-1 list-disc list-outside pl-4 text-xs text-zinc-600 leading-relaxed">
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

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h2
                className="text-xs font-bold uppercase tracking-wider mb-3 pb-1 border-b border-zinc-200"
                style={{ color: primaryColor }}
              >
                Featured Projects
              </h2>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-bold text-zinc-900">{proj.title}</span>
                      {proj.link && (
                        <span className="text-[11px] text-zinc-400 font-mono">
                          {proj.link.replace(/^https?:\/\//, '')}
                        </span>
                      )}
                    </div>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="text-[10px] font-semibold text-zinc-500">
                        {proj.technologies.join(' • ')}
                      </div>
                    )}
                    {proj.bullets && proj.bullets.filter(Boolean).length > 0 && (
                      <ul className="mt-1 space-y-0.5 list-disc list-outside pl-4 text-xs text-zinc-600 leading-relaxed">
                        {proj.bullets.filter(Boolean).map((bullet, idx) => (
                          <li key={idx}>{bullet}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
