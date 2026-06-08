"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { tutorProfileService } from "@/services/tutorProfile.service";
import TutorCard from "./tutorProfileCard";
import { TutorProfile } from "@/types";

export default function HomeSearch() {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<TutorProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    async function fetchTutors() {
      const { data } = await tutorProfileService.getTutorProfile();
      const validTutors = (data?.data || []).filter(
        (t: TutorProfile) => t,
      );
      setTutors(validTutors);
      setFilteredTutors([]);
    }
    fetchTutors();
  }, []);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    const numericTerm = Number(term);

    const isNumeric = term !== "" && !isNaN(numericTerm);

    const filtered = tutors.filter((t) => {
      const bioMatch = (t.bio || "").toLowerCase().includes(term);
      const subjectMatch = (t.subject ?? []).some((s) =>
        s.toLowerCase().includes(term),
      );
      const ratingMatch = isNumeric && t.rating >= numericTerm;
      const priceMatch = isNumeric && t.hourlyPrice <= numericTerm;

      return bioMatch || subjectMatch || ratingMatch || priceMatch;
    });

    setFilteredTutors(filtered);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Search Tutors</h2>

      <div className="max-w-md mx-auto flex gap-2 mb-6">
        <Input
          placeholder="Search by bio, subject, rating or price..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {filteredTutors.length > 0 ? (
          filteredTutors.map((t) => <TutorCard key={t.id} tutor={t} />)
        ) : (
          <p className="text-center col-span-full text-gray-500">
            {searchTerm ? "No tutors found." : "Start searching to see tutors."}
          </p>
        )}
      </div>
    </div>
  );
}
