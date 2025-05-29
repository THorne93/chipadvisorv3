import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.users.findMany();

      // Use JSON.stringify with a custom replacer
      res.setHeader('Content-Type', 'application/json');
      res.status(200).end(JSON.stringify(users, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
    } catch (error) {
      console.error('GET /api/users error:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }




  } else if (req.method === 'POST') {
    const { name, email } = req.body;
    try {
      const newUser = await prisma.users.create({
        data: { name, email },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('POST /api/users error:', error); // Log the actual error
      res.status(500).json({ error: 'Failed to create user' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
