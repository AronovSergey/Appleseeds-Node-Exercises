const productModel = require("../models/product.model");

const createProduct = (req, res) => {
  const {
    name,
    category,
    isActive,
    description,
    price,
    images,
    phone,
  } = req.body;

  const product = new productModel({
    name,
    category,
    isActive,
    details: {
      description,
      price,
      images,
      phone,
    },
  });

  product.save((err) => {
    if (err) return res.json({ error: err });
    return res.json({ success: product });
  });
};

const getProducts = (req, res) => {
  productModel.find({}).then((products) => {
    return res.send(products);
  });
};

module.exports = {
  create: createProduct,
  getAll: getProducts,
};
