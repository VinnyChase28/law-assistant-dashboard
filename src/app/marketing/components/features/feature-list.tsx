import { createClient } from "contentful";
import FeatureShowcase from "./feature-showcase";
import HeroFeatures from "../hero/hero-features";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
});

interface FeatureListProps {
  title: string;
}

const FeatureList = async ({ title }: FeatureListProps) => {
  try {
    const response = await client.getEntries({
      content_type: "navigationItem",
      "fields.slug": title,
      include: 2,
    });

    console.log("response", response.items[0]);

    if (response.items.length === 0) {
      return null;
    }

    const navigationItem = response.items[0];
    const features: any = navigationItem?.fields.features;

    return (
      <>
        <HeroFeatures
          title={navigationItem?.fields.title as string}
          slug={navigationItem?.fields.slug as string}
          description="Test"
          imageSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
          imageAlt="Test"
          primaryButtonText="Test"
          primaryButtonLink="https://calendly.com/vince-gauthier/30min?month=2024-04"
        />
        {features.map((feature: any, index: number) => (
          <FeatureShowcase
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </>
    );
  } catch (error) {
    console.error("Error fetching navigation item:", error);
    return null;
  }
};

export default FeatureList;
