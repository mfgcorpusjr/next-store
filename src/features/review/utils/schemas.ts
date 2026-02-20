import { z } from "zod";

export const createReviewSchema = z.object({
  rating: z.coerce
    .number<number>({ error: "Rating is required" })
    .int("Rating must be a whole number"),
  feedback: z.string().trim().min(2, {
    error: "Feedback must be at least 2 characters",
  }),
});

export type CreateReviewFormData = z.infer<typeof createReviewSchema>;
