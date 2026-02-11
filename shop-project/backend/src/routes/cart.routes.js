const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const { getCart, addItem, updateQty, removeItem } = require("../controllers/cart.controller");

router.use(auth);
router.get("/", getCart);
router.post("/", addItem);
router.patch("/:id", updateQty);
router.delete("/:id", removeItem);

module.exports = router;
