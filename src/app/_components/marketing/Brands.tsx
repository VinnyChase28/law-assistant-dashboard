"use client";

import { motion } from "framer-motion";
import Image from "next/image";
export const Brands = () => (
  <section className="bg-customDarkBg1 mb-16 mt-16 w-full py-12 sm:py-24">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto px-4 md:w-4/5 lg:w-[1000px] xl:w-[1100px] 2xl:w-[1200px]">
        <div className="-mx-4 flex flex-col items-center justify-center text-center lg:flex-row lg:text-left">
          <div className="mb-12 w-full px-4 lg:mb-0 lg:w-1/2">
            <div className="flex flex-col">
              <h2 className="mb-2  text-4xl font-bold tracking-normal  sm:text-5xl 2xl:text-6xl">
                Trusted by top real estate firms
              </h2>
              <h2 className=" text-customSecondary  text-4xl font-bold tracking-normal sm:text-5xl 2xl:text-6xl">
                and municipalities
              </h2>
            </div>
          </div>
          <div className="mx-auto w-2/3 sm:w-[620px] lg:mx-0 lg:w-1/2 lg:pl-10">
            <div className="-m-4 flex flex-wrap">
              <div className="flex w-1/2 justify-center py-6 sm:w-1/3">
                <img src="src/public/CrestonValley.svg" alt="Creton Valley" />
              </div>
              <div className="flex w-1/2 justify-center py-6  sm:w-1/3">
                <img src="/FairField.svg" alt="FairField" />
              </div>
              <div className="flex w-1/2 justify-center py-6  sm:w-1/3">
                <img src="/ConcordPacific.svg" alt="ConcordPacific" />
              </div>
              <div className="flex w-1/2 justify-center py-6 sm:w-1/3">
                <img src="/CenterCourt.svg" alt="CenterCourt" />
              </div>

              <div className="flex w-1/2 justify-center py-6 sm:w-1/3">
                <img src="/MattamyHomes.svg" alt="MattamyHomes" />
              </div>
              <div className="flex w-1/2  justify-center py-6  sm:w-1/3">
                <img src="/Provo.svg" alt="Provo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);
