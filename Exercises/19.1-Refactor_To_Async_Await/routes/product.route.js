const express = require("express");
const router = express.Router();
const productControler = require("../controllers/product.contorller");

router
  .get("/", productControler.getAll)
  .get("/active", productControler.getAllActive)
  .get("/range", productControler.getAllInRange)
  .get("/:id", productControler.getOne)
  .post("/", productControler.create)
  .put("/update/:id", productControler.update)
  .delete("/:id", productControler.deleteOne)
  .delete("/", productControler.deleteAll);

module.exports = router;
