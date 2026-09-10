import { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Briefcase, 
  Sparkles, 
  Check, 
  X, 
  AlertCircle, 
  ChevronDown, 
  ChevronUp, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { JOB_DESCRIPTIONS, type JobDescriptionPreset, DEMO_RESUMES, type DemoResume } from '../data/demoResumes';
import { extractTextFromPDF } from '../services/pdfParser';

interface HeroUploadProps {
  resumeText: string;
  setResumeText: (text: string) => void;
  jobDescription: string;
  setJobDescription: (text: string) => void;
  selectedPresetId: string;
  setSelectedPresetId: (id: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  onSelectDemo: (demo: DemoResume) => void;
  selectedDemoId: string | null;
}

export const HeroUpload: React.FC<HeroUploadProps> = ({
  resumeText,
  setResumeText,
  jobDescription,
  setJobDescription,
  selectedPresetId,
  setSelectedPresetId,
  onAnalyze,
  isAnalyzing,
  onSelectDemo,
  selectedDemoId
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [fileName, setFileName] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isParsingPdf, setIsParsingPdf] = useState(false);
  const [showCustomJd, setShowCustomJd] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = async (file: File) => {
    setUploadError(null);
    setFileName(file.name);

    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setIsParsingPdf(true);
      try {
        const result = await extractTextFromPDF(file);
        if (result.text.length < 50) {
          setUploadError('Could not extract readable text. The PDF may be a scanned image without selectable text.');
        } else {
          setResumeText(result.text);
          setPageCount(result.pageCount);
        }
      } catch (err: any) {
        console.error('PDF parsing error', err);
        setUploadError('Failed to parse PDF. You can paste the text directly in the Paste Text tab.');
      } finally {
        setIsParsingPdf(false);
      }
    } else if (file.type.includes('text') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setResumeText(text);
        setPageCount(1);
      };
      reader.readAsText(file);
    } else {
      setUploadError('Please upload a PDF (.pdf) or Plain Text (.txt) file.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleSelectRole = (preset: JobDescriptionPreset) => {
    setSelectedPresetId(preset.id);
    setJobDescription(preset.text);
  };

  const handleClearResume = () => {
    setResumeText('');
    setFileName(null);
    setPageCount(null);
    setUploadError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const characterCount = resumeText.length;
  const wordCount = resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0;

  return (
    <section className="max-w-[1400px] mx-auto px-5 pt-10 pb-16">

      {/* Hero Header — clean, centered, no glow */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3" style={{ color: 'var(--stitch-text)' }}>
          Analyze & optimize your resume
        </h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--stitch-text-secondary)' }}>
          Upload your resume and target job description. Get an instant ATS compatibility score, keyword gap analysis, and AI-powered rewrite suggestions.
        </p>

        {/* Demo pills */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs" style={{ color: 'var(--stitch-text-dim)' }}>Try a demo:</span>
          {DEMO_RESUMES.map((demo) => (
            <button
              key={demo.id}
              onClick={() => onSelectDemo(demo)}
              className={selectedDemoId === demo.id ? 's-pill s-pill-active' : 's-pill'}
            >
              <span>{demo.name}</span>
              <span style={{ color: 'var(--stitch-text-dim)', fontSize: 10 }}>({demo.role})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Two-column workspace layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left: Resume Input */}
        <div className="lg:col-span-7 s-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--stitch-surface-2)' }}>
                <FileText className="w-4 h-4" style={{ color: 'var(--stitch-accent)' }} />
              </div>
              <div>
                <h3 className="text-sm font-medium" style={{ color: 'var(--stitch-text)' }}>Your Resume</h3>
                <p className="text-xs" style={{ color: 'var(--stitch-text-dim)' }}>Upload PDF or paste text</p>
              </div>
            </div>

            {/* Tab toggle */}
            <div className="flex items-center p-0.5 rounded-lg text-xs" style={{ background: 'var(--stitch-bg)', border: '1px solid var(--stitch-border)' }}>
              <button
                onClick={() => setActiveTab('upload')}
                className="px-3 py-1 rounded-md transition-colors"
                style={activeTab === 'upload' ? { background: 'var(--stitch-surface-2)', color: 'var(--stitch-text)', fontWeight: 500 } : { color: 'var(--stitch-text-dim)' }}
              >
                Upload
              </button>
              <button
                onClick={() => setActiveTab('paste')}
                className="px-3 py-1 rounded-md transition-colors"
                style={activeTab === 'paste' ? { background: 'var(--stitch-surface-2)', color: 'var(--stitch-text)', fontWeight: 500 } : { color: 'var(--stitch-text-dim)' }}
              >
                Paste
              </button>
            </div>
          </div>

          {/* Upload zone */}
          {activeTab === 'upload' ? (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all"
              style={{
                borderColor: isDragging ? 'var(--stitch-accent)' : resumeText.length > 0 ? 'var(--stitch-green)' : 'var(--stitch-border)',
                background: isDragging ? 'rgba(138,180,248,0.05)' : 'var(--stitch-bg)',
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) handleFileProcess(e.target.files[0]);
                }}
              />

              {isParsingPdf ? (
                <div className="flex flex-col items-center justify-center py-4 space-y-3">
                  <div className="w-8 h-8 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--stitch-accent)', borderTopColor: 'transparent' }} />
                  <p className="text-sm font-medium" style={{ color: 'var(--stitch-accent)' }}>Extracting text from PDF…</p>
                </div>
              ) : resumeText.length > 0 ? (
                <div className="flex flex-col items-center py-2" onClick={(e) => e.stopPropagation()}>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ background: 'rgba(129,201,149,0.12)' }}>
                    <Check className="w-5 h-5" style={{ color: 'var(--stitch-green)' }} />
                  </div>
                  <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--stitch-text)' }}>
                    {fileName || (selectedDemoId ? `${selectedDemoId} Resume Loaded` : 'Resume Ready')}
                  </h4>
                  <p className="text-xs mb-3" style={{ color: 'var(--stitch-text-dim)' }}>
                    {wordCount} words · {characterCount} characters{pageCount ? ` · ${pageCount} page(s)` : ''}
                  </p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => fileInputRef.current?.click()} className="s-btn-ghost">
                      Change File
                    </button>
                    <button onClick={handleClearResume} className="s-btn-ghost" style={{ color: 'var(--stitch-red)' }}>
                      <X className="w-3.5 h-3.5" /> Clear
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3" style={{ background: 'var(--stitch-surface-2)' }}>
                    <UploadCloud className="w-5 h-5" style={{ color: 'var(--stitch-accent)' }} />
                  </div>
                  <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--stitch-text)' }}>
                    Drop your resume here or click to browse
                  </h4>
                  <p className="text-xs" style={{ color: 'var(--stitch-text-dim)' }}>
                    PDF or TXT · Max 10MB
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-2">
              <textarea
                value={resumeText}
                onChange={(e) => { setResumeText(e.target.value); setFileName(null); }}
                placeholder="Paste the raw text of your resume here…"
                rows={9}
                className="w-full rounded-xl p-3.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none resize-none font-mono"
                style={{ background: 'var(--stitch-bg)', border: '1px solid var(--stitch-border)' }}
              />
              <div className="flex items-center justify-between text-xs px-1" style={{ color: 'var(--stitch-text-dim)' }}>
                <span>{wordCount} words · {characterCount} chars</span>
                {resumeText && (
                  <button onClick={handleClearResume} style={{ color: 'var(--stitch-red)' }}>Clear</button>
                )}
              </div>
            </div>
          )}

          {uploadError && (
            <div className="mt-3 p-3 rounded-xl flex items-center gap-2 text-xs" style={{ background: 'rgba(242,139,130,0.08)', border: '1px solid rgba(242,139,130,0.2)', color: 'var(--stitch-red)' }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>

        {/* Right: Target Role & Job Description */}
        <div className="lg:col-span-5 s-card p-5 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--stitch-surface-2)' }}>
                <Briefcase className="w-4 h-4" style={{ color: 'var(--stitch-purple)' }} />
              </div>
              <div>
                <h3 className="text-sm font-medium" style={{ color: 'var(--stitch-text)' }}>Target Role</h3>
                <p className="text-xs" style={{ color: 'var(--stitch-text-dim)' }}>Select or paste job description</p>
              </div>
            </div>

            {/* Role pills */}
            <div className="space-y-2 mb-4">
              <label className="text-xs font-medium" style={{ color: 'var(--stitch-text-dim)' }}>Common roles:</label>
              <div className="flex flex-wrap gap-1.5">
                {JOB_DESCRIPTIONS.map((preset) => {
                  const isSelected = selectedPresetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectRole(preset)}
                      className={isSelected ? 's-pill s-pill-active' : 's-pill'}
                      style={{ fontSize: 11 }}
                    >
                      {preset.title.replace('Senior ', '')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom JD toggle */}
            <div className="s-card-flush overflow-hidden mb-4">
              <button
                onClick={() => setShowCustomJd(!showCustomJd)}
                className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-medium transition-colors"
                style={{ color: 'var(--stitch-text-secondary)' }}
              >
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" style={{ color: 'var(--stitch-purple)' }} />
                  <span>Custom job description</span>
                </span>
                {showCustomJd ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showCustomJd && (
                <div className="p-3" style={{ borderTop: '1px solid var(--stitch-border)' }}>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => { setJobDescription(e.target.value); setSelectedPresetId('custom'); }}
                    placeholder="Paste job description from LinkedIn, Indeed…"
                    rows={5}
                    className="w-full rounded-lg p-2.5 text-xs placeholder-slate-500 focus:outline-none resize-none font-mono"
                    style={{ background: 'var(--stitch-bg)', border: '1px solid var(--stitch-border)', color: 'var(--stitch-text)' }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Analyze button */}
          <div className="pt-2">
            <button
              onClick={onAnalyze}
              disabled={!resumeText.trim() || isAnalyzing}
              className="s-btn w-full text-sm"
              style={!resumeText.trim() || isAnalyzing ? { opacity: 0.35, cursor: 'not-allowed' } : {}}
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--stitch-bg)', borderTopColor: 'transparent' }} />
                  <span>Analyzing…</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Resume</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            {!resumeText.trim() && (
              <p className="text-center text-xs mt-2" style={{ color: 'var(--stitch-text-dim)' }}>
                Select a demo or upload your resume to begin
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
