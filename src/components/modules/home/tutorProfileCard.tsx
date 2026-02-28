"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

type Category = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type Tutor = {
  id: string;
  bio: string;
  subject: string[];
  hourlyPrice: number;
  rating: number;
  categories: Category[];
};

interface TutorCardProps {
  tutor: Tutor;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Tutor Bio</CardTitle>
        <CardDescription>{tutor.bio}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {tutor.subject.map((sub) => (
            <Badge key={sub} variant="secondary">{sub}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 text-yellow-500">
          <Star className="w-4 h-4" /> {tutor.rating} / 5
        </div>

        <p className="font-semibold">Hourly Price: ${tutor.hourlyPrice}</p>

        <div>
          <h4 className="font-medium mb-1">Categories:</h4>
          <ul className="list-disc list-inside space-y-1">
            {tutor.categories.map((cat) => (
              <li key={cat.id}>
                <span className="font-semibold">{cat.name}</span> - ${cat.price} 
                <p className="text-sm text-gray-500">{cat.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}