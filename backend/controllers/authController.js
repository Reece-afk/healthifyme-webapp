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
        .json({ message: "E-Mail und Passwort sind erforderlich!" });
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

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "E-Mail und Passwort sind erforderlich!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "E-Mail oder Passwort ungültig!" });
    }

    const doesMatch = await user.comparePassword(password);
    if (!doesMatch) {
      return res
        .status(400)
        .json({ message: "Ungültiges Passwort, bitte erneut prüfen!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ message: "Login erfolgreich", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { register, login };
