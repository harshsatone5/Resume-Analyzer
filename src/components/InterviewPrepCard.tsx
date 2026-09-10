import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Lightbulb, 
  CheckCircle, 
  PenTool
} from 'lucide-react';
import type { InterviewQuestion } from '../services/atsEngine';

interface InterviewPrepCardProps {
  questions: InterviewQuestion[];
}

export const InterviewPrepCard: React.FC<InterviewPrepCardProps> = ({ questions }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [notes, setNotes] = useState<{ [key: number]: string }>({});

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleNoteChange = (index: number, text: string) => {
    setNotes(prev => ({ ...prev, [index]: text }));
  };

  return (
    <div className="s-card p-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5" style={{ borderBottom: '1px solid var(--stitch-border)' }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4" style={{ color: 'var(--stitch-accent)' }} />
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              Predictive Interview Question Prep
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full" style={{ background: 'rgba(138,180,248,0.12)', color: 'var(--stitch-accent)', border: '1px solid rgba(138,180,248,0.25)' }}>
                STAR Method
              </span>
            </h3>
          </div>
          <p className="text-xs" style={{ color: 'var(--stitch-text-secondary)' }}>
            Questions recruiters will ask based on detected experience gaps and keywords
          </p>
        </div>
      </div>

      {/* Questions Accordion */}
      <div className="space-y-2.5">
        {questions.map((q, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={idx}
              className="s-card-flush overflow-hidden"
            >
              {/* Question Bar */}
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full p-3.5 text-left flex items-start justify-between gap-3 transition-colors"
                style={{ background: 'var(--stitch-surface)' }}
              >
                <div className="flex items-start gap-2.5 flex-1">
                  <span 
                    className="text-[10px] uppercase font-mono font-semibold px-2 py-0.5 rounded-full mt-0.5"
                    style={{
                      background: q.category === 'Technical' ? 'rgba(138,180,248,0.12)' : q.category === 'Behavioral' ? 'rgba(129,201,149,0.12)' : 'rgba(197,138,249,0.12)',
                      color: q.category === 'Technical' ? 'var(--stitch-accent)' : q.category === 'Behavioral' ? 'var(--stitch-green)' : 'var(--stitch-purple)',
                      border: '1px solid var(--stitch-border)'
                    }}
                  >
                    {q.category}
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-white leading-snug">
                      {q.question}
                    </h4>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--stitch-text-dim)' }} />
                ) : (
                  <ChevronDown className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--stitch-text-dim)' }} />
                )}
              </button>

              {/* Expanded Strategy Body */}
              {isExpanded && (
                <div className="p-3.5 pt-0 space-y-2.5 text-xs" style={{ borderTop: '1px solid var(--stitch-border)', background: 'var(--stitch-surface)' }}>
                  {/* Recruiter intent */}
                  <div className="s-surface-inset p-3 mt-2">
                    <span className="text-[11px] font-semibold block mb-1 flex items-center gap-1.5" style={{ color: 'var(--stitch-accent)' }}>
                      <Lightbulb className="w-3.5 h-3.5" />
                      Interviewer Intent:
                    </span>
                    <p className="leading-relaxed" style={{ color: 'var(--stitch-text-secondary)' }}>{q.whyAsked}</p>
                  </div>

                  {/* STAR Method Guide */}
                  <div className="s-surface-inset p-3" style={{ borderLeft: '2px solid var(--stitch-green)' }}>
                    <span className="text-[11px] font-semibold block mb-1 flex items-center gap-1.5" style={{ color: 'var(--stitch-green)' }}>
                      <CheckCircle className="w-3.5 h-3.5" />
                      STAR Response Strategy:
                    </span>
                    <p className="leading-relaxed" style={{ color: 'var(--stitch-text-secondary)' }}>{q.suggestedStarStrategy}</p>
                  </div>

                  {/* Practice Draft Notepad */}
                  <div>
                    <label className="text-[11px] font-medium mb-1 block flex items-center gap-1.5" style={{ color: 'var(--stitch-text-dim)' }}>
                      <PenTool className="w-3.5 h-3.5" />
                      Your Practice Outline:
                    </label>
                    <textarea
                      value={notes[idx] || ''}
                      onChange={(e) => handleNoteChange(idx, e.target.value)}
                      placeholder="Situation, Task, Action, Result..."
                      rows={3}
                      className="w-full rounded-lg p-2.5 text-xs placeholder-slate-500 focus:outline-none resize-none font-sans"
                      style={{ background: 'var(--stitch-bg)', border: '1px solid var(--stitch-border)', color: 'var(--stitch-text)' }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
