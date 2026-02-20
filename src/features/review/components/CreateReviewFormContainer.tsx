import { auth } from "@clerk/nextjs/server";

import Section from "@/components/Section";
import CreateReviewForm from "@/features/review/components/CreateReviewForm";

import { getReview } from "@/features/review/utils/actions";

type CreateReviewFormContainerProps = {
  productId: string;
};

export default async function CreateReviewFormContainer({
  productId,
}: CreateReviewFormContainerProps) {
  const { isAuthenticated } = await auth();

  if (!isAuthenticated) {
    return (
      <Section title="Leave Review">
        {!isAuthenticated && (
          <p className="text-muted-foreground">
            Please sign in to leave review
          </p>
        )}
      </Section>
    );
  }

  const showForm = !!!(await getReview(productId));

  if (showForm) {
    return (
      <Section title="Leave Review">
        <CreateReviewForm productId={productId} />
      </Section>
    );
  }
}
