"use client";

import { useTheme } from "next-themes";
import { LucideMoon, LucideSun } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ThemeSwitcher() {
  const { setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() =>
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
      }
    >
      <LucideMoon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

      <LucideSun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
