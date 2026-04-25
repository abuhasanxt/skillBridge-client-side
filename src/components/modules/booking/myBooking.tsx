"use client";

import { format, isValid } from "date-fns";
import { BookOpen, CalendarDays, Clock, Banknote } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  notes: string;
  status: string;
  tutor: {
    subject: string[];
  };
}

export default function MyBookings({
  bookings = [],
}: {
  bookings?: Booking[];
}) {
  const formatDate = (dateStr: string, formatStr: string) => {
    const date = new Date(dateStr);
    return isValid(date) ? format(date, formatStr) : "N/A";
  };

  if (!bookings || bookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="bg-muted p-4 rounded-full mb-4">
          <BookOpen className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-semibold">No bookings found</h2>
        <p className="text-muted-foreground max-w-sm mt-2">
          It looks like you haven't booked any tutoring sessions yet.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your tutor sessions.
          </p>
        </div>
        <Badge variant="outline" className="px-4 py-1 text-sm bg-background">
          Total: {bookings.length}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <Card
            key={booking.id}
            className="group hover:shadow-md transition-all duration-300 border-l-4 border-l-primary"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                <Badge
                  className={
                    booking.status === "CONFIRMED"
                      ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border-emerald-200"
                      : "bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-orange-200"
                  }
                  variant="outline"
                >
                  {booking.status}
                </Badge>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
                  #{booking.id.slice(-6)}
                </span>
              </div>
              <CardTitle className="text-xl font-bold capitalize">
                {booking.tutor?.subject?.[0] || "General"} Session
              </CardTitle>
              <CardDescription className="line-clamp-1">
                Subjects: {booking.tutor?.subject?.join(", ") || "N/A"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 border-y py-4 my-2">
                <div className="space-y-1">
                  <div className="flex items-center text-muted-foreground text-xs gap-1">
                    <CalendarDays className="w-3 h-3" /> Date
                  </div>
                  <p className="text-sm font-semibold">
                    {formatDate(booking.startDate, "MMM dd, yyyy")}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-muted-foreground text-xs gap-1">
                    <Clock className="w-3 h-3" /> Time
                  </div>
                  <p className="text-sm font-semibold">
                    {formatDate(booking.startDate, "p")}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center bg-primary/5 p-3 rounded-lg border border-primary/10">
                <div className="flex items-center gap-2">
                  <Banknote className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Total Amount</span>
                </div>
                <span className="text-lg font-bold text-primary">
                  ৳{booking.totalPrice?.toLocaleString() || 0}
                </span>
              </div>
              {booking.notes && (
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    Your Notes
                  </p>
                  <p className="text-sm bg-muted/40 p-2 rounded italic text-muted-foreground border-l-2 border-muted">
                    "{booking.notes}"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
