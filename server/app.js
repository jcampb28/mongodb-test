const express = require("express");
const app = express();
const usersRouter = require("../app/routes/users-router.js");
const cors = require("cors");
const { getEndpoints } = require("../app/controllers/getEndpoints.js");

app.use(express.json());
app.use(cors())

app.get("/", getEndpoints)

app.use("/users", usersRouter)

app.all("/*splat", (req, res) => {
    res.status(404).send({ msg: "Not Found!" })
});

module.exports = app;
