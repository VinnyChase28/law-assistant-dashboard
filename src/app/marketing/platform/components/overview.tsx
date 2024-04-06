"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Image({ id }: { id: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="relative flex h-screen snap-center items-center justify-center">
      <motion.h2
        className="absolute left-[calc(50%+130px)] m-0 text-4xl font-bold leading-tight tracking-tighter text-white"
        style={{ y }}
      >
        {`#00${id}`}
      </motion.h2>
    </section>
  );
}

export default function PlatformOverview() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {[1, 2, 3, 4, 5].map((image) => (
        <Image key={image} id={image} />
      ))}
      <motion.div
        className="fixed bottom-24 left-0 right-0 h-1 bg-white"
        style={{ scaleX }}
      />
    </>
  );
}
