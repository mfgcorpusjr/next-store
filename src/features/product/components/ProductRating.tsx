import { IoStar } from "react-icons/io5";

type ProductRatingProps = {
  productId: string;
};

export default function ProductRating({ productId }: ProductRatingProps) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <div className="flex items-center gap-1">
        <IoStar /> 4.2
      </div>

      <div>(25) reviews</div>
    </div>
  );
}
