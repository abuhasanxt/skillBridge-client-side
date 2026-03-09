"use server"

import { ProfileData, tutorProfileCreateService } from "@/services/tutorProfile.service"
import { updateTag } from "next/cache"


export const createTutorProfile=async(data:ProfileData)=>{
    const res=await tutorProfileCreateService.createTutorProfile(data)
    updateTag("tutorProfile")
    return  res
}