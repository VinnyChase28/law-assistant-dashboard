import { createClient } from "contentful";
import FeatureShowcase from "./feature-showcase";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
});

interface FeatureListProps {
  navigationCategory: string;
}

const FeatureList = async ({ navigationCategory }: FeatureListProps) => {
  try {
    const response = await client.getEntries({
      content_type: "navigationItem",
      "fields.title": navigationCategory,
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
