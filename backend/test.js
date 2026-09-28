const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", async (req, res) => {
  try {
    if (!process.env.MONGO_URI) {
      return res.status(500).json({
        success: false,
        message: "MONGO_URI is missing in Vercel Environment Variables"
      });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    res.status(200).json({
      success: true,
      message: "Express + MongoDB working on Vercel",
      mongoStatus: mongoose.connection.readyState,
      host: mongoose.connection.host
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "MongoDB connection failed",
      error: error.message
    });
  }
});

module.exports = app;