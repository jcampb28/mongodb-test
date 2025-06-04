const express = require("express");
const User = require("../../db/seed/user-schema");
const { Item } = require("../../db/seed/item-schema");
const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: "Failed to find users" });
  }
});

usersRouter.post("/", async (req, res) => {
  try {
    const newUser = await User({ ...req.body });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send({ error: "Failed to add new user" });
  }
});

usersRouter.get("/:username", async (req, res) => {
  try {
    const userName = req.params.username;
    const user = await User.findOne({ username: userName });
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: "Failed to find users" });
  }
});

usersRouter.get("/:username/pantry", async (req, res) => {
  const sortBy = "expiryDate";
  // potential aditional sorting after mvp
  // if (req.params.sortby) {
  //   sortBy = req.params.sortby
  // }
  if (req.query.location) {
    try {
      const user = await User.findOne({ username: req.params.username });
      const locationFilteredPantry = [];
      const catAndLocFilteredPantry = [];
      user.pantry.filter((item) => {
        if (item.location === req.query.location) {
          locationFilteredPantry.push(item);
        }
      });
      if (req.query.category) {
        locationFilteredPantry.filter((item) => {
          if (item.category === req.query.category) {
            catAndLocFilteredPantry.push(item);
          }
        });
        catAndLocFilteredPantry.sort((a, b) => a[sortBy] - b[sortBy]);
        res.send(catAndLocFilteredPantry);
      }
      locationFilteredPantry.sort((a, b) => a[sortBy] - b[sortBy]);
      res.send(locationFilteredPantry);
    } catch (err) {
      res.status(500).send({ error: "Failed to fetch fridge items" });
    }
  } else if (req.query.category) {
    try {
      const user = await User.findOne({ username: req.params.username });
      const categoryFilteredPantry = [];
      user.pantry.filter((item) => {
        if (item.category === req.query.category) {
          categoryFilteredPantry.push(item);
        }
      });
      categoryFilteredPantry.sort((a, b) => a[sortBy] - b[sortBy]);
      res.send(categoryFilteredPantry);
    } catch {
      res.status(500).send({ error: "Failed to fetch fridge items" });
    }
  } else {
    try {
      const user = await User.findOne({ username: req.params.username });
      user.pantry.sort((a, b) => a[sortBy] - b[sortBy]);
      res.send(user.pantry);
    } catch (err) {
      res.status(500).send({ error: "Failed to fetch fridge items" });
    }
  }
});

usersRouter.post("/:username/pantry", async (req, res) => {
  try {
    const newItem = await new Item({ ...req.body });
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      { $push: { pantry: newItem } },
      { returnDocument: "after" }
    );
    res.status(201).send(user.pantry);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

usersRouter.patch("/:username", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { username: req.params.username },
      {
        $set: {
          username: req.body.username,
          name: req.body.name,
          emailAddress: req.body.emailAddress,
          allergies: req.body.allergies,
          dietaryRequirements: req.body.dietaryRequirements,
        },
      },
      { returnDocument: "after" }
    );
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

usersRouter.patch("/:username/pantry", async (req, res) => {
  try {
    const item = await User.findOneAndUpdate(
      { username: req.params.username, "pantry._id": req.body._id },
      {
        $set: {
          "pantry.$.name": req.body.name,
          "pantry.$.quantity": req.body.quantity,
          "pantry.$.unit": req.body.unit,
          "pantry.$.location": req.body.location,
          "pantry.$.expiryDate": req.body.expiryDate,
        },
      },
      {
        returnDocument: "after",
      }
    );
    item.pantry.filter((item) => {
      const id = item._id.toString();
      if (id === req.body._id) {
        res.status(201).send(item);
      }
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
module.exports = usersRouter;
