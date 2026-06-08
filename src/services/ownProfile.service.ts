import { cookies } from "next/headers";
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const ownProfile = {
  getOwnProfile: async function () {
    try {
      const cookieStore = await cookies();

      const token =
        cookieStore.get("__Secure-better-auth.session_token")?.value ||
        cookieStore.get("better-auth.session_token")?.value;

      if (!token) {
        return {
          data: null,
          error: { message: "Not authenticated" },
        };
      }

      const cookieHeader = cookieStore
        .getAll()
        .map((c) => `${c.name}=${c.value}`)
        .join("; ");

      const res = await fetch(`${API_URL}/api/me`, {
        method: "GET",
        headers: {
          Cookie: cookieHeader,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        const errorText = await res.text();

        return {
          data: null,
          error: {
            message: `Failed to load profile (${res.status})`,
            details: errorText,
          },
        };
      }

      const data = await res.json();

      return {
        data,
        error: null,
      };
    } catch (error) {
      console.error("Own Profile Error:", error);

      return {
        data: null,
        error: { message: "Something went wrong" },
      };
    }
  },
};
