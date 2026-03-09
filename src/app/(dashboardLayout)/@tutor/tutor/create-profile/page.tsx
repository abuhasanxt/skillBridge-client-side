

import { CreateTutorProfileFormClient } from "@/components/modules/tutor/createProfile/createProfileFormClient";
import CreateProfileFormServer from "@/components/modules/tutor/createProfile/createProfileFormServer";

export default function CreateProfilePage() {
  return (
    <div>
      {/* <CreateProfileFormServer/> */}
      <CreateTutorProfileFormClient></CreateTutorProfileFormClient>
    </div>
  );
}