//const mongoose = require("mongoose");
const { Item } = require("./item-schema");
const testItems = require("../data/test-data/test-item");
const User = require("./user-schema");
const testUsers = require("../data/test-data/test-user");

const seed = async () => {
  await Item.deleteMany({});
  await User.deleteMany({});
  await Item.insertMany(testItems);
  await User.insertMany(testUsers);
};

module.exports = { seed };
