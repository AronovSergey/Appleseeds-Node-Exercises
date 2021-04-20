const express = require("express");
const router = express.Router();
const productControler = require("../controllers/product.contorller");

router
  .get("/", (req, res) => {
    productControler.getAll(req, res);
  })
  .post("/", (req, res) => {
    productControler.create(req, res);
  });

module.exports = router;
