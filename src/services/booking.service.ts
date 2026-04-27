import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const createBooking = async (tutorId: string, payload: any) => {
  try {
    const res = await fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...payload, tutorId }),
    });

    const result = await res.json();

    return {
      success: result?.success,
      message: result?.message,
      data: result?.data,
      error: result?.error || null,
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Something Went Wrong",
      data: null,
      error: error?.message,
    };
  }
};

export const bookings = {
  getMyBooking: async function () {
    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (typeof window === "undefined") {
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();
        headers["Cookie"] = cookieStore.toString();
      }

      const res = await fetch(`${API_URL}/api/bookings`, {
        method: "GET",
        headers: headers,
        credentials: "include",
        cache: "no-store",
      });

      const result = await res.json();

      if (res.ok && result.success) {
        return { data: result.data, error: null };
      }
      return { data: [], error: result.message || "Failed to fetch" };
    } catch (error) {
      console.error("Booking Fetch Error:", error);
      return { data: [], error: "Something Went Wrong" };
    }
  },
};

export const getBooking = {
  tutor: async function () {
    try {
      const res = await fetch(`${API_URL}/api/tutor-bookings`, {
        credentials: "include",
      });
      const data = await res.json();

      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};

export const booking = {
  status: async function (bookingId: string, status: string) {
    try {
      const res = await fetch(`${API_URL}/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};

export const allBooking = {
  status: async function (bookingId: string, status: string) {
    try {
      const res = await fetch(`${API_URL}/api/booking/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};

export const getAllBooking = {
  admin: async function () {
    try {
      const res = await fetch(`${API_URL}/api/allBookings`, {
        credentials: "include",
      });
      const data = await res.json();

      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
