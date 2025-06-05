require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");
const articleRoutes = require("./routes/articleRoutes");

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);

connectDB();

//BSP Route
app.get("/", (req, res) => {
  res.send("API running ✅");
});

app.listen(PORT, () => {
  console.log(`🟢 Server läuft auf Port ${PORT}`);
});
