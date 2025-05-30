import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const reviews = await prisma.reviews.findMany({
    take: 10
  });
  res.status(200).json(reviews);
}