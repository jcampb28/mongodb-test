const express = require("express");
const User = require("../../db/seed/user-schema");
const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({error: "Failed to find users"})
    }
})

module.exports = usersRouter