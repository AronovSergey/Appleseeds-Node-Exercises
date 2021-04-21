const productModel = require("../models/product.model");

const createProduct = async (req, res) => {
  const { name, category, isActive, details } = req.body;

  const product = new productModel({
    name,
    category,
    isActive,
    details,
  });

  try {
    const result = await product.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).send("You have been enter unexisting ID");
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getActiveProducts = async (req, res) => {
  try {
    const products = await productModel.find({ isActive: true });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getProductsByPriceRange = async (req, res) => {
  const { min, max } = req.body;
  try {
    const products = await productModel.find({
      "details.price": { $gte: min, $lte: max },
    });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["isActive", "discount"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) return res.status(400).send("Invalid update");

  try {
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        isActive: req.body.isActive,
        "details.discount": req.body.discount,
      },
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).send("You have been enter unexisting ID");
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send("You have been enter unexisting ID");
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteProducts = async (req, res) => {
  try {
    const response = await productModel.deleteMany();
    res.send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  create: createProduct,
  getAll: getProducts,
  getOne: getProduct,
  getAllActive: getActiveProducts,
  getAllInRange: getProductsByPriceRange,
  update,
  deleteOne: deleteProduct,
  deleteAll: deleteProducts,
};
