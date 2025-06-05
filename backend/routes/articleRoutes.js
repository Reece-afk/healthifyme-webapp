const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const createArticle = require("../controllers/articleController");
const getArticles = require("../controllers/articleController");

router.get("/", getArticles);
router.post("/", verifyToken, createArticle);

module.exports = router;
