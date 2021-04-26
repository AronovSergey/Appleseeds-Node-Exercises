const TaskModel = require("../models/task.model");

exports.getAllTasks = async (req, res) => {
	const match = {};
	if (req.query.completed) {
		match.completed = req.query.completed === "true" ? true : false;
	}
	try {
		await req.user.populate({ path: "tasks", match }).execPopulate();
		res.send(req.user.tasks);
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.getTask = async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await TaskModel.findOne({ _id, owner: req.user._id });

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (error) {
		res.status(500).send(error);
	}
};

exports.createTask = async (req, res) => {
	const task = new TaskModel({
		...req.body,
		owner: req.user._id,
	});

	try {
		await task.save();
		res.status(201).send(task);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.updateTask = async (req, res) => {
	const updates = Object.keys(req.body);
	const allowedUpdates = ["description", "completed"];
	const isValidOperation = updates.every((update) =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" });
	}

	try {
		const task = await TaskModel.findOne({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) {
			return res.status(404).send();
		}

		updates.forEach((update) => (task[update] = req.body[update]));
		await task.save();
		res.send(task);
	} catch (error) {
		res.status(400).send(error);
	}
};

exports.deleteTask = async (req, res) => {
	try {
		const task = await TaskModel.findOneAndDelete({
			_id: req.params.id,
			owner: req.user._id,
		});

		if (!task) {
			res.status(404).send();
		}

		res.send(task);
	} catch (error) {
		res.status(500).send();
	}
};
