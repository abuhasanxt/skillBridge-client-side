"use client";

import Loading from "@/components/ui/loading";
import { getBooking } from "@/services/booking.service";
import { BookOpen, CheckCircle, UserCheck, XCircle, Check } from "lucide-react";
import { useEffect, useState } from "react";

type Booking = {
  id: string;
  status: string;
  startDate: string;
  endDate: string;
  notes: string;
  student?: {
    name: string;
    email: string;
  };
  tutor?: {
    subject: string[];
  };
};

export default function TutorDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);

      const { data, error } = await getBooking.tutor();

      if (!error && data) {
        setBookings(data);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);
  if (loading) {
    return <Loading />;
  }

  const cancelBookings = bookings.filter(
    (booking) => booking.status === "CANCELLED",
  ).length;

  const confirmBookings = bookings.filter(
    (booking) => booking.status === "CONFIRMED",
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED",
  ).length;

  const categories = [
    ...new Set(bookings.flatMap((booking) => booking.tutor?.subject || [])),
  ];

  const stats = [
    {
      title: "Total Bookings",
      value: bookings.length,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      title: "Confirmed",
      value: confirmBookings,
      icon: Check,
      color: "text-green-600",
      bg: "bg-green-100 dark:bg-green-900/30",
    },
    {
      title: "Cancelled",
      value: cancelBookings,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100 dark:bg-red-900/30",
    },
    {
      title: "Completed",
      value: completedBookings,
      icon: CheckCircle,
      color: "text-emerald-600",
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h1 className="text-3xl font-bold">Tutor Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your bookings, sessions and students.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border bg-card p-5 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>

                  <h2 className="mt-2 text-3xl font-bold">{item.value}</h2>
                </div>

                <div className={`rounded-full p-3 ${item.bg}`}>
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Middle Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Categories */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Teaching Categories</h2>

          <div className="flex flex-wrap gap-2">
            {categories.length > 0 ? (
              categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border px-3 py-1 text-sm"
                >
                  {category}
                </span>
              ))
            ) : (
              <p className="text-muted-foreground">No categories found</p>
            )}
          </div>
        </div>

        {/* Recent Students */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Recent Students</h2>

          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="rounded-lg border p-3">
                <p className="font-medium">{booking.student?.name}</p>

                <p className="text-sm text-muted-foreground">
                  {booking.student?.email}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <UserCheck className="h-5 w-5" />

          <h2 className="text-xl font-semibold">Recent Booking Requests</h2>
        </div>

        <div className="space-y-3">
          {bookings.length > 0 ? (
            bookings.slice(0, 5).map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p className="font-medium">{booking.notes}</p>

                  <p className="text-sm text-muted-foreground">
                    Requested by {booking.student?.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {new Date(booking.startDate).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    booking.status === "CONFIRMED"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : booking.status === "COMPLETED"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No bookings found</p>
          )}
        </div>
      </div>
    </div>
  );
}
