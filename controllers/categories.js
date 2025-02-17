const { isValidObjectId } = require("mongoose");
const categoriesModel = require("../models/categories");

exports.getAll = async (req, res) => {
  const categories = await categoriesModel.find({}).lean();

  return res.json({ categories });
};

exports.add = async (req, res) => {
  const { title } = req.body;

  const isCategoryExists = await categoriesModel.findOne({ title });

  if (isCategoryExists) {
    return res.status(409).json({
      message: "این دسته بندی را قبلا اضافه کردید",
    });
  }

  const category = await categoriesModel.create({
    title,
    image: req.file.filename,
  });

  return res.status(201).json({
    message: "دسته بندی با موفقیت ایجاد شد",
    category,
  });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "آیدی دسته بندی معتبر نیست",
    });
  }

  const removedCategory = await categoriesModel.findOneAndDelete({ _id: id });

  if (!removedCategory) {
    return res.status(404).json({
      message: "دسته بندی پیدا نشد",
    });
  }

  return res.status(200).json({
    message: "دسته بندی با موفقیت حذف شد",
    removedCategory,
  });
};

exports.edit = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "آیدی دسته بندی معتبر نیست",
    });
  }

  const editedCategory = await categoriesModel.findOneAndUpdate(
    { _id: id },
    {
      title: req.body.title,
      image : req.file.filename
    }
  );

  if (!editedCategory) {
    return res.status(404).json({
      message: "دسته بندی پیدا نشد",
    });
  }

  return res.status(200).json({
    message: "دسته بندی با موفقیت ویرایش شد",
    editedCategory,
  });
};
