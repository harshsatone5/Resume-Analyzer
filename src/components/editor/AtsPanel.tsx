import React, { useState } from 'react';
import { Target, CheckCircle2, AlertCircle, Plus, Sparkles } from 'lucide-react';
import type { ResumeData } from '../../types/resume';
import { analyzeAtsMatch } from '../../services/atsOptimizer';

interface AtsPanelProps {
  resume: ResumeData;
  onAddSkill: (skill: string) => void;
}

export const AtsPanel: React.FC<AtsPanelProps> = ({ resume, onAddSkill }) => {
  const [jobDescription, setJobDescription] = useState('');

  const analysis = analyzeAtsMatch(resume, jobDescription);

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 50) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const handleAddMissingKeyword = (keyword: string) => {
    // Capitalize first letter of each word
    const formatted = keyword
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    onAddSkill(formatted);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-400" />
          <h4 className="text-xs font-semibold text-zinc-200">Target Job Description & ATS Matcher</h4>
        </div>
        {jobDescription && (
          <button
            onClick={() => setJobDescription('')}
            className="text-[11px] text-zinc-500 hover:text-zinc-300"
          >
            Clear JD
          </button>
        )}
      </div>

      <div className="relative">
        <textarea
          rows={4}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the target job description or requirements here to measure ATS keyword match against your live resume..."
          className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-700/80 rounded-xl text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500 leading-relaxed resize-y"
        />
      </div>

      {jobDescription.trim().length > 15 && (
        <div className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl space-y-4 animate-fade-in">
          {/* Match Score Meter */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-medium text-zinc-400">ATS Keyword Match Score</div>
              <div className="text-[11px] text-zinc-500">Based on technical and leadership keyword density</div>
            </div>
            <div
              className={`px-3 py-1 rounded-xl border text-base font-bold flex items-center gap-1.5 ${getScoreColor(
                analysis.matchScore
              )}`}
            >
              <span>{analysis.matchScore}%</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                analysis.matchScore >= 75
                  ? 'bg-emerald-500'
                  : analysis.matchScore >= 50
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${Math.max(5, analysis.matchScore)}%` }}
            />
          </div>

          {/* Matched Keywords */}
          <div>
            <div className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5 mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Matched Keywords ({analysis.matchedKeywords.length})
            </div>
            {analysis.matchedKeywords.length === 0 ? (
              <p className="text-[11px] text-zinc-500 italic">No matching keywords detected yet.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {analysis.matchedKeywords.map((kw) => (
                  <span
                    key={kw}
                    className="inline-flex items-center px-2 py-0.5 text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-lg"
                  >
                    ✓ {kw}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Missing Keywords */}
          {analysis.missingKeywords.length > 0 && (
            <div className="pt-2 border-t border-zinc-800">
              <div className="text-[11px] font-semibold text-amber-400 flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Missing Keywords from JD ({analysis.missingKeywords.length})
                </span>
                <span className="text-[10px] text-zinc-500 font-normal">Click (+) to add directly to Skills</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.missingKeywords.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => handleAddMissingKeyword(kw)}
                    className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-zinc-800 hover:bg-amber-500/20 text-zinc-300 hover:text-amber-200 border border-zinc-700 hover:border-amber-500/40 rounded-lg transition-all group"
                  >
                    <Plus className="w-3 h-3 text-zinc-500 group-hover:text-amber-300" />
                    <span>{kw}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="p-3 bg-zinc-950/60 rounded-xl border border-zinc-800/80 text-[11px] text-zinc-400 space-y-1">
            <div className="font-semibold text-zinc-300 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              Optimization Advice:
            </div>
            {analysis.recommendations.map((rec, rIdx) => (
              <p key={rIdx} className="leading-relaxed text-zinc-400">
                • {rec}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
