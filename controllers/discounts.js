const { isValidObjectId } = require("mongoose");
const discountsModel = require("../models/discounts");
const productsModel = require("../models/products");

exports.getAll = async (req, res) => {
  const discounts = await discountsModel.find({}).populate("productID");

  return res.json({ discounts });
};

exports.set = async (req, res) => {
  const { productID, discount } = req.body;

  if (!isValidObjectId(productID)) {
    return res.status(400).json({
      message: "آیدی محصول معتبر نیست",
    });
  }

  const product = await productsModel.findOneAndUpdate(
    { _id: productID },
    {
      discount,
    }
  );

  if (!product) {
    return res.status(404).json({
      message: "محصول پیدا نشد",
    });
  }

  const addDiscount = await discountsModel.create({
    productID,
    discount,
  });

  return res.status(201).json({
    message: "تخفیف با موفقیت اضافه شد",
    addDiscount,
  });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "آیدی تخفیف معتبر نیست",
    });
  }

  const removedDiscount = await discountsModel.findOneAndDelete({ _id: id });

  if (!removedDiscount) {
    return res.status(404).json({
      message: "تخفیف پیدا نشد",
    });
  }

  return res.status(200).json({
    message: "تخفیف با موفقیت حذف شد",
    removedDiscount,
  });
};

exports.edit = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "آیدی تخفیف معتبر نیست",
    });
  }

  const editedDiscount = await discountsModel.findOneAndUpdate(
    { _id: id },
    {
      discount: req.body.discount,
    }
  );

  if (!editedDiscount) {
    return res.status(404).json({
      message: "تخفیف پیدا نشد",
    });
  }

  return res.status(200).json({
    message: "تخفیف با موفقیت ویرایش شد",
    editedDiscount,
  });
};
