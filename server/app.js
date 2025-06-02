const express = require("express");
const app = express();
const inventoryRoutes = require("../app/routes/inventory-router.js");
const usersRouter = require("../app/routes/users-router.js");

app.use(express.json());

app.use("/items", inventoryRoutes);
app.use("/users", usersRouter)

module.exports = app;
