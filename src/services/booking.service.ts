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
