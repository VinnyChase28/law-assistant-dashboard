"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

interface FeatureShowcaseProps {
  title: string;
  description: string;
  index: number;
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  title,
  description,
  index,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section className="perspective-[500px] relative flex h-screen snap-center items-center justify-center">
      <div
        ref={ref}
        className="relative z-10 mx-5 h-[400px] max-h-[90vh] w-[300px] overflow-hidden"
      >
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="mt-4">{description}</p>
      </div>
      <motion.h2
        className="absolute left-[calc(50%+130px)] m-0 text-7xl font-bold leading-tight tracking-tighter text-gray-300"
        style={{ y, opacity, zIndex: -1 }}
      >{`#00${index + 1}`}</motion.h2>
    </section>
  );
};

export default FeatureShowcase;