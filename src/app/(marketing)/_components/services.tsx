import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";

import { MagnifierIcon, ChartIcon } from "./icons";


interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

const serviceList: ServiceProps[] = [
  {
    title: "Build your own knowledge base",
    description:
      "By adding documents, web pages, and other data sources to your account,  Law Assistant AI becomes an expert in your regulatory environment intantly.",
    icon: <ChartIcon />,
  },

  {
    title: "Self-Service Chat",
    description:
      "Give your website visitors instant access to crucial regulatory information with our self-serve chat feature, which can be enbedded on your website.",
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
              Self-serve{" "}
            </span>
            compliance tools
          </h2>

          <p className="mb-8 mt-4 text-xl text-muted-foreground ">
            Create agent that is an expert on your regulatory environment
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

        {/* <Image
          src={cubeLeg}
          className="w-[300px] object-contain md:w-[500px] lg:w-[600px]"
          alt="Innovative AI Services"
          placeholder="blur"
        /> */}
      </div>
    </section>
  );
};
