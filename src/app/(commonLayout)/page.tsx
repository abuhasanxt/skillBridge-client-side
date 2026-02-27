import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";

export default async function Home() {

  const {data}=await userService.getSession()
  console.log("🚀 ~ Home ~ data:", data)
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button>click here</Button>
    </div>
  );
}
