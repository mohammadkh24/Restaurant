const { isValidObjectId } = require("mongoose");
const productUsersModel = require("../models/productUsers");
const usersModel = require("../models/users");
const productModel = require("../models/products");

exports.getAll = async (req, res) => {
  try {
    const productUser = await productUsersModel
      .find({ userID: req.user._id })
      .populate("products.productID");

    // حذف محصولات نامعتبر قبل از ارسال پاسخ
    productUser.forEach(order => {
      order.products = order.products.filter(product => product.productID !== null);
    });

    return res.json(productUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای سرور!", error });
  }
};


exports.orders = async (req, res) => {
  try {
    const productUser = await productUsersModel
      .find({})
      .populate("products.productID")
      .populate("userID", "-password");

    // حذف محصولاتی که productID آنها null است
    productUser.forEach(order => {
      order.products = order.products.filter(product => product.productID !== null);
    });

    return res.json(productUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای سرور!", error });
  }
};


exports.checkout = async (req, res) => {
  try {
    const { items } = req.body;

    // بررسی اینکه آرایه خالی نباشه
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "سبد خرید خالی است!" });
    }

    // فیلتر کردن محصولات نامعتبر
    const validItems = [];

    for (let item of items) {
      if (!isValidObjectId(item.productID)) {
        return res.status(400).json({ message: `آیدی محصول ${item.productID} معتبر نیست` });
      }

      const product = await productModel.findById(item.productID);
      if (!product) {
        return res.status(404).json({ message: `محصول ${item.productID} پیدا نشد` });
      }

      validItems.push({
        productID: item.productID,
        quantity: item.quantity,
      });
    }

    if (validItems.length === 0) {
      return res.status(400).json({ message: "همه محصولات نامعتبر بودن!" });
    }

    // ذخیره سفارش فقط با محصولات معتبر
    const order = new productUsersModel({
      userID: req.user._id,
      products: validItems,
    });

    await order.save();

    return res.status(201).json({ message: "سفارش ثبت شد!", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای سرور!", error });
  }
};

