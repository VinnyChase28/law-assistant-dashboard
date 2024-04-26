"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import BackgroundVideo from "next-video/background-video";
import { type Asset } from "next-video/dist/assets.js";

import { Button } from "@components/ui/button";


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
  const videoVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={videoVariants}>
      <BackgroundVideo src={videoSrc}>
        <section className="relative">
          <div className="mx-auto grid max-w-screen-xl px-4 py-4 sm:px-8 sm:py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
            <div className="mr-auto place-self-center lg:col-span-7">
              <p className="text-base text-white sm:text-lg">{title}</p>

              <h1 className="mb-4 max-w-xl text-3xl font-extrabold leading-none tracking-tight text-white sm:text-4xl md:text-5xl">
                {headline}
              </h1>

              <p className="mb-6 max-w-xl text-sm font-normal text-gray-300 sm:text-lg lg:mb-8">
                {description}
              </p>

              <motion.div
                className="space-x-3"
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Button variant="default">
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