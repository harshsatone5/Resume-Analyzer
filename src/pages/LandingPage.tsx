import React from 'react';
import { PrismaHero } from '../components/prisma/PrismaHero';
import { PrismaAbout } from '../components/prisma/PrismaAbout';
import { PrismaFeatures } from '../components/prisma/PrismaFeatures';
import type { TemplateType } from '../types/resume';
import { ArrowRight, ShieldCheck, FileCheck, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onStartBuilding?: (initialTemplate?: TemplateType) => void;
  onOpenAnalyzer?: () => void;
  onOpenTemplates?: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartBuilding,
  onOpenAnalyzer,
  onOpenTemplates
}) => {
  return (
    <div className="w-full bg-black text-[#E1E0CC] selection:bg-[#DEDBC8]/20 selection:text-[#DEDBC8] overflow-x-hidden min-h-screen flex flex-col">
      {/* SECTION 1: HERO */}
      <PrismaHero
        onJoinClick={() => onStartBuilding && onStartBuilding('modern')}
        onNavigate={(page) => {
          if (page === 'builder' && onStartBuilding) onStartBuilding('modern');
          if (page === 'analyzer' && onOpenAnalyzer) onOpenAnalyzer();
          if (page === 'templates' && onOpenTemplates) onOpenTemplates();
        }}
      />

      {/* SECTION 2: ABOUT */}
      <PrismaAbout />

      {/* SECTION 3: FEATURES */}
      <PrismaFeatures
        onOpenStudio={() => onStartBuilding && onStartBuilding('modern')}
        onOpenAnalyzer={onOpenAnalyzer}
        onOpenTemplates={onOpenTemplates}
      />

      {/* FOOTER: Tailored specifically for Resume Analyzer */}
      <footer id="inquiries" className="bg-black border-t border-white/[0.06] pt-16 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Top Row: Brand & Quick Action */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-[#E1E0CC] font-bold tracking-tight text-xl">
                  ResuMate<span className="text-primary">*</span>
                </span>
                <span className="text-gray-600">/</span>
                <span className="text-xs text-gray-400 font-medium">ATS Resume & Career Studio</span>
              </div>
              <p className="text-xs text-gray-500 max-w-md leading-relaxed">
                Engineered for ambitious candidates to bypass automated screening filters, optimize keyword frequency, and generate interview-winning executive resumes.
              </p>
            </div>

            {/* CTA to Enter Studio */}
            {onStartBuilding && (
              <button
                type="button"
                onClick={() => onStartBuilding('modern')}
                className="group inline-flex items-center gap-2 hover:gap-3 bg-primary text-black font-medium text-xs sm:text-sm rounded-full pl-5 pr-1.5 py-1.5 transition-all duration-300 shadow-xl cursor-pointer select-none active:scale-95"
              >
                <span>Launch Resume Studio</span>
                <span className="bg-black rounded-full w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DEDBC8]" />
                </span>
              </button>
            )}
          </div>

          {/* Middle Row: Navigation Links & Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-xs">
            <div className="space-y-3">
              <div className="font-semibold text-[#E1E0CC] uppercase tracking-wider text-[11px]">Studio</div>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => onStartBuilding && onStartBuilding('modern')}
                    className="hover:text-[#E1E0CC] transition-colors"
                  >
                    Interactive Editor
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onStartBuilding && onStartBuilding('modern')}
                    className="hover:text-[#E1E0CC] transition-colors"
                  >
                    A4 Vector Preview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onStartBuilding && onStartBuilding('modern')}
                    className="hover:text-[#E1E0CC] transition-colors"
                  >
                    AI Bullet Polisher
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-[#E1E0CC] uppercase tracking-wider text-[11px]">Audit Tools</div>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={onOpenAnalyzer}
                    className="hover:text-[#E1E0CC] transition-colors"
                  >
                    ATS Keyword Scanner
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenAnalyzer}
                    className="hover:text-[#E1E0CC] transition-colors"
                  >
                    Job Description Match
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenAnalyzer}
                    className="hover:text-[#E1E0CC] transition-colors"
                  >
                    Pre-Screen Score Check
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-[#E1E0CC] uppercase tracking-wider text-[11px]">Templates</div>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={onOpenTemplates}
                    className="hover:text-[#E1E0CC] transition-colors"
                  >
                    Modern Tech Grid
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenTemplates}
                    className="hover:text-[#E1E0CC] transition-colors"
                  >
                    Executive Serif
                  </button>
                </li>
                <li>
                  <button
                    onClick={onOpenTemplates}
                    className="hover:text-[#E1E0CC] transition-colors"
                  >
                    Minimalist Nordic
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="font-semibold text-[#E1E0CC] uppercase tracking-wider text-[11px]">Guarantees</div>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-1.5 text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  <span>100% ATS Scannable</span>
                </li>
                <li className="flex items-center gap-1.5 text-gray-400">
                  <FileCheck className="w-3.5 h-3.5 text-primary" />
                  <span>Vector PDF Output</span>
                </li>
                <li className="flex items-center gap-1.5 text-gray-400">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>Private Local Storage</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Row: Legal & Rights */}
          <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-600 font-mono">
            <div>
              © {new Date().getFullYear()} ResuMate AI. Built for candidates who refuse to settle.
            </div>
            <div className="flex items-center gap-4">
              <a href="#about" className="hover:text-gray-400 transition-colors">Philosophy</a>
              <span>•</span>
              <a href="#features" className="hover:text-gray-400 transition-colors">Capabilities</a>
              <span>•</span>
              <span>All rights reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
