"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";

import HeroFeatures from "../../components/hero/hero-features";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Section({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="perspective-[500px] relative flex h-screen snap-center items-center justify-center">
      <div
        ref={ref}
        className="relative mx-5 h-[400px] max-h-[90vh] w-[300px] overflow-hidden"
      >
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="mt-4">{description}</p>
      </div>
      <motion.h2
        className="absolute left-[calc(50%+130px)] m-0 text-7xl font-bold leading-tight tracking-tighter text-[var(--accent)]"
        style={{ y }}
      >{`#00${id}`}</motion.h2>
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
      <HeroFeatures
        title="One conversation engine, infinite scale"
        description="Deploy, power, and optimize Contact Center Automation from a single platform.
"
        primaryButtonText="REQUEST A DEMO"
        primaryButtonLink="/demo"
        secondaryButtonText="Learn more"
        secondaryButtonLink="/features"
        imageSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
        imageAlt="Hero Features"
      />
      <Section
        id={1}
        title="Platform overview"
        description="One conversation engine, infinite scale. Deploy, power, and optimize Contact Center Automation from a single platform."
      />
      <Section
        id={2}
        title="Contact Center Automation"
        description="Everything you need to automate your contact center in one platform."
      />
      <Section
        id={3}
        title="Out-of-the box and custom integrations"
        description="Whether it's one of the industry-leading CCaaS platforms or a homegrown CRM, we seamlessly integrate to quickly deploy in weeks instead of months or years."
      />
      <motion.div
        className="fixed bottom-24 left-0 right-0 h-[5px] bg-[var(--accent)]"
        style={{ scaleX }}
      />
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 transform">
        <button className="rounded-full bg-[var(--accent)] px-6 py-3 font-bold text-white">
          REQUEST A DEMO
        </button>
      </div>
    </>
  );
}
