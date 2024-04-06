import { Button } from "@/components/ui/button";

interface HeroFeaturesProps {
  title: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  imageSrc: string;
  imageAlt: string;
}

const HeroFeatures: React.FC<HeroFeaturesProps> = ({
  title,
  description,
  primaryButtonText,
  primaryButtonLink,
  imageSrc,
  imageAlt,
}) => {
  return (
    <section className="light:bg-gray-300 border-rad rounded shadow outline outline-2	outline-offset-2">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl xl:text-6xl">
            {title}
          </h1>
          <p className="mb-6 max-w-2xl text-lg font-normal text-gray-500 dark:text-gray-400 lg:mb-8">
            {description}
          </p>
          <div className="space-x-3">
            <Button size="lg" variant="default">
              <a href={primaryButtonLink} target="_blank">
                {primaryButtonText}
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
