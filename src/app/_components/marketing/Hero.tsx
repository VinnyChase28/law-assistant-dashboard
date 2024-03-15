"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { InvitationModal } from "./InvitationModal";
import dashboard from "./assets/images/dashboard.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  return (
    <section
      className="bg-customDarkBg1  hero-bg-gradient mb-[28vw] flex w-screen items-center justify-center pb-24 sm:pb-32 md:mb-[18vw] md:pb-44 lg:mb-[10vw] lg:pb-0 xl:mb-[13vw] 2xl:mb-60"
      id="home"
    >
      <div className="flex w-full flex-col items-center justify-center pt-16 text-center md:w-[800px] md:pt-16 lg:pt-20 xl:w-[900px]">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-customSecondary mb-6 mt-16  text-sm font-bold sm:mt-32  sm:text-base">
            Compliance Automation
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <div className="tracking-widesm:px-8 px-8 text-5xl font-bold  sm:text-6xl  md:px-20 lg:px-4 lg:text-7xl xl:text-7xl">
            <span className="md:inline">AI-Powered</span>
          </div>
          <div className="tracking-widesm:mt-2 mt-2 px-8 text-4xl font-bold sm:px-20  sm:text-6xl  md:px-24 lg:px-24 lg:text-7xl xl:text-7xl">
            compliance validation
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="text-customGrayText mt-10 px-12 text-sm sm:px-48 sm:text-base lg:text-base xl:text-lg ">
            Navigate regulatory landscapes and streamline document analysis
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="mb-24 mt-14 flex flex-col justify-center gap-2 sm:mb-40 sm:flex-row">
            <Button
              className="custom-button-colored mb-2 mr-0 h-12 w-64 sm:mb-0 sm:mr-4 sm:w-52 lg:mr-6"
              onClick={() => router.push("/auth/sign-in")}
            >
              Try it free
            </Button>
            <Button
              variant="outline"
              className="custom-button-colored mb-2 mr-0 h-12 w-64 sm:mb-0 sm:mr-4 sm:w-52 lg:mr-6"
              onClick={() =>
                window.open(
                  "https://calendly.com/vince-gauthier/30min",
                  "_blank",
                )
              }
            >
              Live demo
            </Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10, zIndex: 20 }}
          animate={{ opacity: 1, y: 0, zIndex: 20 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="relative flex w-screen justify-center ">
            <Image
              src={dashboard}
              alt="123"
              className="custom-border-gray hero-dashboard-border-gradient absolute z-10 mx-auto w-4/5 rounded-xl lg:top-6 xl:top-0 2xl:w-[1200px]"
            />
          </div>
        </motion.div>
        <div className="relative flex w-screen justify-center ">
          <div className="custom-shape-divider-bottom-1665343298 mt-4 hidden sm:mt-16 md:mt-52 lg:block">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className=" bg-customDarkBg2"
            >
              <path
                d="M1200 0L0 0 598.97 114.72 1200 0z"
                className="shape-fill custom-bg-dark1"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      {/* {isModalOpen && (
        <InvitationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )} */}
    </section>
  );
};
