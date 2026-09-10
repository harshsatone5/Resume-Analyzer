import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WordsPullUp } from '../animations/WordsPullUp';

interface PrismaHeroProps {
  onJoinClick?: () => void;
  onNavigate?: (page: string) => void;
}

export const PrismaHero: React.FC<PrismaHeroProps> = ({ onJoinClick, onNavigate }) => {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navItems = [
    { label: 'Studio', page: 'builder', href: '#builder' },
    { label: 'ATS Scanner', page: 'analyzer', href: '#analyzer' },
    { label: 'Templates', page: 'templates', href: '#templates' },
    { label: 'How It Works', page: '', href: '#about' },
    { label: 'Features', page: '', href: '#features' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    e.preventDefault();
    if (item.page && onNavigate) {
      onNavigate(item.page);
    } else {
      const target = document.querySelector(item.href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="h-screen w-full p-4 md:p-6 bg-black relative flex flex-col box-border">
      {/* Inset Container */}
      <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-black flex flex-col justify-between">
        {/* Background Video */}
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Noise overlay on top */}
        <div className="noise-overlay absolute inset-0 w-full h-full opacity-[0.7] mix-blend-overlay pointer-events-none z-[1]" />

        {/* Gradient overlay */}
        <div className="bg-gradient-to-b from-black/40 via-transparent to-black/75 absolute inset-0 pointer-events-none z-[2]" />

        {/* Navbar: Absolutely positioned at top center */}
        <header className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <nav className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2.5 md:px-8 flex items-center gap-3 sm:gap-6 md:gap-10 lg:gap-12 shadow-2xl border-b border-x border-white/5">
            {navItems.map((item) => {
              const isHovered = hoveredNav === item.label;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  onMouseEnter={() => setHoveredNav(item.label)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className="text-[10px] sm:text-xs md:text-sm font-medium transition-colors duration-200 cursor-pointer whitespace-nowrap"
                  style={{
                    color: isHovered ? '#E1E0CC' : 'rgba(225, 224, 204, 0.8)'
                  }}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </header>

        {/* Hero Content (bottom-aligned) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 lg:p-12 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            {/* Left 8 columns: Giant Heading "Prisma" */}
            <div className="lg:col-span-8 flex items-baseline">
              <h1 className="text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[15vw] xl:text-[14vw] 2xl:text-[14.5vw] font-medium leading-[0.85] tracking-[-0.07em] select-none text-[#E1E0CC]">
                <WordsPullUp
                  text="Prisma"
                  showAsterisk={false}
                  className="text-[#E1E0CC]"
                />
              </h1>
            </div>

            {/* Right 4 columns: Description Paragraph + CTA Button */}
            <div className="lg:col-span-4 flex flex-col items-start space-y-5 sm:space-y-6 pb-2 lg:pb-4">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="text-primary/80 text-xs sm:text-sm md:text-base leading-[1.3] max-w-md font-light"
              >
                An intelligent career engine and ATS audit studio engineered for ambitious professionals to craft interview-winning resumes, outsmart screening algorithms, and land dream roles.
              </motion.p>

              {/* CTA Button "Build your resume" */}
              <motion.button
                type="button"
                onClick={onJoinClick}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="group inline-flex items-center gap-2 hover:gap-3 bg-primary text-black font-medium text-sm sm:text-base rounded-full pl-5 pr-1.5 py-1.5 transition-all duration-300 shadow-xl cursor-pointer select-none active:scale-95"
              >
                <span>Build your resume</span>
                <span className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                  <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#DEDBC8]" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
