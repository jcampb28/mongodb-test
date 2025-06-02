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

usersRouter.post("/", async (req, res) => {
    try{
        const newUser = await User({...req.body})
        await newUser.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(500).json({error: "Failed to add new user"})
    }
})

module.exports = usersRouter