"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import prisma from "@/lib/prisma";
import { getUserOrRedirect, renderError } from "@/utils/actions";
import { Action } from "@/features/cart/utils/types";

export const getUserCart = async () => {
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

const getCart = async (userId: string) => {
  const cart = await prisma.cart.findFirst({
    where: {
      clerkId: userId,
    },
  });

  return cart;
};

const createCart = async (userId: string) => {
  try {
    const cart = await prisma.cart.create({
      data: {
        clerkId: userId,
      },
    });

    return cart;
  } catch (e) {
    throw new Error("Failed to create cart");
  }
};

const getCartItem = async ({
  cartId,
  productId,
}: {
  cartId: string;
  productId: string;
}) => {
  const cartItem = await prisma.cartItem.findFirst({
    where: {
      cartId,
      productId,
    },
  });

  return cartItem;
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

const deleteCartIfEmpty = async (cartId: string) => {
  try {
    const cart = await prisma.cart.findUnique({
      include: {
        cartItems: true,
      },
      where: {
        id: cartId,
      },
    });

    if (cart?.cartItems.length === 0) {
      await prisma.cart.delete({ where: { id: cartId } });
    }
  } catch (e) {
    throw new Error("Failed to delete cart");
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
    let cart = await getCart(userId);
    if (!cart) {
      cart = await createCart(userId);
    }

    let cartItem = await getCartItem({ cartId: cart.id, productId });
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
        await deleteCartIfEmpty(cart.id);
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
      message: "Cart updated",
    };
  } catch (e) {
    return renderError(e);
  }
};

export const deleteCartItem = async ({
  cartId,
  cartItemId,
}: {
  cartId: string;
  cartItemId: string;
}) => {
  try {
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
    await deleteCartIfEmpty(cartId);

    revalidatePath("/cart");

    return {
      status: "SUCCESS",
      message: "Cart updated",
    };
  } catch (e) {
    return renderError(e);
  }
};
