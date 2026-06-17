"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// Global locked premium constants
export const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

interface MotionViewProps {
  children: ReactNode;
  delayChildren?: number;
  stagger?: number;
  className?: string;
}

export function MotionView({ 
  children, 
  delayChildren = 0, 
  stagger = 0.12, 
  className = "" 
}: MotionViewProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren,
            staggerChildren: stagger,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function MotionItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={FADE_UP_VARIANTS} className={className}>
      {children}
    </motion.div>
  );
}