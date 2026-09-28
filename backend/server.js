const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* =========================================================
   MONGODB CONNECTION
========================================================= */

const connectDB = async () => {
  // Already connected
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  // Connection is currently being established
  if (mongoose.connection.readyState === 2) {
    return mongoose.connection;
  }

  // Check environment variable
  if (!process.env.MONGO_URI) {
    throw new Error(
      "MONGO_URI is missing. Add MONGO_URI to .env or Vercel Environment Variables."
    );
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );

    console.log(
      `MongoDB database: ${connection.connection.name}`
    );

    return connection;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

/* =========================================================
   ROOT ROUTE
========================================================= */

app.get("/", async (req, res) => {
  try {
    await connectDB();

    res.status(200).json({
      success: true,
      message: "CampusCoin API server running",
      database: "connected",
      mongoStatus: mongoose.connection.readyState,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "MongoDB connection failed",
      error: error.message,
    });
  }
});

/* =========================================================
   HEALTH CHECK
========================================================= */

app.get("/api/health", async (req, res) => {
  try {
    await connectDB();

    res.status(200).json({
      success: true,
      status: "ok",
      message: "CampusCoin API + MongoDB working",
      database: "connected",
      mongoStatus: mongoose.connection.readyState,
      host: mongoose.connection.host,
      databaseName: mongoose.connection.name,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: "error",
      database: "disconnected",
      message: "MongoDB connection failed",
      error: error.message,
    });
  }
});

/* =========================================================
   DATABASE MIDDLEWARE
========================================================= */

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Database middleware error:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

/* =========================================================
   API ROUTES
========================================================= */

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/transactions",
  require("./routes/transactionRoutes")
);

app.use(
  "/api/categories",
  require("./routes/categoryRoutes")
);

app.use(
  "/api/budgets",
  require("./routes/budgetRoutes")
);

app.use(
  "/api/insights",
  require("./routes/insightRoutes")
);

app.use(
  "/api/reports",
  require("./routes/reportRoutes")
);

app.use(
  "/api/ai",
  require("./routes/aiRoutes")
);

app.use(
  "/api/users",
  require("./routes/userRoutes")
);

app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);

/* =========================================================
   404 HANDLER
========================================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
  });
});

/* =========================================================
   ERROR HANDLER
========================================================= */

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* =========================================================
   LOCAL SERVER
========================================================= */

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}`
    );
  });
}

/* =========================================================
   VERCEL EXPORT
========================================================= */

module.exports = app;