import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const totalUsers = await prisma.users.count();
    res.status(200).json({ totalUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get user count' });
  }
}
