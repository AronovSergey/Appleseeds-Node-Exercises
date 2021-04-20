const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  isActive: { type: Boolean },
  details: {
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
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
