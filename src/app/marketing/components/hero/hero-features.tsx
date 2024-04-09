//images.ctfassets.net/hd6t5mkdkzjx/6dXSr7rF1vAwxwg1UjitTE/d12070b66b19e60ea510eaa6394bff6f/files.jpg imageSrc

"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import BackgroundVideo from "next-video/background-video";
import { Asset } from "next-video/dist/assets.js";

interface HeroFeaturesProps {
  title: string;
  headline: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  videoSrc: Asset;
}

const HeroFeatures: React.FC<HeroFeaturesProps> = ({
  title,
  headline,
  description,
  primaryButtonText,
  primaryButtonLink,
  videoSrc,
}) => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const videoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
  };
  return (
    <motion.div initial="hidden" animate="visible" variants={videoVariants}>
      <BackgroundVideo src={videoSrc}>
        <section className="relative">
          <div className="mx-auto grid max-w-screen-xl px-8 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
            <div className="mr-auto place-self-center lg:col-span-7">
              <motion.p
                className="text-white"
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {title}
              </motion.p>

              <motion.h1
                className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl xl:text-6xl"
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {headline}
              </motion.h1>

              <motion.p
                className="mb-6 max-w-2xl text-lg font-normal text-gray-300 lg:mb-8"
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {description}
              </motion.p>

              <motion.div
                className="space-x-3"
                initial="hidden"
                animate="visible"
                variants={textVariants}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button size="lg" variant="default">
                  <a
                    href={primaryButtonLink}
                    target="_blank"
                    className="text-white"
                  >
                    {primaryButtonText}
                  </a>
                  <Calendar className="ml-2 h-5 w-5 text-white" />
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </BackgroundVideo>
    </motion.div>
  );
};

export default HeroFeatures;
