const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

/* =====================================================
   MIDDLEWARE
===================================================== */

app.use(
  cors({
    origin: "https://campuscoin123.netlify.app",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/* =====================================================
   MONGODB CONNECTION
===================================================== */

const connectDB = async () => {
  try {
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

  } catch (error) {
    console.error(
      "MongoDB connection failed:",
      error.message
    );

    throw error;
  }
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
===================================================== */

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message
    });
  }
});

/* =====================================================
   API ROUTES
===================================================== */

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

  res.status(err.statusCode || 500).json({
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