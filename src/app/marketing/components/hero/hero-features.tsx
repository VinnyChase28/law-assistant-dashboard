import { Button } from "@/components/ui/button";

interface HeroFeaturesProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
  imageSrc: string;
  imageAlt: string;
}

const HeroFeatures: React.FC<HeroFeaturesProps> = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
  imageSrc,
  imageAlt,
}) => {
  return (
    <section className="light:bg-gray-300 bg-white dark:bg-gray-900">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl xl:text-6xl">
            {title}
          </h1>
          <p className="mb-6 max-w-2xl text-lg font-normal text-gray-500 dark:text-gray-400 lg:mb-8">
            {description}
          </p>
          <div className="space-x-3">
            <Button
              asChild
              size="lg"
              className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 text-white"
            >
              <a href={primaryButtonLink} target="_blank">
                {primaryButtonText}
                <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </Button>
          </div>
        </div>
        <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <img src={imageSrc} alt={imageAlt} />
        </div>
      </div>
    </section>
  );
};

export default HeroFeatures;
