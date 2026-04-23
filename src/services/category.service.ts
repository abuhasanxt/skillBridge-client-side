import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const categoryService = {
  getCategories: async function () {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};

export const createCategory = async (payload: any) => {
  try {
    const res = await fetch(`${API_URL}/category`, {
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
    console.log(error);
    return {
      success: false,
      message: "Something Went Wrong",
      data: null,
      error: error?.message
    };
  }
};
