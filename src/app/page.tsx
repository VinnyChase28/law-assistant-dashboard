import HomeContainer from "./(marketing)/_components/home/home-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CodeX - AI-Powered Compliance Automation Platform",
  description:
    "Revolutionize your compliance workflow with CodeX, the leading AI-powered platform designed to enhance compliance automation with cutting-edge technology and expert support.",
};

function Home() {
  return (
    <>
      <HomeContainer />
    </>
  );
}

export default Home;
