"use client";
import { motion } from "framer-motion";

import feature1 from "./assets/images/feature1.jpg";
import feature2 from "./assets/images/feature2.jpg";
import feature3 from "./assets/images/feature3.jpg";
import feature4 from "./assets/images/feature4.jpg";
import { CheckArrowIcon } from "./assets/icons/CheckArrowIcon";
import Image from "next/image";

export const Features1 = () => {
  return (
    <section
      className="bg-customDarkBg2 xl:m mb-8 mt-20 w-full pt-[2rem] sm:mb-16  sm:mt-16 md:pt-[12vw]  lg:pt-0 xl:mt-0"
      id="features"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="mx-auto flex w-11/12 flex-wrap items-center md:pl-4 xl:w-[1300px] xl:pl-16 xl:pr-16 2xl:w-[1450px]">
          <div className="mb-12 w-full lg:mb-0 lg:w-1/2">
            <div className="lg:w-unset mx-auto w-11/12 sm:w-4/5 md:w-3/4 lg:mx-auto">
              <span className="custom-block-subtitle">What sets us apart</span>
              <h2 className="custom-block-big-title mb-8 mt-6 text-4xl lg:text-5xl">
                AI-Powered Compliance Validation
              </h2>
              <p className="text-customGrayText mb-10 leading-loose">
                Cross-reference documents against any regulation with our
                AI-driven analysis.
              </p>
              <ul className="mb-6 text-white">
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Regulatory document Q&A</span>
                </li>
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Document storage and editing</span>
                </li>
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Compliance report drafting</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto flex w-3/4 flex-wrap justify-center sm:pr-8 lg:-mx-4 lg:w-1/2 lg:pl-4 lg:pt-10 xl:px-8">
            <div className="mb-8 w-full px-2 sm:w-1/2 lg:mb-0 lg:px-0">
              <div className="mb-4 rounded py-3 pl-3 pr-2">
                <Image
                  src={feature1}
                  alt="f1"
                  className="custom-border-gray  sm:mx-unset mx-auto rounded-xl"
                />
              </div>
              <div className="rounded py-3 pl-3 pr-2 ">
                <Image
                  src={feature2}
                  alt="f2"
                  className="custom-border-gray  sm:mx-unset mx-auto rounded-xl"
                />
              </div>
            </div>
            <div className="hidden w-1/2  px-2 pt-12 sm:inline-block lg:mt-20 lg:pt-0">
              <div className="mb-4 rounded-lg py-3 pl-3 pr-2 ">
                <Image
                  src={feature3}
                  alt="f3"
                  className="custom-border-gray  rounded-xl"
                />
              </div>
              <div className="rounded-lg py-3 pl-3 pr-2 ">
                <Image
                  src={feature4}
                  alt="f4"
                  className="custom-border-gray  rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
