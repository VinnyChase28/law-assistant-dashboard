// feature-list.tsx
import { promises as fs } from "fs";
import path from "path";

import matter from "gray-matter";

import particles from "/videos/particles.mp4";

import type { FrontMatter } from "@/types/font-matter";
import FeatureShowcase from "@marketing/components/features/feature-showcase";
import HeroFeatures from "@marketing/components/hero/hero-features";

interface FeatureListProps {
  slug: string;
}

interface Feature {
  title: string;
  description: string;
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
    const { data: frontmatter } = matter(fileContents) as unknown as {
      data: FrontMatter;
    };

    const features: Feature[] = Object.entries(frontmatter)
      .filter(([key]) => key.startsWith("feature"))
      .map(([key, value]) => ({
        title: value as string,
        description: frontmatter[`${key}Description`] as string,
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
            title={feature.title}
            description={feature.description}
          />
        ))}
      </>
    );
  } catch (error) {
    console.error("Error reading test.md file:", error);
    return null;
  }
};

export default FeatureList;