
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const upstoxRoutes = require("./routes/upstox")
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
// Connect to MongoDB
connectDB();

// Use Auth Routes
app.use("/api/auth", authRoutes);
app.use("/upstox", upstoxRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
