require("dotenv").config();
const express = require("express");

const { Model } = require("objection");
const knex = require("./db");
Model.knex(knex);

const authMiddleware = require("../middlewares/auth");
const authRoutes = require("../routes/auth/auth");
const userRoutes = require("../routes/users/user");
const groupRoutes = require("../routes/groups/group");
const taskRoutes = require("../routes/tasks/task");
const taskHistoryRoutes = require("../routes/task_history/task_history");
const groupMemberRoutes = require("../routes/group_members/group_member");
const commentRoutes = require("../routes/comments/comment");

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
app.use("/api/groups", authMiddleware, groupRoutes);
app.use("/api/group-members", authMiddleware, groupMemberRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);
app.use("/api/task-history", authMiddleware, taskHistoryRoutes);
app.use("/api/comments", authMiddleware, commentRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.send("Server is running");
});

module.exports = app;
