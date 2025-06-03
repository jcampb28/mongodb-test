const express = require("express");
const router = express.Router();
const { Item } = require("../../db/seed/item-schema");
const User = require("../../db/seed/user-schema");



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
