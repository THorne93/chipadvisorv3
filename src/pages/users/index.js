import prisma from '../../../lib/prisma';

export default async function UsersPage() {
  const users = await prisma.users.findMany({
    include: { reviews: true },
  });

  return (
    <main>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.email})
            <ul>
              {user.reviews.map(review => (
                <li key={review.id}>{review.title}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
