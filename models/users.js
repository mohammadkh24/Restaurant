const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role : {
        type : String,
        enum : ["USER" , 'ADMIN'],
        default : "USER"
    }
  },
  { timestamps: true }
);

const model = mongoose.model("User", schema);

module.exports = model;
