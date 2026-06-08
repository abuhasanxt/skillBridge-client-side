
import GetOwnProfile from "@/components/modules/ownProfile/getOwnProfile";
import { ownProfile } from "@/services/ownProfile.service";
export const dynamic = "force-dynamic";

export default async function Page() {
  const res = await ownProfile.getOwnProfile();
  const user = res?.data?.user;

  if (!user) {
    return (
      <div className="px-4 py-10 text-center text-muted-foreground">
        Unable to load your profile. Please try again.
      </div>
    );
  }

  return (
    <div className="px-4">
      <GetOwnProfile user={user} />
    </div>
  );
}