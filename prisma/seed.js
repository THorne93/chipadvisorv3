const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const usersData = [
    {
      username: 'alice',
      email: 'alice@example.com',
      review: {
        title: 'Amazing cafe',
        content: 'I loved the coffee and cozy interior.',
        location: 'Amsterdam',
      },
    },
    {
      username: 'bob',
      email: 'bob@example.com',
      review: {
        title: 'Great museum',
        content: 'Lots of interesting exhibits!',
        location: 'London',
      },
    },
    {
      username: 'carol',
      email: 'carol@example.com',
      review: {
        title: 'Beautiful park',
        content: 'Very peaceful and green.',
        location: 'Kyoto',
      },
    },
    {
      username: 'dave',
      email: 'dave@example.com',
      review: {
        title: 'Good pizza',
        content: 'Tasted just like Italy.',
        location: 'New York',
      },
    },
    {
      username: 'eve',
      email: 'eve@example.com',
      review: {
        title: 'Awesome beach',
        content: 'Clear water and white sand.',
        location: 'Bali',
      },
    },
  ];

  for (const user of usersData) {
    const createdUser = await prisma.users.create({
      data: {
        username: user.username,
        email: user.email,
        reviews: {
          create: {
            title: user.review.title,
            content: user.review.content,
            location: user.review.location,
          },
        },
      },
    });

    console.log(`Seeded user: ${createdUser.username}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
