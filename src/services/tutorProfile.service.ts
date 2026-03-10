
import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface ServiceOption {
  cache?: RequestCache;
  revalidate?: number;
}


export const tutorProfileService = {
  getTutorProfile: async function (options?: ServiceOption) {
    try {
      const config: RequestInit = {};

      if (options?.cache) {
        config.cache = options.cache;
      }

      if (options?.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["tutorProfile"] };

      const res = await fetch(`${API_URL}/tutor/profile`, config);

      const data = await res.json();

      return { data, error: null };
    } catch (error) {
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};


export interface ProfileData{
  hourlyPrice:number,
  subject:string[],
  bio?:string
}

export const tutorProfileCreateService = {
  createTutorProfile: async function (profileData: ProfileData, token?: string) {
    try {

      const res = await fetch(`${API_URL}/api/tutor/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          cookie: `better-auth.session_token=${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await res.json();

      return { data, error: null };

    } catch (error) {
      console.log(error);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
};