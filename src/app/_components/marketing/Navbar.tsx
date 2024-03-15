import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { LawAssistantLogo } from "./assets/logos/LawAssistantLogo";
import { GithubIcon } from "./assets/icons/GithubIcon";

const navbarLinks = [
  { label: "Home", href: "#home", ariaLabel: "Home" },
  { label: "Features", href: "#features", ariaLabel: "Features" },
  { label: "Case Studies", href: "#case-studies", ariaLabel: "Case Studies" },
  { label: "Feedback", href: "#feedback", ariaLabel: "Feedback" },
  { label: "Pricing", href: "#pricing", ariaLabel: "Pricing" },
  { label: "FAQ", href: "#FAQ", ariaLabel: "FAQ" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-customDarkBg1 lg:bg-customDarkBgTransparent fixed z-40 flex h-20 w-full flex-col items-center justify-center lg:backdrop-blur-xl">
      <div className="relative flex w-11/12 items-center justify-between xl:w-10/12 2xl:w-[1280px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <a className="navbar-link" href="#home" aria-label="Home">
            <div className="flex grow basis-0 items-center justify-start">
              <div className="mr-2 text-6xl ">
                <LawAssistantLogo />
              </div>
              <div className="font-['Inter'] text-xl font-bold ">
                lawassistant.ai
              </div>
            </div>
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <div className="hidden h-full pb-2 pl-12 lg:flex">
            {navbarLinks.map(({ href, label, ariaLabel }) => (
              <a
                className="navbar-link"
                href={href}
                aria-label={ariaLabel}
                key={label}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <div className="hidden grow basis-0 justify-end lg:flex">
            <a
              className="custom-border-gray bg-customDarkBg2 hover:bg-customDarkBg3
           flex rounded-xl  border-gray-700 pb-2 pl-6 pr-8 pt-2 text-sm "
              href="https://app.lawassistant.ai/"
              target="_blank"
              aria-label="Sign up free"
            >
              <span className="pt-px">Launch app</span>
            </a>
          </div>
        </motion.div>
        <div
          className="hover:bg-customDarkBg2 flex cursor-pointer  flex-col rounded-md border border-solid border-gray-600 px-2 py-3 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="mb-1 h-0.5 w-5  bg-gray-500"></div>
          <div className="mb-1 h-0.5 w-5  bg-gray-500"></div>
          <div className="h-0.5 w-5 bg-gray-500 "></div>
        </div>
      </div>
      {/* Mobile navbar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="bg-customDarkBg1 border-customDarkBg3 absolute left-0 top-4 z-50 mt-16  flex w-full flex-col 
        items-center gap-10 border-y border-solid pb-10 pt-10 lg:hidden
        "
            >
              {navbarLinks.map(({ label, href, ariaLabel }) => (
                <a
                  key={href}
                  className="navbar-link"
                  href={href}
                  onClick={() => setIsOpen(false)}
                  aria-label={ariaLabel}
                >
                  {label}
                </a>
              ))}
              <a
                className="custom-border-gray bg-customDarkBg2 hover:bg-customDarkBg3
           flex rounded-xl  border-gray-700 pb-2 pl-6 pr-8 pt-2 text-sm "
                href="https://app.lawassistant.ai/spi/auth/signin"
                target="_blank"
              >
                Launch App
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
