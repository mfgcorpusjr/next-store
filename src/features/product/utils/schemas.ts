import { z } from "zod";

import {
  MAX_FILE_SIZE,
  ACCEPTED_IMAGE_TYPES,
} from "@/features/product/utils/constants";

export const createProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      error: "Name must be at least 2 characters",
    })
    .max(100, {
      error: "Name must be 100 characters or fewer",
    }),
  company: z
    .string()
    .trim()
    .min(2, {
      error: "Company must be at least 2 characters",
    })
    .max(100, {
      error: "Company must be 100 characters or fewer",
    }),
  price: z.coerce
    .number<number>({ error: "Price is required" })
    .int("Price must be a whole number")
    .min(1, "Price must be at least 1")
    .max(999999, "Price cannot exceed 999,999"),
  image: z
    .instanceof(File, { error: "Image is required" })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 3MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported",
    }),
  description: z
    .string()
    .trim()
    .refine(
      (value) => {
        const wordCount = value.split(" ").length;
        return wordCount >= 10 && wordCount <= 1000;
      },
      {
        error: "Description must be between 10 and 1000 words",
      },
    ),
  isFeatured: z.coerce.boolean<boolean>(),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;

export const updateProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, {
      error: "Name must be at least 2 characters",
    })
    .max(100, {
      error: "Name must be 100 characters or fewer",
    }),
  company: z
    .string()
    .trim()
    .min(2, {
      error: "Company must be at least 2 characters",
    })
    .max(100, {
      error: "Company must be 100 characters or fewer",
    }),
  price: z.coerce
    .number<number>({ error: "Price is required" })
    .int("Price must be a whole number")
    .min(1, "Price must be at least 1")
    .max(999999, "Price cannot exceed 999,999"),
  description: z
    .string()
    .trim()
    .refine(
      (value) => {
        const wordCount = value.split(" ").length;
        return wordCount >= 10 && wordCount <= 1000;
      },
      {
        error: "Description must be between 10 and 1000 words",
      },
    ),
  isFeatured: z.coerce.boolean<boolean>(),
});

export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
