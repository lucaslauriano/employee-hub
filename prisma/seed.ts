import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default departments
  const departments = [
    {
      name: 'Engineering',
    },
    {
      name: 'Human Resources',
    },
    {
      name: 'Marketing',
    },
  ];

  console.log('Start seeding default departments...');

  for (const department of departments) {
    const existingDepartment = await prisma.departments.findFirst({
      where: { name: department.name },
    });

    if (!existingDepartment) {
      await prisma.departments.create({
        data: department,
      });
      console.log(`Created department: ${department.name}`);
    } else {
      console.log(`Department already exists: ${department.name}`);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
