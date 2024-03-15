"use client";
import { motion } from "framer-motion";

import { QuoteIcon } from "./assets/icons/QuoteIcon";

const testimonialsData = [
  {
    customerName: "Michael Thompson",
    customerTitle: "Project Manager at Turner Construction Group",
    content:
      "GenAI has revolutionized how we approach regulatory compliance. The AI's ability to rapidly parse through documents and highlight pertinent legal requirements is astonishing. What once took us hours, now takes mere minutes. It's as if we've employed a virtual assistant dedicated to compliance - one that works with remarkable precision and speed.",
  },
  {
    customerName: "Rebecca Johnson",
    customerTitle: "Senior Project Manager, Provo",
    content:
      "Navigating the maze of building bylaws used to be our biggest time sink. Since integrating GenAI into our process, we've seen a dramatic turnaround. The platform's intuitive search for bylaw information paired with its efficient document management system has not only streamlined our workflows but also ensured our projects proceed without any compliance-related delays.",
  },
  {
    customerName: "Brandon Vigne",
    customerTitle: "Director of Building & Bylaw Services, Town of Creston",
    content:
      "Drafting compliance reports has always been a meticulous and time-consuming task. With GenAI, what used to be a tedious process is now a streamlined and error-free operation. The AI's ability to generate detailed, accurate reports has freed up our team to allocate more time to strategic planning and service improvements. It's been a game-changer for our department.",
  },
];

export const Testimonials = () => (
  <section className="bg-customDarkBg2 relative mb-16 flex w-full justify-center pt-10 lg:mb-32">
    <div className="absolute -top-16" id="feedback" />
    <div className="flex w-full flex-col justify-center lg:w-[1150px]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="custom-block-big-title mb-16 px-8 text-center sm:px-24 md:px-48">
          Testimonials
        </div>

        <div className="flex flex-col items-center gap-8 px-6 lg:flex-row lg:gap-5 xl:gap-10 xl:px-0">
          {testimonialsData.map((testimonial, index) => (
            <div
              className="custom-border-gray-darker bg-customDarkBg3 flex w-11/12 flex-col rounded-xl px-6 py-4 sm:w-4/5 md:w-[560px] lg:w-1/3"
              key={`${testimonial.customerName}-${index}`}
            >
              <div className="mb-2 flex">
                <QuoteIcon />
              </div>
              <div className="custom-content-">"{testimonial.content}"</div>
              <div className="mb-2 mt-4 flex xl:mb-4 xl:mt-8">
                <div className="ml-4 flex flex-col">
                  <div className="custom-content- font-medium">
                    {testimonial.customerName}
                  </div>
                  <div className="custom-content-text-gray">
                    {testimonial.customerTitle}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
