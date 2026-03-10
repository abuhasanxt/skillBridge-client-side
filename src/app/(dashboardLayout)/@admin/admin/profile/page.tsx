
import GetOwnProfile from "@/components/modules/ownProfile/getOwnProfile";
import { ownProfile } from "@/services/ownProfile.service";
export const dynamic = "force-dynamic";

export default async function Page() {
  const res = await ownProfile.getOwnProfile();

  return (
    <div className="px-4">
      <GetOwnProfile user={res.data.user} />
    </div>
  );
}