import { Routes } from "@/types";

export const studentRoutes:Routes[]=[
    {
      title: "Student Management",
      items: [
        {
          title: "Overview",
          url: "/",
        },
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
   
  ]