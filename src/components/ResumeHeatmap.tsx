import React, { useState } from 'react';
import { 
  CheckCircle, 
  AlertTriangle, 
  Sparkles, 
  Copy, 
  Check, 
  Eye, 
  ArrowRight
} from 'lucide-react';
import type { HeatmapLine } from '../services/atsEngine';

interface ResumeHeatmapProps {
  lines: HeatmapLine[];
  onSelectForStudio?: (text: string) => void;
}

export const ResumeHeatmap: React.FC<ResumeHeatmapProps> = ({ lines, onSelectForStudio }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'warning' | 'positive'>('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedLineIndex, setExpandedLineIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  const filteredLines = lines.filter((line) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'warning') return line.type === 'warning' || line.type === 'danger';
    if (activeFilter === 'positive') return line.type === 'positive';
    return true;
  });

  const warningCount = lines.filter(l => l.type === 'warning' || l.type === 'danger').length;
  const positiveCount = lines.filter(l => l.type === 'positive').length;

  return (
    <div className="s-card p-6">
      
      {/* Heatmap Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5" style={{ borderBottom: '1px solid var(--stitch-border)' }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Eye className="w-4 h-4" style={{ color: 'var(--stitch-green)' }} />
            <h3 className="text-base font-semibold text-white">
              Interactive Resume Heatmap
            </h3>
          </div>
          <p className="text-xs" style={{ color: 'var(--stitch-text-secondary)' }}>
            Click highlighted lines to see feedback and suggested rewrites
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveFilter('all')}
            className={activeFilter === 'all' ? 's-pill s-pill-active' : 's-pill'}
          >
            All Lines ({lines.length})
          </button>
          <button
            onClick={() => setActiveFilter('warning')}
            className={activeFilter === 'warning' ? 's-pill s-pill-active' : 's-pill'}
            style={activeFilter === 'warning' ? { color: 'var(--stitch-yellow)' } : {}}
          >
            <AlertTriangle className="w-3 h-3" style={{ color: 'var(--stitch-yellow)' }} />
            <span>Critiques ({warningCount})</span>
          </button>
          <button
            onClick={() => setActiveFilter('positive')}
            className={activeFilter === 'positive' ? 's-pill s-pill-active' : 's-pill'}
            style={activeFilter === 'positive' ? { color: 'var(--stitch-green)' } : {}}
          >
            <CheckCircle className="w-3 h-3" style={{ color: 'var(--stitch-green)' }} />
            <span>Impact Wins ({positiveCount})</span>
          </button>
        </div>
      </div>

      {/* Heatmap Document Box */}
      <div className="font-mono text-xs s-surface-inset p-4 sm:p-5 max-h-[520px] overflow-y-auto space-y-1">
        {filteredLines.map((line) => {
          const isWarning = line.type === 'warning' || line.type === 'danger';
          const isPositive = line.type === 'positive';
          const isHeader = line.type === 'header';
          const isExpanded = expandedLineIndex === line.lineIndex;

          let lineStyle: React.CSSProperties = {
            color: 'var(--stitch-text-secondary)',
          };

          if (isHeader) {
            lineStyle = {
              color: 'var(--stitch-text)',
              fontWeight: 700,
              fontFamily: 'inherit',
              paddingTop: '12px',
              paddingBottom: '4px',
              borderBottom: '1px solid var(--stitch-border)',
              letterSpacing: '0.05em'
            };
          } else if (isWarning) {
            lineStyle = {
              background: 'rgba(253, 214, 99, 0.08)',
              color: 'var(--stitch-yellow)',
              borderLeft: '2px solid var(--stitch-yellow)',
              paddingLeft: '8px',
              margin: '2px 0'
            };
          } else if (isPositive) {
            lineStyle = {
              background: 'rgba(129, 201, 149, 0.08)',
              color: 'var(--stitch-green)',
              borderLeft: '2px solid var(--stitch-green)',
              paddingLeft: '8px',
              margin: '2px 0'
            };
          }

          return (
            <div key={line.lineIndex} className="group">
              <div
                onClick={() => {
                  if (line.coachingTip || line.rewriteSuggestion) {
                    setExpandedLineIndex(isExpanded ? null : line.lineIndex);
                  }
                }}
                style={lineStyle}
                className="py-1 px-2 rounded transition-colors cursor-pointer flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-2 flex-1">
                  <span className="text-[10px] select-none w-5 text-right pt-0.5" style={{ color: 'var(--stitch-text-dim)' }}>
                    {line.lineIndex + 1}
                  </span>
                  <span className="leading-relaxed whitespace-pre-wrap">{line.text}</span>
                </div>

                {/* Badge Tag */}
                {line.tag && (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0 font-medium whitespace-nowrap"
                    style={{
                      background: isPositive ? 'rgba(129,201,149,0.15)' : isWarning ? 'rgba(253,214,99,0.15)' : 'var(--stitch-surface-2)',
                      color: isPositive ? 'var(--stitch-green)' : isWarning ? 'var(--stitch-yellow)' : 'var(--stitch-text-dim)'
                    }}
                  >
                    {line.tag}
                  </span>
                )}
              </div>

              {/* Expandable Micro-Coaching Tooltip Card */}
              {(isExpanded || (isWarning && activeFilter === 'warning')) && (line.coachingTip || line.rewriteSuggestion) && (
                <div className="ml-7 my-2 p-3.5 s-card-flush space-y-2 text-xs">
                  {line.coachingTip && (
                    <div className="flex items-start gap-2" style={{ color: 'var(--stitch-text-secondary)' }}>
                      <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--stitch-yellow)' }} />
                      <span>{line.coachingTip}</span>
                    </div>
                  )}

                  {line.rewriteSuggestion && (
                    <div className="s-surface-inset p-2.5 rounded-lg">
                      <div className="flex items-center justify-between mb-1 text-[11px]" style={{ color: 'var(--stitch-text-dim)' }}>
                        <span>High-Impact ATS Rewrite:</span>
                        <div className="flex items-center gap-2">
                          {onSelectForStudio && (
                            <button
                              onClick={() => onSelectForStudio(line.text)}
                              className="text-[11px] flex items-center gap-1 hover:underline"
                              style={{ color: 'var(--stitch-accent)' }}
                            >
                              <span>Studio</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => handleCopy(line.rewriteSuggestion!, line.lineIndex)}
                            className="text-[11px] flex items-center gap-1 hover:underline"
                            style={{ color: 'var(--stitch-green)' }}
                          >
                            {copiedIndex === line.lineIndex ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Fix</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-xs font-mono" style={{ color: 'var(--stitch-green)' }}>
                        {line.rewriteSuggestion}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
