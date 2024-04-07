import { Button } from "@/components/ui/button";
import { Separator } from "src/app/_components/ui/separator";
import { Calendar } from "lucide-react";
interface HeroFeaturesProps {
  title: string;
  headline: string;
  description: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  imageSrc: string;
  imageAlt: string;
}

const HeroFeatures: React.FC<HeroFeaturesProps> = ({
  title,
  headline,
  description,
  primaryButtonText,
  primaryButtonLink,
  imageSrc,
  imageAlt,
}) => {
  return (
    <section>
      <div className="mx-auto grid max-w-screen-xl px-8 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
        <div className="mr-auto place-self-center lg:col-span-7">
          <p>{title}</p>
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl xl:text-6xl">
            {headline}
          </h1>
          <p className="mb-6 max-w-2xl text-lg font-normal text-gray-500 dark:text-gray-400 lg:mb-8">
            {description}
          </p>
          <div className="space-x-3">
            <Button size="lg" variant="default">
              <a href={primaryButtonLink} target="_blank">
                {primaryButtonText}
              </a>
              <Calendar className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
          <img src={imageSrc} alt={imageAlt} />
        </div>
      </div>
      <Separator />
    </section>
  );
};

export default HeroFeatures;