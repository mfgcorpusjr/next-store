import { Input } from "@/components/ui/input";

export default function Search() {
  return (
    <Input
      type="search"
      placeholder="Search product"
      className="max-w-xs dark:bg-muted"
    />
  );
}
