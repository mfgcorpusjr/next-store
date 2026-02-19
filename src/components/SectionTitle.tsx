import { Separator } from "@/components/ui/separator";

type SectionTitleProps = {
  title: string;
  rightContent?: React.ReactNode;
};

export default function SectionTitle({
  title,
  rightContent,
}: SectionTitleProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>

        {rightContent}
      </div>

      <Separator />
    </div>
  );
}
