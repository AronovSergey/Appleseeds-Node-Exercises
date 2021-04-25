const express = require("express");
const auth = require("../middleware/auth");
const taskControler = require("../controllers/task.controller");
const router = express.Router();

router
	.get("/", auth, taskControler.getAllTasks)
	.get("/:id", auth, taskControler.getTask)
	.post("/", auth, taskControler.createTask)
	.put("/:id", auth, taskControler.updateTask)
	.delete("/:id", auth, taskControler.deleteTask);

module.exports = router;
