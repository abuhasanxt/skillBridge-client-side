"use client";

import {
  CalendarDays,
  Clock,
  CheckCircle,
  BookOpen,
} from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Welcome */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h1 className="text-3xl font-bold">
          Welcome Back 👋
        </h1>
        <p className="mt-2 text-muted-foreground">
          Manage your tutoring sessions, track bookings, and stay on top of your learning journey.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Total Bookings
            </span>
            <BookOpen className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">24</h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Upcoming Sessions
            </span>
            <CalendarDays className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">5</h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Completed Sessions
            </span>
            <CheckCircle className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">18</h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Learning Hours
            </span>
            <Clock className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">42h</h2>
        </div>
      </div>

      {/* Recent + Upcoming */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Bookings */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Upcoming Bookings
          </h2>

          <div className="space-y-3">
            <div className="rounded-lg border p-4">
              <p className="font-medium">
                React Fundamentals
              </p>
              <p className="text-sm text-muted-foreground">
                Tutor: John Doe
              </p>
              <p className="text-sm text-muted-foreground">
                Aug 15, 8:00 PM
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="font-medium">
                JavaScript Advanced
              </p>
              <p className="text-sm text-muted-foreground">
                Tutor: Sarah Smith
              </p>
              <p className="text-sm text-muted-foreground">
                Aug 17, 7:30 PM
              </p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Recent Activity
          </h2>

          <div className="space-y-4">
            <div className="border-l-4 pl-4">
              <p className="font-medium">
                Session Completed
              </p>
              <p className="text-sm text-muted-foreground">
                HTML & CSS Basics with Alex
              </p>
            </div>

            <div className="border-l-4 pl-4">
              <p className="font-medium">
                New Booking Confirmed
              </p>
              <p className="text-sm text-muted-foreground">
                React Fundamentals
              </p>
            </div>

            <div className="border-l-4 pl-4">
              <p className="font-medium">
                Payment Successful
              </p>
              <p className="text-sm text-muted-foreground">
                Booking #1023
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}