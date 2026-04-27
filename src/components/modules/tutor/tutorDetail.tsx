"use client";

import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type Availability = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
};
type TutorProfile = {
  bio: string;
  subject: string[];
  hourlyPrice: number;
  rating: number;
  categories: Category[];
  availability: Availability[];
};

type Tutor = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  phone: string | null;
  tutorProfile: TutorProfile;
};

interface Props {
  tutor: Tutor;
}

export default function TutorDetailsCard({ tutor }: Props) {
  const profile = tutor.tutorProfile;

  return (
    <Card className="max-w-3xl mx-auto shadow-xl rounded-2xl">
      {/* Header */}
      <CardHeader className="flex flex-col items-center text-center space-y-3">
        {tutor.image ? (
          <Image
            src={tutor.image}
            alt={tutor.name}
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold">
            {tutor.name[0]}
          </div>
        )}

        <CardTitle className="text-2xl">{tutor.name}</CardTitle>
        <CardDescription>{tutor.email}</CardDescription>

        {tutor.phone && (
          <p className="text-sm text-muted-foreground">📞 {tutor.phone}</p>
        )}
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-6">
        {/* Bio */}
        <div>
          <h3 className="font-semibold text-lg mb-1">Bio</h3>
          <p className="text-sm text-muted-foreground">{profile.bio}</p>
        </div>

        {/* Subjects */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Subjects</h3>
          <div className="flex flex-wrap gap-2">
            {profile.subject.map((sub, i) => (
              <Badge key={i}>{sub}</Badge>
            ))}
          </div>
        </div>

        {/* Price + Rating */}
        <div className="flex gap-6">
          <p>💰 Hourly: ${profile.hourlyPrice}</p>
          <p>⭐ Rating: {profile.rating}</p>
        </div>

        {/* Availability */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Availability</h3>

          {profile.availability?.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No availability set yet
            </p>
          ) : (
            <div className="space-y-3">
              {profile.availability.map((slot) => (
                <Card key={slot.id} className="p-3 bg-muted">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{slot.day}</p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-green-500">
                          StartDate:
                        </span>{" "}
                        {new Date(slot.startTime).toLocaleDateString()}
                        <br />
                        <span className="font-medium text-green-500">
                          EndDate:
                        </span>{" "}
                        {new Date(slot.endTime).toLocaleDateString()}
                        <br />
                        <span className="font-medium text-green-500">
                          StartTime:
                        </span>{" "}
                        {new Date(slot.startTime).toLocaleTimeString()} -{" "}
                        {new Date(slot.endTime).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
        {/* Categories */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Categories</h3>
          <div className="space-y-3">
            {profile.categories.map((cat) => (
              <Card key={cat.id} className="p-3 bg-muted">
                <p className="font-semibold">{cat.name}</p>
                <p className="text-sm text-muted-foreground">
                  {cat.description}
                </p>
                <p className="text-sm font-medium mt-1">Price: ${cat.price}</p>
                <div className="flex items-center justify-between">
                  <Link href={`/booking/${tutor.id}?categoryId=${cat.id}`}>
                    <Button> Booking now</Button>
                  </Link>

                  <Link href={`/review/${tutor.id}?categoryId=${cat.id}`}>
                    <Button>Review</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
