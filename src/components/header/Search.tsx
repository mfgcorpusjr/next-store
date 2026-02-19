"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "@/components/ui/input";

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  const debounced = useDebouncedCallback((value: string) => {
    const layout = searchParams.get("layout");

    const urlSearchParams = new URLSearchParams({
      ...(search && { search }),
      ...(layout && { layout }),
    });

    router.replace(`/products?${urlSearchParams.toString()}`);
  }, 300);

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams.get("search")]);

  return (
    <Input
      type="search"
      placeholder="Search product"
      className="max-w-xs dark:bg-muted"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        debounced(e.target.value);
      }}
    />
  );
}
