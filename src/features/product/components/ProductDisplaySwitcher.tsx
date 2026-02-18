import Link from "next/link";
import { LucideLayoutGrid, LucideList } from "lucide-react";

import { Button } from "@/components/ui/button";

type ProductDisplaySwitcherProps = {
  search: string;
  layout: string;
};

export default function ProductDisplaySwitcher({
  search,
  layout,
}: ProductDisplaySwitcherProps) {
  const getLink = (layout: string) => {
    const urlSearchParams = new URLSearchParams({
      ...(search && { search }),
      layout,
    });

    return `/products?${urlSearchParams.toString()}`;
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        asChild
        variant={layout === "grid" ? "default" : "ghost"}
        size="icon-sm"
      >
        <Link href={getLink("grid")}>
          <LucideLayoutGrid />
        </Link>
      </Button>

      <Button
        asChild
        variant={layout === "list" ? "default" : "ghost"}
        size="icon-sm"
      >
        <Link href={getLink("list")}>
          <LucideList />
        </Link>
      </Button>
    </div>
  );
}
