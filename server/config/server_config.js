require("dotenv").config();
const express = require("express");

const userRoutes = require("../routes/users/user");
const groupRoutes = require("../routes/groups/group");
const taskRoutes = require("../routes/tasks/task");
const taskHistoryRoutes = require("../routes/task_history/task_history");
const groupMemberRoutes = require("../routes/group_members/group_member");

const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/users", userRoutes);
app.use("/groups", groupRoutes);
app.use("/tasks", taskRoutes);
app.use("/task-history", taskHistoryRoutes);
app.use("/group-members", groupMemberRoutes);

module.exports = app;
