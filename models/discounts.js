const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    productID: {
      type: mongoose.Types.ObjectId,
      ref : "Product",
      required : true
    },
    discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const model = mongoose.model("Discount", schema);

module.exports = model;
