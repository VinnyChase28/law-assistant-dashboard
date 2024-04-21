import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";

export default function LeadershipTeamSection() {
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
                <p className="text-sm ">CEO and Co-Founder</p>
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
                <p className="text-sm ">CTO and Co-Founder</p>
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
                <p className="text-sm ">Head of Product</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Stuart Wilson" src="/placeholder-user.jpg" />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Stuart Wilson</h4>
                <p className="text-sm ">Chief Revenue Officer</p>
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
                <p className="text-sm ">Chief of Staff</p>
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
                <p className="text-sm ">Head of Talent</p>
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
                <p className="text-sm ">General Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
