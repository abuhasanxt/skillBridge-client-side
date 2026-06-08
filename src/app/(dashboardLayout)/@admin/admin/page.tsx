"use client";

import {
  Users,
  UserCheck,
  GraduationCap,
  CalendarDays,
  Layers3,
  DollarSign,
} from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="rounded-2xl border bg-background p-6 shadow-sm">
        <h1 className="text-3xl font-bold">
          Admin Dashboard 🛠️
        </h1>
        <p className="mt-2 text-muted-foreground">
          Monitor users, tutors, bookings, categories, and platform activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Users</span>
            <Users className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">1,245</h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Tutors</span>
            <UserCheck className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">186</h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Students</span>
            <GraduationCap className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">1,059</h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Bookings</span>
            <CalendarDays className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">3,428</h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Categories</span>
            <Layers3 className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">24</h2>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Revenue</span>
            <DollarSign className="h-5 w-5" />
          </div>
          <h2 className="mt-3 text-3xl font-bold">$12,450</h2>
        </div>
      </div>

      {/* Details Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activities */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Recent Activities
          </h2>

          <div className="space-y-4">
            <div className="border-l-4 pl-4">
              <p className="font-medium">
                New Tutor Registered
              </p>
              <p className="text-sm text-muted-foreground">
                John Doe joined as a tutor.
              </p>
            </div>

            <div className="border-l-4 pl-4">
              <p className="font-medium">
                New Booking Created
              </p>
              <p className="text-sm text-muted-foreground">
                React Fundamentals session booked.
              </p>
            </div>

            <div className="border-l-4 pl-4">
              <p className="font-medium">
                New Category Added
              </p>
              <p className="text-sm text-muted-foreground">
                Artificial Intelligence category added.
              </p>
            </div>
          </div>
        </div>

        {/* Platform Summary */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">
            Platform Summary
          </h2>

          <div className="space-y-5">
            <div>
              <div className="mb-2 flex justify-between">
                <span>Booking Completion Rate</span>
                <span>92%</span>
              </div>

              <div className="h-3 rounded-full bg-muted">
                <div className="h-3 w-[92%] rounded-full bg-primary"></div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span>Tutor Verification</span>
                <span>85%</span>
              </div>

              <div className="h-3 rounded-full bg-muted">
                <div className="h-3 w-[85%] rounded-full bg-primary"></div>
              </div>
            </div>

            <div>
              <div className="mb-2 flex justify-between">
                <span>User Engagement</span>
                <span>78%</span>
              </div>

              <div className="h-3 rounded-full bg-muted">
                <div className="h-3 w-[78%] rounded-full bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}