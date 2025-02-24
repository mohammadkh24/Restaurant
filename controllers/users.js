const { isValidObjectId } = require("mongoose");
const usersModel = require("../models/users");

exports.getAll = async (req, res) => {
  const users = await usersModel.find({}).select("-password");

  return res.json({ users });
};

exports.remove = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "آیدی کاربر معتبر نیست",
    });
  }

  if (id === req.user._id.toString()) {
    return res.status(400).json({ message: "ادمین نمی‌تواند خودش را حذف کند" });
  }

  const removeUser = await usersModel.findOneAndDelete({ _id: id });

  if (!removeUser) {
    return res.status(404).json({
      message: "کاربر پیدا نشد",
    });
  }

  return res.status(200).json({
    message: "کاربر با موفقیت حذف شد",
  });
};

exports.changeRole = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({
      message: "آیدی کاربر معتبر نیست",
    });
  }

  const user = await usersModel
    .findOneAndUpdate(
      { _id: id },
      {
        role: req.body.role,
      }
    )
    .select("-password");

  if (!user) {
    return res.status(404).json({
      message: "کاربر پیدا نشد",
    });
  }

  return res.status(200).json({
    message: "نقش کابر با موفقیت تغییر یافت",
    user,
  });
};

exports.edit = async (req, res) => {
  const { name, lastName, phone, address, email } = req.body;

  if (!name || !lastName || !phone || !email || !address) {
    return res.status(400).json({ message: "لطفا تمامی فیلدها را پر کنید" });
  }

  const editedUser = await usersModel
    .findOneAndUpdate(
      { _id: req.user._id },
      {
        name,
        lastName,
        phone,
        address,
        email,
      }
    )
    .select("-password");

  return res.status(200).json({
    message: "اطلاعات کاربر با موفقیت ویرایش شد",
    editedUser
  });
};
