const prisma = require("../lib/prisma");

async function list(req, res) {
  const items = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  res.json(items);
}

async function detail(req, res) {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  const item = await prisma.product.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ message: "Product not found" });

  res.json(item);
}

module.exports = { list, detail };
