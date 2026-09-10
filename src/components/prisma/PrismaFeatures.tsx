import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
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
    '100% crisp vector PDF export with zero artifacting'
  ];

  const card4Items = [
    'Google XYZ formula metric & impact booster',
    'Action-verb punch & conciseness optimizer',
    'Executive tone refinement for top-tier roles'
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
          {/* Card 1 - Video Card */}
          <FeatureCardWrapper index={0} className="relative h-[420px] lg:h-full group">
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 z-10">
              <h3 className="text-lg sm:text-xl font-medium tracking-tight text-[#E1E0CC]">
                Your career canvas.
              </h3>
            </div>
          </FeatureCardWrapper>

          {/* Card 2 - "ATS Keyword Matcher." (01) */}
          <FeatureCardWrapper index={1} className="bg-[#212121] p-6 sm:p-7 flex flex-col justify-between h-[420px] lg:h-full border border-white/[0.04] shadow-xl">
            <div className="space-y-5">
              {/* Top: Image Icon & Number */}
              <div className="flex items-center justify-between">
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
                  alt="ATS Scanner Icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                />
                <span className="text-gray-500 font-mono text-xs tracking-wider">01</span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] tracking-tight">
                ATS Keyword Matcher.
              </h3>

              {/* Checklist Items */}
              <ul className="space-y-2.5 pt-1">
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
          <FeatureCardWrapper index={2} className="bg-[#212121] p-6 sm:p-7 flex flex-col justify-between h-[420px] lg:h-full border border-white/[0.04] shadow-xl">
            <div className="space-y-5">
              {/* Top: Image Icon & Number */}
              <div className="flex items-center justify-between">
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
                  alt="Live Studio Icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                />
                <span className="text-gray-500 font-mono text-xs tracking-wider">02</span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] tracking-tight">
                Live Vector Studio.
              </h3>

              {/* Checklist Items */}
              <ul className="space-y-2.5 pt-1">
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
          <FeatureCardWrapper index={3} className="bg-[#212121] p-6 sm:p-7 flex flex-col justify-between h-[420px] lg:h-full border border-white/[0.04] shadow-xl">
            <div className="space-y-5">
              {/* Top: Image Icon & Number */}
              <div className="flex items-center justify-between">
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
                  alt="AI Bullet Polish Icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover"
                />
                <span className="text-gray-500 font-mono text-xs tracking-wider">03</span>
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] tracking-tight">
                AI Bullet Polish.
              </h3>

              {/* Checklist Items */}
              <ul className="space-y-2.5 pt-1">
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
