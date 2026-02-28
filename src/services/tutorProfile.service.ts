import { env } from "@/env"

const API_URL=env.API_URL


export const tutorProfileService={
    getTutorProfile:async function(){

        try {
            
            const res= await fetch(`${API_URL}/tutor/profile`)
            const data=await res.json()


            return {data:data,error:null}
        } catch (error) {
            return {data:null,error:{message:"Something Went Wrong"}}
        }
    }
}