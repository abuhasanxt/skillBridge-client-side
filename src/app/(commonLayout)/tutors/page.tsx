import { tutorProfileService } from "@/services/tutorProfile.service";

export const dynamic="force-dynamic"
export default async function TutorPage() {

  const {data}=await tutorProfileService.getTutorProfile()
  console.log("🚀 ~ TutorPage ~ data:", data)
  
  return (
    <div>
      This is tutor Component
    </div>
  );
}