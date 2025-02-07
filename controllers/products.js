const productsModel = require("../models/products");
const discountsModel = require("../models/discounts");
const categoriesModel = require("../models/categories");
const { isValidObjectId } = require("mongoose");

exports.getAll = async (req, res) => {
  const products = await productsModel.find({}).lean();

  return res.json({ products });
};

exports.getOne = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "آیدی محصول معتبر نیست",
    });
  }

  const product = await productsModel.findOne({ _id: id });

  if (!product) {
    return res.status(404).json({
      message: "محصول پیدا نشد",
    });
  }

  return res.json({ product });
};

exports.getByCategory = async (req, res) => {
  const { categoryID } = req.params;

  if (!isValidObjectId(categoryID)) {
    return res.status(400).json({
      message: "آیدی دسته بندی معتبر نیست",
    });
  }

  const isCategoryExists = await categoriesModel.findOne({ _id: categoryID });

  if (!isCategoryExists) {
    return res.status(404).json({
      message: "دسته بندی پیدا نشد",
    });
  }

  const products = await productsModel.find({ categoryID });

  return res.json({ products });
};

exports.add = async (req, res) => {
  const {
    title,
    description,
    timeRequired,
    priceWithoutDiscount,
    priceWithDiscount,
    categoryID,
    discount
  } = req.body;

  const isCategoryExists = await categoriesModel.findOne({ _id: categoryID });

  if (!isCategoryExists) {
    return res.status(404).json({
      message: "دسته بندی پیدا نشد",
    });
  }

  const addedProduct = await productsModel.create({
    title,
    description,
    timeRequired,
    priceWithDiscount,
    priceWithoutDiscount,
    categoryID,
    image: req.file.filename,
    discount
  });

  return res.status(201).json({
    message: "محصول با موفقیت اضافه شد",
    addedProduct,
  });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "آیدی محصول معتبر نیست",
    });
  }

  const removedProduct = await productsModel.findOneAndDelete({ _id: id });

  if (!removedProduct) {
    return res.status(404).json({
      message: "محصول پیدا نشد",
    });
  }

  return res.status(200).json({
    message: "محصول با موفقیت حذف شد",
    removedProduct,
  });
};

exports.edit = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    timeRequired,
    priceWithoutDiscount,
    priceWithDiscount,
    categoryID,
    discount
  } = req.body;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "آیدی محصول معتبر نیست",
    });
  }

  const updatedProduct = await productsModel.findByIdAndUpdate(id, {
    title,
    description,
    timeRequired,
    priceWithDiscount,
    priceWithoutDiscount,
    categoryID,
    discount
  });

  if (!updatedProduct) {
    return res.status(404).json({
      message: "محصول پیدا نشد",
    });
  }

  return res.status(200).json({
    message: "محصول با موفقیت ویرایش شد",
    updatedProduct,
  });
};
