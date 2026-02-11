const router = require("express").Router();
const { login } = require("../controllers/auth.controller");

router.get("/login", (req, res) => res.json({ ok: true, hint: "Use POST /api/auth/login" }));
router.post("/login", login);

module.exports = router;
