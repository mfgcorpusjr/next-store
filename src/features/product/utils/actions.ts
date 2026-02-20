"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { renderError, uploadImage } from "@/utils/actions";
import {
  createProductSchema,
  updateProductSchema,
  UpdateProductFormData,
} from "@/features/product/utils/schemas";

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

export const updateProduct = async ({
  id,
  formData,
}: {
  id: string;
  formData: UpdateProductFormData;
}) => {
  try {
    const validatedData = updateProductSchema.parse(formData);

    await prisma.product.update({
      data: {
        ...validatedData,
      },
      where: {
        id,
      },
    });

    return {
      status: "SUCCESS",
      message: "Product updated",
    };
  } catch (e) {
    return renderError(e);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({
      where: {
        id,
      },
    });

    revalidatePath("/admin/products");

    return {
      status: "SUCCESS",
      message: "Product deleted",
    };
  } catch (e) {
    return renderError(e);
  }
};
