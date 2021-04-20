const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const productsRouter = require("./routes/product.route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/rooms", productsRouter);

//connect to db with mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/e-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Database connect");
  });

app.listen(process.env.PORT || 8000, () => {
  console.log(`Application start at ${process.env.PORT || 8000}`);
});
