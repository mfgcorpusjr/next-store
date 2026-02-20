import Link from "next/link";
import { IoStar, IoStarOutline } from "react-icons/io5";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import DeleteReviewButton from "@/features/review/components/DeleteReviewButton";

import { Review } from "@/features/review/utils/types";

type ReviewListItemProps = {
  review: Review;
};

export default function ReviewListItem({ review }: ReviewListItemProps) {
  const RenderEl: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (review.productId) {
      return (
        <Link href={`/products/${review.productId}`} className="block">
          {children}
        </Link>
      );
    } else {
      return children;
    }
  };

  return (
    <Card className="relative shadow-none">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 w-[90%]">
          <RenderEl>
            <Avatar>
              <AvatarImage src={review.image} />
            </Avatar>
          </RenderEl>

          <div className="text-sm space-y-1">
            <RenderEl>
              <div className="font-semibold">{review.name}</div>
            </RenderEl>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                return i + 1 <= review.rating ? (
                  <IoStar key={i} className="text-primary" />
                ) : (
                  <IoStarOutline key={i} className="text-muted-foreground" />
                );
              })}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-7">
          {review.feedback}
        </p>
      </CardContent>

      {review.productId && (
        <div className="absolute top-6 right-6">
          <DeleteReviewButton reviewId={review.id} />
        </div>
      )}
    </Card>
  );
}
