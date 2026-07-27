"use client";

import { useMemo, useRef, ReactNode, isValidElement, cloneElement, ReactElement } from 'react';
import { motion, useInView } from 'motion/react';

interface ScrollFloatProps {
  children: ReactNode;
  containerClassName?: string;
  textClassName?: string;
  animationDuration?: number;
  ease?: any;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
}

const ScrollFloat = ({
  children,
  containerClassName = '',
  textClassName = '',
  animationDuration = 0.8,
  ease = [0.25, 1, 0.5, 1], // Smooth custom ease curve
  stagger = 0.015
}: ScrollFloatProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // useInView relies on native IntersectionObserver, which perfectly ignores 
  // Lenis scroll hijacking and just triggers when it actually hits the viewport.
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -10% 0px" });

  const parsedContent = useMemo(() => {
    let wordCount = 0; // Stable counter for staggering

    const itemVariants = {
      hidden: { opacity: 0, y: 15, scaleY: 2, scaleX: 0.8 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scaleY: 1,
        scaleX: 1,
        transition: {
          duration: animationDuration,
          ease: ease,
          delay: i * stagger
        }
      })
    };

    const parseText = (node: ReactNode): ReactNode => {
      if (typeof node === 'string') {
        return node.split(/(\s+)/).map((word) => {
          const key = `word-${wordCount}`;
          if (word.trim() === '') {
            wordCount++;
            return <span key={key} style={{ whiteSpace: 'pre' }}>{word}</span>;
          }
          
          const index = wordCount++;
          return (
            <motion.span
              key={key}
              custom={index}
              variants={itemVariants}
              style={{ display: 'inline-block', transformOrigin: '50% 0%' }}
            >
              {word}
            </motion.span>
          );
        });
      }
      if (Array.isArray(node)) {
        return node.map((child, i) => <span key={`fragment-${i}`}>{parseText(child)}</span>);
      }
      if (isValidElement(node)) {
        return cloneElement(node as ReactElement, {}, parseText((node.props as any).children));
      }
      return node;
    };

    return parseText(children);
  }, [children, animationDuration, ease, stagger]);

  return (
    <motion.div 
      ref={containerRef} 
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`overflow-hidden ${containerClassName}`}
    >
      <span className={`inline-block ${textClassName}`}>{parsedContent}</span>
    </motion.div>
  );
};

export default ScrollFloat;
