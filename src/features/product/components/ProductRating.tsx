import { IoStar } from "react-icons/io5";

import { getProductRating } from "@/features/review/utils/actions";

type ProductRatingProps = {
  productId: string;
};

export default async function ProductRating({ productId }: ProductRatingProps) {
  const rating = await getProductRating(productId);

  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="flex items-center gap-1">
        <IoStar /> {rating.average}
      </div>

      <div>
        ({rating.count}) review{rating.count > 1 ? "s" : ""}
      </div>
    </div>
  );
}
