const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UserModel = require("../../src/models/user.model");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
	_id: userOneId,
	name: "Mike",
	email: "Mike@gmail.com",
	password: "Aa123456",
	tokens: [
		{
			token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
		},
	],
};

const setupDatabase = async () => {
	await UserModel.deleteMany();
	await new UserModel(userOne).save();
};

module.exports = {
	userOneId,
	userOne,
	setupDatabase,
};
