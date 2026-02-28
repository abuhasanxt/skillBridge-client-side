import { env } from "@/env";

const API_URL = env.API_URL;

export const tutor = {
  getTutor: async function () {
    try {
      const res = await fetch(`${API_URL}/api/tutors`);
      const data = await res.json();

      return { data: data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};
