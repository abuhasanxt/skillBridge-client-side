import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const createAvailability = async (payload: any) => {
  try {
    const res = await fetch(`${API_URL}/availability`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload), 
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