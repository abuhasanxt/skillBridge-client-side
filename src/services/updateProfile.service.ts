import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const Profile = {
  getProfile: async function () {
    try {
      const res = await fetch(`${API_URL}/api/me`, {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Failed to load profile" } };
    }
  },

  update: async function (payload: any) {
    try {
      const res = await fetch(`${API_URL}/api/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      return {
        data,
        success: res.ok,
        error: !res.ok ? data : null,
      };
    } catch (error) {
      return {
        data: null,
        success: false,
        error: { message: "Update failed" },
      };
    }
  },
};
