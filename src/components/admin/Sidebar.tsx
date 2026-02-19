"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { links } from "@/components/admin/utils/data";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4">
      {links.map((link) => {
        const isActive = link.href === pathname;

        return (
          <Button
            key={link.href}
            asChild
            variant={isActive ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <Link href={link.href}>{link.label}</Link>
          </Button>
        );
      })}
    </div>
  );
}
