import React, { useState, useEffect } from 'react';
import { X, Key, ShieldCheck, ExternalLink, Check, Trash2 } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
  onKeySaved: (key: string) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onKeySaved }) => {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem('RESUMATE_GEMINI_KEY') || '';
    setApiKey(existing);
  }, []);

  const handleSave = () => {
    localStorage.setItem('RESUMATE_GEMINI_KEY', apiKey.trim());
    onKeySaved(apiKey.trim());
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    localStorage.removeItem('RESUMATE_GEMINI_KEY');
    setApiKey('');
    onKeySaved('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(25,26,31,0.85)', backdropFilter: 'blur(8px)' }}>
      <div className="s-card max-w-md w-full p-6 relative shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4" style={{ borderBottom: '1px solid var(--stitch-border)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--stitch-surface-2)' }}>
              <Key className="w-4 h-4" style={{ color: 'var(--stitch-accent)' }} />
            </div>
            <h3 className="text-sm font-semibold text-white">AI Engine Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg transition-colors hover:bg-white/[0.06]"
            style={{ color: 'var(--stitch-text-dim)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-medium text-white block mb-1.5">
              Google Gemini API Key (Optional):
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full rounded-xl p-3 text-xs placeholder-slate-600 focus:outline-none font-mono"
              style={{ background: 'var(--stitch-bg)', border: '1px solid var(--stitch-border)', color: 'var(--stitch-text)' }}
            />
            <p className="text-[11px] mt-1.5 leading-relaxed" style={{ color: 'var(--stitch-text-dim)' }}>
              If left blank, the app uses its high-speed built-in local NLP heuristic scoring (free, zero keys required).
            </p>
          </div>

          {/* Privacy Guarantee */}
          <div className="s-surface-inset p-3 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--stitch-green)' }} />
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--stitch-text-secondary)' }}>
              <strong className="text-white">100% In-Browser & Private:</strong> Your API key is stored exclusively in your browser's local storage and sent directly to Google Gemini's endpoint.
            </p>
          </div>

          {/* Google AI Studio Link */}
          <div className="text-[11px]" style={{ color: 'var(--stitch-text-dim)' }}>
            Need an API key? Get one free at{' '}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="hover:underline inline-flex items-center gap-1"
              style={{ color: 'var(--stitch-accent)' }}
            >
              Google AI Studio <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--stitch-border)' }}>
            {apiKey ? (
              <button
                onClick={handleClear}
                className="text-xs flex items-center gap-1 hover:underline"
                style={{ color: 'var(--stitch-red)' }}
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Key</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="s-btn-ghost text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="s-btn text-xs py-1.5 px-4"
              >
                {saved ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
