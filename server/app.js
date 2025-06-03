const express = require("express");
const app = express();
const usersRouter = require("../app/routes/users-router.js");

app.use(express.json());

app.use("/users", usersRouter)

module.exports = app;
