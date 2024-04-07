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

    if (response.items.length === 0) {
      return null;
    }

    const navigationItem = response.items[0];
    const features: any = navigationItem?.fields.features;

    return (
      <>
        <HeroFeatures
          title={navigationItem?.fields.title as string}
          headline={navigationItem?.fields.headline as string}
          description={navigationItem?.fields.description as string}
          imageSrc={
            //@ts-expect-error contentful types are not correct
            navigationItem?.fields?.imageSrc?.fields.file?.url as string
          }
          imageAlt={navigationItem?.fields.title as string}
          primaryButtonText={navigationItem?.fields.button as string}
          primaryButtonLink={navigationItem?.fields.link as string}
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
