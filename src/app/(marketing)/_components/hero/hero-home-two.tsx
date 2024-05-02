import Image from "next/image";

import { Button } from "@components/ui/button";
export default function HeroHomeTwo() {
  return (
    <section className="flex flex-col-reverse items-center justify-between gap-6 p-6 md:flex-row md:p-8 lg:p-12">
      <div className="flex-1 space-y-4 md:max-w-md">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Comprehensive Compliance Solutions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay ahead of ever-changing regulations with our platform.
          Continuously monitor data sources, access guidelines and
          interpretations, and leverage our AI-powered Law Assistant to generate
          customized compliance reports tailored to your business needs.
        </p>
        <div className="flex gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
      <div className="max-w-2xl flex-1">
        <Image
          alt="Compliance Solutions"
          className="rounded-lg shadow-lg"
          height="400"
          src="/images/library.jpg"
          style={{
            aspectRatio: "600/400",
            objectFit: "cover",
          }}
          width="600"
        />
      </div>
    </section>
  );
}
