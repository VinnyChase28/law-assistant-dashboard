

import { Cta } from "@/marketing/components/cta";

import ComplianceSection from "./components/compliance-section";
import LeadershipTeamSection from "./components/leadership-section";
import StorySection from "./components/story-section";


export default function AboutPage() {
  return (
    <>
      <StorySection />
      <LeadershipTeamSection />
      <ComplianceSection />
      <Cta />
    </>
  );
}
