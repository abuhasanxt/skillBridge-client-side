import { AppSidebar } from "@/components/layout/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  admin,
  student,
  tutor,
}: {
  children: React.ReactNode;
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) {
  const user = {
    role: "admin",
  };
  return (
    <SidebarProvider>
      <AppSidebar user={user}/>
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {user.role === "admin" ? admin : student}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
