// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();

async function main() {
  // Hapus data yang ada terlebih dahulu untuk menghindari duplikasi
  await prisma.role.deleteMany({});

  console.log('Seeding roles...');

  // Buat roles
  const roles = await Promise.all([
    prisma.role.create({
      data: {
        name: 'user',
        description: 'Regular user with basic access',
      },
    }),
    prisma.role.create({
      data: {
        name: 'moderator',
        description: 'Moderator with content moderation privileges',
      },
    }),
    prisma.role.create({
      data: {
        name: 'author',
        description: 'Content creator with publishing rights',
      },
    }),
    prisma.role.create({
      data: {
        name: 'admin',
        description: 'Administrator with full system access',
      },
    }),
  ]);

  console.log('Roles seeded:', roles);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });