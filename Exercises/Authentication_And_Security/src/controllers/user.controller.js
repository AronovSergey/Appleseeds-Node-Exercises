const UserModel = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
	try {
		const users = await UserModel.find({});
		res.send(users);
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.getOneUser = async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await UserModel.findById(_id);

		if (!user) {
			return res.status(404).send("The id you entered does not exist");
		}

		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.createNewUser = async (req, res) => {
	const user = new UserModel(req.body);
	try {
		await user.save();
		res.status(201).send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.login = async (req, res) => {
	try {
		const user = await UserModel.findByCredentials(
			req.body.email,
			req.body.password
		);
		res.send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.update = async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "email", "password", "age"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" });
	}

	try {
		const user = await UserModel.findById(req.params.id);

		updates.forEach((update) => (user[update] = req.body[update]));
		await user.save();

		if (!user) {
			return res.status(404).send("The id you entered does not exist");
		}

		res.send(user);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.remove = async (req, res) => {
	try {
		const user = await UserModel.findByIdAndDelete(req.params.id);

		if (!user) {
			return res.status(404).send("The id you entered does not exist");
		}

		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
};
