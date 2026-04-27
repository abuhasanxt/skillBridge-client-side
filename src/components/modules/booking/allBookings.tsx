"use client";

import { allBooking,  getAllBooking,  } from "@/services/booking.service";
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

export default function GetAllBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    const { data, error } = await getAllBooking.admin();

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
      const res = await allBooking.status(id, status);
      

      if (res?.data) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === id ? { ...b, status: status } : b,
          ),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">All Bookings</h2>

      {/*  DESKTOP TABLE */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border rounded-lg overflow-hidden">
          <thead className=" text-left">
            <tr>
              <th className="p-3">Student</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Start</th>
              <th className="p-3">End</th>
              <th className="p-3 ">Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t hover:bg-gray-600">
                <td className="p-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                    {b.student.name.charAt(0).toUpperCase()}
                  </div>
                  {b.student.name}
                </td>

                <td className="p-3">{b.student.email}</td>
                <td className="p-3">{b.student.phone}</td>
                <td className="p-3">
                  {new Date(b.startDate).toLocaleString()}
                </td>
                <td className="p-3">{new Date(b.endDate).toLocaleString()}</td>

                <td className="p-3">
                  <select
                    value={b.status}
                    onChange={(e) => handleStatusChange(b.id, e.target.value)}
                    className="border bg-green-500 px-2 py-1 rounded-md text-sm"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  MOBILE CARD */}
      <div className="lg:hidden md:block space-y-4">
        {bookings.map((b) => (
          <div key={b.id} className=" shadow-md bg-white rounded-xl p-4 border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {b.student.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3 className="font-semibold text-black">{b.student.name}</h3>
                <p className="text-xs text-gray-500">{b.student.email}</p>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <b>Phone:</b> {b.student.phone}
              </p>
              <p>
                <b>Start:</b> {new Date(b.startDate).toLocaleString()}
              </p>
              <p>
                <b>End:</b> {new Date(b.endDate).toLocaleString()}
              </p>
            </div>

            <div className="mt-3">
              <select
                value={b.status}
                onChange={(e) => handleStatusChange(b.id, e.target.value)}
                className="bg-amber-400 border px-3 py-2 rounded-md text-sm"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
