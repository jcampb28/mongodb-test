//const mongoose = require("mongoose");
const Item = require("./item-schema");
const testItems = require("../data/test-data/test-item");

const seed = async () => {
  await Item.deleteMany({});
  await Item.insertMany(testItems);
};

module.exports = {seed}