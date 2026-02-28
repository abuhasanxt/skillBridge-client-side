import Carousel from "@/components/modules/home/Carousel";
import FAQ from "@/components/modules/home/faq";
import TutorCard from "@/components/modules/home/tutorProfileCard";
import { Button } from "@/components/ui/button";
import { tutorProfileService } from "@/services/tutorProfile.service";
import { TutorProfile } from "@/types";

export default async function Home() {
  const { data } = await tutorProfileService.getTutorProfile();
  return (
   <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black p-6 space-y-6">
  {/* Carousel on top */}
  <div className="w-full mx-auto">
    <Carousel />
  </div>

  {/* Button (optional) */}
  <div className="flex justify-center">
    <Button>Click Here</Button>
  </div>

  {/* Tutor Cards: horizontal scroll */}
  <div className="">
    {data?.data?.map((tutorProfile: TutorProfile) => (
      <div key={tutorProfile.id} className="flex-shrink-0 w-80">
        <TutorCard tutor={tutorProfile} />
      </div>
    ))}
  </div>

  <div>
    <FAQ></FAQ>
  </div>
</div>
  );
}
