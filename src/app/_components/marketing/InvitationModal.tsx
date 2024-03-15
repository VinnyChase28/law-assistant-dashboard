import { motion, AnimatePresence } from "framer-motion";

import { CheckArrowIcon } from "./assets/icons/CheckArrowIcon";
import { CloseIcon } from "./assets/icons/CloseIcon";

import { LawAssistantLogo } from "./assets/logos/LawAssistantLogo";
export const InvitationModal = ({ setIsOpen }: { setIsOpen: any }) => (
  <AnimatePresence>
    <motion.div
      initial={{ opacity: 0, zIndex: 50 }}
      animate={{ opacity: 1, zIndex: 50 }}
      transition={{ duration: 0.1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className="bg-customDarkBgTransparentDarker fixed  left-0 top-0 z-50 flex h-full  w-full items-center justify-center"
        onClick={() => setIsOpen(false)}
      >
        <div
          className="bg-customDarkBgTransparentLighter custom-border-gray-darker fixed fixed z-50 mx-auto h-screen w-full px-8 py-12 backdrop-blur-xl sm:mb-8 sm:h-auto sm:w-3/4 sm:rounded-2xl sm:px-16 md:w-3/5 lg:w-[1000px] xl:w-[1100px]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative flex">
            <div className="hidden w-1/2 lg:inline">
              <h2 className="mb-2 mt-6 text-5xl font-bold tracking-normal text-white">
                Sign up
              </h2>
              <h2 className="text-customSecondary text-5xl font-bold tracking-normal">
                Today
              </h2>

              {/* <ul className="mb-6 text-white mt-12">
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Vestibulum viverra</span>
                </li>
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Morbi mollis metus pretium</span>
                </li>
                <li className="mb-4 flex">
                  <CheckArrowIcon />
                  <span>Etiam lectus nunc, commodo</span>
                </li>
              </ul> */}
            </div>
            <div className="flex w-full flex-col items-center justify-center pt-24 sm:pt-0 lg:w-1/2">
              <div className="mb-8 inline flex grow basis-0 items-center justify-start pr-6 lg:hidden">
                <div className="mr-2 text-8xl text-white">
                  <LawAssistantLogo />
                </div>
                <div className="font-['Inter'] text-3xl font-bold text-white">
                  Law Assistant AI
                </div>
              </div>

              <h3 className="mb-7 text-center text-2xl font-bold leading-snug text-white">
                Join 3,953 municipalities & real estate firms
              </h3>
              <div className="-m-2 flex flex-wrap">
                <div className="mx-auto w-full p-2 sm:w-4/5">
                  <input
                    className="w-full rounded-lg border border-gray-300 bg-gray-300 px-4 py-4 text-center font-medium text-gray-500 placeholder-gray-500 outline-none focus:ring focus:ring-indigo-300"
                    id="newsletterInput3-1"
                    type="text"
                    placeholder="Your email address"
                  />
                </div>
                <div className="mx-auto mt-4 w-full p-2 sm:w-4/5">
                  <button
                    className="shadow-4xl bg-customPrimary w-full rounded-xl px-6 py-4 font-semibold text-white transition duration-200 ease-in-out hover:bg-[#7274f3] focus:ring focus:ring-indigo-300"
                    type="button"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </div>
            <div
              className="fixed right-6 top-6 z-50 h-5 w-5 cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </AnimatePresence>
);
