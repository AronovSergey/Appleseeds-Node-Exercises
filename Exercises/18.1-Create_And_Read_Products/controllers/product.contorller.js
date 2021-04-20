const mongoose = require("mongoose");
const productModel = require("../models/product.model");

const createProduct = (req, res) => {
  const { name, category, isActive, details } = req.body;

  const product = new productModel({
    name,
    category,
    isActive,
    details,
  });

  product.save((error, result) => {
    if (error) return res.status(400).json({ error });
    res.status(201).json({ result });
  });
};

const getProducts = (req, res) => {
  productModel
    .find({})
    .then((products) => {
      res.send(products);
    })
    .catch((error) => res.status(500).json({ error }));
};

const getProduct = (req, res) => {
  const { id } = req.params;
  productModel.findById(id, (error, result) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (!result) {
      return res.status(404).send("Wrong ID");
    }
    res.json({ result });
  });
};

const getActiveProducts = (req, res) => {
  productModel
    .find({ isActive: true })
    .then((products) => {
      res.send(products);
    })
    .catch((error) => res.status(500).json({ error }));
};

const getProductsByPriceRange = (req, res) => {
  const { min, max } = req.body;
  productModel
    .find({ "details.price": { $gte: min, $lte: max } })
    .then((products) => {
      res.send(products);
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports = {
  create: createProduct,
  getAll: getProducts,
  getOne: getProduct,
  getAllActive: getActiveProducts,
  getAllInRange: getProductsByPriceRange,
};
