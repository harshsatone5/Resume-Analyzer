import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Zap,
  RotateCcw,
  Check,
  Cpu,
  Search
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


  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-teal-400';
    if (score >= 50) return 'from-amber-500 to-orange-400';
    return 'from-rose-500 to-pink-500';
  };

  const scoreArc = (score: number) => {
    const circumference = 2 * Math.PI * 44;
    const offset = circumference - (score / 100) * circumference;
    return { circumference, offset };
  };

  const { circumference, offset } = scoreArc(analysis.matchScore);

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] relative overflow-hidden">
      {/* Background noise texture */}
      <div className="bg-noise absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none z-0" />

      {/* Ambient glow accents */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-[#DEDBC8]/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#DEDBC8]/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Editorial Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6"
            style={{
              background: 'rgba(222, 219, 200, 0.04)',
              border: '1px solid rgba(222, 219, 200, 0.08)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <Search className="w-3.5 h-3.5 text-[#DEDBC8]" />
            <span className="text-[#DEDBC8]/80">Parse-Proof ATS Engine</span>
            <span className="text-[#DEDBC8]/20">·</span>
            <span className="text-[#DEDBC8]/50">Keyword & Formatting Audit</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-[-0.03em] text-[#E1E0CC] mb-5 leading-[1.1]">
            Beat the recruiter filter.
          </h1>
          <p className="text-sm sm:text-[15px] text-[#DEDBC8]/50 leading-relaxed max-w-lg mx-auto">
            75% of resumes are discarded by Applicant Tracking Systems before a human reads them. Compare your draft against job requirements in seconds.
          </p>
        </motion.div>

        {/* Input Panes */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10"
        >
          {/* Left: Resume Text */}
          <div
            className="rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300"
            style={{
              background: '#101010',
              border: '1px solid rgba(255, 255, 255, 0.04)',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
              <label className="text-xs font-semibold text-[#E1E0CC] flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#DEDBC8]/[0.06] flex items-center justify-center">
                  <FileText className="w-3.5 h-3.5 text-[#DEDBC8]" />
                </div>
                <span>Your resume content</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLoadSample}
                  className="text-[11px] text-[#DEDBC8]/40 hover:text-[#DEDBC8]/80 transition-colors flex items-center gap-1.5"
                  title="Populate with sample text"
                >
                  <RotateCcw className="w-3 h-3" /> Load sample
                </button>
                <span className="text-[11px] font-mono text-[#DEDBC8]/25 tabular-nums">
                  {resumeText.split(/\s+/).filter(Boolean).length} words
                </span>
              </div>
            </div>

            <textarea
              rows={10}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume markdown, plain text, or summary here..."
              className="w-full px-4 py-3 text-[13px] rounded-xl text-[#E1E0CC]/90 placeholder-[#DEDBC8]/15 focus:outline-none font-mono leading-relaxed resize-y transition-all duration-200"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(222, 219, 200, 0.15)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)'; }}
            />

            <div className="text-[11px] text-[#DEDBC8]/25 flex items-center justify-between">
              <span>Includes experience, education & skills sections</span>
              <span className="text-emerald-400/70 flex items-center gap-1 font-medium">
                <Check className="w-3 h-3" /> Ready
              </span>
            </div>
          </div>

          {/* Right: Job Description */}
          <div
            className="rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300"
            style={{
              background: '#101010',
              border: '1px solid rgba(255, 255, 255, 0.04)',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.05]">
              <label className="text-xs font-semibold text-[#E1E0CC] flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/[0.08] flex items-center justify-center">
                  <Target className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span>Target job description</span>
              </label>
              <span className="text-[11px] font-mono text-[#DEDBC8]/25 tabular-nums">
                {jobDescription.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <textarea
              rows={10}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job opening requirements, responsibilities, or LinkedIn post..."
              className="w-full px-4 py-3 text-[13px] rounded-xl text-[#E1E0CC]/90 placeholder-[#DEDBC8]/15 focus:outline-none font-mono leading-relaxed resize-y transition-all duration-200"
              style={{
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.04)',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(222, 219, 200, 0.15)'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.04)'; }}
            />

            <div className="text-[11px] text-[#DEDBC8]/25 flex items-center justify-between">
              <span>Identifies hard skills, tech stacks, and domain terms</span>
              <span className="text-[#DEDBC8]/30">Real-time keyword extractor</span>
            </div>
          </div>
        </motion.div>

        {/* Action Scan Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center gap-3 mb-14"
        >
          <button
            onClick={handleRunScan}
            disabled={isScanning || !resumeText.trim()}
            className="group inline-flex items-center gap-2.5 hover:gap-3 bg-[#DEDBC8] text-black font-semibold text-sm rounded-full pl-6 pr-2 py-2 transition-all duration-300 shadow-[0_4px_20px_rgba(222,219,200,0.2)] hover:shadow-[0_8px_32px_rgba(222,219,200,0.3)] active:scale-[0.97] disabled:opacity-40 disabled:pointer-events-none"
          >
            <span>{isScanning ? 'Parsing keywords & formatting...' : 'Run comprehensive ATS audit'}</span>
            <span className="bg-black rounded-full w-9 h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
              {isScanning ? (
                <div className="w-4 h-4 border-2 border-[#DEDBC8] border-t-transparent rounded-full animate-spin" />
              ) : (
                <Cpu className="w-4 h-4 text-[#DEDBC8]" />
              )}
            </span>
          </button>
          <span className="text-[11px] text-[#DEDBC8]/20 font-mono">
            Scans keyword density, formatting compliance, and section coverage
          </span>
        </motion.div>

        {/* Results Dashboard */}
        <AnimatePresence>
          {hasScanned && (
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[1.5rem] overflow-hidden relative"
              style={{
                background: '#0a0a0a',
                border: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              {/* Ambient glow within card */}
              <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#DEDBC8]/[0.02] rounded-full blur-[100px] pointer-events-none" />

              <div className="p-6 sm:p-8 lg:p-10 space-y-8 relative z-10">
                {/* Header Score Row */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-8 border-b border-white/[0.05]">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-[#DEDBC8]/40 font-semibold">Audit results</span>
                      <span className="w-1 h-1 rounded-full bg-[#DEDBC8]/15" />
                      <span className="text-[10px] text-emerald-400/70 font-medium">Scored against ATS benchmark</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#E1E0CC] tracking-[-0.02em]">
                      {analysis.jobTitle}
                    </h2>
                    <p className="text-[13px] text-[#DEDBC8]/35 leading-relaxed max-w-lg">
                      Your resume satisfies the baseline keyword frequency for enterprise ATS software. See matched and missing signals below.
                    </p>
                  </div>

                  {/* Circular Score Gauge + CTA */}
                  <div className="flex items-center gap-5 self-stretch sm:self-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-4 px-5 py-4 rounded-2xl" style={{ background: '#101010', border: '1px solid rgba(255,255,255,0.05)' }}>
                      {/* SVG circular gauge */}
                      <div className="relative w-16 h-16">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="6" />
                          <circle
                            cx="50" cy="50" r="44" fill="none"
                            stroke={analysis.matchScore >= 80 ? '#34d399' : analysis.matchScore >= 50 ? '#fbbf24' : '#f87171'}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className={`text-lg font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r ${getScoreGradient(analysis.matchScore)}`}>
                            {analysis.matchScore}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] uppercase font-semibold text-[#DEDBC8]/30 tracking-wider">ATS Score</div>
                        <div className="text-[11px] text-[#DEDBC8]/50 mt-0.5">
                          {analysis.matchScore >= 80 ? 'Strong pass' : analysis.matchScore >= 50 ? 'Needs work' : 'At risk'}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenInStudio(sampleResume)}
                      className="group inline-flex items-center gap-2 bg-[#DEDBC8] text-black text-xs font-semibold py-3 px-5 rounded-full transition-all duration-300 hover:shadow-[0_4px_20px_rgba(222,219,200,0.2)] active:scale-[0.97] whitespace-nowrap"
                    >
                      <span>Edit in Studio</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 pb-5 border-b border-white/[0.04]">
                  {[
                    { key: 'all' as const, label: `All signals`, count: analysis.matchedKeywords.length + analysis.missingKeywords.length },
                    { key: 'matched' as const, label: 'Matched', count: analysis.matchedKeywords.length },
                    { key: 'missing' as const, label: 'Missing', count: analysis.missingKeywords.length }
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className="px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200"
                      style={{
                        color: activeTab === tab.key ? '#000' : 'rgba(222, 219, 200, 0.4)',
                        background: activeTab === tab.key ? '#DEDBC8' : 'transparent',
                        border: activeTab === tab.key ? 'none' : '1px solid rgba(255,255,255,0.05)',
                      }}
                    >
                      {tab.label} <span className="opacity-60 ml-0.5">({tab.count})</span>
                    </button>
                  ))}
                </div>

                {/* Grid: Matched & Missing Keywords */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Matched Keywords */}
                  {(activeTab === 'all' || activeTab === 'matched') && (
                    <div
                      className="p-5 rounded-2xl space-y-3.5"
                      style={{
                        background: 'rgba(16, 185, 129, 0.03)',
                        border: '1px solid rgba(16, 185, 129, 0.08)',
                      }}
                    >
                      <div className="text-xs font-semibold text-emerald-400/80 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Found in resume ({analysis.matchedKeywords.length})</span>
                        </div>
                        <span className="text-[10px] text-emerald-500/40 font-mono">100% parsed</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.matchedKeywords.map((kw) => (
                          <span
                            key={kw}
                            className="px-2.5 py-1 text-[11px] font-medium text-emerald-300/80 rounded-lg flex items-center gap-1.5 transition-colors hover:text-emerald-200"
                            style={{
                              background: 'rgba(16, 185, 129, 0.06)',
                              border: '1px solid rgba(16, 185, 129, 0.1)',
                            }}
                          >
                            <Check className="w-2.5 h-2.5 text-emerald-400/60" />
                            <span>{kw}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Missing Keywords */}
                  {(activeTab === 'all' || activeTab === 'missing') && (
                    <div
                      className="p-5 rounded-2xl space-y-3.5"
                      style={{
                        background: 'rgba(244, 63, 94, 0.03)',
                        border: '1px solid rgba(244, 63, 94, 0.08)',
                      }}
                    >
                      <div className="text-xs font-semibold text-rose-400/80 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Missing high-priority terms ({analysis.missingKeywords.length})</span>
                        </div>
                        <span className="text-[10px] text-rose-400/40 font-mono">Add to pass</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {analysis.missingKeywords.map((kw) => (
                          <span
                            key={kw}
                            className="px-2.5 py-1 text-[11px] font-medium text-rose-300/80 rounded-lg flex items-center gap-1.5 transition-colors hover:text-rose-200"
                            style={{
                              background: 'rgba(244, 63, 94, 0.06)',
                              border: '1px solid rgba(244, 63, 94, 0.1)',
                            }}
                          >
                            <span className="text-rose-400/60 font-bold text-[10px]">+</span>
                            <span>{kw}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Recommendations */}
                <div
                  className="p-6 rounded-2xl space-y-5"
                  style={{
                    background: '#0d0d0d',
                    border: '1px solid rgba(255, 255, 255, 0.04)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-semibold text-[#E1E0CC] flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md bg-amber-500/[0.08] flex items-center justify-center">
                        <Zap className="w-3 h-3 text-amber-400/80" />
                      </div>
                      <span>Optimizations to boost your score</span>
                    </div>
                    <span className="text-[10px] text-[#DEDBC8]/20 font-mono">Auto-generated</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {analysis.recommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-xl flex items-start gap-3 text-[#DEDBC8]/60 transition-colors duration-200"
                        style={{
                          background: 'rgba(255, 255, 255, 0.015)',
                          border: '1px solid rgba(255, 255, 255, 0.03)',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(222, 219, 200, 0.08)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.03)'; }}
                      >
                        <span
                          className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5"
                          style={{
                            background: 'rgba(222, 219, 200, 0.06)',
                            color: 'rgba(222, 219, 200, 0.5)',
                          }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-xs leading-relaxed">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
