"use server";

import { redirect } from "next/navigation";

import prisma from "@/lib/prisma";
import { renderError, uploadImage } from "@/utils/actions";
import { createProductSchema } from "@/features/product/utils/schemas";

export const getProducts = async (search: string = "") => {
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

export const getProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    return redirect("/products");
  }

  return product;
};

export const createProduct = async (formData: FormData) => {
  try {
    const rawData = {
      ...Object.fromEntries(formData),
      isFeatured:
        (formData.get("isFeatured") as string) === "true" ? true : false,
    };
    const validatedData = createProductSchema.parse(rawData);

    const image = await uploadImage({
      image: validatedData.image,
    });

    await prisma.product.create({
      data: {
        ...validatedData,
        image,
      },
    });

    return {
      status: "SUCCESS",
      message: "Product created",
    };
  } catch (e) {
    return renderError(e);
  }
};
