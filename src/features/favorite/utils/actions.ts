"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { getUserIdOrRedirect, renderError } from "@/utils/actions";

export const isFavorite = async (productId: string) => {
  const userId = await getUserIdOrRedirect();

  const favorite = await prisma.favorite.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });

  return !!favorite;
};

export const toggleFavorite = async ({
  productId,
  isFavorite,
  pathname,
}: {
  productId: string;
  isFavorite: boolean;
  pathname: string;
}) => {
  try {
    const userId = await getUserIdOrRedirect();

    if (isFavorite) {
      await prisma.favorite.create({
        data: {
          clerkId: userId,
          productId,
        },
      });
    } else {
      await prisma.favorite.deleteMany({
        where: {
          clerkId: userId,
          productId,
        },
      });
    }

    revalidatePath(pathname);

    return {
      status: "SUCCESS",
      message: isFavorite ? "Added to favorites" : "Removed from favorites",
    };
  } catch (e) {
    return renderError(e);
  }
};
