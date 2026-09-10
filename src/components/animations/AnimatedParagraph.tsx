import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedLetterProps {
  char: string;
  index: number;
  totalChars: number;
  progress: MotionValue<number>;
}

export const AnimatedLetter: React.FC<AnimatedLetterProps> = ({
  char,
  index,
  totalChars,
  progress
}) => {
  const charProgress = index / totalChars;
  const start = Math.max(0, charProgress - 0.1);
  const end = Math.min(1, charProgress + 0.05);

  // If start and end are equal, provide a small epsilon to avoid duplicate range points
  const safeEnd = end <= start ? start + 0.01 : end;

  const opacity = useTransform(progress, [start, safeEnd], [0.2, 1]);

  return (
    <motion.span style={{ opacity }} className="inline">
      {char}
    </motion.span>
  );
};

interface AnimatedParagraphProps {
  text: string;
  className?: string;
}

export const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({
  text,
  className = ''
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const chars = text.split('');
  const totalChars = chars.length;

  return (
    <p ref={containerRef} className={className}>
      {chars.map((char, i) => (
        <AnimatedLetter
          key={i}
          char={char}
          index={i}
          totalChars={totalChars}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
};
