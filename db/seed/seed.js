const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    lowercase: true
  }
});

const Product = mongoose.model("Product", productSchema);

const seedProducts = [
  {
    name: "milk",
    price: 100,
    category: "dairy"
  },
  {
    name: "apple",
    price: 150,
    category: "fruit"
  },
  {
    name: "oats",
    price: 400,
    category: "grain"
  },
]

const seed = async () => {
  await Product.deleteMany({});
  await Product.insertMany(seedProducts);
};

module.exports = {seed, Product, seedProducts}