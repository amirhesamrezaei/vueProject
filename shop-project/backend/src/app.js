const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes.js");
const productsRoutes = require("./routes/products.routes.js");
const cartRoutes = require("./routes/cart.routes.js");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.json({ ok: true, name: "shop-api" }));

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/cart", cartRoutes);

module.exports = app;
