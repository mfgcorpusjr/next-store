import { LucideLoaderCircle } from "lucide-react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-24">
      <LucideLoaderCircle className="size-16 animate-spin" />
    </div>
  );
}
