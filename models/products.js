const mongoose = require("mongoose");
const { path } = require("../app");

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    image: {
      path : {
        type : String,
        required : true
      },
      filename : {
        type : String,
        required : true
      },
    },
    priceWithoutDiscount: {
      type: Number,
      required: true,
    },
    priceWithDiscount: {
      type: Number,
      required: true,
    },
    categoryID : {
        type : mongoose.Types.ObjectId,
        ref : "categories",
        required : true
    }
  },
  { timestamps: true }
);

const model = mongoose.model("Product", schema);

module.exports = model;
