const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
app.get("/", async (req, res) => {
  try {
    if (!process.env.MONGO_URI) {
      return res.status(500).json({
        success: false,
        message: "MONGO_URI is missing",
      });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    res.status(200).json({
      success: true,
      message: "Express + MongoDB working",
      mongoStatus: mongoose.connection.readyState,
      host: mongoose.connection.host,
      database: mongoose.connection.name,
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);

    res.status(500).json({
      success: false,
      message: "MongoDB connection failed",
      error: error.message,
    });
  }
});

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "CampusCoin API server running",
  });
});

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    message: "CampusCoin API server running",
  });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/transactions", require("./routes/transactionRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/budgets", require("./routes/budgetRoutes"));
app.use("/api/insights", require("./routes/insightRoutes"));
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  const statusCode =
    res.statusCode && res.statusCode !== 200
      ? res.statusCode
      : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
});

// Local development only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Vercel
module.exports = app;