const mongoose = require("mongoose");
const generateRandomString = require("./utils");
const Item = require("./item-schema");

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
  pantry: [Item],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
