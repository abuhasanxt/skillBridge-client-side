"use server";

import { cookies } from "next/headers";
import {
  tutorProfileCreateService,
  ProfileData,
} from "@/services/tutorProfile.service";

export const createTutorProfile = async (data: ProfileData) => {
  const cookieStore = await cookies();

  const sessionToken = cookieStore.get("better-auth.session_token")?.value;

  const res = await tutorProfileCreateService.createTutorProfile(
    data,
    sessionToken,
  );

  return res;
};
