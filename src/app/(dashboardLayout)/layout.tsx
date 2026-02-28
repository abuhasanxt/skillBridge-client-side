"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

type DashboardLayoutProps = {
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
  user?: {
    role: "admin" | "student" | "tutor";
  };
};

export default function DashboardLayout({
  admin,
  student,
  tutor,
  user,
}: DashboardLayoutProps) {
  const currentUser = user ?? { role: "tutor" };

  return (
    <SidebarProvider>
      <AppSidebar user={currentUser} />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {currentUser.role === "admin"
            ? admin
            : currentUser.role === "tutor"
              ? tutor
              : student}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
