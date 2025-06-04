const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get("/secret", verifyToken, (req, res) => {
  res.json({ message: "Du hast Zugriff!", userId: req.user });
});

module.exports = router;
