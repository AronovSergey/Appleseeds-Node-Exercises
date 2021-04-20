const express = require("express");
const router = express.Router();
const productControler = require("../controllers/product.contorller");

router
  .get("/", productControler.getAll)
  .get("/active", productControler.getAllActive)
  .get("/range", productControler.getAllInRange)
  .get("/:id", productControler.getOne)
  .post("/", productControler.create);

module.exports = router;
