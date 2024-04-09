// feature-list.tsx
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import FeatureShowcase from "./feature-showcase";
import HeroFeatures from "../hero/hero-features";
import { Cta } from "../cta";
import particles from "../../../public/videos/particles.mp4";

interface FeatureListProps {
  slug: string;
}

const FeatureList = async ({ slug }: FeatureListProps) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "outstatic",
      "content",
      "navigation-item",
      `${slug}.md`,
    );
    const fileContents = await fs.readFile(filePath, "utf8");
    const { data: frontmatter } = matter(fileContents);

    const features = Object.entries(frontmatter)
      .filter(([key]) => key.startsWith("feature"))
      .map(([key, value]) => ({
        title: value,
        description: frontmatter[`${key}Description`],
      }))
      .filter((feature) => feature.description !== undefined);

    return (
      <>
        <HeroFeatures
          title={frontmatter.title}
          headline={frontmatter.headline}
          description={frontmatter.description}
          primaryButtonText={frontmatter.button}
          primaryButtonLink={frontmatter.buttonLink}
          videoSrc={particles}
        />
        {features.map((feature, index) => (
          <FeatureShowcase
            key={index}
            index={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
        <Cta />
      </>
    );
  } catch (error) {
    console.error("Error reading test.md file:", error);
    return null;
  }
};

export default FeatureList;