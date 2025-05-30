const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 50; i++) {
    const username = faker.internet.userName();
    const email = faker.internet.email();

    const review = {
      title: faker.lorem.words(3),
      content: faker.lorem.sentences(10),
      location: {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
      },
      score: parseFloat((faker.number.float({ min: 0, max: 5, precision: 1 })).toFixed(1)),
    };

    const user = await prisma.users.create({
      data: {
        username,
        email,
        reviews: {
          create: {
            title: review.title,
            content: review.content,
            score: review.score,
            location: review.location, // assuming 'location' is a JSON column
          },
        },
      },
    });

    console.log(`Created user: ${user.username}`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
