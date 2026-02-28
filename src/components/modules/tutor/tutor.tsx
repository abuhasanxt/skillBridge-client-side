"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Tutor } from "@/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";



interface TutorCardProps {
  tutor: Tutor;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="w-80 shadow-lg hover:shadow-xl transition-shadow duration-300 flex-shrink-0">
      <CardHeader className="flex flex-col items-center space-y-2">
        {tutor.image ? (
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <Image
              src={tutor.image}
              alt={tutor.name}
              width={80}
              height={80}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl font-bold">
            {tutor.name[0].toUpperCase()}
          </div>
        )}
        <CardTitle>{tutor.name}</CardTitle>
        <CardDescription>{tutor.role}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm">
          <span className="font-semibold">Email:</span> {tutor.email}
        </p>
        {tutor.phone && (
          <p className="text-sm">
            <span className="font-semibold">Phone:</span> {tutor.phone}
          </p>
        )}
        <div className="flex gap-2">
          {tutor.isBanned ? (
            <Badge variant="destructive">Banned</Badge>
          ) : (
            <Badge variant="secondary">Active</Badge>
          )}
          {tutor.emailVerified && <Badge variant="outline">Verified</Badge>}
        </div>
        <Button className="mt-4 w-full">
            <Link href={`/tutors/${tutor.id}`} >Details</Link>
  
</Button>
      </CardContent>
    </Card>
  );
}