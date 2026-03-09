import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { env } from "@/env";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { toast } from "sonner";

const API_URL = env.NEXT_PUBLIC_API_URL;

export default function CreateProfileFormServer() {
  const createProfile = async (formData: FormData) => {
    "use server";

    const authorId = formData.get("authorId") as string;
    const hourlyPrice = Number(formData.get("price"));
    const subject = formData.get("subject") as string;
    const bio = formData.get("bio") as string | null;
    const profileData = {
      authorId,
      hourlyPrice,
      subject: subject
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
      bio: bio || undefined,
    };
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/tutor/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieStore.toString(),
      },
      body: JSON.stringify(profileData),
    });
   if (res.ok) {
    revalidateTag("tutorProfile","max")
   }
  };
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Create Profile</CardTitle>
        <CardDescription>You can write your profile</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="create-profile-form" action={createProfile}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="authorId">Author Id</FieldLabel>
              <Input
                id="authorId"
                type="text"
                name="authorId"
                placeholder="author id"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="subject">
                Subject (coma separated)
              </FieldLabel>
              <Input
                id="subject"
                type="text"
                name="subject"
                placeholder="type your subject"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="price">HourlyPrice</FieldLabel>
              <Input
                id="price"
                type="number"
                name="price"
                placeholder="your hourly price"
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="bio">Bio (optional)</FieldLabel>
              <Textarea
                id="bio"
                name="bio"
                placeholder="type your bio"
              ></Textarea>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Button form="create-profile-form" type="submit" className="w-full">
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
