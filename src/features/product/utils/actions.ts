"use server";

import prisma from "@/lib/prisma";

export const getProducts = async (search: string) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: search, mode: "insensitive" } },
        { company: { contains: search, mode: "insensitive" } },
      ],
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};

export const getFeaturedProducts = async () => {
  const products = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};
