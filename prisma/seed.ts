// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "Bavithran",
      email: "bavi@example.com",
      password: "secureHashedPassword",
      company: "Botify"
    }
  });

  const bot = await prisma.bot.create({
    data: {
      botName: "ReminderBot",
      description: "Helps you remember things",
      category: "Productivity",
      demoVideoLink: "https://youtu.be/demo",
      qrCodeImage: "https://example.com/qrcode.png",
      botImage: "https://example.com/bot.png",
      userId: user.id
    }
  });

  const rating = await prisma.rating.create({
    data: {
      value: 5,
      userId: user.id,
      botId: bot.id
    }
  });

  console.log("Seed data added successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
