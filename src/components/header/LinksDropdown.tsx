import Link from "next/link";
import { LucideTextAlignJustify } from "lucide-react";
import { SignedOut, SignedIn, SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import UserIcon from "@/components/header/UserIcon";
import SignOutLink from "@/components/header/SignOutLink";

import { links } from "./utils/data";

export default async function LinksDropdown() {
  const { userId } = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <LucideTextAlignJustify />

          <UserIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <SignedOut>
          <DropdownMenuItem asChild>
            <SignInButton mode="modal">
              <span className="w-full">Sign In</span>
            </SignInButton>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <SignUpButton mode="modal">
              <span className="w-full">Sign Up</span>
            </SignUpButton>
          </DropdownMenuItem>
        </SignedOut>

        <SignedIn>
          {links.map((link) => {
            if (
              link.href === "/admin" &&
              userId !== process.env.ADMIN_USER_ID
            ) {
              return null;
            }

            return (
              <DropdownMenuItem asChild key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </DropdownMenuItem>
            );
          })}

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
