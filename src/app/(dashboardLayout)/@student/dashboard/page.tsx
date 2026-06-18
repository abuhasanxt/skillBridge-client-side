"use client";

import { bookings } from "@/services/booking.service";
import { useEffect, useState } from "react";
import { CheckCircle, BookOpen, Check, X } from "lucide-react";

type Booking = {
  id: string;
  status: string;
  title: string;
  startDate: string;
  tutor: {
    id: string;
    bio: string;
    subject: string[];
    user: {
      name?: string;
      email?: string;
    };
  };
};

export default function StudentDashboard() {
  const [bookingsData, setBookingsData] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await bookings.getMyBooking();

        setBookingsData(result?.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // counts
  const cancelBookings = bookingsData.filter(
    (b) => b.status === "CANCELLED",
  ).length;

  const confirmBookings = bookingsData.filter(
    (b) => b.status === "CONFIRMED",
  ).length;

  const completedBookings = bookingsData.filter(
    (b) => b.status === "COMPLETED",
  ).length;

  return (
    <div className="space-y-6 p-6">
      {/* Welcome */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your tutoring sessions, track bookings, and stay on top of your
          learning journey.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Bookings</span>
            <BookOpen className="h-5 w-5" />
          </div>

          <h2 className="mt-3 text-3xl font-bold">
            {loading ? "..." : bookingsData.length}
          </h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Cancelled</span>
            <X className="h-5 w-5 text-red-500" />
          </div>

          <h2 className="mt-3 text-3xl font-bold">
            {loading ? "..." : cancelBookings}
          </h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Completed</span>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>

          <h2 className="mt-3 text-3xl font-bold">
            {loading ? "..." : completedBookings}
          </h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Confirmed</span>
            <Check className="h-5 w-5 text-blue-500" />
          </div>

          <h2 className="mt-3 text-3xl font-bold">
            {loading ? "..." : confirmBookings}
          </h2>
        </div>
      </div>

      {/* Recent / Upcoming (dynamic example) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Upcoming Bookings</h2>

          <div className="space-y-3">
            {bookingsData
              .filter((b) => b.status === "CONFIRMED")
              .slice(0, 2)
              .map((b) => (
                <div key={b.id} className="rounded-lg border p-4">
                  <p className="font-medium">
                    {b.tutor?.subject?.join(", ") || "Session"}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Tutor: {b.tutor?.user?.name || "N/A"}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {new Date(b.startDate).toLocaleString()}
                  </p>
                </div>
              ))}
          </div>
        </div>

        {/* Recent */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>

          <div className="space-y-4">
            {bookingsData.slice(0, 3).map((b, i) => (
              <div key={i} className="border-l-4 pl-4">
                <p className="font-medium">{b.status}</p>
                <p className="text-sm text-muted-foreground">
                  {b.title || "Booking update"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
