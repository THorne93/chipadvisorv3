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
        location: {
          name: 'Café de Lune',
          address: '123 Canal St',
          city: 'Amsterdam',
          country: 'Netherlands',
        },
      },
    },
    {
      username: 'bob',
      email: 'bob@example.com',
      review: {
        title: 'Great museum',
        content: 'Lots of interesting exhibits!',
        location: {
          name: 'History Museum',
          address: '456 Queen’s Rd',
          city: 'London',
          country: 'United Kingdom',
        },
      },
    },
    {
      username: 'carol',
      email: 'carol@example.com',
      review: {
        title: 'Beautiful park',
        content: 'Very peaceful and green.',
        location: {
          name: 'Maruyama Park',
          address: '78 Sakura Ln',
          city: 'Kyoto',
          country: 'Japan',
        },
      },
    },
    {
      username: 'dave',
      email: 'dave@example.com',
      review: {
        title: 'Good pizza',
        content: 'Tasted just like Italy.',
        location: {
          name: 'Luigi’s Pizzeria',
          address: '12 Mulberry St',
          city: 'New York',
          country: 'USA',
        },
      },
    },
    {
      username: 'eve',
      email: 'eve@example.com',
      review: {
        title: 'Awesome beach',
        content: 'Clear water and white sand.',
        location: {
          name: 'Dream Beach',
          address: '99 Sunset Blvd',
          city: 'Bali',
          country: 'Indonesia',
        },
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
