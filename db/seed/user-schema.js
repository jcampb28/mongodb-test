const mongoose = require("mongoose");
const generateRandomString = require("./utils");
const { itemSchema } = require("./item-schema");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicURL: {
    type: String,
  },
  householdID: {
    type: String,
    minLength: 6,
    maxLength: 6,
    default: generateRandomString(6),
  },
  allergies: {
    type: String,
  },
  dietaryRequirements: {
    type: String,
  },
  pantry: [itemSchema],
  dateAdded: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
