import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

export const prisma = new PrismaClient().$extends(withAccelerate())

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;