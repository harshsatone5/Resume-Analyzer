import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  delay?: number;
}

export const WordsPullUp: React.FC<WordsPullUpProps> = ({
  text,
  className = '',
  showAsterisk = false,
  delay = 0
}) => {
  const ref = useRef<HTMLHeadingElement | HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const words = text.split(' ');

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, index) => {
        const isLastWord = index === words.length - 1;
        return (
          <span key={index} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
            <motion.span
              className="inline-block relative"
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: delay + index * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              {word}
              {showAsterisk && isLastWord && (
                <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em] pointer-events-none select-none font-normal leading-none">
                  *
                </span>
              )}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
};
