import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const user = {
  getAllUser: async function () {
    try {
      const res = await fetch(`${API_URL}/api/admin/users`, {
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },

  changeRole: async function (id: string, role: string) {
    try {
      const res = await fetch(`${API_URL}/api/role/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ role }),
      });

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Role update failed" } };
    }
  },

  changeIsBanned: async function (id: string, isBanned: boolean) {
    try {
      const res = await fetch(`${API_URL}/api/isBanned/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ isBanned }),
      });

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Ban status update failed" } };
    }
  },
};
