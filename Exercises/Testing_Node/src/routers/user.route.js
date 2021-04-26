const express = require("express");
const auth = require("../middleware/auth");
const userControler = require("../controllers/user.controller");
const router = express.Router();

router
	.get("/", auth, userControler.getMyProfile)
	.post("/signin", userControler.signin)
	.post("/login", userControler.login)
	.post("/logout", auth, userControler.logout)
	.post("/logout-all", auth, userControler.logoutAllDevices)
	.put("/", auth, userControler.updateMyProfile)
	.delete("/", auth, userControler.removeMyProfile);

module.exports = router;
