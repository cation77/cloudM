import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create super_admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      name: '管理员',
      role: 'ADMIN',
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
