type EmptyListProps = {
  text?: string;
};

export default function EmptyList({
  text = "No data to display",
}: EmptyListProps) {
  return <p className="text-muted-foreground">{text}</p>;
}
