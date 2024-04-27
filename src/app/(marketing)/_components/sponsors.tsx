"use client";

import React from "react";

import CenterCourt from "@public/images/logos/CenterCourt.svg";
import ConcordPacific from "@public/images/logos/ConcordPacific.svg";
import CrestonValley from "@public/images/logos/CrestonValley.svg";
import FairField from "@public/images/logos/FairField.svg";
import Provo from "@public/images/logos/Provo.svg";

const logos = [CenterCourt, ConcordPacific, CrestonValley, FairField, Provo];

export const Sponsors = () => {
  return (
    <section id="sponsors" className="container pt-24 sm:py-32">
      <h2 className="text-md mb-8 text-center font-bold text-primary lg:text-xl">
        Trusted By
      </h2>

      <div className="relative flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap py-12">
          {[...(Array(Math.ceil(100 / logos.length)) as unknown[])].map(
            (_, i) => (
              <React.Fragment key={i}>
                {logos.map((Logo, index) => (
                  <span key={`${i}-${index}`} className="mx-8 inline-block">
                    <Logo className="h-16 w-auto rounded-lg" />
                  </span>
                ))}
              </React.Fragment>
            ),
          )}
        </div>
      </div>
    </section>
  );
};