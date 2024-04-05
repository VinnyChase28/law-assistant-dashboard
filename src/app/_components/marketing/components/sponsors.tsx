'use client'
import React from "react";
import CenterCourt from "../../../../public/CenterCourt.svg";
import ConcordPacific from "../../../../public/ConcordPacific.svg";
import FairField from "../../../../public/FairField.svg";
import Provo from "../../../../public/Provo.svg";
import CrestonValley from "../../../../public/CrestonValley.svg";

const logos = [
  CenterCourt,
  ConcordPacific,
  CrestonValley,
  FairField,
  Provo,
];

export const Sponsors = () => {
  return (
    <section id="sponsors" className="container pt-24 sm:py-32">
      <h2 className="text-md mb-8 text-center font-bold text-primary lg:text-xl">
        Trusted By
      </h2>

      <div className="relative flex overflow-x-hidden">
        <div className="py-12 animate-marquee whitespace-nowrap">
          {[...Array(Math.ceil(100 / logos.length))].map((_, i) => (
            <React.Fragment key={i}>
              {logos.map((Logo, index) => (
                <span key={`${i}-${index}`} className="mx-8 inline-block">
                  <Logo className="h-16 w-auto rounded-lg" />
                </span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

