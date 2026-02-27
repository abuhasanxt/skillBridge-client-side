import * as React from "react";


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { adminRoutes } from "@/routes/adminRoutes";
import { studentRoutes } from "@/routes/studentRoutes";
import { tutorRoutes } from "@/routes/tutorRoutes";

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Overview",
      url: "/",
      items: [
        {
          title: "Booking",
          url: "/dashboard/bookings",
        },
        {
          title: "Profile",
          url: "/dashboard/profile",
        },
      ],
    },
   
  ],
};

export function AppSidebar({
  user,
   ...props 
  } : {
    user:{role:string} & React.ComponentProps<typeof Sidebar>;
  }) {
let routes=[]

    switch (user.role) {
      case "admin":
        routes=adminRoutes
        
        break;
      case "student":
        routes=studentRoutes
        
        break;
      case "tutor":
        routes=tutorRoutes
        
        break;
    
      default:
        routes=[]
        break;
    }
  return (
    <Sidebar {...props}>
    
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild >
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
