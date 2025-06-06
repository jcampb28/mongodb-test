const User = require("../../db/seed/user-schema");
const { Item } = require("../../db/seed/item-schema");

const getPantry = async (req, res) => {
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
}

const getSingleItem = async (req, res) => {
  try {
    const user = await User.findOne(
      {username: req.params.username, "pantry._id": req.params._id},
      {"pantry.$": 1}
    )
    res.status(200).send(user.pantry[0])
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
}

const postItemToPantry = async (req, res) => {
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
}

const patchPantryItem = async (req, res) => {
  try {
    const item = await User.findOneAndUpdate(
      { username: req.params.username, "pantry._id": req.params._id },
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
      if (id === req.params._id) {
        res.status(201).send(item);
      }
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
}

const deleteItemFromPantry = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {username: req.params.username},
      {$pull: {pantry: {_id: req.params._id}}},
      {returnDocument: "after"}
    )
    res.status(204).send()
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
}

module.exports = {getPantry, getSingleItem, postItemToPantry, patchPantryItem, deleteItemFromPantry}