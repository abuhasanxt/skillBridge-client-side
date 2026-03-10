import { cookies } from "next/headers";
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const ownProfile = {
  getOwnProfile: async function () {
    try {
      const cookieStore = cookies();
      const token = (await cookieStore).get("better-auth.session_token")?.value;
    

      const res = await fetch(`${API_URL}/api/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          cookie: `better-auth.session_token=${token}`,
        },
        cache: "no-store",
      });

      const data = await res.json();
      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
