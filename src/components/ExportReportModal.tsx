import React, { useState } from 'react';
import { X, Printer, ShieldCheck, Copy, Check } from 'lucide-react';
import type { ATSAnalysisResult } from '../services/atsEngine';

interface ExportReportModalProps {
  analysis: ATSAnalysisResult;
  targetRoleTitle?: string;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  analysis,
  targetRoleTitle,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# ATS RESUME AUDIT REPORT
Candidate: ${analysis.contact.name}
Overall Score: ${analysis.overallScore} / 100 (${analysis.grade})
Target Role: ${targetRoleTitle || 'General Industry Profile'}

## DIMENSIONAL BREAKDOWN
- Format & Parseability: ${analysis.metrics.formatAndAts.score} / 25
- Quantification & Impact: ${analysis.metrics.quantification.score} / 25
- Power Verbs & Active Tone: ${analysis.metrics.powerVerbs.score} / 20
- Keyword & Competency Alignment: ${analysis.metrics.skillAlignment.score} / 30

## SKILLS & KEYWORDS
- Matched: ${analysis.skills.matched.join(', ') || 'None'}
- Missing: ${analysis.skills.missing.join(', ') || 'None'}
- Extra: ${analysis.skills.extra.join(', ') || 'None'}

## TOP PRIORITY FIXES
${analysis.actionableFixes.slice(0, 4).map((f, i) => `${i + 1}. [${f.category}] ${f.title}\n   ${f.explanation}`).join('\n')}
`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto" style={{ background: 'rgba(25,26,31,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="s-card max-w-2xl w-full p-6 relative my-8 shadow-2xl">
        
        {/* Modal Actions Header */}
        <div className="flex items-center justify-between pb-4 mb-4 no-print" style={{ borderBottom: '1px solid var(--stitch-border)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--stitch-surface-2)' }}>
              <ShieldCheck className="w-4 h-4" style={{ color: 'var(--stitch-green)' }} />
            </div>
            <h3 className="text-sm font-semibold text-white">ATS Audit Report Card</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="s-btn-ghost text-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" style={{ color: 'var(--stitch-green)' }} /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy MD'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="s-btn text-xs py-1.5 px-3.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg transition-colors hover:bg-white/[0.06]"
              style={{ color: 'var(--stitch-text-dim)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Report Content */}
        <div className="space-y-5 text-xs">
          
          {/* Header Strip */}
          <div className="flex items-center justify-between s-surface-inset p-4">
            <div>
              <h2 className="text-base font-semibold text-white">{analysis.contact.name || 'Candidate Profile'}</h2>
              <p className="text-xs" style={{ color: 'var(--stitch-text-dim)' }}>
                {analysis.contact.email || 'Email not detected'} · {analysis.contact.location || 'Location not detected'}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--stitch-text-secondary)' }}>
                Target Role: <span style={{ color: 'var(--stitch-accent)', fontWeight: 500 }}>{targetRoleTitle || 'General'}</span>
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-semibold font-mono" style={{ color: 'var(--stitch-green)' }}>
                {analysis.overallScore}
                <span className="text-xs font-normal" style={{ color: 'var(--stitch-text-dim)' }}>/100</span>
              </span>
              <span className="block text-xs font-medium" style={{ color: 'var(--stitch-text-secondary)' }}>{analysis.grade}</span>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="s-surface-inset p-3">
              <span className="block mb-0.5" style={{ color: 'var(--stitch-text-dim)' }}>ATS Format & Parseability</span>
              <span className="text-sm font-semibold font-mono text-white">
                {analysis.metrics.formatAndAts.score} / 25
              </span>
            </div>
            <div className="s-surface-inset p-3">
              <span className="block mb-0.5" style={{ color: 'var(--stitch-text-dim)' }}>Quantification & XYZ Impact</span>
              <span className="text-sm font-semibold font-mono text-white">
                {analysis.metrics.quantification.score} / 25
              </span>
            </div>
            <div className="s-surface-inset p-3">
              <span className="block mb-0.5" style={{ color: 'var(--stitch-text-dim)' }}>Power Verbs & Active Voice</span>
              <span className="text-sm font-semibold font-mono text-white">
                {analysis.metrics.powerVerbs.score} / 20
              </span>
            </div>
            <div className="s-surface-inset p-3">
              <span className="block mb-0.5" style={{ color: 'var(--stitch-text-dim)' }}>Keywords & Role Alignment</span>
              <span className="text-sm font-semibold font-mono text-white">
                {analysis.metrics.skillAlignment.score} / 30
              </span>
            </div>
          </div>

          {/* Missing Skills Warning */}
          {analysis.skills.missing.length > 0 && (
            <div className="p-3 rounded-xl" style={{ background: 'rgba(242,139,130,0.08)', border: '1px solid rgba(242,139,130,0.2)' }}>
              <span className="text-xs font-semibold block mb-1.5" style={{ color: 'var(--stitch-red)' }}>
                Missing High-Priority Keywords:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.skills.missing.map((s, idx) => (
                  <span key={idx} className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: 'rgba(242,139,130,0.1)', color: 'var(--stitch-red)' }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Priority Fixes List */}
          <div>
            <h4 className="text-xs font-semibold mb-2" style={{ color: 'var(--stitch-text-dim)' }}>
              Top Priority Recommendations
            </h4>
            <div className="space-y-1.5">
              {analysis.actionableFixes.slice(0, 4).map((fix, idx) => (
                <div key={idx} className="p-3 s-surface-inset">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: 'var(--stitch-surface-2)', color: 'var(--stitch-accent)' }}>
                      {fix.category}
                    </span>
                    <span className="font-semibold text-white">{fix.title}</span>
                  </div>
                  <p className="leading-relaxed" style={{ color: 'var(--stitch-text-secondary)' }}>{fix.explanation}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
