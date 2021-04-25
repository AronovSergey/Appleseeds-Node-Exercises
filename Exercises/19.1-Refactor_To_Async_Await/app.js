const express = require("express");
const mongoose = require("mongoose");

const app = express();
const productsRouter = require("./routes/product.route");

app.use(express.json());

app.use("/api/products", productsRouter);

//connect to db with mongoose
const uri =
	"mongodb+srv://sergey:2u8Dziw6fxn5xoWu@cluster0.u17so.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
	.connect(uri, {
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
