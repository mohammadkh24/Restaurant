const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, lastName, phone, address, password, email } = req.body;

  if (!name || !lastName || !phone || !email || !password || !address) {
    return res.status(400).json({ message: "لطفا تمامی فیلدها را پر کنید" });
  }

  const isUserExists = await usersModel.findOne({
    $or: [{ phone }, { email }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message: "کاربر قبلا با این شماره موبایل یاایمیل ثبت نام کرده",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const countOfUsers = await usersModel.countDocuments();

  const user = await usersModel.create({
    name,
    lastName,
    phone,
    email,
    address,
    password: hashPassword,
    role: countOfUsers > 0 ? "USER" : "ADMIN",
  });

  const userObject = user.toObject();
  Reflect.deleteProperty(userObject, "password");

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  });

  return res.status(201).json({
    message: "ثبت نام با موفقیت انجام شد",
    user: userObject,
    token: accessToken,
  });
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;

  const user = await usersModel.findOne({ phone });

  if (!user) {
    return res.status(404).json({
      message: "کابر با این شماره تلفن وجود ندارد",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return res.status(400).json({
      message: "رمز عبور اشتباه است",
    });
  }

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "30 days",
  });

  return res.json({
    message: "ورود با موفقیت انجام شد",
    token: accessToken,
  });
};

exports.getMe = async (req, res) => {
    const user = await usersModel.findOne({ _id : req.user._id }).select("-password")

    return res.json({user})
};
