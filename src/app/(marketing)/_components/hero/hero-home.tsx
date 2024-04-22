"use client";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Button } from "@components/ui/button";
import { buttonVariants } from "@components/ui/button";

import { HeroCards } from "./hero-cards";

export const Hero = () => {
  return (
    <section className="container grid place-items-center gap-10 py-20 md:py-32 lg:grid-cols-2">
      <div className="space-y-6 text-center lg:text-start">
        <main className="text-5xl font-bold md:text-3xl">
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#F596D3] to-[#D247BF] bg-clip-text text-transparent">
              Compliance Automation
            </span>{" "}
            <br />
            That Businesses{" "}
            <h2 className="inline">
              <span className="inline bg-gradient-to-r from-[#61DAFB] via-[#1fc0f1] to-[#03a3d7] bg-clip-text text-transparent">
                Trust
              </span>{" "}
            </h2>
          </h2>{" "}
        </main>

        <p className="mx-auto text-xl text-muted-foreground md:w-10/12 lg:mx-0">
          Harness the power of Generative AI with a Compliance Automation
          platform that ensures regulatory compliance for the world&apos;s top
          businesses.
        </p>

        <div className="space-y-4 md:space-x-4 md:space-y-0">
          <Link href="/dashboard"> </Link>
          <Button
            onClick={() => {
              signIn("auth0", {
                callbackUrl: "/dashboard",
              });
            }}
            className="w-full md:w-1/3"
          >
            Get Started
          </Button>

          <a
            href="https://cal.com/vincent-gauthier-yxbpaz/30min"
            target="_blank"
            className={`w-full md:w-1/3 ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Book Demo
            <CalendarIcon className="ml-2 h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
