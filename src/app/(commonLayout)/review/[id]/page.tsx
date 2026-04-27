import ReviewCreateForm from "@/components/modules/review/createReviewForm";
import GetReview from "@/components/modules/review/getReview";

export default function Page() {
  return (
    <div>
      <ReviewCreateForm />
      <GetReview></GetReview>
    </div>
  );
}
