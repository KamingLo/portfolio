import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from "bcryptjs";
import 'dotenv/config';

// 1. Setup Adapter (Sesuai standar Prisma 7 untuk Postgres)
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  // Hash password agar bisa digunakan untuk login nanti
  const hashedPassword = await bcrypt.hash("password123", 10);

  const userData: Prisma.UserCreateInput[] = [
    {
      name: "Kaming",
      email: "kaming@example.com",
      password: hashedPassword,
    },
    {
      name: "Admin Blog",
      email: "admin@blog.com",
      password: hashedPassword,
    },
  ];

  for (const u of userData) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }

  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });