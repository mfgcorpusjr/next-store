import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

import { PrismaClient } from "@/generated/prisma/client";

import { PRODUCTS } from "./utils/data";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: PRODUCTS,
  });
}

main();
