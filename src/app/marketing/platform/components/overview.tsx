// Photos from https://citizenofnowhe.re/lines-of-the-city

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
    <section className="perspective-[500px] relative flex h-screen snap-center items-center justify-center">
      <div
        ref={ref}
        className="relative mx-5 h-[400px] max-h-[90vh] w-[300px] overflow-hidden bg-white"
      >
        <img
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
          src={`/${id}.jpg`}
          alt="A London skyscraper"
        />
      </div>
      <motion.h2
        className="absolute left-[calc(50%+130px)] m-0 text-7xl font-bold leading-tight tracking-tighter text-[var(--accent)]"
        style={{ y }}
      >{`#00${id}`}</motion.h2>
    </section>
  );
}

export default function App() {
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
        className="fixed bottom-24 left-0 right-0 h-[5px] bg-[var(--accent)]"
        style={{ scaleX }}
      />
    </>
  );
}
