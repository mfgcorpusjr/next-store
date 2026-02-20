import EmptyList from "@/components/EmptyList";
import ReviewListItem from "@/features/review/components/ReviewListItem";

import { Review } from "@/features/review/utils/types";

type ReviewListProps = {
  reviews: Review[];
};

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return <EmptyList />;
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {reviews.map((review) => (
        <ReviewListItem key={review.id} review={review} />
      ))}
    </div>
  );
}
