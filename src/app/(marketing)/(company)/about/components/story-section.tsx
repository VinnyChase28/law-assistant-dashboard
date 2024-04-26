import ImageContainer from "@/app/_components/image/image-container";

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
                Our company was founded in Vancouver by a team of compliance
                experts and technologists. Inspired by the city's innovative
                spirit, we set out to transform the compliance landscape with
                cutting-edge solutions.
              </p>
            </div>
            <div className="relative w-full lg:w-1/2">
              <ImageContainer
                src="vancouver.jpg" // Just specify the image file name
                alt="Vancouver"
                width={500}
                height={100}
                className="rounded-lg"
              />
            </div>
          </div>

          {/* San Francisco Section: Image Left, Text Right */}
          <div className="flex flex-col items-center space-y-4 lg:flex-row lg:space-x-20 lg:space-y-0 lg:space-x-reverse">
            <div className="relative w-full lg:w-1/2">
              <ImageContainer
                src="san-fran.jpg"
                alt="San Francisco"
                width={500}
                height={100}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-4 pl-8 lg:w-1/2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Grown in San Francisco
              </h2>
              <p className="max-w-[700px]  md:text-xl/relaxed">
                As our company grew, we established a presence in San Francisco
                to tap into the vibrant tech ecosystem. While fully remote, our
                team occasionally collaborates in shared office spaces in both
                cities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
