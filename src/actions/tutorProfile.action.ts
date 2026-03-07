"use server"

import { tutorProfileCreateService } from "@/services/tutorProfile.service"

export const createTutorProfile=async()=>{
    return await tutorProfileCreateService.createTutorProfile()
}