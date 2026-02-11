const prisma = require("../lib/prisma");

async function getCart(req, res) {
  const userId = req.user.id;

  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  const total = items.reduce((sum, it) => sum + it.product.price * it.quantity, 0);
  res.json({ items, total });
}

async function addItem(req, res) {
  const userId = req.user.id;
  const { productId, quantity } = req.body || {};
  const pid = Number(productId);
  const qty = Math.max(1, Number(quantity || 1));

  const product = await prisma.product.findUnique({ where: { id: pid } });
  if (!product) return res.status(404).json({ message: "Product not found" });

  // upsert by unique(userId, productId)
  const item = await prisma.cartItem.upsert({
    where: { userId_productId: { userId, productId: pid } },
    update: { quantity: { increment: qty } },
    create: { userId, productId: pid, quantity: qty },
  });

  res.json({ message: "Added", item });
}

async function updateQty(req, res) {
  const userId = req.user.id;
  const id = Number(req.params.id);
  const { quantity } = req.body || {};
  const qty = Math.max(1, Number(quantity || 1));

  const item = await prisma.cartItem.findFirst({ where: { id, userId } });
  if (!item) return res.status(404).json({ message: "Cart item not found" });

  const updated = await prisma.cartItem.update({ where: { id }, data: { quantity: qty } });
  res.json({ message: "Updated", item: updated });
}

async function removeItem(req, res) {
  const userId = req.user.id;
  const id = Number(req.params.id);

  const item = await prisma.cartItem.findFirst({ where: { id, userId } });
  if (!item) return res.status(404).json({ message: "Cart item not found" });

  await prisma.cartItem.delete({ where: { id } });
  res.json({ message: "Removed" });
}

module.exports = { getCart, addItem, updateQty, removeItem };
