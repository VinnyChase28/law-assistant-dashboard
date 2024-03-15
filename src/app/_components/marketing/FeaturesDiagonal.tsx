"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import { InvitationModal } from "./InvitationModal";
import featuresdiagonal from "./assets/images/featuresdiagonal.jpg";
import Image from "next/image";
export const FeaturesDiagonal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="bg-customDarkBg1 flex w-full flex-col items-center justify-center lg:mb-16">
      <div className="custom-shape-divider-bottom-1665696614">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="custom-bg-dark2"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="custom-bg-dark1"
          ></path>
        </svg>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className=" bg-customDarkBg1 mx-auto  flex flex-col justify-center pb-8 pt-12 md:w-4/5 lg:flex-row lg:pb-20 lg:pt-24 xl:w-[1050px] 2xl:w-[1150px]">
          <div className="lg:mx-unset mx-auto flex w-3/4 flex-col lg:w-1/2">
            <span className="custom-block-subtitle">
              ACCELERATE YOUR LEGAL SUCCESS
            </span>
            <h2 className="custom-block-big-title mb-8 mt-10 text-4xl lg:text-5xl">
              Revolutionize Legal Research &amp; Document Drafting
            </h2>
            <p className="text-customGrayText mb-16 leading-loose">
              Our platform specializes in transforming legal research and
              document drafting. Instantly cross-reference your documents with
              regulatory standards, maintain records with document management,
              and draw information from your legal database — all while ensuring
              top-tier security for your sensitive information.
            </p>
            <div
              className="custom-button-colored mr-10 h-12 w-[210px] "
              onClick={() => setIsModalOpen(true)}
            >
              Get Started
            </div>
          </div>
          <div className="mx-auto flex w-4/5 justify-center pt-16 lg:w-1/2 lg:pl-16 lg:pt-0">
            <Image
              src={featuresdiagonal}
              alt="f1"
              className="custom-border-gray  rounded-xl"
            />
          </div>
        </div>
      </motion.div>
      <div className="custom-shape-divider-top-1665696661 w-full">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="custom-bg-dark2"
        >
          <path
            d="M1200 120L0 16.48 0 0 1200 0 1200 120z"
            className="custom-bg-dark1"
          ></path>
        </svg>
      </div>
      {/* {isModalOpen && (
        <InvitationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )} */}
    </section>
  );
};
