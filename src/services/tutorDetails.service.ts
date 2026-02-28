import { env } from "@/env"

const API_URL=env.API_URL


export const tutorDetailService={
    getTutorDetail:async function(id:string){

      try {
    const res = await fetch(`${API_URL}/api/tutors/${id}`, {
      cache: "no-store",
    });

    const data = await res.json();
    return { data, error: null };

  } catch (error) {
    return { data: null, error: { message: "Something went wrong" } };
  }
}
}