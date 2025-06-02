const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  unit: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    enum: ["fridge", "freezer", "cupboard"],
    required: true,
  },
  category: {
    type: String,
    enum: [
      "dairyEggs",
      "meatFishSeafood",
      "fruitVeg",
      "snacksSweets",
      "drinks",
      "herbsSpicesCondiments",
      "breadBakery",
      "tinsJars",
      "other",
    ],
    default: "other",
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  expiresSoon: {
    type: Boolean,
    default: false,
  },
});

const Item = mongoose.model("Item", itemSchema);
module.exports = {itemSchema, Item};
