// "use client";

// import { useState, useEffect } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { tutorProfileService } from "@/services/tutorProfile.service";
// import { Tutor } from "@/types";
// import TutorCard from "./tutorProfileCard";

// // types
// export type Category = {
//   id: string;
//   name: string;
//   price: number;
//   description: string;
//   tutorProfileId: string;
//   createdAt: string;
// };

// export type TutorProfile = {
//   id: string;
//   bio: string;
//   subject: string[];
//   hourlyPrice: number;
//   rating: number;
//   authorId: string;
//   tutor: Tutor;
//   createdAt: string;
//   updatedAt: string;
//   categories: Category[];
// };

// export default function HomeSearch() {
//   const [tutors, setTutors] = useState<TutorProfile[]>([]);

//   const [searchTerm, setSearchTerm] = useState<string>("");
//   console.log("🚀 ~ HomeSearch ~ searchTerm:", searchTerm);
//   const [filteredTutors, setFilteredTutors] = useState<TutorProfile[]>([]);

//   // fetch tutors
//   useEffect(() => {
//     async function fetchTutors() {
//       const { data } = await tutorProfileService.getTutorProfile();
//       console.log("🚀 API data:", data);
//       setTutors(data?.data || []);
//       setFilteredTutors([]); // initially nothing shown
//     }
//     fetchTutors();
//   }, []);

//   const handleSearch = () => {
//     const filtered = tutors.filter((t) => {
//       const bioMatch = t.bio.toLowerCase().includes(searchTerm.toLowerCase());
//       const subjectMatch = t.subject.some((s) =>
//         s.toLowerCase().includes(searchTerm.toLowerCase()),
//       );
//       return bioMatch || subjectMatch;
//     });
//     setFilteredTutors(filtered);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-3xl font-bold text-center mb-6">Search Tutors</h2>

//       {/* Search Bar */}
//       <div className="max-w-md mx-auto flex gap-2 mb-6">
//         <Input
//           placeholder="Search by bio or subject..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//         <Button onClick={handleSearch}>Search</Button>
//       </div>

//       {/* Tutors Grid */}
//       <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
//         {filteredTutors.length > 0 ? (
//           filteredTutors.map((t) => <TutorCard key={t.id} tutor={t} />)
//         ) : (
//           <p className="text-center col-span-full text-gray-500">
//             {searchTerm ? "No tutors found." : "Start searching to see tutors."}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { tutorProfileService } from "@/services/tutorProfile.service";
import TutorCard from "./tutorProfileCard";


export type Category = {
  id: string;
  name: string;
  price: number;
  description: string;
  tutorProfileId: string;
  createdAt: string;
};

export type TutorProfile = {
  id: string;
  bio: string;
  subject: string[];
  hourlyPrice: number;
  rating: number;
  authorId: string;
  tutor?: Tutor;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
};

export type Tutor = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  isBanned: boolean;
  role: string;
  phone: string | null;
  tutorProfile?: TutorProfile;
};

export default function HomeSearch() {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [filteredTutors, setFilteredTutors] = useState<TutorProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // fetch tutors
  useEffect(() => {
    async function fetchTutors() {
      const { data } = await tutorProfileService.getTutorProfile();
      const validTutors = data?.data?.filter((t: TutorProfile) => t);
      setTutors(validTutors || []);
      setFilteredTutors([]); // initially empty
    }
    fetchTutors();
  }, []);

  // handle single input search
  const handleSearch = () => {
    const filtered = tutors.filter((t) => {
      const term = searchTerm.toLowerCase();

      // match bio
      const bioMatch = t.bio.toLowerCase().includes(term);

      // match subjects
      const subjectMatch = t.subject.some((s) => s.toLowerCase().includes(term));

      // match rating (if user types a number)
      const numericTerm = Number(term);
      const ratingMatch = !isNaN(numericTerm) && t.rating >= numericTerm;

      // match price
      const priceMatch = !isNaN(numericTerm) && t.hourlyPrice <= numericTerm;

      // match name if tutor info available
      const nameMatch = t.tutor?.name?.toLowerCase().includes(term) ?? false;

      return bioMatch || subjectMatch || ratingMatch || priceMatch || nameMatch;
    });

    setFilteredTutors(filtered);
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Search Tutors</h2>

      {/* Single Search Bar */}
      <div className="max-w-md mx-auto flex gap-2 mb-6">
        <Input
          placeholder="Search by name, bio, subject, rating or price..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {/* Tutors Grid */}
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