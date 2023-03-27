const Product = require("../models/product");

const getAllItem = async (req, res) => {
  const { company, name, feature, sort, select, category } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (feature) {
    queryObject.feature = feature;
  }

  if (category) {
    queryObject.category = category;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.split(",").join(" ");
    apiData = apiData.sort(sortFix);
  }

  // (select = name company;
  if (select) {
    let selectFix = select.split(",").join(" ");
    apiData = apiData.select(selectFix);
  }

  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 30;

  let skip = (page - 1) * limit;

  apiData = apiData.skip(skip).limit(limit);
  const count = await Product.count();

  const products = await apiData;

  res.status(200).json({
    products,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    nbHits: Product.length,
  });
};

const createItem = async (req, res) => {
  const product = new Product(req.body);
  try {
    await product.save();
    res.status(201).json(req.body);
  } catch (error) {
    console.log(error);
    res.status(400);
  }
};

const getSingleItem = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.json(product);
};

const replaceItem = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const updateItem = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const deleteItem = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Product.findOneAndDelete({ _id: id });
    res.status(201).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getAllCategories = async (req, res) => {
  const categories = await Product.aggregate([
    { $group: { _id: { category: "$category" } } },
    {
      $group: { _id: null, companiesAndCategories: { $addToSet: "$_id" } },
    },
    { $project: { _id: 0, companiesAndCategories: 1 } },
  ]);
  res.json(categories);
};

module.exports = {
  createItem,
  getAllItem,
  replaceItem,
  updateItem,
  deleteItem,
  getSingleItem,
  getAllCategories,
};
