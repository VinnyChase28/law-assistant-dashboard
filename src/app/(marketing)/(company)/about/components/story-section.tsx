import Image from "next/image";

export default function StorySection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-6">
        {/* Grid layout for the sections */}
        <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-1">
          {/* Vancouver Section: Text Left, Image Right */}
          <div className="flex flex-col items-center space-y-4 lg:flex-row lg:space-x-10 lg:space-y-0">
            <div className="space-y-4 lg:w-1/2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Rooted in Vancouver
              </h2>
              <p className="max-w-[700px]  md:text-xl/relaxed">
                Our journey began in the vibrant city of Vancouver, where a
                group of passionate individuals came together with a shared
                vision. Inspired by the city&apos;s natural beauty and
                entrepreneurial spirit, we set out to create something truly
                remarkable.
              </p>
            </div>
            <div className="relative h-[250px] w-full lg:w-1/2">
              <Image
                src="/images/vancouver.jpg" // Replace with path to your image
                alt="Vancouver"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* San Francisco Section: Image Left, Text Right */}
          <div className="flex flex-col items-center space-y-4 lg:flex-row lg:space-x-20 lg:space-y-0 lg:space-x-reverse">
            <div className="relative h-[250px] w-full lg:w-1/2">
              <Image
                src="/images/san-fran.jpg" // Replace with path to your image
                alt="San Francisco"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-4 pl-8 lg:w-1/2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Grown in San Francisco
              </h2>
              <p className="max-w-[700px]  md:text-xl/relaxed">
                As our ambitions grew, we found ourselves drawn to the bustling
                tech hub of San Francisco. Immersing ourselves in the
                city&apos;s innovative culture, we forged partnerships and
                collaborations that propelled our vision forward.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}