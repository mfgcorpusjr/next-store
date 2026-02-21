"use server";

import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";

export const getCart = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const cart = await prisma.cart.findFirst({
    include: {
      cartItems: true,
    },
    where: {
      clerkId: userId,
    },
  });

  return cart;
};
