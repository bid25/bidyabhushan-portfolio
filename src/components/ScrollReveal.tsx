"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export function ScrollReveal({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode; 
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="will-change-[opacity,transform]"
    >
      {children}
    </motion.div>
  );
}
