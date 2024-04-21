"use client";
import { useRef } from "react";

import {
  useScroll,
  useTransform,
  useMotionValue,
  useInView,
  type MotionValue,
} from "framer-motion";

// Import AnimatedText
import { Separator } from "src/app/_components/ui/separator";

import AnimatedText from "../animations/text-animation";

interface FeatureShowcaseProps {
  title: string;
  description: string;
}

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  title,
  description,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);

  // Handling scroll and applying transforms
  const { scrollYProgress } = useScroll();
  const yTransform = useParallax(scrollYProgress, 300);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  yTransform.onChange((v) => y.set(v));
  opacityTransform.onChange((v) => opacity.set(v));

  const inView = useInView(ref);

  return (
    <section
      ref={ref}
      className="perspective-[500px] relative flex h-screen snap-center items-center justify-center"
    >
      <div className="relative z-10 mx-5 h-[400px] max-h-[90vh] w-[300px] overflow-hidden">
        <h2 className="text-4xl font-bold">{title}</h2>
        {/* Conditionally render AnimatedText if inView */}
        {inView ? (
          <div>
            <AnimatedText text={description} baseDelay={0} />
            <Separator />
          </div>
        ) : (
          <p className="mt-4">{description}</p>
        )}
      </div>
    </section>
  );
};

export default FeatureShowcase;
