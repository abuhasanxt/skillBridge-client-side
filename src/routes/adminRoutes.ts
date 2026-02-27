import { Routes } from "@/types";

export const adminRoutes:Routes[]=[
    {
      title: "Amin Management",
      items: [
        {
          title: "Overview",
          url: "/",
        },
        {
          title: "Users",
          url: "/admin/users",
        },
        {
          title: "Bookings",
          url: "/admin/bookings",
        },
        {
          title: "Categories",
          url: "/admin/categories",
        },
      ],
    },
   
  ]