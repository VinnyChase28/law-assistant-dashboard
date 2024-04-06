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

interface Feature {
  id: number;
  title: string;
  description: string;
}

function FeatureSection({ feature }: { feature: Feature }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="relative flex h-screen snap-center items-center justify-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <motion.h2
            className="text-base font-semibold uppercase tracking-wide"
            style={{ y }}
          >
            {`Feature ${feature.id}`}
          </motion.h2>
          <motion.p
            className="tracking-tigh mt-2 text-3xl font-extrabold leading-8 sm:text-4xl"
            style={{ y }}
          >
            {feature.title}
          </motion.p>
          <motion.p className="mt-4 max-w-2xl text-xl lg:mx-auto" style={{ y }}>
            {feature.description}
          </motion.p>
        </div>
      </div>
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

  const features: Feature[] = [
    {
      id: 1,
      title: "Out-of-the box and custom integrations",
      description:
        "Whether it's one of the industry-leading CCaaS platforms or a homegrown CRM, we seamlessly integrate to quickly deploy in weeks instead of months or years.",
    },
    {
      id: 2,
      title: "Out-of-the box and custom integrations",
      description:
        "Whether it's one of the industry-leading CCaaS platforms or a homegrown CRM, we seamlessly integrate to quickly deploy in weeks instead of months or years.",
    },
    {
      id: 3,
      title: "Out-of-the box and custom integrations",
      description:
        "Whether it's one of the industry-leading CCaaS platforms or a homegrown CRM, we seamlessly integrate to quickly deploy in weeks instead of months or years.",
    },
    // Add more features here
  ];

  return (
    <>
      {features.map((feature) => (
        <FeatureSection key={feature.id} feature={feature} />
      ))}
      <motion.div
        className="fixed bottom-24 left-0 right-0 h-1 bg-white"
        style={{ scaleX }}
      />
    </>
  );
}
