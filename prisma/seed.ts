import { PrismaClient, Prisma } from "../src/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from "bcryptjs";
import 'dotenv/config';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Cleaning up database...");
    await prisma.experience.deleteMany();
    await prisma.project.deleteMany();
  console.log("Start seeding...");


  // --- SEED USER ---
  const hashedPassword = await bcrypt.hash("Exorlde86", 10);
  const userData: Prisma.UserCreateInput[] = [
    {
      id: "us001",
      name: "Kaming",
      email: "lokaming86@gmail.com",
      password: hashedPassword,
    },
  ];

  for (const u of userData) {
    const user = await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    });
    console.log(`✅ Created/Upserted user: ${user.email}`);
  }

  // --- SEED EXPERIENCE ---
  const experienceData: Prisma.ExperienceCreateInput[] = [
    {
      id: "EXP0001",
      job_title: "Backend Developer Intern",
      company: "NVIDIA Learning Project",
      description: "Fokus pada optimasi arsitektur server dan pengolahan data menggunakan NVIDIA GPU. Mengelola integrasi API dan efisiensi query database.",
      skills: "Laravel, Prisma, PostgreSQL, NVIDIA CUDA",
      is_current: true,
      start_date: new Date("2026-01-01"),
      end_date: null,
    },
    // Kamu bisa tambah data lain di sini (misal: EXP0002)
  ];

  for (const exp of experienceData) {
    const experience = await prisma.experience.upsert({
      where: { id: exp.id },
      update: {},
      create: exp,
    });
    console.log(`✅ Created/Upserted experience: ${experience.id} - ${experience.job_title}`);
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