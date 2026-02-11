const router = require("express").Router();
const { list, detail } = require("../controllers/products.controller");
router.get("/", list);
router.get("/:id", detail);
module.exports = router;
