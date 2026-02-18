import { Separator } from "@/components/ui/separator";

type SectionTitleProps = {
  text: string;
  rightContent?: React.ReactNode;
};

export default function SectionTitle({
  text,
  rightContent,
}: SectionTitleProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold tracking-tight">{text}</h3>

        {rightContent}
      </div>

      <Separator />
    </div>
  );
}
