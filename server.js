const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());



const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const taskRoutes = require("./routes/tasks");
const projectRoutes = require("./routes/projectRoute");
const workspaceRoutes = require("./routes/workspaceRoutes");
const filesRoutes = require("./routes/fileRoutes");
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));
//  routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/work" , workspaceRoutes);
app.use("/api/file" , filesRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("✅ Server running on port 5000"));
  })
  .catch(err => console.log("❌ DB Error:", err));

  




