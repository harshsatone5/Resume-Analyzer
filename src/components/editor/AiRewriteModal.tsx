import React from 'react';
import { Sparkles, Check, X } from 'lucide-react';
import type { BulletEnhancementResult } from '../../services/aiBulletEnhancer';

interface AiRewriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: BulletEnhancementResult | null;
  isLoading: boolean;
  onApply: (newText: string) => void;
}

export const AiRewriteModal: React.FC<AiRewriteModalProps> = ({
  isOpen,
  onClose,
  result,
  isLoading,
  onApply
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">AI Bullet Point Enhancer</h3>
              <p className="text-xs text-zinc-400">Rephrase with high-impact action verbs and quantified results</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Original Text Box */}
          <div className="bg-zinc-950/70 border border-zinc-800 rounded-xl p-4">
            <div className="text-[11px] uppercase tracking-wider font-semibold text-zinc-500 mb-1">
              Current Draft
            </div>
            <p className="text-sm text-zinc-300 italic">
              "{result?.original || 'No text selected'}"
            </p>
          </div>

          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-zinc-400">Analyzing impact metrics and formulating enhancements...</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-zinc-400 flex items-center gap-2">
                <span>Select an optimized variation:</span>
              </div>

              {result?.options.map((option, idx) => (
                <div
                  key={idx}
                  className="group relative bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/60 hover:border-indigo-500/60 rounded-xl p-4 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                          option.category === 'metrics'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : option.category === 'leadership'
                            ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                            : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        }`}
                      >
                        {option.title}
                      </span>
                      <span className="text-[11px] text-zinc-500">{option.description}</span>
                    </div>
                    <button
                      onClick={() => {
                        onApply(option.text);
                        onClose();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Apply
                    </button>
                  </div>
                  <p className="text-sm text-zinc-200 leading-relaxed pr-2">
                    {option.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-zinc-950/60 border-t border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
