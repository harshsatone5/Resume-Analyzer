import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  RotateCw, 
  Sliders, 
  Layers, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { rewriteBulletPointAI, type RewriteTone } from '../services/geminiService';
import type { ActionableFix } from '../services/atsEngine';

interface BulletRewriterStudioProps {
  actionableFixes: ActionableFix[];
  initialSelectedText?: string;
  hasApiKey: boolean;
}

export const BulletRewriterStudio: React.FC<BulletRewriterStudioProps> = ({
  actionableFixes,
  initialSelectedText = '',
  hasApiKey
}) => {
  const [inputText, setInputText] = useState('');
  const [selectedTone, setSelectedTone] = useState<RewriteTone>('datadriven');
  const [rewrittenText, setRewrittenText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Initialize with first actionable fix or initial text
  useEffect(() => {
    if (initialSelectedText) {
      setInputText(initialSelectedText);
    } else if (actionableFixes.length > 0 && !inputText) {
      const firstWithOriginal = actionableFixes.find(f => f.originalText);
      if (firstWithOriginal && firstWithOriginal.originalText) {
        setInputText(firstWithOriginal.originalText);
      }
    }
  }, [initialSelectedText, actionableFixes]);

  const handleGenerateRewrite = async (overrideTone?: RewriteTone) => {
    if (!inputText.trim()) return;
    const tone = overrideTone || selectedTone;
    setIsGenerating(true);
    setRewrittenText('');

    try {
      const result = await rewriteBulletPointAI(inputText, tone);
      setRewrittenText(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!rewrittenText) return;
    navigator.clipboard.writeText(rewrittenText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tones: { id: RewriteTone; label: string; icon: string; desc: string }[] = [
    { id: 'datadriven', label: 'Data-Driven', icon: '📊', desc: 'Google XYZ formula, metrics, % gains' },
    { id: 'executive', label: 'Executive', icon: '💼', desc: 'Strategic orchestration & business OKRs' },
    { id: 'concise', label: 'Concise ATS', icon: '⚡', desc: 'High keyword density, under 18 words' },
    { id: 'creative', label: 'Creative', icon: '💡', desc: 'Zero-to-one problem solving & initiative' },
  ];

  const candidateBullets = actionableFixes.filter(f => f.originalText);

  return (
    <div className="s-card p-6">
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5" style={{ borderBottom: '1px solid var(--stitch-border)' }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4" style={{ color: 'var(--stitch-purple)' }} />
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              AI Bullet Point Optimizer Studio
              {hasApiKey && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: 'rgba(129,201,149,0.12)', color: 'var(--stitch-green)', border: '1px solid rgba(129,201,149,0.25)' }}>
                  Gemini AI
                </span>
              )}
            </h3>
          </div>
          <p className="text-xs" style={{ color: 'var(--stitch-text-secondary)' }}>
            Rewrite passive bullet points into quantified accomplishments with the Google XYZ formula
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Input and Tone Controls (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Quick Select Weak Points */}
          {candidateBullets.length > 0 && (
            <div>
              <label className="text-xs font-medium mb-2 block flex items-center gap-1.5" style={{ color: 'var(--stitch-text-dim)' }}>
                <Sliders className="w-3.5 h-3.5" style={{ color: 'var(--stitch-yellow)' }} />
                Detected Lines for Improvement:
              </label>
              <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                {candidateBullets.map((fix) => (
                  <button
                    key={fix.id}
                    onClick={() => {
                      setInputText(fix.originalText!);
                      setRewrittenText('');
                    }}
                    className="w-full text-left p-2 rounded-lg text-xs transition-colors flex items-start justify-between gap-2"
                    style={{
                      background: inputText === fix.originalText ? 'rgba(197,138,249,0.12)' : 'var(--stitch-surface-2)',
                      border: `1px solid ${inputText === fix.originalText ? 'rgba(197,138,249,0.3)' : 'var(--stitch-border)'}`,
                      color: inputText === fix.originalText ? 'var(--stitch-purple)' : 'var(--stitch-text-secondary)'
                    }}
                  >
                    <span className="truncate flex-1">{fix.originalText}</span>
                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 opacity-40" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Original Text Input Box */}
          <div>
            <label className="text-xs font-medium mb-1.5 block" style={{ color: 'var(--stitch-text-dim)' }}>
              Current Bullet Point:
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. Worked on customer dashboard and helped team fix bugs..."
              rows={3}
              className="w-full rounded-xl p-3 text-xs placeholder-slate-500 focus:outline-none resize-none font-mono"
              style={{ background: 'var(--stitch-bg)', border: '1px solid var(--stitch-border)', color: 'var(--stitch-text)' }}
            />
          </div>

          {/* Tone Selector */}
          <div>
            <label className="text-xs font-medium mb-2 block" style={{ color: 'var(--stitch-text-dim)' }}>
              Optimization Style:
            </label>
            <div className="grid grid-cols-2 gap-2">
              {tones.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTone(t.id)}
                  className="p-2.5 rounded-xl text-left transition-all"
                  style={{
                    background: selectedTone === t.id ? 'rgba(197,138,249,0.12)' : 'var(--stitch-surface-2)',
                    border: `1px solid ${selectedTone === t.id ? 'rgba(197,138,249,0.3)' : 'var(--stitch-border)'}`,
                  }}
                >
                  <div className="text-xs font-semibold flex items-center gap-1.5 mb-0.5" style={{ color: selectedTone === t.id ? 'var(--stitch-purple)' : 'var(--stitch-text)' }}>
                    <span>{t.icon}</span>
                    <span>{t.label}</span>
                  </div>
                  <p className="text-[10px] leading-tight" style={{ color: 'var(--stitch-text-dim)' }}>{t.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={() => handleGenerateRewrite()}
            disabled={!inputText.trim() || isGenerating}
            className="s-btn w-full text-xs"
            style={{
              background: 'var(--stitch-purple)',
              color: 'var(--stitch-bg)',
              opacity: !inputText.trim() || isGenerating ? 0.35 : 1
            }}
          >
            {isGenerating ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin" />
                <span>Optimizing with Formula…</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Optimized Rewrite</span>
              </>
            )}
          </button>
        </div>

        {/* Right Column: Comparison & Result Box (7 cols) */}
        <div className="lg:col-span-7 s-surface-inset p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4" style={{ borderBottom: '1px solid var(--stitch-border)' }}>
              <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: 'var(--stitch-text-dim)' }}>
                <Layers className="w-3.5 h-3.5" style={{ color: 'var(--stitch-accent)' }} />
                Side-by-Side Comparison
              </span>
              {rewrittenText && (
                <button
                  onClick={handleCopy}
                  className="s-btn-ghost text-xs"
                  style={{ color: 'var(--stitch-green)' }}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Before (Original) */}
            <div className="mb-4">
              <span className="text-[11px] font-mono block mb-1" style={{ color: 'var(--stitch-red)' }}>
                Before (Passive / Unquantified):
              </span>
              <div 
                className="p-3 rounded-lg text-xs font-mono leading-relaxed"
                style={{
                  background: 'rgba(242,139,130,0.06)',
                  border: '1px solid rgba(242,139,130,0.2)',
                  color: 'var(--stitch-red)'
                }}
              >
                {inputText || 'Select or enter a bullet point on the left to see the comparison.'}
              </div>
            </div>

            {/* After (Optimized) */}
            <div>
              <span className="text-[11px] font-mono block mb-1" style={{ color: 'var(--stitch-green)' }}>
                After (Google XYZ Formula):
              </span>
              {rewrittenText ? (
                <div 
                  className="p-3.5 rounded-lg text-xs sm:text-sm font-mono leading-relaxed"
                  style={{
                    background: 'rgba(129,201,149,0.08)',
                    border: '1px solid rgba(129,201,149,0.25)',
                    color: 'var(--stitch-green)'
                  }}
                >
                  {rewrittenText}
                </div>
              ) : (
                <div 
                  className="p-6 text-center rounded-lg text-xs border-dashed"
                  style={{ border: '1px dashed var(--stitch-border)', color: 'var(--stitch-text-dim)' }}
                >
                  Click "Generate Optimized Rewrite" to view the suggested alternative.
                </div>
              )}
            </div>
          </div>

          {/* Explainer Footer */}
          <div className="mt-6 pt-3" style={{ borderTop: '1px solid var(--stitch-border)' }}>
            <div className="flex items-start gap-2 text-xs" style={{ color: 'var(--stitch-text-dim)' }}>
              <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--stitch-green)' }} />
              <span>
                <strong style={{ color: 'var(--stitch-text)' }}>Why this matters:</strong> Top ATS algorithms prioritize active power verbs in the first 3 words combined with quantified business impact.
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
