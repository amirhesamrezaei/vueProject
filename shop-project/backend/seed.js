const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // user demo
  const hash = await bcrypt.hash("123456", 10);
  await prisma.user.upsert({
    where: { username: "hadi" },
    update: {},
    create: { username: "hadi", password: hash },
  });

  // products demo
  const count = await prisma.product.count();
  if (count === 0) {
    await prisma.product.createMany({
      data: [
        { title: "هدفون بی‌سیم", description: "کیفیت خوب، مناسب روزمره", price: 1200000, stock: 15 },
        { title: "کیبورد مکانیکی", description: "سوییچ آبی، تایپ لذت‌بخش", price: 2500000, stock: 8 },
        { title: "ماوس گیمینگ", description: "DPI بالا و سبک", price: 900000, stock: 20 },
        { title: "پاوربانک", description: "۲۰۰۰۰ میلی‌آمپر", price: 1500000, stock: 12 },
      ],
    });
  }

  console.log("Seed done ✅");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
