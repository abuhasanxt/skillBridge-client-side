import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const createReview = async (tutorId: string, payload: any) => {
  try {
    const res = await fetch(`${API_URL}/api/reviews`, {
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

export const get = {
  review: async function (categoryId: string) {
    try {
      const res = await fetch(
        `${API_URL}/api/reviews?categoryId=${categoryId}`,
        {
          credentials: "include",
          cache: "no-store",
        },
      );
      const data = await res.json();

      return { data: data.data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
