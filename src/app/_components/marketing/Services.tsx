import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MagnifierIcon, WalletIcon, ChartIcon } from "./Icons";
import cubeLeg from "../../assets/cube-leg.png";
import Image from "next/image";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Collaborative AI Development",
    description:
      "By fine-tuning models to specific jurisdictions, legal areas, and document types, we ensure a highly customized and effective tool.",
    icon: <ChartIcon />,
  },
  {
    title: "Dynamic Compliance Monitoring",
    description:
      "Leverage our AI's capability to continuously scan legal databases or documents, ensuring your operations remain within regulatory bounds. ",
    icon: <WalletIcon />,
  },
  {
    title: "Self-Service Chat",
    description:
      "Give your website visitors instant access to crucial regulatory information with our self-serve chat feature. Users increasingly don't want to search for information. They want answers.",
    icon: <MagnifierIcon />,
  },
];

export const Services = () => {
  return (
    <section className="container py-24 sm:py-32">
      <div className="grid place-items-center gap-8 lg:grid-cols-[1fr,1fr]">
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">
            <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
              Partner-Driven{" "}
            </span>
            AI Services
          </h2>

          <p className="mb-8 mt-4 text-xl text-muted-foreground ">
            Tailoring AI to your unique compliance landscape
          </p>

          <div className="flex flex-col gap-8">
            {serviceList.map(({ icon, title, description }: ServiceProps) => (
              <Card key={title}>
                <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
                  <div className="mt-1 rounded-2xl bg-primary/20 p-1">
                    {icon}
                  </div>
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription className="text-md mt-2">
                      {description}
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <Image
          src={cubeLeg}
          className="w-[300px] object-contain md:w-[500px] lg:w-[600px]"
          alt="Innovative AI Services"
        />
      </div>
    </section>
  );
};
