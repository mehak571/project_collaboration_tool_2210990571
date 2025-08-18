const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
dotenv.config();
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Auth routes
app.use("/api/auth", authRoutes);

// Admin routes
app.use("/api/admin", adminRoutes);
const adminRoutes = require("./routes/adminRoutes");

// middleware
app.use(express.json());

// admin routes
app.use("/api/admin", adminRoutes);
// Routes
app.use("/api/auth", authRoutes);
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);
// Task routes
const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("✅ Server running on port 5000"));
  })
  .catch(err => console.log("❌ DB Error:", err));
