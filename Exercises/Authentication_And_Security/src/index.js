const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routers/user.route");

const app = express();
const port = process.env.PORT || 8000;

//Express Middlewares
app.use(express.json());

//Routes
app.use("/api/user", userRouter);

//Connect to db with mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/authentication", {
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
