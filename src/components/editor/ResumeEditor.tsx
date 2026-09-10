import React, { useState } from 'react';
import {
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  FolderGit2,
  Target,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import type { ResumeData } from '../../types/resume';
import { PersonalInfoSection } from './PersonalInfoSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { ProjectsSection } from './ProjectsSection';
import { AtsPanel } from './AtsPanel';
import { calculateProfileCompleteness } from '../../services/completenessScorer';

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
}

type SectionKey = 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'ats';

export const ResumeEditor: React.FC<ResumeEditorProps> = ({ data, onChange }) => {
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    personal: true,
    experience: true,
    education: true,
    skills: true,
    projects: false,
    ats: false
  });

  const [showTips, setShowTips] = useState(false);

  // Compute live profile health
  const completeness = calculateProfileCompleteness(data);

  const toggleSection = (section: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const expandAll = () => {
    setOpenSections({
      personal: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      ats: true
    });
  };

  const collapseAll = () => {
    setOpenSections({
      personal: false,
      experience: false,
      education: false,
      skills: false,
      projects: false,
      ats: false
    });
  };

  const scrollToSection = (id: SectionKey) => {
    if (!openSections[id]) {
      setOpenSections((prev) => ({ ...prev, [id]: true }));
    }
    setTimeout(() => {
      const el = document.getElementById(`editor-section-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleAddSkillFromAts = (newSkill: string) => {
    if (!data.skills.includes(newSkill)) {
      onChange({
        ...data,
        skills: [...data.skills, newSkill]
      });
    }
  };

  const sectionsConfig: { key: SectionKey; label: string; icon: React.ReactNode; badge?: string | number }[] = [
    { key: 'personal', label: 'Personal', icon: <User className="w-3.5 h-3.5 text-indigo-400" /> },
    {
      key: 'experience',
      label: 'Experience',
      icon: <Briefcase className="w-3.5 h-3.5 text-sky-400" />,
      badge: data.experience.length
    },
    {
      key: 'education',
      label: 'Education',
      icon: <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />,
      badge: data.education.length
    },
    {
      key: 'skills',
      label: 'Skills',
      icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" />,
      badge: data.skills.length
    },
    {
      key: 'projects',
      label: 'Projects',
      icon: <FolderGit2 className="w-3.5 h-3.5 text-purple-400" />,
      badge: data.projects.length + data.certifications.length
    },
    {
      key: 'ats',
      label: 'ATS Check',
      icon: <Target className="w-3.5 h-3.5 text-rose-400" />,
      badge: 'AI'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
    if (score >= 50) return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/20 border-rose-500/30';
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/60 border-r border-zinc-800/80">
      {/* Top Bar: Profile Completeness Score & Quick Nav */}
      <div className="sticky top-0 z-20 px-4 py-3 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800/80 flex flex-col gap-2.5">
        {/* Profile Strength & Health Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold text-zinc-300">Profile Strength</span>
            <button
              onClick={() => setShowTips(!showTips)}
              className={`px-2 py-0.5 rounded-full text-[11px] font-mono font-bold border transition-all flex items-center gap-1 ${getScoreColor(
                completeness.score
              )}`}
              title="Click to toggle improvement suggestions"
            >
              <span>{completeness.score}%</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showTips ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors"
              title="Expand all sections"
            >
              <Maximize2 className="w-3 h-3" /> Expand
            </button>
            <span className="text-zinc-700">|</span>
            <button
              onClick={collapseAll}
              className="text-[11px] text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors"
              title="Collapse all sections"
            >
              <Minimize2 className="w-3 h-3" /> Collapse
            </button>
          </div>
        </div>

        {/* Completeness Bar */}
        <div className="w-full h-1.5 bg-zinc-800/80 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              completeness.score >= 80
                ? 'bg-emerald-500'
                : completeness.score >= 50
                ? 'bg-amber-500'
                : 'bg-rose-500'
            }`}
            style={{ width: `${Math.max(4, completeness.score)}%` }}
          />
        </div>

        {/* Improvement Suggestions Dropdown */}
        {showTips && (
          <div className="p-3 bg-zinc-900 border border-zinc-700/80 rounded-xl space-y-2 animate-fade-in text-xs">
            <div className="font-semibold text-zinc-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Recommendations to reach 100% Strength:</span>
            </div>
            {completeness.suggestions.length === 0 ? (
              <div className="flex items-center gap-1.5 text-emerald-400 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>All core resume sections are fully completed!</span>
              </div>
            ) : (
              <ul className="space-y-1 text-[11px] text-zinc-400">
                {completeness.suggestions.map((sug, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-1.5">
                    <AlertCircle className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{sug}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Quick Nav Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {sectionsConfig.map((s) => (
            <button
              key={s.key}
              onClick={() => scrollToSection(s.key)}
              className={`px-2.5 py-1 text-xs rounded-xl font-medium flex items-center gap-1.5 whitespace-nowrap transition-all ${
                openSections[s.key]
                  ? 'bg-zinc-800 text-zinc-200 border border-zinc-700/80 shadow-sm'
                  : 'bg-zinc-900/60 text-zinc-500 hover:text-zinc-300 border border-zinc-800/60'
              }`}
            >
              {s.icon}
              <span>{s.label}</span>
              {s.badge !== undefined && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-zinc-700/80 text-zinc-300 font-semibold font-mono">
                  {s.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Accordion List Container */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
        {/* 1. Personal Info */}
        <div
          id="editor-section-personal"
          className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700/70 rounded-2xl overflow-hidden transition-all shadow-sm"
        >
          <button
            type="button"
            onClick={() => toggleSection('personal')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left bg-zinc-900/80 hover:bg-zinc-800/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
                <User className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-100">Personal & Contact Info</h3>
                <p className="text-[11px] text-zinc-400">
                  {data.personalInfo.fullName || 'Name not set'} • {data.personalInfo.headline || 'Headline'}
                </p>
              </div>
            </div>
            <div className="text-zinc-500">
              {openSections.personal ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>
          {openSections.personal && (
            <div className="p-4 border-t border-zinc-800/80">
              <PersonalInfoSection
                data={data.personalInfo}
                onChange={(personalInfo) => onChange({ ...data, personalInfo })}
              />
            </div>
          )}
        </div>

        {/* 2. Work Experience */}
        <div
          id="editor-section-experience"
          className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700/70 rounded-2xl overflow-hidden transition-all shadow-sm"
        >
          <button
            type="button"
            onClick={() => toggleSection('experience')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left bg-zinc-900/80 hover:bg-zinc-800/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-sky-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-zinc-100">Work Experience</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-medium font-mono">
                    {data.experience.length}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">Roles, bullet point manager, AI rewriter & reordering</p>
              </div>
            </div>
            <div className="text-zinc-500">
              {openSections.experience ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>
          {openSections.experience && (
            <div className="p-4 border-t border-zinc-800/80">
              <ExperienceSection
                experience={data.experience}
                onChange={(experience) => onChange({ ...data, experience })}
              />
            </div>
          )}
        </div>

        {/* 3. Education */}
        <div
          id="editor-section-education"
          className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700/70 rounded-2xl overflow-hidden transition-all shadow-sm"
        >
          <button
            type="button"
            onClick={() => toggleSection('education')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left bg-zinc-900/80 hover:bg-zinc-800/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-zinc-100">Education</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium font-mono">
                    {data.education.length}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">Degrees, academic institutions, and certifications</p>
              </div>
            </div>
            <div className="text-zinc-500">
              {openSections.education ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>
          {openSections.education && (
            <div className="p-4 border-t border-zinc-800/80">
              <EducationSection
                education={data.education}
                onChange={(education) => onChange({ ...data, education })}
              />
            </div>
          )}
        </div>

        {/* 4. Skills & Tech */}
        <div
          id="editor-section-skills"
          className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700/70 rounded-2xl overflow-hidden transition-all shadow-sm"
        >
          <button
            type="button"
            onClick={() => toggleSection('skills')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left bg-zinc-900/80 hover:bg-zinc-800/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-zinc-100">Skills & Tech Stack</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium font-mono">
                    {data.skills.length}
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">Fast tag-based addition with keyboard shortcuts</p>
              </div>
            </div>
            <div className="text-zinc-500">
              {openSections.skills ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>
          {openSections.skills && (
            <div className="p-4 border-t border-zinc-800/80">
              <SkillsSection
                skills={data.skills}
                onChange={(skills) => onChange({ ...data, skills })}
              />
            </div>
          )}
        </div>

        {/* 5. Projects & Certifications */}
        <div
          id="editor-section-projects"
          className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700/70 rounded-2xl overflow-hidden transition-all shadow-sm"
        >
          <button
            type="button"
            onClick={() => toggleSection('projects')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left bg-zinc-900/80 hover:bg-zinc-800/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
                <FolderGit2 className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-zinc-100">Projects & Certifications</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium font-mono">
                    {data.projects.length} proj / {data.certifications.length} cert
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">Personal or open-source projects and credentials</p>
              </div>
            </div>
            <div className="text-zinc-500">
              {openSections.projects ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>
          {openSections.projects && (
            <div className="p-4 border-t border-zinc-800/80">
              <ProjectsSection
                projects={data.projects}
                certifications={data.certifications}
                onProjectsChange={(projects) => onChange({ ...data, projects })}
                onCertificationsChange={(certifications) => onChange({ ...data, certifications })}
              />
            </div>
          )}
        </div>

        {/* 6. ATS Match Optimizer */}
        <div
          id="editor-section-ats"
          className="bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700/70 rounded-2xl overflow-hidden transition-all shadow-sm"
        >
          <button
            type="button"
            onClick={() => toggleSection('ats')}
            className="w-full px-4 py-3.5 flex items-center justify-between text-left bg-zinc-900/80 hover:bg-zinc-800/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
                <Target className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-zinc-100">ATS Job Description Optimizer</h3>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-medium font-mono">
                    AI Matcher
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400">Match resume against target job description</p>
              </div>
            </div>
            <div className="text-zinc-500">
              {openSections.ats ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>
          {openSections.ats && (
            <div className="p-4 border-t border-zinc-800/80">
              <AtsPanel
                resume={data}
                onAddSkill={handleAddSkillFromAts}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
