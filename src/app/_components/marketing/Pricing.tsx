"use client";
import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "../ui/button";
import { CheckArrowIcon } from "./assets/icons/CheckArrowIcon";

const pricingDataStarter = [
  "Completions API: $0.06 per 1000 tokens",
  "Regulatory Document Q&A",
  "Compliance Report Drafting",
  "Analytics & Reporting",
  "1 User",
];

const pricingDataTeam = [
  "Completions API: $0.04 per 1000 tokens",
  "Regulatory Document Q&A",
  "Compliance Report Drafting",
  "Analytics & Reporting",
  "10 Users",
];

const pricingDataEnterprise = [
  "Regulatory Document Q&A",
  "Compliance Report Drafting",
  "Analytics & Reporting",
  "Dedicated Support",
  "Unlimited Users",
];

export const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <section className="bg-customDarkBg2 relative flex w-screen justify-center">
      <div className="absolute -top-16" id="pricing" />
      <div className="bg-customDarkBg2 pb-20 pt-12  md:w-4/5 lg:w-[1050px]  2xl:w-[1150px] ">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <span className="custom-block-subtitle">Get started today</span>
              <h2 className="font-heading mb-6 mt-6 text-4xl font-bold  lg:text-5xl">
                Plans
              </h2>
              <p className="text-customGrayText mb-6">
                Choose the tier that complements your unique legal needs and
                elevate your practice with AI-enhanced legal solutions.
              </p>
              <label className="bg-customDarkBg3 group relative mx-auto flex h-12 w-44 cursor-pointer items-center justify-between rounded-lg pl-1 pr-36 text-xl">
                <input
                  type="checkbox"
                  className="peer appearance-none"
                  checked={!isMonthly}
                  onChange={handleChange}
                />
                <span className="bg-customDarkBg3 after:bg-customPrimary flex h-8 w-[5.5rem] cursor-pointer items-center pr-2 duration-300  ease-in-out after:h-10  after:w-[30rem]   after:rounded-lg after:shadow-md after:duration-300 peer-checked:after:translate-x-[5.5rem]"></span>
                <div className="absolute flex text-sm font-bold ">
                  <div
                    className={
                      isMonthly ? "ml-3 mr-9" : "ml-3 mr-9 text-gray-400"
                    }
                  >
                    Monthly
                  </div>
                  <div className={isMonthly ? "text-gray-400" : ""}>Yearly</div>
                </div>
              </label>
            </div>
            <div className="-mx-4 mt-20 flex flex-col flex-wrap items-center lg:flex-row">
              <div className="mb-8 w-[350px] px-4 sm:w-[380px] lg:mb-0 lg:w-1/3">
                <div className="bg-customDarkBg3 rounded-3xl p-8">
                  <h4 className="font-heading mb-2 text-left text-xl font-bold ">
                    Solo
                  </h4>
                  <div className="flex items-end justify-start">
                    <div className="mr-2 mt-4 text-left text-4xl font-bold  sm:text-5xl">
                      {isMonthly ? "$19" : "$205"}
                    </div>
                    <div className="text-gray-500">
                      {isMonthly ? "/ month" : "/ year"}
                    </div>
                  </div>

                  <p className="mb-6 mt-4 text-left leading-loose text-gray-500 2xl:mb-10">
                    The perfect way to get started and get used to our tools.
                  </p>
                  <ul className="mb-2  2xl:mb-6">
                    {pricingDataStarter.map((text, index) => (
                      <li className="mb-4 flex" key={`${text}-${index}`}>
                        <CheckArrowIcon />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
              <div className="mb-8 w-[350px] px-4 sm:w-[380px] lg:mb-0 lg:w-1/3">
                <div className="bg-customDarkBg3 rounded-3xl px-8 py-8">
                  <h4 className="font-heading mb-2 text-left text-2xl font-bold  2xl:mb-4">
                    Team
                  </h4>
                  <div className="flex items-end justify-start">
                    <div className="mr-2 mt-4 text-left text-4xl font-bold  sm:text-5xl">
                      {isMonthly ? "$99" : "$1069"}
                    </div>
                    <div className="text-gray-500">
                      {isMonthly ? "/ month" : "/ year"}
                    </div>
                  </div>
                  <p className="mb-8 mt-8 text-left leading-loose text-gray-500 2xl:mb-12">
                    Unlock more features and collaborate with teammates.
                  </p>
                  <ul className="mb-14 ">
                    {pricingDataTeam.map((text, index) => (
                      <li className="mb-4 flex" key={`${text}-${index}`}>
                        <CheckArrowIcon />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
              <div className="mb-8 w-[350px] px-4 sm:w-[380px] lg:mb-0 lg:w-1/3">
                <div className="bg-customDarkBg3 rounded-3xl p-8">
                  <h4 className="font-heading mb-2 text-left text-xl font-bold ">
                    Enterprise
                  </h4>
                  <div className="flex items-end justify-start">
                    <div className="mr-2 mt-4 text-left text-4xl font-bold  sm:text-3xl">
                      Custom Pricing
                    </div>
                  </div>
                  <p className="mb-6 mt-4 text-left leading-loose text-gray-500 2xl:mb-10">
                    Enterprise grade features and support for your business.
                  </p>
                  <ul className="mb-2  2xl:mb-6">
                    {pricingDataEnterprise.map((text, index) => (
                      <li className="mb-4 flex" key={`${text}-${index}`}>
                        <CheckArrowIcon />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* {isModalOpen && (
        <InvitationModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      )} */}
    </section>
  );
};
