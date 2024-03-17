import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin } from "lucide-react";
import { LightBulbIcon } from "./Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Markdown from "../markdown";

export const HeroCards = () => {
  return (
    <div className="relative hidden h-[500px] w-[700px] flex-row flex-wrap gap-8 lg:flex">
      {/* Testimonial */}
      <Card className="absolute -top-[15px] w-[340px] shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage alt="" src="" />
            <AvatarFallback>SH</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">CodeX</CardTitle>
            <CardDescription>@CodeX</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          Regarding swimming pools, the rules from the provided texts are as
          follows:
          <p>
            Fencing Requirements: 1. Swimming pools must be enclosed within a
            fence not less than 1.5 meters in height, with no openings greater
            than 100 millimeters in their least dimension. The access through
            the fence must feature a self-closing gate designed to lock
            automatically when not in use, with a spring lock that can only be
            opened from the swimming pool side.
          </p>
          <p>
            Placement Restrictions: Swimming pools must not be sited less than
            1.5 meters from any lot line.
          </p>
          <p>Sources: </p>
          <li>Building-1394.pdf, Page 11, Section 17.0</li>
          <li>Zoning_0.pdf, Page 16, Section 3.5.5</li>
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 flex w-80 flex-col items-center justify-center shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="mt-8 flex items-center justify-center pb-2">
          <img
            src="https://i.pravatar.cc/150?img=58"
            alt="user avatar"
            className="absolute -top-12 aspect-square h-24 w-24 rounded-full object-cover grayscale-[0%]"
          />
          <CardTitle className="text-center">Leo Miranda</CardTitle>
          <CardDescription className="font-normal text-primary">
            Frontend Developer
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-2 text-center">
          <p>
            I really enjoy transforming ideas into functional software that
            exceeds expectations
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              href="https://github.com/leoMirandaa"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Github icon</span>
              <GitHubLogoIcon className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com/leo_mirand4"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">X icon</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-foreground"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute left-[50px] top-[150px] w-72  shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="item-center flex justify-between">
            Starter
            <Badge variant="secondary" className="text-sm text-primary">
              Most popular
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$19.99</span>
            <span className="text-muted-foreground"> /month</span>
          </div>

          <CardDescription>Get started with a 7-day free trial</CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">Start Free Trial</Button>
        </CardContent>

        <hr className="m-auto mb-4 w-4/5" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {[
              "1 User",
              "Document Management",
              "AI Assistant",
              "Report Drafting",
            ].map((benefit: string) => (
              <span key={benefit} className="flex">
                <Check className="text-green-500" />{" "}
                <h3 className="ml-2">{benefit}</h3>
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute -right-[10px] bottom-[35px] w-[350px]  shadow-black/10 drop-shadow-xl dark:shadow-white/10">
        <CardHeader className="flex items-start justify-start gap-4 space-y-1 md:flex-row">
          <div className="mt-1 rounded-2xl bg-primary/20 p-1">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Light & dark mode</CardTitle>
            <CardDescription className="text-md mt-2">
              Lorem ipsum dolor sit amet consect adipisicing elit. Consectetur
              natusm.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
