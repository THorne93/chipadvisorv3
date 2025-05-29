import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const users = await prisma.users.findMany({
    include: { reviews: true },
  });
  res.status(200).json(users);
}