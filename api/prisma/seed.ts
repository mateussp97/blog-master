import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

async function seed() {
  const prisma = new PrismaService();

  await prisma.$connect();

  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const numberOfAuthors = 5;
  const usersData: Prisma.UserCreateInput[] = [];

  for (let i = 0; i < numberOfAuthors; i++) {
    const user = {
      email: faker.internet.email(),
      name: faker.person.fullName(),
    };
    usersData.push(user);
  }

  // Creating users
  for (const userData of usersData) {
    await prisma.user.create({
      data: userData,
    });
  }

  const allUsers = await prisma.user.findMany();
  const postsToInsert: Prisma.PostCreateInput[] = [];

  // Generate posts for each user
  for (const user of allUsers) {
    const numberOfPosts = faker.number.int({ min: 10, max: 20 });

    for (let i = 0; i < numberOfPosts; i++) {
      const post = {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        published: faker.datatype.boolean(),
        author: {
          connect: {
            id: user.id,
          },
        },
      };
      postsToInsert.push(post);
    }
  }

  // Insert posts
  for (const postData of postsToInsert) {
    await prisma.post.create({
      data: postData,
    });
  }

  await prisma.$disconnect();
}

seed()
  .then(() => {
    console.log('Database seeded!');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
