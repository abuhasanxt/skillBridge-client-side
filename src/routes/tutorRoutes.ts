import { Routes } from "@/types";

export const tutorRoutes:Routes[]=[
    {
      title: "Tutor Management",
      items: [
        {
          title: "Overview",
          url: "/tutor/dashboard",
        },
        {
          title: "Bookings",
          url: "/tutor/bookings",
        },
        {
          title: "Availability",
          url: "/tutor/availability",
        },
        {
          title: "Create Category",
          url: "/tutor/category",
        },
        {
          title: "Create Profile",
          url: "/tutor/create-profile",
        },
        {
          title: "Profile",
          url: "/tutor/profile",
        },
        {
          title: "Home",
          url: "/",
        },
      ],
    },
   
  ]