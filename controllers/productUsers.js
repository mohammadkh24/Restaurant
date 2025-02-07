const { isValidObjectId } = require("mongoose");
const productUsersModel = require("../models/productUsers");
const usersModel = require("../models/users");
const productModel = require("../models/products");

exports.getAll = async (req, res) => {
  const productUser = await productUsersModel.find({ userID: req.user._id }).populate("productID")

  return res.json(productUser);
};

exports.add = async (req, res) => {
  const { id } = req.params;
  const user = await usersModel
    .findOne({ _id: req.user._id })
    .select("-password");

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "آیدی محصول معتبر نیست",
    });
  }

  const product = await productModel.findOne({ _id: id });

  if (!product) {
    return res.status(404).json({
      message: "محصول وجود ندارد",
    });
  }

  const productUser = await productUsersModel.create({
    userID: user,
    productID: product,
  });

  return res.status(201).json({
    message: "محصول به سفارشات اضافه شد",
  });
};
