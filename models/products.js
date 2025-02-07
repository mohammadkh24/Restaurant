const mongoose = require("mongoose");

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
      type: String,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    timeRequired: {
      type: String,
      required: true,
    },
    priceWithoutDiscount: {
      type: String,
      required: true,
    },
    priceWithDiscount: {
      type: String,
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
