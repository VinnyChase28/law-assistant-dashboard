"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const CaseStudyData = [
  {
    title:
      "Town of Creston Utilizes GenAI for Streamlined Compliance and Efficient Development",
    overview:
      "The Town of Creston, known for its rigorous adherence to municipal and provincial regulations, faced significant challenges in managing the complex and ever-changing landscape of building bylaws and compliance requirements. The Building & Bylaw Services Department, under the leadership of Brandon Vigne, was in search of a solution that could enhance their efficiency and accuracy in handling developer inquiries and compliance report generation.",
    challenge:
      "The department was overwhelmed with the volume of regulatory documents they had to navigate for each development proposal, leading to delays in response times to developers and in the drafting of compliance reports. The manual process of cross-referencing bylaws and regulations was not only time-consuming but also prone to errors.",
    solution:
      "The Town of Creston integrated GenAI, an AI-powered compliance validation tool, into their workflow. This platform allowed the department to rapidly cross-reference development proposals with applicable municipal and provincial regulations. GenAI's intuitive search capabilities enabled the team to quickly answer complex queries from prospective developers, ensuring that all projects complied with the necessary bylaws without unnecessary delays.",
    results: [
      "Increased Efficiency: What used to take hours of manual document analysis now takes minutes, thanks to GenAI's rapid parsing capabilities.",
      "Enhanced Accuracy: The AI's precision in identifying relevant regulations reduced the risk of non-compliance and the need for costly corrections down the line.",
      "Improved Developer Relations: The streamlined process led to faster response times to inquiries, making Creston a more attractive place for developers.",
      "Resource Optimization: The department can now allocate more time to strategic initiatives and service improvements, enhancing overall community development.",
    ],
  },
  {
    title:
      "Provo Leverages GenAI for Strategic Expansion into New Municipalities",
    overview:
      "Provo, a dynamic real estate development firm led by Senior Project Manager Rebecca Johnson, specializes in residential and commercial projects. With ambitions to expand their portfolio into new municipalities, the firm faced the challenge of efficiently navigating diverse and unfamiliar regulatory environments.",
    challenge:
      "Each new municipality presented a unique set of building bylaws and compliance standards, making it difficult for Provo to quickly assess the feasibility of new projects. The time-consuming process of regulatory research often delayed project initiation and increased the risk of compliance oversights.",
    solution:
      "Provo adopted GenAI to empower their expansion strategy. The platform's AI-driven analysis allowed the firm to conduct comprehensive research on any municipality's regulatory landscape in record time. GenAI's document storage and editing features, along with its compliance report drafting capabilities, streamlined the entire compliance process.",
    results: [
      "Strategic Growth: Provo was able to assess and initiate new projects in multiple municipalities much faster than before, accelerating their growth.",
      "Risk Mitigation: The accuracy of GenAI's compliance validation minimized the risk of regulatory non-compliance and associated costs.",
      "Operational Efficiency: The firm experienced significant time savings in legal research and document drafting, allowing the team to focus on project execution and business development.",
      "Enhanced Competitiveness: The ability to quickly adapt to new regulatory environments gave Provo a competitive edge in the market.",
    ],
  },
];

export const CaseStudies = () => (
  <section className="bg-blueGray-50 relative overflow-hidden pb-16 pt-16">
    <div className="absolute -top-10" id="case-studies" />
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container relative z-10 mx-auto w-11/12 px-2 sm:w-full sm:px-8 lg:px-4">
        <div className="mx-auto md:max-w-4xl">
          <h2 className="custom-block-big-title mb-16 text-center">
            Case Studies
          </h2>
          <div className="-m-1 mb-11 flex flex-wrap">
            {CaseStudyData.map((item, index) => (
              <div className="w-full p-1" key={index}>
                <CaseStudyBox
                  title={item.title}
                  overview={item.overview}
                  challenge={item.challenge}
                  solution={item.solution}
                  results={item.results}
                  defaultOpen={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  </section>
);

const CaseStudyBox = ({
  defaultOpen,
  title,
  overview,
  challenge,
  solution,
  results,
}: {
  defaultOpen: any;
  title: any;
  overview: any;
  challenge: any;
  solution: any;
  results: any;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div
      className="bg-customDarkBg3 custom-border-gray-darker hover:bg-customDarkBg3Hover relative mb-4 cursor-pointer rounded-3xl px-3 pb-2 pt-2 sm:px-8 sm:pt-6"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-col items-start justify-center p-2">
        <h3 className="custom-content-title pr-8 pt-3 sm:pr-0 sm:pt-0">
          {title}
        </h3>
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <p className="text-customGrayText pt-4">
            <strong>Overview:</strong> {overview}
          </p>
          <p className="text-customGrayText pt-4">
            <strong>Challenge:</strong> {challenge}
          </p>
          <p className="text-customGrayText pt-4">
            <strong>Solution:</strong> {solution}
          </p>
          <ul className="text-customGrayText pl-0 pt-4">
            {results.map((result: any, index: any) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="mr-2 p-1" size={30} color="#4F46E5" />
                {result}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="absolute right-4 top-6 sm:right-8 sm:top-8">
        <svg
          width="28px"
          height="30px"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-500 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          <path
            d="M4.16732 12.5L10.0007 6.66667L15.834 12.5"
            stroke="#4F46E5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    </div>
  );
};
