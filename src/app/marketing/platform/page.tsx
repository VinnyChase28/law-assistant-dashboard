"use client";

import React from "react";
import ReactFullpage from "@fullpage/react-fullpage";

export default function PlatformOverviewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ReactFullpage
        credits={{ enabled: false, label: "Made with ❤️ by Perplexity" }}
        render={() => (
          <ReactFullpage.Wrapper>
            <div className="section">
              <h2>How It Works</h2>
              <p>
                Compliance Monitoring: We continuously scan a variety of legal
                and regulatory databases to ensure the most up-to-date
                compliance docs are readily available.
              </p>
              <p>
                Information Retrieval: Users and website visitors can quickly
                find specific compliance information, guidelines, and legal
                interpretations instantly.
              </p>
            </div>
            <div className="section">
              <h2>Compliance Reporting</h2>
              <p>
                CodeX generates comprehensive reports detailing your compliance
                status, including any potential issues or areas for improvement.
              </p>
            </div>
            <div className="section">
              <h2>Self-serve compliance tools</h2>
              <p>
                Create agent that is an expert on your regulatory environment.
              </p>
              <p>
                Build your own knowledge base: By adding documents, web pages,
                and other data sources to your account, CodeX becomes an expert
                in your regulatory environment instantly.
              </p>
            </div>
            <div className="section">
              <h2>Self-Service Chat</h2>
              <p>
                Give your website visitors instant access to crucial regulatory
                information with our self-serve chat feature, which can be
                embedded on your website.
              </p>
            </div>
          </ReactFullpage.Wrapper>
        )}
      />
    </div>
  );
}
