"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Category } from "@/types";

interface CategoryProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryProps) {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-lg font-bold text-primary">${category.price}</p>

        <Button asChild className="mt-4 w-full">
          <Link href={`/tutors/${category.tutors.authorId}`}>
            View Tutor Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
