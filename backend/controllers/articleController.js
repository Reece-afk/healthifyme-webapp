const Article = require("../models/Articles");

const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Titel und Textinhalt sind erforderlich!" });
    }

    const newArticle = new Article({
      title,
      content,
      userId,
    });

    const savedArticle = await newArticle.save();

    res.status(201).json(savedArticle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = createArticle;
