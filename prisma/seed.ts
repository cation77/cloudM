import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create user
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      nick: '管理员',
      role: 'ADMIN',
    },
  });
  await prisma.user.upsert({
    where: { username: 'cloud' },
    update: {},
    create: {
      username: 'cloud',
      password: await bcrypt.hash('cloud123', 10),
      nick: '用户',
      role: 'USER',
    },
  });
  await prisma.user.upsert({
    where: { username: 'guest' },
    update: {},
    create: {
      username: 'guest',
      password: await bcrypt.hash('guest123', 10),
      nick: '游客',
      role: 'GUEST',
    },
  });

  const projects = await Promise.all([
    prisma.project.upsert({
      where: { id: "154841951654" },
      update: {},
      create: {
        id: "154841951654",
        name: "demo",
        description: "demo",
        test: "test",
      },
    }),
  ]);

  console.log("Seed data inserted successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
