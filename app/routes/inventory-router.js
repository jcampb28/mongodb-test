const express = require("express");
const router = express.Router();
const { Item } = require("../../db/seed/item-schema");

// GET /items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch fridge items" });
  }
});

// POST /items
router.post("/", async (req, res) => {
  try {
    const newItem = new Item({ ...req.body });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
