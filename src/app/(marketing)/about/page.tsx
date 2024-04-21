import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CheckIcon, HeartIcon, TextIcon, Users } from "lucide-react";

function StorySection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 px-10 md:gap-16 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Our Story
            </div>
            <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Rooted in Vancouver, Grown in San Francisco
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
              Our journey began in the vibrant city of Vancouver...
            </p>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed">
              As our ambitions grew, we found ourselves drawn to the bustling
              tech hub of San Francisco...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
function ComplianceSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simplifying Compliance in Urban Development
            </h2>
            <p className="text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Designed for real estate professionals...
            </p>
            {/* Further texts and subcomponents */}
          </div>
          <CardsSection />
        </div>
      </div>
    </section>
  );
}

function CardsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Compliance Processes Automated
          </CardTitle>
          <TextIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">200K+</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Collaborative Projects
          </CardTitle>
          <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">300+</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Proven Compliance Accuracy
          </CardTitle>
          <CheckIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">99.9%</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Client Satisfaction
          </CardTitle>
          <HeartIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">97%</div>
        </CardContent>
      </Card>
    </div>
  );
}

function LeadershipTeamSection() {
  return (
    <section className="w-full bg-gradient-to-b from-muted/50 to-muted/70 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Leadership Team
          </h2>
          <p className=" md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Led by a Team of Industry Innovators
          </p>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Gadi Shamia" src="/placeholder-user.jpg" />
                <AvatarFallback>GS</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Gadi Shamia</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  CEO and Co-Founder
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  alt="Benjamin Gleitzman"
                  src="/placeholder-user.jpg"
                />
                <AvatarFallback>BG</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Benjamin Gleitzman</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  CTO and Co-Founder
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Meghna Suresh" src="/placeholder-user.jpg" />
                <AvatarFallback>MS</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Meghna Suresh</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Head of Product
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Stuart Wilson" src="/placeholder-user.jpg" />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Stuart Wilson</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Chief Revenue Officer
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Letizia Curti" src="/placeholder-user.jpg" />
                <AvatarFallback>LC</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Letizia Curti</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Chief of Staff
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  alt="Margaret Cichosz"
                  src="/placeholder-user.jpg"
                />
                <AvatarFallback>MC</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Margaret Cichosz</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Head of Talent
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  alt="Fred Fontes Gerards"
                  src="/placeholder-user.jpg"
                />
                <AvatarFallback>FF</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Fred Fontes Gerards</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  General Manager
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <ComplianceSection />
      <StorySection />
      <LeadershipTeamSection />
    </>
  );
}
