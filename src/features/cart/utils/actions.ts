"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { getUserOrRedirect, renderError } from "@/utils/actions";
import { Action } from "@/features/cart/utils/types";

export const getCart = async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const cart = await prisma.cart.findFirst({
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
    where: {
      clerkId: userId,
    },
  });

  return cart;
};

const createCart = async () => {
  const { id } = await getUserOrRedirect();

  try {
    const cart = await prisma.cart.create({
      data: {
        clerkId: id,
      },
    });

    return cart;
  } catch (e) {
    throw new Error("Failed to create cart");
  }
};

const createCartItem = async ({
  cartId,
  productId,
}: {
  cartId: string;
  productId: string;
}) => {
  try {
    const cart = await prisma.cartItem.create({
      data: {
        cartId,
        productId,
      },
    });

    return cart;
  } catch (e) {
    throw new Error("Failed to create cart item");
  }
};

export const updateCartItem = async ({
  productId,
  action,
}: {
  productId: string;
  action: Action;
}) => {
  const { id: userId } = await getUserOrRedirect();

  try {
    let cart = await prisma.cart.findFirst({
      where: {
        clerkId: userId,
      },
    });

    if (!cart) {
      cart = await createCart();
    }

    let cartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    if (!cartItem) {
      cartItem = await createCartItem({ cartId: cart.id, productId });
    }

    if (action === "INCREMENT") {
      await prisma.cartItem.update({
        data: {
          quantity: { increment: 1 },
        },
        where: {
          id: cartItem.id,
        },
      });
    } else {
      if (cartItem.quantity === 1) {
        await prisma.cartItem.delete({ where: { id: cartItem.id } });
      } else {
        await prisma.cartItem.update({
          data: {
            quantity: { decrement: 1 },
          },
          where: {
            id: cartItem.id,
          },
        });
      }
    }

    revalidatePath("/cart");

    return {
      status: "SUCCESS",
      message: action === "INCREMENT" ? "Added to cart" : "Removed from cart",
    };
  } catch (e) {
    return renderError(e);
  }
};
