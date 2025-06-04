const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    const newUser = new User({ email, password });

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "E-Mail und Passwort sind erforderlich" });
    }

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Ein Benutzer mit dieser E-Mail existiert bereits!" });
    }

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ message: "Registrierung erfolgreich!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { register };
