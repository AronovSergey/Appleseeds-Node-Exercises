const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routers/user.route");
const taskRouter = require("./routers/task.route");

const app = express();
const port = process.env.PORT;

//Express Middlewares
app.use(express.json());

//Routes
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

//Connect to db with mongoose
mongoose
	.connect(process.env.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
	.then(() => {
		console.log("Database connect");
	});

//Connected to server
app.listen(port, () => {
	console.log("Server listening on port " + port);
});
