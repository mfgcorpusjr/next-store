"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { getUserIdOrRedirect, renderError } from "@/utils/actions";

export const getFavorite = async (productId: string) => {
  const userId = await getUserIdOrRedirect();

  const favorite = await prisma.favorite.findFirst({
    where: {
      clerkId: userId,
      productId,
    },
  });

  return favorite;
};

export const getFavorites = async () => {
  const userId = await getUserIdOrRedirect();

  const favorites = await prisma.favorite.findMany({
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

  return favorites;
};

export const toggleFavorite = async ({
  id,
  productId,
  pathname,
}: {
  id?: string;
  productId: string;
  pathname: string;
}) => {
  try {
    if (id) {
      await prisma.favorite.delete({
        where: {
          id,
        },
      });
    } else {
      const userId = await getUserIdOrRedirect();

      await prisma.favorite.create({
        data: {
          clerkId: userId,
          productId,
        },
      });
    }

    revalidatePath(pathname);

    return {
      status: "SUCCESS",
      message: id ? "Removed from favorites" : "Added to favorites",
    };
  } catch (e) {
    return renderError(e);
  }
};
