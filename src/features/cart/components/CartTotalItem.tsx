import { cn } from "@/lib/utils";

type CartTotalItemProps = {
  label: string;
  value: string;
  className?: string;
};

export default function CartTotalItem({
  label,
  value,
  className,
}: CartTotalItemProps) {
  return (
    <div
      className={cn(
        "flex justify-between items-center text-sm pb-2",
        className,
      )}
    >
      <span>{label}:</span>

      <span>{value}</span>
    </div>
  );
}
