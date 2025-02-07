const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    productID: {
      type: mongoose.Types.ObjectId,
      ref : "Product",
      required : true
    },
    userID: {
      type: mongoose.Types.ObjectId,
      ref : "User"
    },
  },
  { timestamps: true }
);

const model = mongoose.model("ProductUser", schema);

module.exports = model;
