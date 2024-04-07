// feature-list.tsx
import { promises as fs } from "fs";
import path from "path";
import FeatureShowcase from "./feature-showcase";
import HeroFeatures from "../hero/hero-features";

interface FeatureListProps {
  title: string;
}

const FeatureList = async ({ title }: FeatureListProps) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "outstatic",
      "content",
      "navigation-item",
      "schema.json",
    );
    const fileContents = await fs.readFile(filePath, "utf8");
    const navigationItem = JSON.parse(fileContents);

    return (
      <>
        <HeroFeatures
          title={navigationItem.properties.title.title}
          headline={navigationItem.properties.headline.title}
          description={navigationItem.properties.description.title}
          primaryButtonText={navigationItem.properties.button.title}
          primaryButtonLink={navigationItem.properties.buttonLink.description}
        />
        {navigationItem.properties.featureOne.title && (
          <FeatureShowcase
            index={0}
            feature={navigationItem.properties.featureOne.title}
          />
        )}
        {navigationItem.properties.featureTwo.title && (
          <FeatureShowcase
            index={1}
            feature={navigationItem.properties.featureTwo.title}
          />
        )}
        {navigationItem.properties.featureThree.title && (
          <FeatureShowcase
            index={2}
            feature={navigationItem.properties.featureThree.title}
          />
        )}
        {navigationItem.properties.featureFour.title && (
          <FeatureShowcase
            index={3}
            feature={navigationItem.properties.featureFour.title}
          />
        )}
      </>
    );
  } catch (error) {
    console.error("Error reading navigation item schema:", error);
    return null;
  }
};

export default FeatureList;
