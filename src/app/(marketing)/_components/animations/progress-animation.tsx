// BlogAnimations.tsx
"use client";

import { motion, useScroll } from "framer-motion";

export default function ProgressAnimations() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="progress-bar fixed left-0 right-0 top-0 z-50 h-1 bg-indigo-500"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
