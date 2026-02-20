import Section from "@/components/Section";

import ReviewList from "@/features/review/components/ReviewList";

import { getProductReviews } from "@/features/review/utils/actions";

type ProductReviewsProps = {
  productId: string;
};

export default async function ProductReviews({
  productId,
}: ProductReviewsProps) {
  const reviews = await getProductReviews(productId);

  return (
    <Section title="Product Reviews">
      <ReviewList
        reviews={reviews.map((review) => ({
          id: review.id,
          image: review.authorImageUrl,
          name: review.authorName,
          rating: review.rating,
          feedback: review.feedback,
        }))}
      />
    </Section>
  );
}
