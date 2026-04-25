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
