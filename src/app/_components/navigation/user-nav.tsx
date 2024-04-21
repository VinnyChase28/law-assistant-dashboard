import Link from "next/link";

import { Avatar, AvatarFallback } from "@components/ui/avatar";
import { Button } from "@components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@components/ui/dropdown-menu";
import { getServerAuthSession } from "src/server/auth";

import AuthButton from "./sign-in-out";

export async function UserNav() {
  const session = await getServerAuthSession();
  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.user.name ?? "add name in profile"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {session.user.email ?? "add email in profile"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={"/dashboard/settings/"} passHref>
                <DropdownMenuItem asChild>
                  <a>
                    Profile<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </a>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/settings/billing" passHref>
                <DropdownMenuItem asChild>
                  <a>
                    Billing<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </a>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/settings/appearance" passHref>
                <DropdownMenuItem asChild>
                  <a>
                    Appearance<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </a>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/settings/notifications" passHref>
                <DropdownMenuItem asChild>
                  <a>
                    Notifications<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </a>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Link href={"/api/auth/signout"} passHref>
              <DropdownMenuItem asChild>
                <a>
                  Sign Out<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </a>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <AuthButton />
      )}
    </>
  );
}
