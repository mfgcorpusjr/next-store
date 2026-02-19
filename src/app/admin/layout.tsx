import Section from "@/components/Section";
import Sidebar from "@/components/admin/Sidebar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Section title="Admin">
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-2">
          <Sidebar />
        </div>

        <div className="lg:col-span-10">{children}</div>
      </div>
    </Section>
  );
}
