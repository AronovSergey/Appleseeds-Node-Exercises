const express = require("express");
const userControler = require("../controllers/user.controller");
const router = express.Router();

router
	.get("/", userControler.getAllUsers)
	.get("/:id", userControler.getOneUser)
	.post("/", userControler.createNewUser)
	.put("/:id", userControler.update)
	.delete("/:id", userControler.remove);

module.exports = router;
