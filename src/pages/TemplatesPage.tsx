import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Layout,
  Palette,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  Layers
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
      structure: '2-Column · Section Dividers · Compact Header',
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
      structure: 'Centered · Classic Serif · Elegant Lines',
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
      structure: 'Single Column · Generous Margins · High Whitespace',
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
      structure: 'Sidebar Accent · Dual-Tone Grid · Skill Badges',
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
    <div className="w-full min-h-[calc(100vh-3.5rem)] relative overflow-hidden">
      {/* Background noise texture */}
      <div className="bg-noise absolute inset-0 w-full h-full opacity-[0.12] pointer-events-none z-0" />

      {/* Ambient glow accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#DEDBC8]/[0.02] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] bg-[#DEDBC8]/[0.015] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Editorial Header */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-6"
            style={{
              background: 'rgba(222, 219, 200, 0.04)',
              border: '1px solid rgba(222, 219, 200, 0.08)',
              backdropFilter: 'blur(8px)'
            }}
          >
            <Layers className="w-3.5 h-3.5 text-[#DEDBC8]" />
            <span className="text-[#DEDBC8]/80">ATS-tested layouts</span>
            <span className="text-[#DEDBC8]/20">·</span>
            <span className="text-[#DEDBC8]/50">100% Vector PDF output</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold tracking-[-0.03em] text-[#E1E0CC] mb-5 leading-[1.1]">
            Templates designed to get read.
          </h1>
          <p className="text-sm sm:text-[15px] text-[#DEDBC8]/50 leading-relaxed max-w-lg mx-auto">
            Every template is crafted to balance strict ATS scannability with unforgettable visual authority.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-1.5 mb-10"
        >
          {[
            { id: 'all', label: 'All layouts' },
            { id: 'tech', label: 'Tech & Engineering' },
            { id: 'leadership', label: 'Leadership & Finance' },
            { id: 'creative', label: 'Design & Creative' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id)}
              className="px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200"
              style={{
                color: filterCategory === tab.id ? '#000' : 'rgba(222, 219, 200, 0.4)',
                background: filterCategory === tab.id ? '#DEDBC8' : 'transparent',
                border: filterCategory === tab.id ? 'none' : '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Main Showcase Layout */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
        >
          {/* Left: Template Selector & Configuration (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between text-[10px] font-semibold text-[#DEDBC8]/30 uppercase tracking-[0.15em] mb-3 px-1">
              <span>Choose your aesthetic</span>
              <span className="font-mono lowercase tracking-normal">
                {filteredTemplates.length} templates
              </span>
            </div>

            <div className="space-y-2">
              {filteredTemplates.map((tpl) => {
                const isSelected = selectedTemplate === tpl.id;
                return (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      setSelectedTemplate(tpl.id);
                      setSelectedColor(tpl.colors[0]);
                    }}
                    className="cursor-pointer p-4 rounded-2xl transition-all duration-200"
                    style={{
                      background: isSelected ? '#101010' : 'rgba(255,255,255,0.015)',
                      border: isSelected
                        ? '1px solid rgba(222, 219, 200, 0.15)'
                        : '1px solid rgba(255, 255, 255, 0.03)',
                      boxShadow: isSelected ? '0 8px 32px rgba(0,0,0,0.3)' : 'none',
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.03)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.015)';
                      }
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-[#E1E0CC] tracking-tight">
                          {tpl.title}
                        </h3>
                        {tpl.badge && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-semibold"
                            style={{
                              background: 'rgba(222, 219, 200, 0.06)',
                              color: 'rgba(222, 219, 200, 0.6)',
                              border: '1px solid rgba(222, 219, 200, 0.1)',
                            }}
                          >
                            {tpl.badge}
                          </span>
                        )}
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#DEDBC8]/60" />}
                    </div>

                    <p className="text-xs text-[#DEDBC8]/35 leading-relaxed mb-3">
                      {tpl.description}
                    </p>

                    <div className="pt-2.5 border-t border-white/[0.04] flex items-center justify-between text-[10px]">
                      <span className="text-[#DEDBC8]/25">
                        <span className="font-semibold text-[#DEDBC8]/40">Best for:</span>{' '}
                        {tpl.bestFor.split(',')[0]}
                      </span>
                      <span className="text-[#DEDBC8]/30 font-medium font-mono text-[9px]">{tpl.structure}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Color Palette Selector */}
            <div
              className="p-4 rounded-2xl space-y-3"
              style={{
                background: '#101010',
                border: '1px solid rgba(255, 255, 255, 0.04)',
              }}
            >
              <div className="flex items-center justify-between text-xs font-medium text-[#E1E0CC]/70">
                <div className="flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5 text-[#DEDBC8]/50" />
                  <span>Theme accent</span>
                </div>
                <span className="text-[10px] font-mono text-[#DEDBC8]/20">{selectedColor}</span>
              </div>

              <div className="flex items-center gap-2.5">
                {activeTemplateConfig.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className="w-8 h-8 rounded-xl transition-all duration-200 flex items-center justify-center"
                    style={{
                      backgroundColor: c,
                      border: selectedColor === c ? '2px solid rgba(255,255,255,0.7)' : '2px solid transparent',
                      transform: selectedColor === c ? 'scale(1.1)' : 'scale(1)',
                      boxShadow: selectedColor === c ? '0 4px 12px rgba(0,0,0,0.4)' : 'none',
                    }}
                    title={c}
                  >
                    {selectedColor === c && <Check className="w-3.5 h-3.5 text-white drop-shadow-md" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Use Template CTA */}
            <button
              onClick={() => onSelectTemplate(selectedTemplate, selectedColor)}
              className="group w-full inline-flex items-center justify-center gap-2 bg-[#DEDBC8] text-black font-semibold text-sm rounded-full py-3.5 transition-all duration-300 shadow-[0_4px_20px_rgba(222,219,200,0.2)] hover:shadow-[0_8px_32px_rgba(222,219,200,0.3)] active:scale-[0.97]"
            >
              <span>Start editing "{activeTemplateConfig.title}"</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Right: Real-time Live Document Preview Render (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full flex items-center justify-between text-[10px] font-semibold text-[#DEDBC8]/30 uppercase tracking-[0.15em] mb-3 px-1">
              <div className="flex items-center gap-2">
                <Layout className="w-3.5 h-3.5 text-[#DEDBC8]/40" />
                <span>Live vector preview</span>
              </div>

              {/* Zoom Controls */}
              <div
                className="flex items-center gap-1 px-1.5 py-1 rounded-lg"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <button
                  onClick={() => setPreviewZoom((z) => Math.max(50, z - 10))}
                  className="p-1 text-[#DEDBC8]/30 hover:text-[#DEDBC8]/70 rounded transition-colors"
                  title="Zoom out"
                >
                  <ZoomOut className="w-3 h-3" />
                </button>
                <span className="text-[10px] font-mono text-[#DEDBC8]/20 px-1 min-w-[28px] text-center">
                  {previewZoom}%
                </span>
                <button
                  onClick={() => setPreviewZoom((z) => Math.min(100, z + 10))}
                  className="p-1 text-[#DEDBC8]/30 hover:text-[#DEDBC8]/70 rounded transition-colors"
                  title="Zoom in"
                >
                  <ZoomIn className="w-3 h-3" />
                </button>
              </div>
            </div>

            <div
              className="w-full p-4 sm:p-6 rounded-2xl flex justify-center items-start overflow-hidden min-h-[600px] relative"
              style={{
                background: '#0a0a0a',
                border: '1px solid rgba(255, 255, 255, 0.04)',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Ambient glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#DEDBC8]/[0.015] rounded-full blur-[80px] pointer-events-none" />

              {/* Scaled Preview Sheet */}
              <div
                className="origin-top transition-transform duration-200 relative z-10"
                style={{ transform: `scale(${previewZoom / 100})` }}
              >
                <div className="w-[210mm] min-h-[297mm] bg-white text-zinc-900 rounded-sm shadow-2xl overflow-hidden border border-zinc-200">
                  {renderActivePreview()}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
