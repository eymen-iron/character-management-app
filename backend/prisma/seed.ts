import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface SeedCharacter {
  name: string;
  status: string;
  gender: string;
  image: string;
  description: string;
}

async function main() {
  const filePath = path.join(__dirname, 'characters.json');
  const raw = fs.readFileSync(filePath, 'utf-8');
  const characters: SeedCharacter[] = JSON.parse(raw);

  console.log(`Read ${characters.length} characters from JSON.`);

  await prisma.character.deleteMany();
  await prisma.character.createMany({ data: characters });

  console.log(`Seeded ${characters.length} characters into database.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
