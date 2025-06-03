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


usersRouter.get("/:username", async (req, res) => {
    try {
    const userName = req.params.username
    const user = await User.findOne({username:userName});
    res.json(user)
    } catch (err) {
        res.status(500).json({error: "Failed to find users"})
    }
})

// GET /items
usersRouter.get("/:username/pantry", async (req, res) => {
  try {
    await console.log(req.params)
    const items = await User.findOne({username:req.params.username});
    await console.log(items)
    res.json(items.pantry);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch fridge items" });
  }
});


module.exports = usersRouter