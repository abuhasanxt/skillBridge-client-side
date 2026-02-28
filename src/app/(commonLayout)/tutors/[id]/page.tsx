import TutorDetailsCard from "@/components/modules/tutor/tutorDetail";
import { tutorDetailService } from "@/services/tutorDetails.service";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TutorDetailsPage({ params }: Props) {
  const { id } = await params;

  const { data } = await tutorDetailService.getTutorDetail(id);

  if (!data?.success) {
    return <div className="p-10 text-red-500">Tutor not found!</div>;
  }

  return (
    <div>
      <h1 className="text-2xl text-center py-5 pb-10 font-bold">
        Tutor Details Page
      </h1>
      <div>
        <TutorDetailsCard tutor={data?.data} />
      </div>
    </div>
  );
}
