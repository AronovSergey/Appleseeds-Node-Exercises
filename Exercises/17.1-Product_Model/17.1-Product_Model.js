const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/e-commerce", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const Product = mongoose.model("Product", {
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  isActive: { type: Boolean },
  details: {
    type: {
      description: { type: String, required: true, minLength: 10 },
      price: {
        type: Number,
        required: true,
        validate(value) {
          if (value < 0) {
            throw new Error("price number has to be a positive value");
          }
        },
      },
      discount: { type: Number, required: false, default: 0 },
      images: {
        type: [
          {
            type: String,
          },
        ],
        validate(value) {
          if (value.length < 2) {
            throw new Error("array of images must include at least two images");
          }
        },
      },
      phone: {
        type: String,
        minLength: 10,
        required: true,
        validate(value) {
          if (!value.startsWith("05")) {
            throw new Error("Not A valid israeli Number");
          }
        },
      },
      date: {
        type: Date,
        required: false,
        unique: false,
        default: Date.now(),
      },
    },
  },
});

const product = new Product({
  name: "EarPods",
  category: "headphones",
  isActive: true,
  details: {
    description: "Apple EarPods with Lightning Connector - White",
    price: 100,
    images: [
      "https://images-na.ssl-images-amazon.com/images/I/41Mqt%2Bx5mLL._AC_SX522_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/41wYbyr3LLL._AC_SX522_.jpg",
    ],
    phone: "054-5756977",
  },
});

product
  .save()
  .then(() => {
    console.log(product);
  })
  .catch((error) => {
    console.log("Error!", error);
  });
