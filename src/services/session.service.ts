"use server";

import { env } from "@/env";
import { cookies } from "next/headers";
import { getSessionFromCookies } from "@/lib/session";

const AUTH_URL = env.NEXT_PUBLIC_AUTH_URL;

export const Session = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const session = await getSessionFromCookies(
        cookieStore.toString(),
        AUTH_URL,
      );

      if (!session) {
        return { data: null, error: { message: "session is missing" } };
      }

      return { data: session, error: null };
    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "something went wrong" } };
    }
  },
};
