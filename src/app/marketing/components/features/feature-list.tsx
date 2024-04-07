// feature-list.tsx
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
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
      "test.md",
    );
    const fileContents = await fs.readFile(filePath, "utf8");

    const { data: frontmatter } = matter(fileContents);
    console.log(frontmatter);

    return (
      <>
        <HeroFeatures
          title={frontmatter.title}
          headline={frontmatter.headline}
          description={frontmatter.description}
          primaryButtonText={frontmatter.button}
          primaryButtonLink={frontmatter.buttonLink}
        />
        {frontmatter.featureOne && (
          <FeatureShowcase index={0} feature={frontmatter.featureOne} />
        )}
        {frontmatter.featureTwo && (
          <FeatureShowcase index={1} feature={frontmatter.featureTwo} />
        )}
        {frontmatter.featureThree && (
          <FeatureShowcase index={2} feature={frontmatter.featureThree} />
        )}
        {frontmatter.featureFour && (
          <FeatureShowcase index={3} feature={frontmatter.featureFour} />
        )}
      </>
    );
  } catch (error) {
    console.error("Error reading test.md file:", error);
    return null;
  }
};

export default FeatureList;