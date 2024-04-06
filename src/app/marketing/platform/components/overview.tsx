import FeatureShowcase from "../../components/feature-showcase";
import HeroFeatures from "../../components/hero/hero-features";

export default function PlatformOverview() {
  return (
    <>
      <HeroFeatures
        title="One conversation engine, infinite scale"
        description="Deploy, power, and optimize Contact Center Automation from a single platform."
        primaryButtonText="Request a Demo"
        primaryButtonLink="https://calendly.com/vince-gauthier/30min"
        imageSrc="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
        imageAlt="Hero Features"
      />
      <FeatureShowcase
        id={1}
        title="Platform overview"
        description="One conversation engine, infinite scale. Deploy, power, and optimize Contact Center Automation from a single platform."
      />
      <FeatureShowcase
        id={2}
        title="Contact Center Automation"
        description="Everything you need to automate your contact center in one platform."
      />
      <FeatureShowcase
        id={3}
        title="Out-of-the box and custom integrations"
        description="Whether it's one of the industry-leading CCaaS platforms or a homegrown CRM, we seamlessly integrate to quickly deploy in weeks instead of months or years."
      />

      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 transform">
        <button className="rounded-full bg-[var(--accent)] px-6 py-3 font-bold text-white">
          REQUEST A DEMO
        </button>
      </div>
    </>
  );
}
