import SectionTitle from "@/components/SectionTitle";

type SectionProps = {
  children: React.ReactNode;
  title: string;
  rightContent?: React.ReactNode;
};

export default function Section({
  children,
  title,
  rightContent,
}: SectionProps) {
  return (
    <div className="space-y-8">
      <SectionTitle title={title} rightContent={rightContent} />

      <div>{children}</div>
    </div>
  );
}
