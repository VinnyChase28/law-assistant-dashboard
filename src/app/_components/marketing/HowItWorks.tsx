import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "lucide-react";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Compliance Monitoring",
    description:
      "We continuously scan a variety of legal and regulatory databases to ensure that the most up-to-date compliance information is readily available",
  },
  {
    icon: <MapIcon />,
    title: "Document Analysis",
    description:
      "Our AI analyzes your existing documents, contracts, policies, and procedures to assess compliance with current laws and regulations",
  },
  {
    icon: <PlaneIcon />,
    title: "Information Retrieval",
    description:
      "Users can query the system to quickly find specific compliance information, guidelines, and legal interpretations.",
  },
  {
    icon: <GiftIcon />,
    title: "Compliance Reporting",
    description:
      "The system generates comprehensive reports detailing your compliance status, including any potential issues or areas for improvement",
  },
];

export const HowItWorks = () => {
  return (
    <section id="howItWorks" className="container py-24 text-center sm:py-32">
      <h2 className="text-3xl font-bold md:text-4xl ">
        How It{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="mx-auto mb-8 mt-4 text-xl text-muted-foreground md:w-3/4">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis
        dolor pariatur sit!
      </p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card key={title} className="bg-muted/50">
            <CardHeader>
              <CardTitle className="grid place-items-center gap-4">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
