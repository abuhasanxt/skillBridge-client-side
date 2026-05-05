"use server"
// import { env } from "@/env";

// const AUTH_URL = env.NEXT_PUBLIC_AUTH_URL;

export const Session = {
  getSession: async function (cookieHeader: string) {
    try {
      const res = await fetch(`https://skill-bridge-server-lac.vercel.app/api/auth/get-session`, {
        headers: {
          cookie: cookieHeader,
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (!session) {
        return {
          data: null,
          error: { message: "session is missing" },
        };
      }

      return {
        data: session,
        error: null,
      };
    } catch (error) {
      console.error(error);

      return {
        data: null,
        error: { message: "something went wrong" },
      };
    }
  },
};