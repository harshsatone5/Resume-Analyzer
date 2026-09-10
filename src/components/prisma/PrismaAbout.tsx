import React from 'react';
import { WordsPullUpMultiStyle, type StyleSegment } from '../animations/WordsPullUpMultiStyle';
import { AnimatedParagraph } from '../animations/AnimatedParagraph';

export const PrismaAbout: React.FC = () => {
  const headingSegments: StyleSegment[] = [
    {
      text: 'Built for candidates who refuse to settle,',
      className: 'font-normal text-[#E1E0CC]'
    },
    {
      text: 'and recruiters who demand excellence.',
      className: 'italic font-serif text-[#E1E0CC]'
    },
    {
      text: 'Real-time ATS parsing, precision keyword targeting, and editorial typography standards.',
      className: 'font-normal text-[#E1E0CC]'
    }
  ];

  const bioText =
    'Over 75% of resumes are eliminated by Applicant Tracking Systems before a hiring manager ever sees them. We built Prisma to reverse that dynamic—combining parse-proof formatting with high-impact typography to ensure your achievements command attention at top tech, finance, and creative firms.';

  return (
    <section id="about" className="bg-black py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8 w-full flex justify-center">
      {/* Inner Card */}
      <div className="w-full max-w-6xl bg-[#101010] rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-14 md:p-20 lg:p-24 text-center border border-white/[0.04] shadow-2xl relative overflow-hidden">
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/[0.02] rounded-full blur-3xl pointer-events-none" />

        {/* Top: small label "ATS Intelligence" */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <span className="text-primary text-[10px] sm:text-xs font-semibold tracking-widest uppercase inline-block px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05]">
            ATS Intelligence
          </span>
        </div>

        {/* Main Heading using WordsPullUpMultiStyle */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-4xl mx-auto leading-[0.95] sm:leading-[0.9] tracking-[-0.03em] mb-8 sm:mb-12">
          <WordsPullUpMultiStyle segments={headingSegments} />
        </div>

        {/* Body paragraph below with scroll-linked character opacity animation */}
        <div className="max-w-2xl mx-auto pt-4 sm:pt-6">
          <AnimatedParagraph
            text={bioText}
            className="text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed tracking-wide font-light"
          />
        </div>
      </div>
    </section>
  );
};
