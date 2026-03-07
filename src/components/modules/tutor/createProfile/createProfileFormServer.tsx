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

export default function CreateProfileFormServer() {
  const createProfile = async (formData: FormData) => {
    "use server";
    console.log(formData.get("name"));
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
              <FieldLabel>Bio</FieldLabel>
              <Input type="text" name="name" />
            </Field>
            <Field>
              <FieldLabel>Subject</FieldLabel>
              <Input type="text" name="name" />
            </Field>
            <Field>
              <FieldLabel>hourlyPrice</FieldLabel>
              <Input type="text" name="name" />
            </Field>
            <Field>
              <FieldLabel>Bio</FieldLabel>
              <Input type="text" name="name" />
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
