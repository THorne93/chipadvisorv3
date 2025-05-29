import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const totalReviews = await prisma.reviews.count();
    res.status(200).json({ totalReviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get review count' });
  }
}
