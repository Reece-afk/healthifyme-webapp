require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);

connectDB();

//BSP Route
app.get("/", (req, res) => {
  res.send("API running ✅");
});

app.listen(PORT, () => {
  console.log(`🟢 Server läuft auf Port ${PORT}`);
});
