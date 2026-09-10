import React, { useRef, useState } from 'react';
import type { ResumeData, ResumeTheme } from '../../types/resume';
import { FloatingToolbar } from './FloatingToolbar';
import { ModernTemplate } from './templates/ModernTemplate';
import { ExecutiveTemplate } from './templates/ExecutiveTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import html2pdf from 'html2pdf.js';

interface ResumePreviewProps {
  data: ResumeData;
  theme: ResumeTheme;
  onThemeChange: (updated: ResumeTheme) => void;
  onLoadSample: () => void;
  onExportJson: () => void;
  onPdfExportSuccess?: () => void;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  data,
  theme,
  onThemeChange,
  onLoadSample,
  onExportJson,
  onPdfExportSuccess
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [highlightKeywords, setHighlightKeywords] = useState<boolean>(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Client-Side PDF Download
  const handleDownloadPdf = async () => {
    if (!printRef.current) return;
    setIsGeneratingPdf(true);

    const filename = `${(data.personalInfo.fullName || 'Resume').toLowerCase().replace(/\s+/g, '_')}_resume.pdf`;

    try {
      // Configure html2pdf options for precise A4 print
      const opt = {
        margin: 0,
        filename: filename,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          letterRendering: true,
          scrollY: 0
        },
        jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait' as const
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(opt).from(printRef.current).save();
      if (onPdfExportSuccess) onPdfExportSuccess();
    } catch (err) {
      console.warn('html2pdf direct save failed or not supported, falling back to vector print dialog:', err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  // Render chosen template
  const renderTemplate = () => {
    switch (theme.template) {
      case 'executive':
        return <ExecutiveTemplate data={data} theme={theme} />;
      case 'minimalist':
        return <MinimalistTemplate data={data} theme={theme} />;
      case 'creative':
        return <CreativeTemplate data={data} theme={theme} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} theme={theme} />;
    }
  };

  // Determine font family css class
  const getFontFamilyClass = () => {
    switch (theme.fontFamily) {
      case 'serif':
        return 'font-serif';
      case 'mono':
        return 'font-mono';
      case 'sans':
      default:
        return 'font-sans';
    }
  };

  // Determine font density scaling
  const getDensityClass = () => {
    switch (theme.fontSize) {
      case 'compact':
        return 'text-[92%] leading-tight';
      case 'spacious':
        return 'text-[106%] leading-relaxed';
      case 'normal':
      default:
        return 'text-[100%] leading-normal';
    }
  };

  return (
    <div className="flex flex-col h-full bg-zinc-950/90 relative">
      {/* Floating Toolbar pinned to top of preview panel */}
      <div className="p-3 sm:p-4 z-20 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <FloatingToolbar
          theme={theme}
          onThemeChange={onThemeChange}
          onDownloadPdf={handleDownloadPdf}
          onExportJson={onExportJson}
          onLoadSample={onLoadSample}
          zoom={zoom}
          onZoomChange={setZoom}
          isGeneratingPdf={isGeneratingPdf}
          highlightKeywords={highlightKeywords}
          onToggleHighlightKeywords={() => setHighlightKeywords(!highlightKeywords)}
        />
      </div>

      {/* Interactive A4 Document Canvas Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center items-start bg-neutral-900/50 print:bg-white print:p-0">
        <div
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          className="transition-transform duration-150 ease-out"
        >
          {/* Real A4 Sheet Aspect Ratio Container (210mm x 297mm) */}
          <div
            ref={printRef}
            id="printable-resume-sheet"
            className={`w-[210mm] min-h-[297mm] bg-white text-zinc-900 shadow-2xl rounded-sm transition-all duration-200 overflow-hidden ${getFontFamilyClass()} ${getDensityClass()} ${
              highlightKeywords ? 'ats-highlight-mode' : ''
            } print:shadow-none print:m-0 print:w-full print:min-h-0`}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};
