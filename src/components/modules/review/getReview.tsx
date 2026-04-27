"use client";

import { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { get } from "@/services/review.service";

type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    name: string;
  };
};

export default function CategoryReviews() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId") as string;

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await get.review(categoryId);
      setReviews(res.data || []);
    };

    if (categoryId) fetchData();
  }, [categoryId]);

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet</p>
      ) : (
        reviews.map((r) => (
          <div
            key={r.id}
            className="flex gap-3 items-start bg-gray-100 p-3 rounded-xl"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {r.user.name.charAt(0).toUpperCase()}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="bg-white p-3 rounded-xl shadow-sm">
                <p className="font-semibold text-black text-sm">
                  {r.user.name}
                </p>

                {/* ⭐ Rating */}
                <p className="text-yellow-500 text-xs">
                  {"⭐".repeat(r.rating)}
                </p>

                <p className="text-sm text-gray-700 mt-1">
                  {r.comment}
                </p>
              </div>

              {/* Time */}
              <p className="text-xs text-gray-400 mt-1 ml-1">
                {new Date(r.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}