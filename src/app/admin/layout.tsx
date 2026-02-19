import SectionTitle from "@/components/SectionTitle";
import Sidebar from "@/components/admin/Sidebar";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="space-y-8">
      <SectionTitle text="Admin" />

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-2">
          <Sidebar />
        </div>

        <div className="lg:col-span-10 p-4">{children}</div>
      </div>
    </div>
  );
}
