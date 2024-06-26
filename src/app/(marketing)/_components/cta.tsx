import { CalendarIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@components/ui/button";
export const Cta = () => {
  return (
    <section
      id="cta"
      className="my-24 bg-gradient-to-b from-muted/50 to-muted/70 py-16 sm:my-32"
    >
      <div className="container place-items-center lg:grid lg:grid-cols-2">
        <div className="lg:col-start-1">
          <h2 className="text-3xl font-bold md:text-4xl">
            Unlock the Power of
            <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
              {" "}
              AI-Driven Compliance{" "}
            </span>
          </h2>
          <p className="mb-8 mt-4 text-xl text-muted-foreground lg:mb-0">
            Experience the future of compliance. Book a demo today and learn how
            our platform can revolutionize your compliance workflow.
          </p>
        </div>

        <div className="lg:col-start-2">
          <Link
            href="https://usemotion.com/meet/vincent-gauthier/meeting?d=30"
            target="_blank"
          >
            <Button variant="outline">
              Request Demo
              <CalendarIcon className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="mt-4 text-center text-sm md:text-right">
            Discover the benefits of AI-powered compliance
          </p>
        </div>
      </div>
    </section>
  );
};
