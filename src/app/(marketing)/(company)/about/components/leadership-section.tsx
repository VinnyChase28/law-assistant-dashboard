import { AvatarImage, AvatarFallback, Avatar } from "@components/ui/avatar";

export default function LeadershipTeamSection() {
  return (
    <section className="w-full bg-gradient-to-b from-muted/50 to-muted/70 py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Leadership Team
          </h2>
          <p className="md:text-xl lg:text-base xl:text-xl">
            Led by a Team of Industry Innovators
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 justify-items-center gap-10 md:grid-cols-3 lg:grid-cols-3">
          <div className="space-y-2 justify-self-center">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Rohan Sharma" src="/placeholder-user.jpg" />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Vince Gauthier</h4>
                <p className="text-sm ">CEO and Co-Founder</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Emily Carter" src="/placeholder-user.jpg" />
                <AvatarFallback>EC</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Emily Carter</h4>
                <p className="text-sm ">CTO and Co-Founder</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 justify-self-center">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Aditya Kumar" src="/placeholder-user.jpg" />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Aditya Kumar</h4>
                <p className="text-sm ">Head of Product</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Sarah Johnson" src="/placeholder-user.jpg" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Sarah Johnson</h4>
                <p className="text-sm ">Chief Revenue Officer</p>
              </div>
            </div>
          </div>
          <div className="space-y-2 justify-self-center">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Priya Desai" src="/placeholder-user.jpg" />
                <AvatarFallback>PD</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Priya Desai</h4>
                <p className="text-sm ">Chief of Staff</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Thomas Wright" src="/placeholder-user.jpg" />
                <AvatarFallback>TW</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Thomas Wright</h4>
                <p className="text-sm ">Head of Talent</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage alt="Nikhil Patel" src="/placeholder-user.jpg" />
                <AvatarFallback>NP</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">Nikhil Patel</h4>
                <p className="text-sm ">General Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
