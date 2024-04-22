import CardsSection from "./cards-section";

export default function ComplianceSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simplifying Compliance
            </h2>
            <p className=" md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Designed for real estate and compliance professionals, our
              platform ensures that every project meets the highest standards of
              municipal, state, and federal regulations effortlessly.
            </p>
            <div>
              <h3 className="text-2xl font-bold tracking-tighter">
                Intuitive Compliance Automation
              </h3>
              <p className=" md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                Utilize cutting-edge technology to streamline your compliance
                checks, reduce delays, and avoid costly penalties with solutions
                tailored to your specific needs.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tighter">
                Our Commitment to Innovation
              </h3>
              <p className=" md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                We are dedicated to advancing how businesses manage compliance
                through technological excellence.
              </p>
            </div>
          </div>
          <CardsSection />
        </div>
      </div>
    </section>
  );
}
