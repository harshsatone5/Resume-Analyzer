import React, { useRef } from 'react';
import {
  Sparkles,
  RotateCcw,
  Trash2,
  Upload,
  Download,
  Printer,
  Edit3,
  Eye
} from 'lucide-react';
import type { ResumeData } from '../types/resume';

interface NavbarProps {
  onLoadSample: () => void;
  onClear: () => void;
  onExportJson: () => void;
  onImportJson: (data: ResumeData) => void;
  onPrint: () => void;
  mobileView: 'editor' | 'preview';
  setMobileView: (view: 'editor' | 'preview') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onLoadSample,
  onClear,
  onExportJson,
  onImportJson,
  onPrint,
  mobileView,
  setMobileView
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.personalInfo) {
          onImportJson(json);
        } else {
          alert('Invalid resume JSON format.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#191a1f] border-b border-white/10 select-none">
      <div className="w-full px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-base text-zinc-100 tracking-tight">ResuMate</span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Builder & Generator
            </span>
          </div>
        </div>

        {/* Mobile View Switcher Tabs (< 1024px) */}
        <div className="flex lg:hidden items-center bg-zinc-900 border border-zinc-800 p-0.5 rounded-xl">
          <button
            type="button"
            onClick={() => setMobileView('editor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mobileView === 'editor'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              mobileView === 'preview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Load Sample Button */}
          <button
            type="button"
            onClick={onLoadSample}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors"
            title="Load sample senior engineer profile"
          >
            <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
            <span>Load Sample</span>
          </button>

          {/* Import JSON hidden input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors"
            title="Import existing resume JSON"
          >
            <Upload className="w-3.5 h-3.5 text-zinc-400" />
            <span>Import</span>
          </button>

          <button
            type="button"
            onClick={onExportJson}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors"
            title="Export resume data as JSON"
          >
            <Download className="w-3.5 h-3.5 text-zinc-400" />
            <span>Export</span>
          </button>

          {/* Quick Print Button */}
          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-colors"
            title="Print or Save as Vector PDF"
          >
            <Printer className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Clear Button */}
          <button
            type="button"
            onClick={onClear}
            className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-zinc-900 rounded-xl transition-colors"
            title="Clear all fields"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
