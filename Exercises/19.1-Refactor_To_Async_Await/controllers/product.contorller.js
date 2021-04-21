const mongoose = require("mongoose");
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
  const { id } = req.params;
  try {
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).send("Wrong ID");
    }
    res.json(product);
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

module.exports = {
  create: createProduct,
  getAll: getProducts,
  getOne: getProduct,
  getAllActive: getActiveProducts,
  getAllInRange: getProductsByPriceRange,
};
