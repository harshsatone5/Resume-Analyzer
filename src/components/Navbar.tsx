import React, { useRef, useState } from 'react';
import {
  RotateCcw,
  Trash2,
  Upload,
  Download,
  Printer,
  Edit3,
  Eye,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import type { ResumeData } from '../types/resume';

export type AppPage = 'landing' | 'builder' | 'analyzer' | 'templates';

interface NavbarProps {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
  onLoadSample: () => void;
  onClear: () => void;
  onExportJson: () => void;
  onImportJson: (data: ResumeData) => void;
  onPrint: () => void;
  mobileView: 'editor' | 'preview';
  setMobileView: (view: 'editor' | 'preview') => void;
}

const navLinks: { page: AppPage; label: string }[] = [
  { page: 'landing', label: 'Home' },
  { page: 'builder', label: 'Studio' },
  { page: 'analyzer', label: 'ATS Scanner' },
  { page: 'templates', label: 'Templates' }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onLoadSample,
  onClear,
  onExportJson,
  onImportJson,
  onPrint,
  mobileView,
  setMobileView
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-50 w-full select-none">
      {/* Glass backdrop bar */}
      <div
        className="w-full border-b"
        style={{
          background: 'rgba(12, 13, 18, 0.85)',
          borderColor: 'var(--border-subtle)',
          backdropFilter: 'blur(20px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.4)'
        }}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Left: Brand + Navigation */}
          <div className="flex items-center gap-5">
            {/* Brand Mark */}
            <div
              onClick={() => onNavigate('landing')}
              className="flex items-center gap-2.5 cursor-pointer group"
              role="button"
              aria-label="Go to home page"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #DEDBC8, #A8A593)',
                  boxShadow: '0 2px 8px rgba(222, 219, 200, 0.2)'
                }}
              >
                <span className="text-black text-sm font-bold tracking-tight">R</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight text-[#E1E0CC]">
                  ResuMate<span className="text-primary">*</span>
                </span>
                <span
                  className="text-[9px] font-medium tracking-wider uppercase hidden sm:block text-gray-500"
                >
                  ATS Resume Studio
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-0.5" role="navigation" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = currentPage === link.page;
                return (
                  <button
                    key={link.page}
                    onClick={() => onNavigate(link.page)}
                    className="relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
                    style={{
                      color: isActive ? 'var(--text-primary)' : 'var(--text-muted)',
                      background: isActive ? 'var(--surface-elevated)' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = 'var(--text-muted)';
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full"
                        style={{ background: 'var(--accent-primary)' }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Center: Mobile Segmented Switcher (Builder page only) */}
          {currentPage === 'builder' && (
            <div
              className="flex lg:hidden items-center p-0.5 rounded-lg"
              style={{
                background: 'var(--surface-inset)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <button
                type="button"
                onClick={() => setMobileView('editor')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200"
                style={{
                  background: mobileView === 'editor' ? 'var(--surface-elevated)' : 'transparent',
                  color: mobileView === 'editor' ? 'var(--text-primary)' : 'var(--text-muted)',
                  boxShadow: mobileView === 'editor' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
              <button
                type="button"
                onClick={() => setMobileView('preview')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200"
                style={{
                  background: mobileView === 'preview' ? 'var(--surface-elevated)' : 'transparent',
                  color: mobileView === 'preview' ? 'var(--text-primary)' : 'var(--text-muted)',
                  boxShadow: mobileView === 'preview' ? '0 1px 3px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                <Eye className="w-3 h-3" />
                <span>Preview</span>
              </button>
            </div>
          )}

          {/* Right: Actions & Mobile Menu */}
          <div className="flex items-center gap-2">
            {currentPage === 'builder' ? (
              <>
                {/* Builder toolbar actions */}
                <button
                  type="button"
                  onClick={onLoadSample}
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                  title="Load sample senior profile"
                  aria-label="Load sample data"
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
                  aria-hidden="true"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                  title="Import JSON data"
                  aria-label="Import JSON resume data"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import</span>
                </button>

                <button
                  type="button"
                  onClick={onExportJson}
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
                  style={{ color: 'var(--text-muted)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                  title="Export JSON backup"
                  aria-label="Export resume as JSON"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>

                {/* Divider */}
                <div className="w-px h-4 mx-1 hidden sm:block" style={{ background: 'var(--border-subtle)' }} />

                {/* Print CTA */}
                <button
                  type="button"
                  onClick={onPrint}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 active:scale-95"
                  style={{
                    color: 'var(--text-primary)',
                    background: 'var(--surface-elevated)',
                    border: '1px solid var(--border-default)'
                  }}
                  title="Print or generate Vector PDF"
                  aria-label="Print resume as PDF"
                >
                  <Printer className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} />
                  <span>Print</span>
                </button>

                {/* Clear */}
                <button
                  type="button"
                  onClick={onClear}
                  className="p-1.5 rounded-lg transition-all duration-200 hover:bg-red-500/10"
                  style={{ color: 'var(--text-ghost)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#f87171'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-ghost)'; }}
                  title="Clear all fields"
                  aria-label="Clear all resume content"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                {/* Launch Studio CTA */}
                <button
                  onClick={() => onNavigate('builder')}
                  className="btn-primary !py-1.5 !px-4 !text-xs !rounded-lg !gap-1.5"
                >
                  <span>Launch Studio</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </button>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-1.5 rounded-lg transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  aria-label="Toggle mobile menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && currentPage !== 'builder' && (
        <div
          className="md:hidden animate-fade-in"
          style={{
            background: 'var(--surface-overlay)',
            borderBottom: '1px solid var(--border-subtle)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  onNavigate(link.page);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 text-sm font-medium rounded-lg transition-colors"
                style={{
                  color: currentPage === link.page ? 'var(--text-primary)' : 'var(--text-muted)',
                  background: currentPage === link.page ? 'var(--surface-elevated)' : 'transparent'
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
