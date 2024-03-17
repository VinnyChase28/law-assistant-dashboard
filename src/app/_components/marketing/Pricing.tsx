import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Check } from "lucide-react";
import Link from "next/link";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular?: PopularPlanType;
  price?: number;
  description?: string;
  buttonText: string;
  benefitList?: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Starter",
    popular: 0,
    price: 19.99,
    description: "+$0.06/1000 tokens, billed monthly",
    buttonText: "Start Free Trial",
    benefitList: [
      "AI Assistant",
      "Self-service embed code",
      "Report Drafting",
      "Document Management",
      "Up to 50 documents",
    ],
  },
  {
    title: "Pro",
    popular: 1,
    price: 99,
    description: "+$0.04/1000 tokens, billed monthly",
    buttonText: "Start Free Trial",
    benefitList: ["Starter features", "Up to 500 documents", "10 Users"],
  },
  {
    title: "Enterprise",
    popular: 0,
    buttonText: "Contact Us",
    benefitList: ["Pro features", "Tailored workflows", "Fine-tuned models"],
  },
];

export const Pricing = () => {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <h2 className="text-center text-3xl font-bold md:text-4xl">
        Get
        <span className="bg-gradient-to-b from-primary/60 to-primary bg-clip-text text-transparent">
          {" "}
          Unlimited{" "}
        </span>
        Access
      </h2>
      <h3 className="pb-8 pt-4 text-center text-xl text-muted-foreground">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
        reiciendis.
      </h3>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "shadow-black/10 drop-shadow-xl dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="item-center flex justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge variant="secondary" className="text-sm text-primary">
                    Most popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">${pricing.price}</span>
                <span className="text-muted-foreground"> /month</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Link href="/auth/sign-in" passHref>
                <Button className="w-full">{pricing.buttonText}</Button>
              </Link>
            </CardContent>

            <hr className="m-auto mb-4 w-4/5" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing?.benefitList?.map((benefit: string) => (
                  <span key={benefit} className="flex">
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
