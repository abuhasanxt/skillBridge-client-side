"use client";

import { useEffect, useState } from "react";
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
import { createBooking } from "@/services/booking.service";

import { useForm } from "@tanstack/react-form";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import { tutorDetailService } from "@/services/tutorDetails.service";

const bookingSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  notes: z.string(),
});

export function CreateBookingForm() {
  const { tutorId: user_id } = useParams();
  const searchParams = useSearchParams();

  const queryCategoryId = searchParams.get("categoryId");

  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [tutorProfileId, setTutorProfileId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTutor = async () => {
      const { data, error } = await tutorDetailService.getTutorDetail(
        user_id as string,
      );

      if (error || !data?.success) {
        toast.error("Tutor not found");
        return;
      }

      const tutor = data.data;

      const profileId = tutor?.tutorProfile?.id;
      const selectedCatId =
        queryCategoryId || tutor?.tutorProfile?.categories?.[0]?.id;

      if (!profileId) {
        toast.error("Tutor profile not found");
        return;
      }

      if (!selectedCatId) {
        toast.error("No category found for this tutor");
        return;
      }

      setTutorProfileId(profileId);
      setCategoryId(selectedCatId);
    };

    if (user_id) fetchTutor();
  }, [user_id, queryCategoryId]);

  const form = useForm({
    defaultValues: {
      startDate: "",
      endDate: "",
      notes: "",
    },
    validators: {
      onSubmit: bookingSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating booking...");

      const start = new Date(value.startDate);
      const end = new Date(value.endDate);

      if (end.getTime() <= start.getTime()) {
        toast.error("End date must be after start date", { id: toastId });
        return;
      }

      if (start.getTime() < new Date().getTime()) {
        toast.error("Start date cannot be in the past", { id: toastId });
        return;
      }

      try {
        console.log("🚀 ~ CreateBookingForm ~ categoryId:", categoryId);
        if (!tutorProfileId || !categoryId) {
          toast.error("Missing profile or category information", {
            id: toastId,
          });
          return;
        }

        const payload = {
          startDate: start.toISOString(),
          endDate: end.toISOString(),
          notes: value.notes,
          categoryId: categoryId,
          tutorId: tutorProfileId,
        };

        const res = await createBooking(tutorProfileId, payload);

        if (!res.success) {
          toast.error(res.error || res.message || "Failed", { id: toastId });
          return;
        }

        toast.success("Booking Created Successfully", { id: toastId });
        form.reset();
      } catch (err: any) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Booking</CardTitle>
        <CardDescription>Book your tutor session</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="create-booking-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="startDate">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Start Date</FieldLabel>
                    <Input
                      type="datetime-local"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="endDate">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>End Date</FieldLabel>
                    <Input
                      type="datetime-local"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="notes">
              {(field) => (
                <Field>
                  <FieldLabel>Notes (optional)</FieldLabel>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Write your requirements..."
                  />
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          form="create-booking-form"
          type="submit"
          className="w-full"
          disabled={!tutorProfileId}
        >
          {tutorProfileId ? "Book Now" : "Loading Tutor Info..."}
        </Button>
      </CardFooter>
    </Card>
  );
}
