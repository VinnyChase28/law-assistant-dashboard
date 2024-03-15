import { LawAssistantLogo } from "./assets/logos/LawAssistantLogo";

const footerData = [
  {
    title: "Products",
    items: ["Services", "About Us", "News and Stories", "Roadmap"],
  },
  {
    title: "Important Links",
    items: [
      "Organization Team",
      "Our Journeys",
      "Pricing Plans",
      "Roadmap",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  {
    title: "Company",
    items: ["About Us", "Jobs", "Press", "Contact Us"],
  },
];

export const Footer = () => {
  return (
    <footer>
      <div className="bg-customDarkBg1  radius-for-skewed pt-10 lg:pb-12 lg:pt-20 ">
        <div className="container mx-auto w-4/5 px-4 md:w-11/12 lg:w-10/12 xl:w-4/5 2xl:w-2/3">
          <div className="flex flex-wrap">
            <div className="mb-16 w-full lg:mb-0 lg:w-1/3">
              <div className="flex grow basis-0 items-center justify-center lg:justify-start">
                <div className="mr-2 text-6xl text-white">
                  <LawAssistantLogo />
                </div>
                <div className="font-['Inter'] text-xl font-bold text-white">
                  lawassistant.ai
                </div>
              </div>

              {/* <div className="mx-auto w-36 lg:mx-0">
                <a
                  className="bg-customDarkBg2 custom-border-gray  mr-2 inline-block h-10 w-10 rounded-xl  p-2 hover:bg-gray-700"
                  href="#"
                >
                  <FacebookIcon />
                </a>
                <a
                  className="bg-customDarkBg2 custom-border-gray  mr-2 inline-block h-10 w-10 rounded-xl  p-2 hover:bg-gray-700"
                  href="#"
                >
                  <TwitterIcon />
                </a>
                <a
                  className="bg-customDarkBg2 custom-border-gray  mr-2 inline-block h-10 w-10 rounded-xl  p-2 hover:bg-gray-700"
                  href="#"
                >
                  <InstagramIcon />
                </a>
              </div> */}
            </div>
            <div className="hidden w-full  flex-wrap justify-between lg:flex lg:w-2/3 lg:pl-16">
              <div className="mb-16 w-full md:mb-0 md:w-1/3 lg:w-auto">
                <h3 className="mb-6 text-2xl font-bold text-white">Products</h3>
                <ul>
                  {footerData[0]?.items.map((item, i) => (
                    <li key={i} className="mb-4">
                      <a
                        className="text-gray-400 hover:text-gray-300"
                        href="#"
                        aria-label=""
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-16 w-full md:mb-0 md:w-1/3 lg:w-auto">
                <h3 className="mb-6 text-2xl font-bold text-white">
                  Important Links
                </h3>
                <ul>
                  {footerData[1]?.items.map((item, i) => (
                    <li key={i} className="mb-4">
                      <a
                        className="text-gray-400 hover:text-gray-300"
                        href="#"
                        aria-label=""
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-1/3 lg:w-auto">
                <h3 className="mb-6 text-2xl font-bold text-white">Company</h3>
                <ul>
                  {footerData[2]?.items.map((item, i) => (
                    <li key={i} className="mb-4">
                      <a
                        className="text-gray-400 hover:text-gray-300"
                        href="#"
                        aria-label=""
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-16 hidden border-t border-[rgb(255,255,255,0.2)] pt-12 text-sm text-gray-400 lg:block lg:text-center">
            &copy; 2024 Law Assistant AI
          </p>
        </div>
      </div>
    </footer>
  );
};
