"use client";

import { createTutorProfile } from "@/actions/tutorProfile.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";

import { toast } from "sonner";
import { z } from "zod";

const tutorProfileSchema = z.object({
  hourlyPrice: z.coerce.number().min(1, "Price is required"),
  subject: z.string().min(1, "Subject is required"),
  bio: z
    .string()
    .min(10, "Bio must be at least 10 characters")
    .max(5000, "Bio must be less than 5000 characters"),
});

export function CreateTutorProfileFormClient() {
  const form = useForm({
    defaultValues: {
      hourlyPrice: 0,
      subject: "",
      bio: "",
    },

    validators: {
      onSubmit: tutorProfileSchema,
    },

    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating....");

      const profileData = {
        hourlyPrice: value.hourlyPrice,
        subject: value.subject
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
        bio: value.bio || undefined,
      };

      try {
        const res = await createTutorProfile(profileData);

        if (res.error || !res.data?.success) {
          toast.error(res.data?.details || res.error?.message, { id: toastId });
          return;
        }

        toast.success("Profile Created", { id: toastId });
      } catch (err) {
        toast.error("Something Went Wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Tutor Profile</CardTitle>
        <CardDescription>Fill your tutor profile information</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="create-profile-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Hourly Price */}
            <form.Field name="hourlyPrice">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Hourly Price</FieldLabel>

                    <Input
                      type="number"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
                      }
                      placeholder="Hourly price"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Subject */}
            <form.Field name="subject">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Subjects (comma separated)
                    </FieldLabel>

                    <Input
                      type="text"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="bangla, english, math"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Bio */}
            <form.Field name="bio">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Bio (optional)</FieldLabel>

                    <Textarea
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Write about yourself"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
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
