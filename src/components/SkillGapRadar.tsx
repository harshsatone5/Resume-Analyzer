import React, { useState } from 'react';
import { Check, AlertCircle, Sparkles, Copy, CheckCheck, Target } from 'lucide-react';
import type { SkillMatchResult } from '../services/atsEngine';

interface SkillGapRadarProps {
  skills: SkillMatchResult;
  targetRoleTitle?: string;
}

export const SkillGapRadar: React.FC<SkillGapRadarProps> = ({ skills, targetRoleTitle }) => {
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null);

  const handleCopy = (skill: string) => {
    navigator.clipboard.writeText(skill);
    setCopiedSkill(skill);
    setTimeout(() => setCopiedSkill(null), 1800);
  };

  return (
    <div className="s-card p-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5" style={{ borderBottom: '1px solid var(--stitch-border)' }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4" style={{ color: 'var(--stitch-accent)' }} />
            <h3 className="text-base font-semibold text-white">
              Skill & Competency Gap Analysis
            </h3>
          </div>
          <p className="text-xs" style={{ color: 'var(--stitch-text-secondary)' }}>
            Keyword comparison against {targetRoleTitle || 'target industry standards'}
          </p>
        </div>

        {/* Match Rate Progress Capsule */}
        <div className="s-surface-inset px-4 py-2.5 flex items-center gap-3.5">
          <div>
            <span className="text-[11px] block" style={{ color: 'var(--stitch-text-dim)' }}>Role Match Rate</span>
            <span className="text-lg font-mono font-semibold" style={{ color: 'var(--stitch-accent)' }}>{skills.matchRate}%</span>
          </div>
          <div className="w-24 s-progress-track">
            <div 
              className="s-progress-fill"
              style={{ width: `${skills.matchRate}%`, background: 'var(--stitch-accent)' }}
            />
          </div>
        </div>
      </div>

      {/* 3 Columns: Matched, Missing, and Bonus */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* 1. Matched Skills */}
        <div className="s-surface-inset p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: 'var(--stitch-green)' }}>
              <Check className="w-3.5 h-3.5" />
              Matched ({skills.matched.length})
            </span>
            <span className="text-[10px] font-mono" style={{ color: 'var(--stitch-text-dim)' }}>Verified</span>
          </div>
          
          {skills.matched.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {skills.matched.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1"
                  style={{
                    background: 'rgba(129,201,149,0.1)',
                    color: 'var(--stitch-green)',
                    border: '1px solid rgba(129,201,149,0.2)'
                  }}
                >
                  <Check className="w-3 h-3" />
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs italic" style={{ color: 'var(--stitch-text-dim)' }}>No direct keyword overlap detected.</p>
          )}
        </div>

        {/* 2. Missing Skills */}
        <div className="s-surface-inset p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: 'var(--stitch-red)' }}>
              <AlertCircle className="w-3.5 h-3.5" />
              Missing ({skills.missing.length})
            </span>
            <span className="text-[10px] font-mono" style={{ color: 'var(--stitch-red)' }}>High Priority</span>
          </div>

          {skills.missing.length > 0 ? (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5">
                {skills.missing.map((skill, idx) => {
                  const isCopied = copiedSkill === skill;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleCopy(skill)}
                      className="text-xs px-2.5 py-1 rounded-full flex items-center gap-1.5 cursor-pointer transition-colors"
                      style={{
                        background: 'rgba(242,139,130,0.08)',
                        color: 'var(--stitch-red)',
                        border: '1px solid rgba(242,139,130,0.2)'
                      }}
                      title="Click to copy keyword"
                    >
                      <span>{skill}</span>
                      {isCopied ? (
                        <CheckCheck className="w-3 h-3" style={{ color: 'var(--stitch-green)' }} />
                      ) : (
                        <Copy className="w-3 h-3 opacity-60" />
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] pt-1 leading-normal" style={{ color: 'var(--stitch-text-dim)' }}>
                Click to copy. Integrating these keywords into your bullets raises your ATS rank.
              </p>
            </div>
          ) : (
            <div className="p-3 rounded-lg text-xs flex items-center gap-2" style={{ background: 'rgba(129,201,149,0.08)', color: 'var(--stitch-green)' }}>
              <Check className="w-4 h-4" />
              <span>Zero missing competencies! Full coverage.</span>
            </div>
          )}
        </div>

        {/* 3. Additional Candidate Strengths */}
        <div className="s-surface-inset p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: 'var(--stitch-purple)' }}>
              <Sparkles className="w-3.5 h-3.5" />
              Bonus Strengths ({skills.extra.length})
            </span>
            <span className="text-[10px] font-mono" style={{ color: 'var(--stitch-text-dim)' }}>Differentiators</span>
          </div>

          {skills.extra.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {skills.extra.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={{
                    background: 'rgba(197,138,249,0.1)',
                    color: 'var(--stitch-purple)',
                    border: '1px solid rgba(197,138,249,0.2)'
                  }}
                >
                  +{skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs italic" style={{ color: 'var(--stitch-text-dim)' }}>No additional technical competencies extracted.</p>
          )}
        </div>

      </div>

    </div>
  );
};
