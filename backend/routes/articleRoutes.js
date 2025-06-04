const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const createArticle = require("../controllers/articleController");

router.post("/", verifyToken, createArticle);

module.exports = router;
