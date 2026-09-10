import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { WordsPullUpMultiStyle, type StyleSegment } from '../animations/WordsPullUpMultiStyle';

interface FeatureCardProps {
  index: number;
  children: React.ReactNode;
  className?: string;
}

const FeatureCardWrapper: React.FC<FeatureCardProps> = ({ index, children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={`rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};

interface PrismaFeaturesProps {
  onOpenStudio?: () => void;
  onOpenAnalyzer?: () => void;
  onOpenTemplates?: () => void;
}

export const PrismaFeatures: React.FC<PrismaFeaturesProps> = ({
  onOpenStudio,
  onOpenAnalyzer,
  onOpenTemplates
}) => {
  const headerSegments1: StyleSegment[] = [
    {
      text: 'Studio-grade workflows for high-impact candidates.',
      className: 'text-primary font-normal'
    }
  ];

  const headerSegments2: StyleSegment[] = [
    {
      text: 'Built for pure clarity. Powered by intelligence.',
      className: 'text-gray-500 font-normal'
    }
  ];

  const card2Items = [
    'Parse-proof semantic keyword & density analysis',
    'Real-time job description requirement matching',
    'Instant recruiter screening compatibility score',
    'Missing high-priority skill & competency alerts'
  ];

  const card3Items = [
    'Pixel-perfect real-time A4 live document canvas',
    'Dynamic typography, density & color harmony scaling',
    '100% crisp vector PDF export with zero artifacting',
    'Instant sample population & JSON backup'
  ];

  const card4Items = [
    'Google XYZ formula metric & impact booster',
    'Action-verb punch & conciseness optimizer',
    'Executive tone refinement for top-tier roles',
    'Real-time before/after suggestion comparison'
  ];

  return (
    <section id="features" className="min-h-screen bg-black relative py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8 w-full flex flex-col justify-center overflow-hidden">
      {/* Subtle .bg-noise overlay at opacity-[0.15] */}
      <div className="bg-noise absolute inset-0 w-full h-full opacity-[0.15] pointer-events-none z-0" />

      <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col space-y-12 sm:space-y-16">
        {/* Header text using WordsPullUpMultiStyle */}
        <div className="text-center space-y-2 sm:space-y-3 max-w-4xl mx-auto">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            <WordsPullUpMultiStyle segments={headerSegments1} />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            <WordsPullUpMultiStyle segments={headerSegments2} delay={0.3} />
          </div>
        </div>

        {/* 4-Column Card Grid (lg:h-[480px], gap-3 sm:gap-2 md:gap-1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]">
          {/* Card 1 - Resume Canvas Visual Card */}
          <FeatureCardWrapper index={0} className="relative h-[420px] lg:h-full group overflow-hidden border border-white/[0.06] shadow-xl">
            <img
              src="/resume_canvas_card.jpg"
              alt="Executive Resume Canvas with ATS verification scan"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Animated Laser Scanning Beam */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#DEDBC8]/60 to-transparent shadow-[0_0_15px_#DEDBC8] animate-scan pointer-events-none" />
            
            {/* Noise overlay */}
            <div className="noise-overlay absolute inset-0 w-full h-full opacity-40 mix-blend-overlay pointer-events-none" />

            {/* Dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />

            <div className="absolute top-5 left-5 z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-[#DEDBC8] border border-white/10">
                <ShieldCheck className="w-3 h-3 text-[#DEDBC8]" />
                <span>ATS Verified Engine</span>
              </span>
            </div>

            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
              <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[#E1E0CC]">
                Your career canvas.
              </h3>
              <p className="text-xs text-gray-400">
                Precision-engineered for top-tier hiring pipelines.
              </p>
            </div>
          </FeatureCardWrapper>

          {/* Card 2 - "ATS Keyword Matcher." (01) */}
          <FeatureCardWrapper index={1} className="bg-[#212121] p-6 sm:p-7 flex flex-col justify-between h-[420px] lg:h-full border border-white/[0.05] shadow-xl">
            <div className="space-y-4">
              {/* Top: Custom ATS Scanner Icon & Number */}
              <div className="flex items-center justify-between">
                <img
                  src="/ats_scanner_icon.jpg"
                  alt="ATS Scanner Radar Icon"
                  className="w-11 h-11 rounded-xl object-cover border border-white/10 shadow-md"
                />
                <span className="text-gray-500 font-mono text-xs tracking-wider">01</span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] tracking-tight">
                ATS Keyword Matcher.
              </h3>

              {/* Checklist Items */}
              <ul className="space-y-2 pt-1">
                {card2Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400 leading-snug">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn more link */}
            <div className="pt-4 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={onOpenAnalyzer}
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#E1E0CC] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <span>Run ATS scan</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </FeatureCardWrapper>

          {/* Card 3 - "Live Vector Studio." (02) */}
          <FeatureCardWrapper index={2} className="bg-[#212121] p-6 sm:p-7 flex flex-col justify-between h-[420px] lg:h-full border border-white/[0.05] shadow-xl">
            <div className="space-y-4">
              {/* Top: Custom Vector Studio Icon & Number */}
              <div className="flex items-center justify-between">
                <img
                  src="/vector_studio_icon.jpg"
                  alt="Live Vector Studio Icon"
                  className="w-11 h-11 rounded-xl object-cover border border-white/10 shadow-md"
                />
                <span className="text-gray-500 font-mono text-xs tracking-wider">02</span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] tracking-tight">
                Live Vector Studio.
              </h3>

              {/* Checklist Items */}
              <ul className="space-y-2 pt-1">
                {card3Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400 leading-snug">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn more link */}
            <div className="pt-4 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={onOpenStudio}
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#E1E0CC] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <span>Launch Studio</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </FeatureCardWrapper>

          {/* Card 4 - "AI Bullet Polish." (03) */}
          <FeatureCardWrapper index={3} className="bg-[#212121] p-6 sm:p-7 flex flex-col justify-between h-[420px] lg:h-full border border-white/[0.05] shadow-xl">
            <div className="space-y-4">
              {/* Top: Custom AI Bullet Polish Stylus Icon & Number */}
              <div className="flex items-center justify-between">
                <img
                  src="/ai_bullet_icon.jpg"
                  alt="AI Bullet Polish Stylus Icon"
                  className="w-11 h-11 rounded-xl object-cover border border-white/10 shadow-md"
                />
                <span className="text-gray-500 font-mono text-xs tracking-wider">03</span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] tracking-tight">
                AI Bullet Polish.
              </h3>

              {/* Checklist Items */}
              <ul className="space-y-2 pt-1">
                {card4Items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-400 leading-snug">
                    <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn more link */}
            <div className="pt-4 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={onOpenTemplates}
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#E1E0CC] hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <span>Browse Templates</span>
                <ArrowRight className="w-3.5 h-3.5 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </FeatureCardWrapper>
        </div>
      </div>
    </section>
  );
};
