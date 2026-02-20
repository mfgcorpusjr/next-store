import { Metadata } from "next";

import Section from "@/components/Section";
import ReviewList from "@/features/review/components/ReviewList";

import { getReviews } from "@/features/review/utils/actions";

export const metadata: Metadata = {
  title: "Reviews",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  return (
    <Section title="Reviews">
      <ReviewList
        reviews={reviews.map((review) => ({
          id: review.id,
          productId: review.product.id,
          image: review.product.image,
          name: review.product.name,
          rating: review.rating,
          feedback: review.feedback,
        }))}
      />
    </Section>
  );
}
