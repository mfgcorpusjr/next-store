import Link from "next/link";
import { LucideTextAlignJustify } from "lucide-react";
import { SignedOut, SignedIn, SignInButton, SignUpButton } from "@clerk/nextjs";

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

export default function LinksDropdown() {
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
          {links.map((link) => (
            <DropdownMenuItem asChild key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
