import Link from "next/link";
import { LucideTextAlignJustify } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { links } from "./utils/data";

export default function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LucideTextAlignJustify />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {links.map((link) => (
          <DropdownMenuItem asChild key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
