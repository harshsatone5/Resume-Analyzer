import React, { useState } from 'react';
import {
  Download,
  Type,
  ZoomIn,
  ZoomOut,
  FileJson,
  RotateCcw,
  ChevronDown,
  Layout,
  Highlighter,
  Check
} from 'lucide-react';
import type { TemplateType, FontFamilyType, FontSizeDensity, ResumeTheme } from '../../types/resume';

interface FloatingToolbarProps {
  theme: ResumeTheme;
  onThemeChange: (updated: ResumeTheme) => void;
  onDownloadPdf: () => void;
  onExportJson: () => void;
  onLoadSample: () => void;
  zoom: number;
  onZoomChange: (newZoom: number) => void;
  isGeneratingPdf?: boolean;
  highlightKeywords?: boolean;
  onToggleHighlightKeywords?: () => void;
}

const PRESET_COLORS = [
  { name: 'Indigo Blue', color: '#2563eb' },
  { name: 'Executive Navy', color: '#0f172a' },
  { name: 'Emerald Forest', color: '#059669' },
  { name: 'Crimson Rose', color: '#be123c' },
  { name: 'Royal Violet', color: '#7c3aed' },
  { name: 'Charcoal Minimal', color: '#27272a' }
];

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  theme,
  onThemeChange,
  onDownloadPdf,
  onExportJson,
  onLoadSample,
  zoom,
  onZoomChange,
  isGeneratingPdf,
  highlightKeywords = false,
  onToggleHighlightKeywords
}) => {
  const [showColorMenu, setShowColorMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);

  const templates: { id: TemplateType; label: string; desc: string }[] = [
    { id: 'modern', label: 'Modern', desc: 'Balanced 2-column tech grid' },
    { id: 'executive', label: 'Executive', desc: 'Formal centered classic serif' },
    { id: 'minimalist', label: 'Minimalist', desc: 'Nordic whitespace, light type' },
    { id: 'creative', label: 'Creative', desc: 'Color accent left sidebar' }
  ];

  const fonts: { id: FontFamilyType; label: string; preview: string }[] = [
    { id: 'sans', label: 'Modern Sans', preview: 'Plus Jakarta Sans' },
    { id: 'serif', label: 'Executive Serif', preview: 'Newsreader' },
    { id: 'mono', label: 'Technical Mono', preview: 'JetBrains Mono' }
  ];

  const densities: { id: FontSizeDensity; label: string }[] = [
    { id: 'compact', label: 'Compact' },
    { id: 'normal', label: 'Balanced' },
    { id: 'spacious', label: 'Spacious' }
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-xl">
      {/* Left: Template Selector Pills */}
      <div className="flex items-center gap-1 bg-zinc-950/70 p-1 rounded-xl border border-zinc-800/60">
        <div className="hidden xl:flex items-center pl-1.5 pr-1 text-[11px] font-semibold text-zinc-400">
          <Layout className="w-3.5 h-3.5 mr-1 text-blue-400" />
          <span>Layout:</span>
        </div>
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => onThemeChange({ ...theme, template: t.id })}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              theme.template === t.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
            }`}
            title={t.desc}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Middle: Styling Controls (Color, Font, Density, ATS highlight) */}
      <div className="flex items-center gap-2">
        {/* Color Picker Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowColorMenu(!showColorMenu);
              setShowFontMenu(false);
            }}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 text-zinc-200 rounded-xl transition-all"
            title="Theme primary color"
          >
            <span
              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <span className="hidden sm:inline">Color</span>
            <ChevronDown className="w-3 h-3 text-zinc-500" />
          </button>

          {showColorMenu && (
            <div className="absolute left-0 sm:left-auto top-full mt-2 z-50 p-3.5 bg-zinc-900 border border-zinc-700/90 rounded-2xl shadow-2xl space-y-3 min-w-[200px] animate-scale-in">
              <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                Accent Palette
              </div>
              <div className="grid grid-cols-3 gap-2">
                {PRESET_COLORS.map((p) => (
                  <button
                    key={p.color}
                    type="button"
                    onClick={() => {
                      onThemeChange({ ...theme, primaryColor: p.color });
                      setShowColorMenu(false);
                    }}
                    className="w-8 h-8 rounded-xl border-2 transition-transform hover:scale-110 flex items-center justify-center"
                    style={{
                      backgroundColor: p.color,
                      borderColor: theme.primaryColor === p.color ? '#ffffff' : 'transparent'
                    }}
                    title={p.name}
                  >
                    {theme.primaryColor === p.color && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                ))}
              </div>
              <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-2 text-[11px]">
                <span className="text-zinc-400">Custom hex:</span>
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => onThemeChange({ ...theme, primaryColor: e.target.value })}
                  className="w-6 h-6 rounded-md border-0 bg-transparent cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Font Family Selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowFontMenu(!showFontMenu);
              setShowColorMenu(false);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700 text-zinc-200 rounded-xl transition-all"
            title="Select typography family"
          >
            <Type className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline capitalize">{theme.fontFamily}</span>
            <ChevronDown className="w-3 h-3 text-zinc-500" />
          </button>

          {showFontMenu && (
            <div className="absolute top-full mt-2 z-50 p-2 bg-zinc-900 border border-zinc-700/90 rounded-2xl shadow-2xl min-w-[170px] space-y-1 animate-scale-in">
              {fonts.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => {
                    onThemeChange({ ...theme, fontFamily: f.id });
                    setShowFontMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-colors flex items-center justify-between ${
                    theme.fontFamily === f.id
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span>{f.label}</span>
                  {theme.fontFamily === f.id && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Density Selector */}
        <div className="hidden lg:flex items-center bg-zinc-950/70 p-1 rounded-xl border border-zinc-800/60">
          {densities.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => onThemeChange({ ...theme, fontSize: d.id })}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                theme.fontSize === d.id
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Keyword Highlighting Toggle */}
        {onToggleHighlightKeywords && (
          <button
            type="button"
            onClick={onToggleHighlightKeywords}
            className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold border rounded-xl transition-all ${
              highlightKeywords
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-zinc-950/70 text-zinc-400 border-zinc-800/80 hover:text-zinc-200'
            }`}
            title="Highlight matched ATS skills on preview document"
          >
            <Highlighter className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xl:inline">Highlight ATS</span>
          </button>
        )}

        {/* Zoom Controls */}
        <div className="hidden sm:flex items-center gap-1 bg-zinc-950/70 p-1 rounded-xl border border-zinc-800/60">
          <button
            type="button"
            onClick={() => onZoomChange(Math.max(60, zoom - 10))}
            className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-zinc-400 px-1 min-w-[34px] text-center tabular-nums">
            {zoom}%
          </span>
          <button
            type="button"
            onClick={() => onZoomChange(Math.min(140, zoom + 10))}
            className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right: Actions (Download PDF, Export, Sample) */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onLoadSample}
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-xl transition-colors"
          title="Reset to sample data"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Sample</span>
        </button>

        <button
          type="button"
          onClick={onExportJson}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-300 bg-zinc-950/80 hover:bg-zinc-800 border border-zinc-800/80 rounded-xl transition-colors"
          title="Export resume data as JSON"
        >
          <FileJson className="w-3.5 h-3.5 text-zinc-400" />
          <span>JSON</span>
        </button>

        {/* High Priority Download PDF Button */}
        <button
          type="button"
          onClick={onDownloadPdf}
          disabled={isGeneratingPdf}
          className="btn-primary text-xs py-2 px-4 font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 disabled:opacity-50"
        >
          {isGeneratingPdf ? (
            <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          <span>Download PDF</span>
        </button>
      </div>
    </div>
  );
};
