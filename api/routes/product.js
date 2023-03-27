const express = require("express");
const router = express.Router();
const {
  createItem,
  getAllItem,
  getSingleItem,
  getAllCategories,
} = require("../controllers/product");

router.route("/products").get(getAllItem).post(createItem);
router.route("/products/:id").get(getSingleItem);
router.route("/categories").get(getAllCategories);

module.exports = router;
