import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface StyleSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: StyleSegment[];
  className?: string;
  delay?: number;
}

export const WordsPullUpMultiStyle: React.FC<WordsPullUpMultiStyleProps> = ({
  segments,
  className = '',
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  // Flatten all words across all segments with their respective classNames
  const allWords: { word: string; className?: string }[] = [];
  segments.forEach((segment) => {
    const words = segment.text.trim().split(/\s+/);
    words.forEach((w) => {
      if (w.length > 0) {
        allWords.push({ word: w, className: segment.className });
      }
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {allWords.map((item, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0 my-[0.05em]">
          <motion.span
            className={`inline-block ${item.className || ''}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{
              duration: 0.75,
              delay: delay + index * 0.08,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            {item.word}
          </motion.span>
        </span>
      ))}
    </div>
  );
};
