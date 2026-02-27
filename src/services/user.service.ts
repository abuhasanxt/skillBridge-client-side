
import { cookies } from "next/headers";
const AUTH_API=process.env.AUTH_URL
export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${AUTH_API}/get-session`, {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();

      if (session===null) {
        return {data:null,error:{message:"session is missing"}}
      }

      return { data: session, error: null };

    } catch (error) {
      console.error(error);
      return { data: null, error: { message: "something went wrong" } };
    }
  },
};
