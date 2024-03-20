"use client";
import { useState } from "react";
import Link from "next/link"; // Import Link from next/link
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UserIcon } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { usePathname } from "next/navigation";
import { LawAssistantLogo } from "./assets/LawAssistantLogo";
import { useCheckedRowsStore } from "src/store/store";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface RouteProps {
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    href: "#features",
    label: "Features",
  },
  {
    href: "#howItWorks",
    label: "How It Works",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  // {
  //   href: "#faq",
  //   label: "FAQ",
  // },
  {
    href: "#about",
    label: "About Us",
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { deleteAll } = useCheckedRowsStore();
  async function signInWithAuth0(event: React.SyntheticEvent) {
    event.preventDefault();
    deleteAll();
    await signIn("auth0", {
      // redirect: true,
      callbackUrl: "/dashboard",
    });
  }
  
  if (pathname === "/auth/sign-in") {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 w-full  bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container flex h-14 w-screen justify-between px-4 ">
          <NavigationMenuItem className="flex items-center font-bold">
            <Link href="/" passHref>
              <div className="flex items-center">
                <LawAssistantLogo />
                <span className="ml-2">CodeX</span>

                {/* Added span around text for better control */}
              </div>
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger className="px-2">
                <Menu
                  className="flex h-5 w-5 md:hidden"
                  onClick={() => setIsOpen(true)}
                >
                  <span className="sr-only">Menu Icon</span>
                </Menu>
              </SheetTrigger>

              <SheetContent side={"left"}>
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold">CodeX</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col items-center justify-center gap-2">
                  {routeList.map(({ href, label }: RouteProps) => (
                    <Link key={label} href={href} passHref>
                      <div
                        onClick={() => setIsOpen(false)}
                        className={buttonVariants({ variant: "ghost" })}
                        role="button"
                      >
                        {label}
                      </div>
                    </Link>
                  ))}
                  <Link href="/auth/sign-in" passHref>
                    <div
                      className={`w-[110px] border ${buttonVariants({ variant: "secondary" })} cursor-pointer`}
                      role="button"
                    >
                      <UserIcon className="mr-2 h-5 w-5" />
                      Sign In
                    </div>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </span>

          {/* desktop */}
          <nav className="hidden gap-2 md:flex">
            {routeList.map((route: RouteProps, i) => (
              <Link href={route.href} key={i} passHref>
                <div
                  className={`text-[17px] ${buttonVariants({ variant: "ghost" })} cursor-pointer`}
                  role="button"
                >
                  {route.label}
                </div>
              </Link>
            ))}
          </nav>

          <div className="hidden gap-2 md:flex">
            <div
              className={`border ${buttonVariants({ variant: "secondary" })} cursor-pointer`}
              role="button"
              onClick={signInWithAuth0}
            >
              <UserIcon className="mr-2 h-5 w-5" />
              Sign In
            </div>

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
