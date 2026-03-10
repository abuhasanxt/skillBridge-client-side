"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TutorProfile } from "@/types";

type User = {
  name: string;
  email: string;
  role: string;
  phone: string;
  image?: string;
  tutorProfile: TutorProfile;
};

interface TutorProfileCardProps {
  user: User;
}

export default function GetOwnProfile({ user }: TutorProfileCardProps) {
  const { name, email, phone, role, image, tutorProfile } = user;

  return (
    <Card className="max-w-md mx-auto my-8 shadow-lg border border-gray-200 rounded-xl overflow-hidden">
      {/* Profile Image / Avatar */}
      <div className="flex justify-center mt-6">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-4 border-indigo-500 shadow-md"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-3xl border-4 border-indigo-500 shadow-md">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Header */}
      <CardHeader className="text-center mt-4">
        <CardTitle className="text-xl font-semibold">Name: {name}</CardTitle>
        <CardDescription className="text-indigo-600 font-medium">
          Role:{role}
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-4 px-6 mt-2">
        <div className="text-center">
          <p className="text-sm text-muted-foreground font-medium">Email</p>
          <p className="">{email}</p>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground font-medium">
            Phone:{phone}
          </p>
        </div>

        {tutorProfile?.bio && (
          <div>
            <p className="text-md text-muted-foreground font-medium">Bio : </p>
            <p>{tutorProfile.bio}</p>
          </div>
        )}

        <div className="flex justify-between items-center mt-2">
          {tutorProfile?.hourlyPrice && (
            <div className="flex items-center gap-5">
              <p className="text-sm text-muted-foreground font-medium">
                Hourly Price
              </p>
              <p className="text-indigo-600 font-semibold">
                ${tutorProfile?.hourlyPrice ?? "N/A"}
              </p>
            </div>
          )}

          {tutorProfile?.subject && (
            <div>
              <p className="text-sm text-muted-foreground font-medium">
                Subjects :{" "}
              </p>
              <div className="flex flex-wrap gap-2 mt-1 justify-end">
                {tutorProfile?.subject?.length ? (
                  tutorProfile.subject.map((sub) => (
                    <Badge
                      key={sub}
                      variant="outline"
                      className="text-indigo-700 border-indigo-300"
                    >
                      {sub}
                    </Badge>
                  ))
                ) : (
                  <span className="text-gray-400">No subjects</span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-center pb-6">
        <Button
          variant="default"
          className="hover:bg-indigo-600 hover:text-white transition-colors"
        >
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
}
