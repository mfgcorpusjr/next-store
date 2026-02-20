"use server";

import prisma from "@/lib/prisma";
import { getUserOrRedirect, renderError } from "@/utils/actions";
import {
  CreateReviewFormData,
  createReviewSchema,
} from "@/features/review/utils/schemas";

export const getReview = async (productId: string) => {
  const { id: userId } = await getUserOrRedirect();

  const review = await prisma.review.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });

  return review;
};

export const getReviews = async () => {
  const { id: userId } = await getUserOrRedirect();

  const reviews = await prisma.review.findMany({
    include: {
      product: true,
    },
    where: {
      clerkId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

export const getProductReviews = async (productId: string) => {
  const reviews = await prisma.review.findMany({
    where: {
      productId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

export const getProductRating = async (productId: string) => {
  const rating = await prisma.review.groupBy({
    by: ["productId"],
    _avg: {
      rating: true,
    },
    _count: {
      rating: true,
    },
    where: {
      productId,
    },
  });

  // TODO
};

export const createReview = async ({
  productId,
  formData,
}: {
  productId: string;
  formData: CreateReviewFormData;
}) => {
  const { id: userId, firstName, imageUrl } = await getUserOrRedirect();

  try {
    const validatedData = createReviewSchema.parse(formData);

    await prisma.review.create({
      data: {
        ...validatedData,
        clerkId: userId,
        productId,
        authorName: firstName ?? "User",
        authorImageUrl: imageUrl,
      },
    });

    return {
      status: "SUCCESS",
      message: "Review created",
    };
  } catch (e) {
    return renderError(e);
  }
};

export const deleteReview = async (id: string) => {
  try {
    const { id: userId } = await getUserOrRedirect();

    await prisma.review.delete({
      where: {
        clerkId: userId,
        id,
      },
    });

    return {
      status: "SUCCESS",
      message: "Review deleted",
    };
  } catch (e) {
    return renderError(e);
  }
};
