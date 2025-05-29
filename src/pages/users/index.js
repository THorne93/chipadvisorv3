import { prisma } from '../../../lib/prisma';

export default async function Page() {
  const users = await prisma.users.findMany({
    include: { reviews: true },
  });

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.reviews.length} reviews
          </li>
        ))}
      </ul>
    </div>
  );
}