import React, { useRef } from 'react';
import {
  RotateCcw,
  Trash2,
  Upload,
  Download,
  Printer,
  Edit3,
  Eye,
  FileCode2
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
    <header className="sticky top-0 z-30 w-full bg-[#121316] border-b border-zinc-800/80 backdrop-blur-xl select-none">
      <div className="w-full px-4 sm:px-6 h-13 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700/60 flex items-center justify-center text-zinc-100 shadow-sm">
            <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-zinc-100 tracking-tight">ResuMate</span>
            <span className="text-[10px] font-medium text-zinc-400 border-l border-zinc-700/60 pl-2">
              Studio
            </span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 ml-2 text-[11px] text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded-full border border-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Auto-saved</span>
          </div>
        </div>

        {/* Center: Mobile Segmented Switcher (< 1024px) */}
        <div className="flex lg:hidden items-center bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg">
          <button
            type="button"
            onClick={() => setMobileView('editor')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-all ${
              mobileView === 'editor'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>
          <button
            type="button"
            onClick={() => setMobileView('preview')}
            className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-md transition-all ${
              mobileView === 'preview'
                ? 'bg-zinc-800 text-zinc-100 shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Eye className="w-3 h-3" />
            <span>Preview</span>
          </button>
        </div>

        {/* Right: Workspace Actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onLoadSample}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 rounded-lg transition-colors"
            title="Load sample senior profile"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Sample</span>
          </button>

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
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 rounded-lg transition-colors"
            title="Import JSON data"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import</span>
          </button>

          <button
            type="button"
            onClick={onExportJson}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/80 rounded-lg transition-colors"
            title="Export JSON backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <div className="w-px h-4 bg-zinc-800 mx-1 hidden sm:block" />

          <button
            type="button"
            onClick={onPrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white bg-zinc-800/90 hover:bg-zinc-700/90 border border-zinc-700/60 rounded-lg transition-all active:scale-95"
            title="Print or Vector PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            type="button"
            onClick={onClear}
            className="p-1.5 text-zinc-500 hover:text-rose-400 hover:bg-zinc-800/80 rounded-lg transition-colors"
            title="Clear all fields"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
