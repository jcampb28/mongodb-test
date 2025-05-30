const express = require("express");
const router = express.Router();
const Item = require("../models/item");

// GET /inventory/fridge
router.get("/fridge", async (req, res) => {
  try {
    const items = await Item.find({ location: "fridge" });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch fridge items" });
  }
});

// POST /inventory/fridge
router.post("/fridge", async (req, res) => {
  try {
    const newItem = new Item({ ...req.body, location: "fridge" });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
