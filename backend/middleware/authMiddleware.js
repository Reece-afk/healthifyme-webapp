const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "Kein Token vorhanden. Zugriff verweigert." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id };

    next();
  } catch (error) {
    res.status(401).json({
      message: "Ungültiger Token. Zugriff verweigert.",
      error: error.message,
    });
  }
};

module.exports = verifyToken;
