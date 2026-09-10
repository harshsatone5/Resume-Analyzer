import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Layout,
  Palette,
  CheckCircle2,
  Sparkles,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import type { TemplateType, ResumeTheme } from '../types/resume';
import { sampleResume } from '../data/sampleResumes';
import { ModernTemplate } from '../components/preview/templates/ModernTemplate';
import { ExecutiveTemplate } from '../components/preview/templates/ExecutiveTemplate';
import { MinimalistTemplate } from '../components/preview/templates/MinimalistTemplate';
import { CreativeTemplate } from '../components/preview/templates/CreativeTemplate';

interface TemplatesPageProps {
  onSelectTemplate: (template: TemplateType, color: string) => void;
}

export const TemplatesPage: React.FC<TemplatesPageProps> = ({ onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('modern');
  const [selectedColor, setSelectedColor] = useState<string>('#2563eb');
  const [previewZoom, setPreviewZoom] = useState<number>(75);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const templatesList: {
    id: TemplateType;
    title: string;
    category: string;
    subtitle: string;
    description: string;
    bestFor: string;
    structure: string;
    colors: string[];
    badge?: string;
  }[] = [
    {
      id: 'modern',
      title: 'Modern Clean',
      category: 'tech',
      subtitle: 'Engineered for High-Tech & High-Growth Companies',
      description: 'A balanced two-column format with clean typography, prominent contact links, and subtle colored section dividers.',
      bestFor: 'Software Engineers, Product Managers, Data Scientists',
      structure: '2-Column • Section Dividers • Compact Header',
      colors: ['#2563eb', '#059669', '#7c3aed', '#be123c', '#0f172a'],
      badge: 'Most Popular'
    },
    {
      id: 'executive',
      title: 'Executive Serif',
      category: 'leadership',
      subtitle: 'Authoritative & Editorial Formal Standard',
      description: 'Traditional centered layout utilizing dignified serif headings and classic border dividers. ATS-optimized with maximum scannability.',
      bestFor: 'Directors, Executives, Finance, Consultants, Academics',
      structure: 'Centered • Classic Serif • Elegant Lines',
      colors: ['#0f172a', '#1e293b', '#334155', '#1e3a8a', '#14532d'],
      badge: 'Formal Standard'
    },
    {
      id: 'minimalist',
      title: 'Minimalist Nordic',
      category: 'creative',
      subtitle: 'Pure Whitespace & Understated Elegance',
      description: 'Scandinavian-inspired layout with generous margins, clean typography, and zero clutter. Every word carries deliberate weight.',
      bestFor: 'Designers, Architects, Researchers, Writers',
      structure: 'Single Column • Generous Margins • High Whitespace',
      colors: ['#18181b', '#27272a', '#3f3f46', '#2563eb', '#059669'],
      badge: 'Design Favorite'
    },
    {
      id: 'creative',
      title: 'Creative Accent',
      category: 'creative',
      subtitle: 'Dynamic Dual-Tone Sidebar Structure',
      description: 'Eye-catching colored left panel designed to highlight technical competencies, certifications, and contact details with instant contrast.',
      bestFor: 'UI/UX Designers, Creative Technologists, Marketing Leads',
      structure: 'Sidebar Accent • Dual-Tone Grid • Skill Badges',
      colors: ['#7c3aed', '#2563eb', '#059669', '#be123c', '#0f172a'],
      badge: 'Visual Impact'
    }
  ];

  const filteredTemplates = templatesList.filter(
    (t) => filterCategory === 'all' || t.category === filterCategory
  );

  const activeTemplateConfig = templatesList.find((t) => t.id === selectedTemplate) || templatesList[0];

  const dummyTheme: ResumeTheme = {
    template: selectedTemplate,
    primaryColor: selectedColor,
    fontFamily: selectedTemplate === 'executive' ? 'serif' : 'sans',
    fontSize: 'normal'
  };

  const renderActivePreview = () => {
    switch (selectedTemplate) {
      case 'executive':
        return <ExecutiveTemplate data={sampleResume} theme={dummyTheme} />;
      case 'minimalist':
        return <MinimalistTemplate data={sampleResume} theme={dummyTheme} />;
      case 'creative':
        return <CreativeTemplate data={sampleResume} theme={dummyTheme} />;
      case 'modern':
      default:
        return <ModernTemplate data={sampleResume} theme={dummyTheme} />;
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-3.5rem)] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto selection:bg-[#DEDBC8]/20 selection:text-[#DEDBC8]">
      {/* Editorial Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 animate-fade-in">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium mb-4"
          style={{ background: 'var(--surface-elevated)', border: '1px solid var(--border-subtle)' }}
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-zinc-300">ATS Tested Layouts</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-400">100% Vector PDF Output</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
          Templates Designed to Get Read.
        </h1>
        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl mx-auto">
          Every template is crafted by senior typography specialists to balance strict ATS scannability with unforgettable visual authority.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[
          { id: 'all', label: 'All Layouts' },
          { id: 'tech', label: 'Tech & Engineering' },
          { id: 'leadership', label: 'Leadership & Finance' },
          { id: 'creative', label: 'Design & Creative' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id)}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              filterCategory === tab.id
                ? 'bg-primary text-black shadow-md shadow-black/40'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border border-zinc-800/80'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Showcase Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Template Selector & Configuration (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
            <span>Choose Your Aesthetic</span>
            <span className="text-zinc-500 font-mono text-[11px] lowercase">
              {filteredTemplates.length} templates
            </span>
          </div>

          <div className="space-y-3">
            {filteredTemplates.map((tpl) => {
              const isSelected = selectedTemplate === tpl.id;
              return (
                <div
                  key={tpl.id}
                  onClick={() => {
                    setSelectedTemplate(tpl.id);
                    setSelectedColor(tpl.colors[0]);
                  }}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-zinc-900 border-primary/80 shadow-lg shadow-black/40'
                      : 'bg-zinc-900/50 border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        {tpl.title}
                      </h3>
                      {tpl.badge && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/15 text-primary border border-primary/30">
                          {tpl.badge}
                        </span>
                      )}
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-primary" />}
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-3">
                    {tpl.description}
                  </p>

                  <div className="pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px]">
                    <span className="text-zinc-500">
                      <span className="font-semibold text-zinc-400">Best for:</span> {tpl.bestFor.split(',')[0]}
                    </span>
                    <span className="text-primary font-medium text-[10px]">{tpl.structure}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Color Palette Selector */}
          <div className="glass-card p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-300">
              <div className="flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-primary" />
                <span>Theme Accent Harmony:</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">{selectedColor}</span>
            </div>

            <div className="flex items-center gap-3">
              {activeTemplateConfig.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`w-8 h-8 rounded-xl border-2 transition-all flex items-center justify-center ${
                    selectedColor === c ? 'border-white scale-110 shadow-md shadow-black/50' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: c }}
                  title={c}
                >
                  {selectedColor === c && <Check className="w-4 h-4 text-white" />}
                </button>
              ))}
            </div>
          </div>

          {/* Use Template CTA */}
          <button
            onClick={() => onSelectTemplate(selectedTemplate, selectedColor)}
            className="btn-primary w-full py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-xl shadow-black/40"
          >
            <span>Start Editing "{activeTemplateConfig.title}"</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Real-time Live Document Preview Render (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
            <div className="flex items-center gap-2">
              <Layout className="w-3.5 h-3.5 text-primary" />
              <span>Real-Time Vector Preview</span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
              <button
                onClick={() => setPreviewZoom((z) => Math.max(50, z - 10))}
                className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
                title="Zoom out"
              >
                <ZoomOut className="w-3 h-3" />
              </button>
              <span className="text-[10px] font-mono text-zinc-400 px-1 min-w-[32px] text-center">
                {previewZoom}%
              </span>
              <button
                onClick={() => setPreviewZoom((z) => Math.min(100, z + 10))}
                className="p-1 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
                title="Zoom in"
              >
                <ZoomIn className="w-3 h-3" />
              </button>
            </div>
          </div>

          <div className="w-full p-4 sm:p-6 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl flex justify-center items-start overflow-hidden min-h-[600px] shadow-2xl relative">
            {/* Scaled Preview Sheet */}
            <div
              className="origin-top transition-transform duration-200"
              style={{ transform: `scale(${previewZoom / 100})` }}
            >
              <div className="w-[210mm] min-h-[297mm] bg-white text-zinc-900 rounded-sm shadow-2xl overflow-hidden border border-zinc-200">
                {renderActivePreview()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
