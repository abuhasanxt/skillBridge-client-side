// "use client";

// import { getAllBooking } from "@/services/booking.service";
// import { categoryService } from "@/services/category.service";
// import { user } from "@/services/getAllUser.service";
// import {
//   Users,
//   UserCheck,
//   GraduationCap,
//   CalendarDays,
//   Layers3,
// } from "lucide-react";
// import { useEffect, useState } from "react";

// type User = {
//   role: string;
// };
// export default function AdminDashboard() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [bookings, setBookings] = useState([]);
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const res = await user.getAllUser();
//       if (res?.error || !res?.data?.data) {
//         setUsers([]);
//         return;
//       }
//       setUsers(res.data.data);
//     };

//     fetchUsers();
//   }, []);

//   const admin = users.filter((user) => user.role === "ADMIN").length;

//   const tutor = users.filter((user) => user.role === "TUTOR").length;

//   const student = users.filter((user) => user.role === "STUDENT").length;



// useEffect(() => {
//   const fetchBookings = async () => {
//     const res = await getAllBooking.admin();

//     if (res?.error || !res?.data) {
//       setBookings([]);
//       return;
//     }

//     setBookings(res.data);
//   };

//   fetchBookings();
// }, []);

// useEffect(() => {
//   const fetchCategories = async () => {
//     const res = await categoryService.getCategories()


//     if (res?.error || !res?.data.data) {
//       setCategories([]);
//       return;
//     }

//     setCategories(res.data.data);
//   };

//   fetchCategories();
// }, []);


//   return (
//     <div className="space-y-6 p-6">
//       {/* Header */}
//       <div className="rounded-2xl border bg-background p-6 shadow-sm">
//         <h1 className="text-3xl font-bold">Admin Dashboard 🛠️</h1>
//         <p className="mt-2 text-muted-foreground">
//           Monitor users, tutors, bookings, categories, and platform activity.
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
//         <div className="rounded-xl border bg-card p-5 shadow-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">Total Users</span>
//             <Users className="h-5 w-5" />
//           </div>
//           <h2 className="mt-3 text-3xl font-bold">{users.length}</h2>
//         </div>

//         <div className="rounded-xl border bg-card p-5 shadow-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">Total Admins</span>
//             <UserCheck className="h-5 w-5" />
//           </div>
//           <h2 className="mt-3 text-3xl font-bold">{admin}</h2>
//         </div>
//         <div className="rounded-xl border bg-card p-5 shadow-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">Total Tutors</span>
//             <UserCheck className="h-5 w-5" />
//           </div>
//           <h2 className="mt-3 text-3xl font-bold">{tutor}</h2>
//         </div>

//         <div className="rounded-xl border bg-card p-5 shadow-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">Total Students</span>
//             <GraduationCap className="h-5 w-5" />
//           </div>
//           <h2 className="mt-3 text-3xl font-bold">{student}</h2>
//         </div>

//         <div className="rounded-xl border bg-card p-5 shadow-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">Bookings</span>
//             <CalendarDays className="h-5 w-5" />
//           </div>
//           <h2 className="mt-3 text-3xl font-bold">{bookings.length}</h2>
//         </div>

//         <div className="rounded-xl border bg-card p-5 shadow-sm">
//           <div className="flex items-center justify-between">
//             <span className="text-muted-foreground">Categories</span>
//             <Layers3 className="h-5 w-5" />
//           </div>
//           <h2 className="mt-3 text-3xl font-bold">{categories.length}</h2>
//         </div>
//       </div>

//       {/* Details Section */}
//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Recent Activities */}
//         <div className="rounded-2xl border bg-card p-6 shadow-sm">
//           <h2 className="mb-4 text-xl font-semibold">Recent Activities</h2>

//           <div className="space-y-4">
//             <div className="border-l-4 pl-4">
//               <p className="font-medium">New Tutor Registered</p>
//               <p className="text-sm text-muted-foreground">
//                 John Doe joined as a tutor.
//               </p>
//             </div>

//             <div className="border-l-4 pl-4">
//               <p className="font-medium">New Booking Created</p>
//               <p className="text-sm text-muted-foreground">
//                 React Fundamentals session booked.
//               </p>
//             </div>

//             <div className="border-l-4 pl-4">
//               <p className="font-medium">New Category Added</p>
//               <p className="text-sm text-muted-foreground">
//                 Artificial Intelligence category added.
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Platform Summary */}
//         <div className="rounded-2xl border bg-card p-6 shadow-sm">
//           <h2 className="mb-4 text-xl font-semibold">Platform Summary</h2>

//           <div className="space-y-5">
//             <div>
//               <div className="mb-2 flex justify-between">
//                 <span>Booking Completion Rate</span>
//                 <span>92%</span>
//               </div>

//               <div className="h-3 rounded-full bg-muted">
//                 <div className="h-3 w-[92%] rounded-full bg-primary"></div>
//               </div>
//             </div>

//             <div>
//               <div className="mb-2 flex justify-between">
//                 <span>Tutor Verification</span>
//                 <span>85%</span>
//               </div>

//               <div className="h-3 rounded-full bg-muted">
//                 <div className="h-3 w-[85%] rounded-full bg-primary"></div>
//               </div>
//             </div>

//             <div>
//               <div className="mb-2 flex justify-between">
//                 <span>User Engagement</span>
//                 <span>78%</span>
//               </div>

//               <div className="h-3 rounded-full bg-muted">
//                 <div className="h-3 w-[78%] rounded-full bg-primary"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import {
  Users,
  UserCheck,
  GraduationCap,
  CalendarDays,
  Layers3,
} from "lucide-react";

import { user } from "@/services/getAllUser.service";
import { getAllBooking } from "@/services/booking.service";
import { categoryService } from "@/services/category.service";
import Loading from "@/components/ui/loading";

type User = {
  role: string;
};

type Booking = {
  _id: string;
};

type Category = {
  _id: string;
  name: string;
};

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [usersRes, bookingsRes, categoriesRes] = await Promise.all([
        user.getAllUser(),
        getAllBooking.admin(),
        categoryService.getCategories(),
      ]);

      setUsers(usersRes?.data?.data || []);
      setBookings(bookingsRes?.data || []);
      setCategories(categoriesRes?.data?.data || []);

      setLoading(false);
    };

    fetchData();
  }, []);

  const adminCount = users.filter((u) => u.role === "ADMIN").length;
  const tutorCount = users.filter((u) => u.role === "TUTOR").length;
  const studentCount = users.filter((u) => u.role === "STUDENT").length;

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
    },
    {
      title: "Admins",
      value: adminCount,
      icon: UserCheck,
    },
    {
      title: "Tutors",
      value: tutorCount,
      icon: UserCheck,
    },
    {
      title: "Students",
      value: studentCount,
      icon: GraduationCap,
    },
    {
      title: "Bookings",
      value: bookings.length,
      icon: CalendarDays,
    },
    {
      title: "Categories",
      value: categories.length,
      icon: Layers3,
    },
  ];

  if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <h1 className="text-3xl font-bold">Admin Dashboard 🛠️</h1>
        <p className="mt-2 text-muted-foreground">
          Monitor users, bookings and categories.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border bg-card p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{item.title}</span>
                <Icon className="h-5 w-5" />
              </div>

              <h2 className="mt-4 text-4xl font-bold">{item.value}</h2>
            </div>
          );
        })}
      </div>

      {/* Dynamic Summary */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            User Distribution
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Admins</span>
              <span className="font-semibold">{adminCount}</span>
            </div>

            <div className="flex justify-between">
              <span>Tutors</span>
              <span className="font-semibold">{tutorCount}</span>
            </div>

            <div className="flex justify-between">
              <span>Students</span>
              <span className="font-semibold">{studentCount}</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold">
            Platform Statistics
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Bookings</span>
              <span className="font-semibold">{bookings.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Categories</span>
              <span className="font-semibold">{categories.length}</span>
            </div>

            <div className="flex justify-between">
              <span>Total Active Users</span>
              <span className="font-semibold">{users.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}