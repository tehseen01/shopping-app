const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  desc: String,
  price: { type: Number, required: true },
  oldPrice: Number,
  company: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  feature: Boolean,
  discount: Number,
  stars: Number,
  ratings: Number,
  stock: Number,
  img: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
