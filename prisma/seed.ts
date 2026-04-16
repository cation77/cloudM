import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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
