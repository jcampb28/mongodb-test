const express = require("express");
const app = express();
const usersRouter = require("../app/routes/users-router.js");

app.use(express.json());

app.use("/users", usersRouter)

app.all("/*splat", (req, res) => {
    res.status(404).send({ msg: "Not Found!" })
});

module.exports = app;
