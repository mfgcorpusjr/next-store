import { IoStar, IoStarOutline } from "react-icons/io5";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { Review } from "@/features/review/utils/types";

type ReviewListItemProps = {
  review: Review;
};

export default function ReviewListItem({ review }: ReviewListItemProps) {
  return (
    <Card className="shadow-none">
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={review.image} />
          </Avatar>

          <div className="text-sm space-y-1">
            <div className="font-semibold">{review.name}</div>

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
    </Card>
  );
}
