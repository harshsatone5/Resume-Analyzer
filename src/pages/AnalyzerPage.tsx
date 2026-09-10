import React, { useState } from 'react';
import {
  Target,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Zap,
  RotateCcw,
  Check,
  ShieldCheck,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { sampleResume } from '../data/sampleResumes';
import { analyzeAtsMatch } from '../services/atsOptimizer';
import type { ResumeData } from '../types/resume';

interface AnalyzerPageProps {
  onOpenInStudio: (data: ResumeData) => void;
}

export const AnalyzerPage: React.FC<AnalyzerPageProps> = ({ onOpenInStudio }) => {
  const [resumeText, setResumeText] = useState(
    `${sampleResume.personalInfo.fullName}\n${sampleResume.personalInfo.headline}\n\nSummary:\n${sampleResume.personalInfo.summary}\n\nSkills:\n${sampleResume.skills.join(', ')}\n\nExperience:\n${sampleResume.experience.map((e) => `${e.position} at ${e.company}\n${e.bullets.join('\n')}`).join('\n\n')}`
  );
  const [jobDescription, setJobDescription] = useState(
    `Looking for a Senior Full-Stack Cloud Engineer with 5+ years experience.\nMust have strong expertise in TypeScript, React, Node.js, Go (Golang), Kubernetes, AWS (Lambda, ECS), PostgreSQL, Redis, and Distributed Systems.\nExperience with Microservices, Apache Kafka, CI/CD pipelines, and high-scale API optimization required.`
  );
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'missing' | 'matched'>('all');

  const analysis = analyzeAtsMatch(sampleResume, jobDescription);

  const handleRunScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 600);
  };

  const handleLoadSample = () => {
    setResumeText(
      `${sampleResume.personalInfo.fullName}\n${sampleResume.personalInfo.headline}\n\nSummary:\n${sampleResume.personalInfo.summary}\n\nSkills:\n${sampleResume.skills.join(', ')}\n\nExperience:\n${sampleResume.experience.map((e) => `${e.position} at ${e.company}\n${e.bullets.join('\n')}`).join('\n\n')}`
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (score >= 50) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-teal-400';
    if (score >= 50) return 'from-amber-500 to-orange-400';
    return 'from-rose-500 to-pink-500';
  };

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#DEDBC8]/20 selection:text-[#DEDBC8]">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-4"
             style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}>
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span className="text-zinc-300">Parse-Proof ATS Engine</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">Keyword & Formatting Audit</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Beat the Recruiter Filter.
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto">
          75% of resumes are discarded by Applicant Tracking Systems before a human ever reads them.
          Compare your draft against the job requirements in seconds.
        </p>
      </div>

      {/* Input Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left: Resume Text */}
        <div className="glass-card p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <label className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              <span>Your Resume Content</span>
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={handleLoadSample}
                className="text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1"
                title="Populate with sample text"
              >
                <RotateCcw className="w-3 h-3" /> Load Sample
              </button>
              <span className="text-[11px] font-mono text-zinc-500 tabular-nums">
                {resumeText.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
          </div>

          <textarea
            rows={10}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume markdown, plain text, or summary here..."
            className="w-full px-4 py-3 text-xs bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-primary/80 font-mono leading-relaxed resize-y transition-all"
          />

          <div className="text-[11px] text-zinc-500 flex items-center justify-between">
            <span>Includes experience, education & skills sections</span>
            <span className="text-emerald-400 flex items-center gap-1 font-medium">
              <Check className="w-3 h-3" /> Ready to parse
            </span>
          </div>
        </div>

        {/* Right: Job Description */}
        <div className="glass-card p-6 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800/80">
            <label className="text-xs font-semibold text-zinc-200 flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Target Job Description</span>
            </label>
            <span className="text-[11px] font-mono text-zinc-500 tabular-nums">
              {jobDescription.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <textarea
            rows={10}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job opening requirements, responsibilities, or LinkedIn post..."
            className="w-full px-4 py-3 text-xs bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700/80 rounded-xl text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-primary/80 font-mono leading-relaxed resize-y transition-all"
          />

          <div className="text-[11px] text-zinc-500 flex items-center justify-between">
            <span>Identifies hard skills, tech stacks, and domain terms</span>
            <span className="text-zinc-400">Real-time keyword extractor</span>
          </div>
        </div>
      </div>

      {/* Action Scan Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <button
          onClick={handleRunScan}
          disabled={isScanning || !resumeText.trim()}
          className="btn-primary text-sm px-8 py-3.5 font-bold shadow-xl shadow-black/40 disabled:opacity-50"
        >
          {isScanning ? (
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <Cpu className="w-4 h-4" />
          )}
          <span>{isScanning ? 'Parsing Keywords & Formatting...' : 'Run Comprehensive ATS Audit'}</span>
        </button>
      </div>

      {/* Results Dashboard */}
      {hasScanned && (
        <div className="glass-card p-6 sm:p-8 lg:p-10 space-y-8 animate-fade-in shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />

          {/* Header Score Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-zinc-400 font-bold">Audit Results</span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-emerald-400 font-medium">Scored against ATS benchmark</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Target Role: {analysis.jobTitle}
              </h2>
              <p className="text-xs text-zinc-400">
                Your resume satisfies the baseline keyword frequency for enterprise ATS software.
              </p>
            </div>

            {/* Score Badge & CTA */}
            <div className="flex items-center gap-4 self-stretch sm:self-auto justify-between sm:justify-end">
              <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border bg-zinc-900/90 border-zinc-800">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">ATS Score</div>
                  <div className={`text-2xl font-black font-mono leading-none bg-clip-text text-transparent bg-gradient-to-r ${getScoreGradient(analysis.matchScore)}`}>
                    {analysis.matchScore}%
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center font-mono font-bold text-sm ${getScoreColor(analysis.matchScore)}`}>
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>

              <button
                onClick={() => onOpenInStudio(sampleResume)}
                className="btn-primary text-xs py-3 px-5 font-semibold flex items-center gap-2 whitespace-nowrap"
              >
                <span>Edit in Studio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 border-b border-zinc-800/80 pb-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              All Signals ({analysis.matchedKeywords.length + analysis.missingKeywords.length})
            </button>
            <button
              onClick={() => setActiveTab('matched')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'matched'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Matched ({analysis.matchedKeywords.length})
            </button>
            <button
              onClick={() => setActiveTab('missing')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'missing'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Missing Terms ({analysis.missingKeywords.length})
            </button>
          </div>

          {/* Grid: Matched & Missing Keywords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matched Keywords */}
            {(activeTab === 'all' || activeTab === 'matched') && (
              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-emerald-500/20 space-y-3">
                <div className="text-xs font-bold text-emerald-400 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Found in Resume ({analysis.matchedKeywords.length})</span>
                  </div>
                  <span className="text-[10px] text-emerald-500/80 font-mono">100% Parsed</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.matchedKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 rounded-lg flex items-center gap-1.5 transition-transform hover:scale-105"
                    >
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>{kw}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Keywords */}
            {(activeTab === 'all' || activeTab === 'missing') && (
              <div className="p-5 rounded-2xl bg-zinc-950/60 border border-rose-500/20 space-y-3">
                <div className="text-xs font-bold text-rose-400 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" />
                    <span>Missing High-Priority Terms ({analysis.missingKeywords.length})</span>
                  </div>
                  <span className="text-[10px] text-rose-400/80 font-mono">Add to Pass Filter</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.missingKeywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1 text-xs font-medium bg-rose-500/10 text-rose-300 border border-rose-500/20 rounded-lg flex items-center gap-1.5 transition-transform hover:scale-105"
                    >
                      <span className="text-rose-400 font-bold">+</span>
                      <span>{kw}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actionable Recommendations Box */}
          <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-bold text-zinc-200 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Immediate Optimizations to Boost Your ATS Score</span>
              </div>
              <span className="text-[11px] text-zinc-500">Auto-generated checklist</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {analysis.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 flex items-start gap-2.5 text-zinc-300 hover:border-zinc-700 transition-colors"
                >
                  <span className="w-5 h-5 rounded-md bg-primary/15 text-primary flex items-center justify-center font-bold text-[11px] flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
