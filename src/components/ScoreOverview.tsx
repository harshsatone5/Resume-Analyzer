import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Award, 
  TrendingUp, 
  Zap, 
  FileCheck, 
  Crosshair,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Copy,
  Check,
  UserCheck,
  Mail,
  Globe,
  Code,
  MapPin,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  PlusCircle
} from 'lucide-react';
import type { ATSAnalysisResult } from '../services/atsEngine';

interface ScoreOverviewProps {
  analysis: ATSAnalysisResult;
  onSelectForStudio?: (text: string) => void;
}

export const ScoreOverview: React.FC<ScoreOverviewProps> = ({ 
  analysis,
  onSelectForStudio 
}) => {
  const { 
    overallScore, 
    grade, 
    gradeColor, 
    metrics, 
    stats, 
    contact, 
    sections, 
    skills, 
    actionableFixes 
  } = analysis;

  // Interactive Checklist State to calculate projected score boost
  const [completedFixIds, setCompletedFixIds] = useState<Set<string>>(new Set());
  const [copiedMissing, setCopiedMissing] = useState(false);

  // Trigger celebration confetti for high-performing resumes
  useEffect(() => {
    if (overallScore >= 85) {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [overallScore]);

  // Calculate projected score based on checked fixes
  const scoreBoostPerFix = Math.min(
    25, 
    Math.round(actionableFixes.reduce((acc, f) => {
      if (completedFixIds.has(f.id)) {
        return acc + (f.severity === 'high' ? 6 : f.severity === 'medium' ? 4 : 2);
      }
      return acc;
    }, 0))
  );

  const projectedScore = Math.min(100, overallScore + scoreBoostPerFix);

  // Circle radius and circumference for SVG progress ring
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (projectedScore / 100) * circumference;

  const toggleFix = (id: string) => {
    setCompletedFixIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleCopyMissingSkills = () => {
    if (!skills.missing || skills.missing.length === 0) return;
    navigator.clipboard.writeText(skills.missing.join(', '));
    setCopiedMissing(true);
    setTimeout(() => setCopiedMissing(false), 2000);
  };

  return (
    <div className="space-y-5">
      
      {/* 1. Primary Dashboard Hero Banner — Google Stitch workspace card */}
      <div className="s-card p-6 sm:p-8 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Circular Score Gauge with Live Simulator Boost */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center">
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                {/* Track */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="10"
                  fill="transparent"
                />
                {/* Animated Progress Ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke={completedFixIds.size > 0 ? 'var(--stitch-green)' : gradeColor}
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              {/* Inner Score Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold tracking-tight text-white font-mono">
                  {projectedScore}
                </span>
                <span className="text-xs" style={{ color: 'var(--stitch-text-dim)' }}>
                  out of 100
                </span>

                {scoreBoostPerFix > 0 && (
                  <span className="mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: 'rgba(129,201,149,0.15)', color: 'var(--stitch-green)' }}>
                    +{scoreBoostPerFix}% Boosted
                  </span>
                )}
              </div>
            </div>

            <div className="mt-3 flex flex-col items-center gap-1">
              <div 
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
                style={{ 
                  backgroundColor: `${gradeColor}14`, 
                  color: gradeColor,
                  border: `1px solid ${gradeColor}30`,
                }}
              >
                <Award className="w-3.5 h-3.5" />
                <span>{grade}</span>
              </div>
              <span className="text-xs mt-1" style={{ color: 'var(--stitch-text-dim)' }}>
                {overallScore >= 80 ? 'High interview callback probability' : 'Needs keyword optimization for ATS screening'}
              </span>
            </div>
          </div>

          {/* Right: Executive Summary & Candidate Info */}
          <div className="lg:col-span-8 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <ShieldCheck className="w-5 h-5" style={{ color: 'var(--stitch-green)' }} />
                <h2 className="text-xl font-bold text-white">
                  ATS Command & Compliance Summary
                </h2>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--stitch-text-secondary)' }}>
                {overallScore >= 85 ? (
                  'Your resume demonstrates strong keyword alignment, quantifiable achievement metrics, and compliant ATS parseability.'
                ) : overallScore >= 70 ? (
                  'Your resume passes basic automated screening filters, but integrating missing high-impact job keywords will raise your candidate ranking.'
                ) : (
                  'Automated Applicant Tracking Systems (ATS) may rank this resume lower due to missing role keywords or unquantified experience bullets.'
                )}
              </p>
            </div>

            {/* Candidate Metadata Strip */}
            <div className="s-surface-inset p-3.5">
              <div className="text-xs font-medium mb-2 flex items-center justify-between" style={{ color: 'var(--stitch-text-dim)' }}>
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5" style={{ color: 'var(--stitch-accent)' }} />
                  Candidate Metadata
                </span>
                <span className="font-mono text-xs" style={{ color: 'var(--stitch-text-secondary)' }}>
                  {contact.name || 'Profile'}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 text-xs">
                {/* Email */}
                <div 
                  className="px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                  style={{
                    background: contact.email ? 'rgba(129,201,149,0.1)' : 'rgba(242,139,130,0.1)',
                    color: contact.email ? 'var(--stitch-green)' : 'var(--stitch-red)',
                    border: `1px solid ${contact.email ? 'rgba(129,201,149,0.2)' : 'rgba(242,139,130,0.2)'}`
                  }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{contact.email ? contact.email : 'Missing Email'}</span>
                </div>

                {/* LinkedIn */}
                <div 
                  className="px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                  style={{
                    background: contact.linkedin ? 'rgba(138,180,248,0.1)' : 'var(--stitch-surface-2)',
                    color: contact.linkedin ? 'var(--stitch-accent)' : 'var(--stitch-text-dim)',
                    border: '1px solid var(--stitch-border)'
                  }}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{contact.linkedin ? 'LinkedIn Linked' : 'No LinkedIn'}</span>
                </div>

                {/* GitHub */}
                <div 
                  className="px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                  style={{
                    background: contact.github ? 'rgba(197,138,249,0.1)' : 'var(--stitch-surface-2)',
                    color: contact.github ? 'var(--stitch-purple)' : 'var(--stitch-text-dim)',
                    border: '1px solid var(--stitch-border)'
                  }}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>{contact.github ? 'GitHub Included' : 'No GitHub'}</span>
                </div>

                {/* Location */}
                {contact.location && (
                  <div className="px-2.5 py-1 rounded-lg flex items-center gap-1.5" style={{ background: 'var(--stitch-surface-2)', border: '1px solid var(--stitch-border)', color: 'var(--stitch-text-secondary)' }}>
                    <MapPin className="w-3.5 h-3.5" style={{ color: 'var(--stitch-yellow)' }} />
                    <span>{contact.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Key Stat Counters */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="s-surface-inset p-3 text-center">
                <span className="text-xs block mb-0.5" style={{ color: 'var(--stitch-text-dim)' }}>Word Count</span>
                <span className="text-base font-semibold font-mono text-white">{stats.wordCount}</span>
                <span className="text-[10px] block mt-0.5" style={{ color: 'var(--stitch-green)' }}>
                  {stats.wordCount >= 400 && stats.wordCount <= 850 ? 'Ideal Length' : 'Check Length'}
                </span>
              </div>

              <div className="s-surface-inset p-3 text-center">
                <span className="text-xs block mb-0.5" style={{ color: 'var(--stitch-text-dim)' }}>Bullets</span>
                <span className="text-base font-semibold font-mono text-white">{stats.bulletCount}</span>
                <span className="text-[10px] block mt-0.5" style={{ color: 'var(--stitch-text-dim)' }}>Structured</span>
              </div>

              <div className="s-surface-inset p-3 text-center">
                <span className="text-xs block mb-0.5" style={{ color: 'var(--stitch-text-dim)' }}>Quantified Metrics</span>
                <span className="text-base font-semibold font-mono" style={{ color: 'var(--stitch-green)' }}>
                  {Math.round((stats.quantifiedBulletCount / Math.max(1, stats.bulletCount)) * 100)}%
                </span>
                <span className="text-[10px] block mt-0.5" style={{ color: 'var(--stitch-text-dim)' }}>
                  {stats.quantifiedBulletCount} of {stats.bulletCount}
                </span>
              </div>

              <div className="s-surface-inset p-3 text-center">
                <span className="text-xs block mb-0.5" style={{ color: 'var(--stitch-text-dim)' }}>Action Verbs</span>
                <span className="text-base font-semibold font-mono" style={{ color: 'var(--stitch-accent)' }}>
                  {stats.powerVerbCount}
                </span>
                <span className="text-[10px] block mt-0.5" style={{ color: stats.weakVerbCount > 0 ? 'var(--stitch-red)' : 'var(--stitch-green)' }}>
                  {stats.weakVerbCount > 0 ? `${stats.weakVerbCount} passive` : 'Zero passive'}
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 2. Interactive ATS Score Simulator & Action Checklist */}
      <div className="s-card p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4" style={{ borderBottom: '1px solid var(--stitch-border)' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4" style={{ color: 'var(--stitch-yellow)' }} />
              <h3 className="text-base font-semibold text-white">
                ATS Action Checklist
              </h3>
            </div>
            <p className="text-xs" style={{ color: 'var(--stitch-text-secondary)' }}>
              Check off recommended fixes to simulate your real-time score boost.
            </p>
          </div>

          <div className="flex items-center gap-2 s-surface-inset px-3 py-1.5 text-xs">
            <span style={{ color: 'var(--stitch-text-dim)' }}>Resolved:</span>
            <span className="font-semibold font-mono" style={{ color: 'var(--stitch-green)' }}>{completedFixIds.size} / {actionableFixes.length}</span>
          </div>
        </div>

        <div className="space-y-2.5">
          {actionableFixes.map((fix) => {
            const isDone = completedFixIds.has(fix.id);
            return (
              <div 
                key={fix.id}
                onClick={() => toggleFix(fix.id)}
                className="s-card-flush p-3.5 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                style={{
                  background: isDone ? 'rgba(129,201,149,0.06)' : 'var(--stitch-surface)',
                  borderColor: isDone ? 'rgba(129,201,149,0.3)' : 'var(--stitch-border)'
                }}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="mt-0.5 flex-shrink-0 w-4 h-4 rounded flex items-center justify-center transition-colors"
                    style={{
                      background: isDone ? 'var(--stitch-green)' : 'transparent',
                      border: `1px solid ${isDone ? 'var(--stitch-green)' : 'var(--stitch-border-hover)'}`,
                      color: 'var(--stitch-bg)'
                    }}
                  >
                    {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                        style={{
                          background: fix.severity === 'high' ? 'rgba(242,139,130,0.12)' : fix.severity === 'medium' ? 'rgba(253,214,99,0.12)' : 'rgba(138,180,248,0.12)',
                          color: fix.severity === 'high' ? 'var(--stitch-red)' : fix.severity === 'medium' ? 'var(--stitch-yellow)' : 'var(--stitch-accent)',
                          border: `1px solid ${fix.severity === 'high' ? 'rgba(242,139,130,0.25)' : fix.severity === 'medium' ? 'rgba(253,214,99,0.25)' : 'rgba(138,180,248,0.25)'}`
                        }}
                      >
                        {fix.severity}
                      </span>
                      <span className="text-xs font-semibold text-white">{fix.title}</span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--stitch-text-secondary)' }}>{fix.explanation}</p>
                  </div>
                </div>

                {fix.originalText && onSelectForStudio && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectForStudio(fix.originalText!);
                    }}
                    className="s-btn-ghost text-xs flex-shrink-0"
                    style={{ color: 'var(--stitch-purple)' }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Fix in Studio</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Skill & Keyword Cloud & Section Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Missing Keywords Box */}
        <div className="lg:col-span-7 s-card p-5">
          <div className="flex items-center justify-between pb-3 mb-3" style={{ borderBottom: '1px solid var(--stitch-border)' }}>
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" style={{ color: 'var(--stitch-yellow)' }} />
                Missing Role Keywords ({skills.missing.length})
              </h3>
              <p className="text-xs" style={{ color: 'var(--stitch-text-dim)' }}>Keywords required in JD but not identified in resume</p>
            </div>

            <button
              onClick={handleCopyMissingSkills}
              className="s-btn-ghost text-xs"
            >
              {copiedMissing ? <Check className="w-3 h-3" style={{ color: 'var(--stitch-green)' }} /> : <Copy className="w-3 h-3" />}
              <span>{copiedMissing ? 'Copied' : 'Copy All'}</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {skills.missing.length > 0 ? (
              skills.missing.map((sk, idx) => (
                <span 
                  key={idx}
                  className="text-xs px-2.5 py-1 rounded-full font-mono flex items-center gap-1"
                  style={{
                    background: 'rgba(242,139,130,0.08)',
                    color: 'var(--stitch-red)',
                    border: '1px solid rgba(242,139,130,0.2)'
                  }}
                >
                  <PlusCircle className="w-3 h-3" />
                  {sk}
                </span>
              ))
            ) : (
              <p className="text-xs" style={{ color: 'var(--stitch-green)' }}>Zero missing keywords! Complete coverage.</p>
            )}
          </div>
        </div>

        {/* Section Header Health */}
        <div className="lg:col-span-5 s-card p-5">
          <div className="pb-3 mb-3" style={{ borderBottom: '1px solid var(--stitch-border)' }}>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" style={{ color: 'var(--stitch-accent)' }} />
              Section Structure
            </h3>
            <p className="text-xs" style={{ color: 'var(--stitch-text-dim)' }}>Standard ATS header detection status</p>
          </div>

          <div className="space-y-1.5">
            {sections.map((sec, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-2 rounded-xl text-xs"
                style={{ background: 'var(--stitch-surface-2)', border: '1px solid var(--stitch-border)' }}
              >
                <div className="flex items-center gap-2">
                  {sec.found ? (
                    <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--stitch-green)' }} />
                  ) : (
                    <AlertTriangle className="w-3.5 h-3.5" style={{ color: 'var(--stitch-yellow)' }} />
                  )}
                  <span className="font-medium text-white">{sec.name}</span>
                </div>

                <span 
                  className="text-[11px] px-2 py-0.5 rounded font-mono"
                  style={{
                    background: sec.found ? 'rgba(129,201,149,0.1)' : 'rgba(253,214,99,0.1)',
                    color: sec.found ? 'var(--stitch-green)' : 'var(--stitch-yellow)',
                    border: `1px solid ${sec.found ? 'rgba(129,201,149,0.2)' : 'rgba(253,214,99,0.2)'}`
                  }}
                >
                  {sec.found ? `${sec.lineCount} lines` : 'Missing'}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4 Core Dimensional Audit Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Metric 1: Format & Parseability */}
        <div className="s-card p-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4" style={{ color: 'var(--stitch-green)' }} />
              <h4 className="text-sm font-semibold text-white">{metrics.formatAndAts.name}</h4>
            </div>
            <span className="text-sm font-mono font-semibold" style={{ color: 'var(--stitch-green)' }}>
              {metrics.formatAndAts.score} / {metrics.formatAndAts.maxScore}
            </span>
          </div>

          <div className="s-progress-track mb-3">
            <div 
              className="s-progress-fill"
              style={{ 
                width: `${(metrics.formatAndAts.score / metrics.formatAndAts.maxScore) * 100}%`,
                background: 'var(--stitch-green)'
              }}
            />
          </div>

          <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--stitch-text-secondary)' }}>{metrics.formatAndAts.summary}</p>
          <ul className="space-y-1.5">
            {metrics.formatAndAts.tips.map((tip, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2" style={{ color: 'var(--stitch-text-dim)' }}>
                <span style={{ color: 'var(--stitch-green)' }}>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Metric 2: Quantification & Impact */}
        <div className="s-card p-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" style={{ color: 'var(--stitch-accent)' }} />
              <h4 className="text-sm font-semibold text-white">{metrics.quantification.name}</h4>
            </div>
            <span className="text-sm font-mono font-semibold" style={{ color: 'var(--stitch-accent)' }}>
              {metrics.quantification.score} / {metrics.quantification.maxScore}
            </span>
          </div>

          <div className="s-progress-track mb-3">
            <div 
              className="s-progress-fill"
              style={{ 
                width: `${(metrics.quantification.score / metrics.quantification.maxScore) * 100}%`,
                background: 'var(--stitch-accent)'
              }}
            />
          </div>

          <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--stitch-text-secondary)' }}>{metrics.quantification.summary}</p>
          <ul className="space-y-1.5">
            {metrics.quantification.tips.map((tip, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2" style={{ color: 'var(--stitch-text-dim)' }}>
                <span style={{ color: 'var(--stitch-accent)' }}>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Metric 3: Power Verbs & Tone */}
        <div className="s-card p-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" style={{ color: 'var(--stitch-yellow)' }} />
              <h4 className="text-sm font-semibold text-white">{metrics.powerVerbs.name}</h4>
            </div>
            <span className="text-sm font-mono font-semibold" style={{ color: 'var(--stitch-yellow)' }}>
              {metrics.powerVerbs.score} / {metrics.powerVerbs.maxScore}
            </span>
          </div>

          <div className="s-progress-track mb-3">
            <div 
              className="s-progress-fill"
              style={{ 
                width: `${(metrics.powerVerbs.score / metrics.powerVerbs.maxScore) * 100}%`,
                background: 'var(--stitch-yellow)'
              }}
            />
          </div>

          <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--stitch-text-secondary)' }}>{metrics.powerVerbs.summary}</p>
          <ul className="space-y-1.5">
            {metrics.powerVerbs.tips.map((tip, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2" style={{ color: 'var(--stitch-text-dim)' }}>
                <span style={{ color: 'var(--stitch-yellow)' }}>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Metric 4: Keyword & Role Match */}
        <div className="s-card p-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <Crosshair className="w-4 h-4" style={{ color: 'var(--stitch-purple)' }} />
              <h4 className="text-sm font-semibold text-white">{metrics.skillAlignment.name}</h4>
            </div>
            <span className="text-sm font-mono font-semibold" style={{ color: 'var(--stitch-purple)' }}>
              {metrics.skillAlignment.score} / {metrics.skillAlignment.maxScore}
            </span>
          </div>

          <div className="s-progress-track mb-3">
            <div 
              className="s-progress-fill"
              style={{ 
                width: `${(metrics.skillAlignment.score / metrics.skillAlignment.maxScore) * 100}%`,
                background: 'var(--stitch-purple)'
              }}
            />
          </div>

          <p className="text-xs mb-3 leading-relaxed" style={{ color: 'var(--stitch-text-secondary)' }}>{metrics.skillAlignment.summary}</p>
          <ul className="space-y-1.5">
            {metrics.skillAlignment.tips.map((tip, idx) => (
              <li key={idx} className="text-xs flex items-start gap-2" style={{ color: 'var(--stitch-text-dim)' }}>
                <span style={{ color: 'var(--stitch-purple)' }}>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
};
