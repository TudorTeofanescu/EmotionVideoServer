const express = require("express");
const connectDB = require("./config/database");
const emotionRoutes = require("./routes/emotionRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use("/api/emotions", emotionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
