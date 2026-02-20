"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import FormSelect from "@/components/form/FormSelect";
import FormTextarea from "@/components/form/FormTextarea";
import SubmitButton from "@/components/form/SubmitButton";

import {
  createReviewSchema,
  CreateReviewFormData,
} from "@/features/review/utils/schemas";
import useCreateReview from "@/features/review/hooks/useCreateReview";

type CreateReviewFormProps = {
  productId: string;
};

export default function CreateReviewForm({ productId }: CreateReviewFormProps) {
  const { isPending, handleCreate } = useCreateReview();

  const form = useForm<CreateReviewFormData>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      rating: undefined,
      feedback: "",
    },
  });

  return (
    <form
      className="flex flex-col items-start gap-4"
      onSubmit={form.handleSubmit((formData: CreateReviewFormData) =>
        handleCreate({ productId, formData }),
      )}
    >
      <div className="w-full max-w-96">
        <FormSelect
          name="rating"
          control={form.control}
          label="Rating"
          items={[1, 2, 3, 4, 5].map((n) => ({
            value: n.toString(),
            label: n.toString(),
          }))}
        />
      </div>

      <FormTextarea name="feedback" control={form.control} label="Feedback" />

      <SubmitButton isPending={isPending}>Submit</SubmitButton>
    </form>
  );
}
