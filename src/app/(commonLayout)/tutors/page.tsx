;
import TutorCard from "@/components/modules/tutor/tutor";
import { tutor } from "@/services/tutor.service";
import { Tutor } from "@/types";

export const dynamic = "force-dynamic";

export default async function TutorPage() {
  const { data } = await tutor.getTutor();

  return (
    <div className="px-4 py-8">
      <h2 className="text-4xl text-center font-bold mb-8">Tutor Profiles</h2>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {data?.data?.map((tutorProfile: Tutor) => (
          <TutorCard key={tutorProfile.id} tutor={tutorProfile} />
        ))}
      </div>
    </div>
  );
}