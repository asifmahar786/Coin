const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

/* =====================================================
   MIDDLEWARE
===================================================== */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* =====================================================
   MONGODB CONNECTION
   SAME METHOD AS YOUR WORKING VERCEL TEST
===================================================== */

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error(
      "MONGO_URI is missing in Vercel Environment Variables"
    );
  }

  // Already connected
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(process.env.MONGO_URI);

  console.log(
    "MongoDB connected:",
    mongoose.connection.host
  );
};

/* =====================================================
   ROOT
===================================================== */

app.get("/", async (req, res) => {
  try {
    await connectDB();

    res.status(200).json({
      success: true,
      message: "CampusCoin API server running",
      mongoStatus: mongoose.connection.readyState,
      host: mongoose.connection.host,
      database: mongoose.connection.name
    });

  } catch (error) {
    console.error("MongoDB connection failed:", error.message);

    res.status(500).json({
      success: false,
      message: "MongoDB connection failed",
      error: error.message
    });
  }
});

/* =====================================================
   HEALTH CHECK
===================================================== */

app.get("/api/health", async (req, res) => {
  try {
    await connectDB();

    res.status(200).json({
      success: true,
      status: "ok",
      message: "CampusCoin API + MongoDB working",
      mongoStatus: mongoose.connection.readyState,
      host: mongoose.connection.host,
      database: mongoose.connection.name
    });

  } catch (error) {
    console.error("Health check error:", error.message);

    res.status(500).json({
      success: false,
      status: "error",
      message: "MongoDB connection failed",
      error: error.message
    });
  }
});

/* =====================================================
   DATABASE MIDDLEWARE
   All API routes will have MongoDB connection
===================================================== */

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database connection error:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message
    });
  }
});


/* =====================================================
   404
===================================================== */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl
  });
});

/* =====================================================
   ERROR HANDLER
===================================================== */

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

/* =====================================================
   LOCAL DEVELOPMENT
===================================================== */

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  });
}

/* =====================================================
   VERCEL
===================================================== */

module.exports = app;