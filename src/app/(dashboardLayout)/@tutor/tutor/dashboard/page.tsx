"use client";

import {
  CalendarDays,
  Clock,
  DollarSign,
  BookOpen,
  CheckCircle,
  UserCheck,
} from "lucide-react";

export default function TutorDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Welcome Section */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h1 className="text-3xl font-bold">
          Tutor Dashboard 
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your bookings, availability, categories, and tutoring sessions.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Total Bookings
            </span>
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">48</h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Pending Requests
            </span>
            <Clock className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">7</h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Completed Sessions
            </span>
            <CheckCircle className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">41</h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Total Earnings
            </span>
            <DollarSign className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">$2,450</h2>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Availability */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Availability
            </h2>

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              Available
            </span>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monday</span>
              <span>6 PM - 10 PM</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Wednesday</span>
              <span>7 PM - 9 PM</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Friday</span>
              <span>5 PM - 11 PM</span>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">
            Teaching Categories
          </h2>

          <div className="flex flex-wrap gap-2">
            {[
              "React",
              "Next.js",
              "JavaScript",
              "TypeScript",
              "Node.js",
            ].map((category) => (
              <span
                key={category}
                className="rounded-full border px-3 py-1 text-sm"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-semibold">
            Upcoming Sessions
          </h2>

          <div className="mt-4 space-y-4">
            <div className="rounded-lg border p-3">
              <p className="font-medium">
                React Fundamentals
              </p>
              <p className="text-sm text-muted-foreground">
                Student: Hasan
              </p>
              <p className="text-sm text-muted-foreground">
                Today • 8:00 PM
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <p className="font-medium">
                Next.js Deep Dive
              </p>
              <p className="text-sm text-muted-foreground">
                Student: Fahim
              </p>
              <p className="text-sm text-muted-foreground">
                Tomorrow • 7:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Booking Requests */}
      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <UserCheck className="h-5 w-5" />
          <h2 className="text-xl font-semibold">
            Recent Booking Requests
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">
                JavaScript Advanced
              </p>
              <p className="text-sm text-muted-foreground">
                Requested by Ahmed
              </p>
            </div>

            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              Pending
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">
                React Project Review
              </p>
              <p className="text-sm text-muted-foreground">
                Requested by Rahim
              </p>
            </div>

            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              Confirmed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}