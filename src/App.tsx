import { useState, useEffect, useCallback } from 'react';
import { Navbar, type AppPage } from './components/Navbar';
import { ResumeEditor } from './components/editor/ResumeEditor';
import { ResumePreview } from './components/preview/ResumePreview';
import { LandingPage } from './pages/LandingPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { AnalyzerPage } from './pages/AnalyzerPage';
import { ToastContainer, type ToastMessage } from './components/ui/Toast';
import type { ResumeData, ResumeTheme, TemplateType } from './types/resume';
import { sampleResume, emptyResume } from './data/sampleResumes';

const STORAGE_KEY_DATA = 'PRISMA_BUILDER_DATA_V1';
const STORAGE_KEY_THEME = 'PRISMA_BUILDER_THEME_V1';

const defaultTheme: ResumeTheme = {
  template: 'modern',
  primaryColor: '#2563eb',
  fontFamily: 'sans',
  fontSize: 'normal'
};

export function App() {
  // Navigation State ('landing' | 'builder' | 'analyzer' | 'templates')
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');

  // Resume Data State
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to restore saved resume data:', e);
    }
    return sampleResume;
  });

  // Theme State
  const [theme, setTheme] = useState<ResumeTheme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_THEME);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to restore saved theme:', e);
    }
    return defaultTheme;
  });

  // Mobile view switcher ('editor' | 'preview')
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((text: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Auto-save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(resumeData));
    } catch (e) {
      console.error('Failed to persist resume data:', e);
    }
  }, [resumeData]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_THEME, JSON.stringify(theme));
    } catch (e) {
      console.error('Failed to persist theme:', e);
    }
  }, [theme]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        try {
          localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(resumeData));
          addToast('Resume draft saved successfully', 'success');
        } catch (err) {
          addToast('Could not save to local storage', 'error');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [resumeData, addToast]);

  // Actions
  const handleLoadSample = () => {
    if (confirm('Load sample data? This will populate the editor with a complete profile.')) {
      setResumeData(sampleResume);
      addToast('Loaded Senior Architect sample profile', 'info');
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all resume content?')) {
      setResumeData(emptyResume);
      addToast('All resume sections cleared', 'info');
    }
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(resumeData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(resumeData.personalInfo.fullName || 'resume').toLowerCase().replace(/\s+/g, '_')}_data.json`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Exported resume JSON file', 'success');
  };

  const handleImportJson = (imported: ResumeData) => {
    setResumeData(imported);
    addToast('Imported resume data successfully', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleStartBuildingWithTemplate = (template?: TemplateType, color?: string) => {
    if (template) {
      setTheme((prev) => ({
        ...prev,
        template,
        primaryColor: color || prev.primaryColor
      }));
    }
    setCurrentPage('builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-[#E1E0CC] selection:bg-[#DEDBC8]/20 selection:text-[#DEDBC8]">
      {/* Top Navbar — shown on studio/builder, templates, and analyzer */}
      {currentPage !== 'landing' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={setCurrentPage}
          onLoadSample={handleLoadSample}
          onClear={handleClear}
          onExportJson={handleExportJson}
          onImportJson={handleImportJson}
          onPrint={handlePrint}
          mobileView={mobileView}
          setMobileView={setMobileView}
        />
      )}

      {/* Dynamic Page Rendering */}
      {currentPage === 'landing' && (
        <LandingPage
          onStartBuilding={handleStartBuildingWithTemplate}
          onOpenAnalyzer={() => setCurrentPage('analyzer')}
          onOpenTemplates={() => setCurrentPage('templates')}
        />
      )}

      {currentPage === 'templates' && (
        <TemplatesPage
          onSelectTemplate={(tpl, color) => handleStartBuildingWithTemplate(tpl, color)}
        />
      )}

      {currentPage === 'analyzer' && (
        <AnalyzerPage
          onOpenInStudio={(imported) => {
            setResumeData(imported);
            setCurrentPage('builder');
          }}
        />
      )}

      {currentPage === 'builder' && (
        <main className="flex-1 flex overflow-hidden h-[calc(100vh-3.5rem)]">
          {/* Left Panel: Form Editor */}
          <div
            id="resume-editor-panel"
            className={`w-full lg:w-[46%] xl:w-[44%] h-full flex flex-col border-r border-zinc-800 ${
              mobileView === 'preview' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <ResumeEditor data={resumeData} onChange={setResumeData} />
          </div>

          {/* Right Panel: Live Real-Time A4 Preview */}
          <div
            id="resume-preview-panel"
            className={`w-full lg:w-[54%] xl:w-[56%] h-full flex flex-col ${
              mobileView === 'editor' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <ResumePreview
              data={resumeData}
              theme={theme}
              onThemeChange={setTheme}
              onLoadSample={handleLoadSample}
              onExportJson={handleExportJson}
              onPdfExportSuccess={() => addToast('PDF exported successfully', 'success')}
            />
          </div>
        </main>
      )}

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}

export default App;
