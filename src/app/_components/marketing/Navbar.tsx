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
import { LogoIcon } from "./Icons";
import { usePathname } from "next/navigation";

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
    href: "#testimonials",
    label: "Testimonials",
  },
  {
    href: "#pricing",
    label: "Pricing",
  },
  {
    href: "#faq",
    label: "FAQ",
  },
];

const routeListOnSignIn: RouteProps[] = [
  {
    href: "/",
    label: "Home",
  },
];

export const Navbar = () => {
  const pathname = usePathname();
  const isSignIn = pathname === "/auth/sign-in";
  const routes = isSignIn ? routeListOnSignIn : routeList;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container flex h-14 w-screen justify-between px-4 ">
          <NavigationMenuItem className="flex font-bold">
            <Link href="/" passHref>
              <LogoIcon />
            </Link>
            lawassistant.ai
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
                  <SheetTitle className="text-xl font-bold">
                    Law Assistant AI
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-4 flex flex-col items-center justify-center gap-2">
                  {routes.map(({ href, label }: RouteProps) => (
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
            {routes.map((route: RouteProps, i) => (
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
            <Link href="/auth/sign-in" passHref>
              <div
                className={`border ${buttonVariants({ variant: "secondary" })} cursor-pointer`}
                role="button"
              >
                <UserIcon className="mr-2 h-5 w-5" />
                Sign In
              </div>
            </Link>

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
