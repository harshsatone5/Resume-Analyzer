import React, { useEffect, useState } from 'react';
import { Cpu, Terminal, CheckCircle } from 'lucide-react';

interface ScannerOverlayProps {
  onComplete: () => void;
}

export const ScannerOverlay: React.FC<ScannerOverlayProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  const steps = [
    'Parsing document tokens & structural headings…',
    'Testing ATS compliance & contact readability…',
    'Scanning for Google XYZ metrics (%, $, metrics)…',
    'Analyzing action verbs vs passive frequency…',
    'Evaluating semantic keyword overlap…',
    'Generating tailored feedback & report…'
  ];

  useEffect(() => {
    const stepDuration = 380;
    const interval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          const next = prev + 1;
          setProgress(Math.round(((next + 1) / steps.length) * 100));
          return next;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 300);
          return prev;
        }
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [onComplete, steps.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(25,26,31,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="w-full max-w-md s-card p-6 sm:p-7 shadow-2xl relative overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 mb-5" style={{ borderBottom: '1px solid var(--stitch-border)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--stitch-surface-2)' }}>
              <Cpu className="w-4 h-4" style={{ color: 'var(--stitch-accent)' }} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                ATS Simulation Scan
              </h3>
              <p className="text-xs" style={{ color: 'var(--stitch-text-dim)' }}>Evaluating compliance & match rate</p>
            </div>
          </div>
          <span className="text-base font-mono font-semibold" style={{ color: 'var(--stitch-accent)' }}>
            {progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="s-progress-track mb-5">
          <div 
            className="s-progress-fill"
            style={{ width: `${progress}%`, background: 'var(--stitch-accent)' }}
          />
        </div>

        {/* Steps Checklist */}
        <div className="space-y-2.5 text-xs font-mono">
          {steps.map((step, idx) => {
            const isCompleted = idx < stepIndex;
            const isCurrent = idx === stepIndex;
            return (
              <div 
                key={idx} 
                className="flex items-start gap-2.5 transition-colors"
                style={{
                  color: isCompleted 
                    ? 'var(--stitch-text-secondary)' 
                    : isCurrent 
                      ? 'var(--stitch-accent)' 
                      : 'var(--stitch-text-dim)',
                  fontWeight: isCurrent ? 600 : 400
                }}
              >
                {isCompleted ? (
                  <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: 'var(--stitch-green)' }} />
                ) : isCurrent ? (
                  <div className="w-3.5 h-3.5 border-2 rounded-full animate-spin flex-shrink-0 mt-0.5" style={{ borderColor: 'var(--stitch-accent)', borderTopColor: 'transparent' }} />
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border flex-shrink-0 mt-0.5" style={{ borderColor: 'var(--stitch-border)' }} />
                )}
                <span>{step}</span>
              </div>
            );
          })}
        </div>

        {/* Bottom Status Feed */}
        <div className="mt-5 pt-3 flex items-center justify-between text-[11px]" style={{ borderTop: '1px solid var(--stitch-border)', color: 'var(--stitch-text-dim)' }}>
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            <span>Prisma Engine</span>
          </span>
          <span style={{ color: 'var(--stitch-green)' }}>Running in-browser</span>
        </div>

      </div>
    </div>
  );
};
