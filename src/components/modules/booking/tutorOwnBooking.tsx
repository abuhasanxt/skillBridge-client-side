"use client";

import { booking, getBooking } from "@/services/booking.service";
import { useEffect, useState } from "react";

type Booking = {
  id: string;
  tutorId: string;
  status: string;
  startDate: string;
  endDate: string;
  student: {
    name: string;
    email: string;
    phone: string;
  };
};

const STATUS_OPTIONS = ["CONFIRMED", "COMPLETED", "CANCELLED"];

export default function GetTutorBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    const { data, error } = await getBooking.tutor();

    if (!error && Array.isArray(data)) {
      setBookings(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const res = await booking.status(id, status);

      if (res?.data) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === id ? { ...b, status: res.data.status } : b,
          ),
        );
      }
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Tutor Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-500">No bookings found</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((bookingItem) => (
            <div
              key={bookingItem.id}
              className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition text-center"
            >
              {/* Avatar TOP */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow">
                  {bookingItem.student.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* Name */}
              <h3 className="font-semibold text-lg text-gray-800">
                {bookingItem.student.name}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                {bookingItem.student.email}
              </p>

              <div className="mb-4  ">
                <select
                  value={bookingItem.status}
                  onChange={(e) =>
                    handleStatusChange(bookingItem.id, e.target.value)
                  }
                  className="px-3 py-1 bg-green-400 border rounded-md text-sm"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {/* Details */}
              <div className="text-sm text-gray-600 space-y-1 mt-3">
                <p>
                  <b>Phone:</b> {bookingItem.student.phone}
                </p>
                <p>
                  <b>Start:</b>{" "}
                  {new Date(bookingItem.startDate).toLocaleString()}
                </p>
                <p>
                  <b>End:</b> {new Date(bookingItem.endDate).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
