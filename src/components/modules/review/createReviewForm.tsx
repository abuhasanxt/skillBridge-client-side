"use client";

import { createReview } from "@/services/review.service";
import { useSearchParams, useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateReviewPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const tutorId = params.tutorId as string; 
  const categoryId = searchParams.get("categoryId") as string;  

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);

    const payload = {
      categoryId,
      rating,
      comment,
    };

    //  correct call
    const res = await createReview(tutorId, payload);

    
    if (!res.success) {
      toast(res.message);
    }

    toast(res.message || "Review submitted!");

    // reset form
    setComment("");
    setRating(5);
  } catch (err: any) {
    toast(err.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-md mx-auto p-6 mt-10 border rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Submit Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Rating */}
        <div>
          <label className="block mb-1  text-sm font-medium">
            Rating
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded-md"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option className="text-green-600" key={r} value={r}>
                {r} Star
              </option>
            ))}
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="block mb-1 text-sm font-medium">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border px-3 py-2 rounded-md"
            rows={4}
            placeholder="Write your experience..."
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}