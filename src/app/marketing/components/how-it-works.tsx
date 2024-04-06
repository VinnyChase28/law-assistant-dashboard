import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaneIcon } from "lucide-react";
import { Paperclip, HeartPulse } from "lucide-react";
interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <HeartPulse />,
    title: "Compliance Monitoring",
    description:
      "We continuously scan your data sources and regulatory databases of your choice to ensure the most up-to-date compliance information is available to you.",
  },

  {
    icon: <PlaneIcon />,
    title: "Information Retrieval",
    description:
      "Both you and your website visitors can quickly find specific compliance information, guidelines, and legal interpretations instantly, with sources.",
  },
  {
    icon: <Paperclip />,
    title: "Compliance Reporting",
    description:
      "CodeX generates comprehensive reports detailing your compliance status, including any potential issues or areas for improvement. You can specify any reporting requirements.",
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
      </h2>

      <div className="grid grid-cols-1 gap-8 pt-6 md:grid-cols-2 lg:grid-cols-3">
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
