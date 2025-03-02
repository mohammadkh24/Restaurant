const { isValidObjectId } = require("mongoose");
const productUsersModel = require("../models/productUsers");
const usersModel = require("../models/users");
const productModel = require("../models/products");

exports.getAll = async (req, res) => {
  try {
    const productUser = await productUsersModel
      .find({ userID: req.user._id })
      .populate("products.productID");

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

    return res.json(productUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای سرور!", error });
  }
};

exports.checkout = async (req, res) => {
  try {
    const { items } = req.body; // دریافت آرایه ای از محصولات و تعدادهایشان

    // بررسی اینکه سبد خرید خالی نباشه
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "سبد خرید خالی است!" });
    }

    // بررسی اعتبار هر محصول
    for (let item of items) {
      if (!isValidObjectId(item.productID)) {
        return res.status(400).json({ message: `آیدی محصول ${item.productID} معتبر نیست` });
      }
      const product = await productModel.findById(item.productID);
      if (!product) {
        return res.status(404).json({ message: `محصول ${item.productID} پیدا نشد` });
      }
    }

    const user = await usersModel.findById(req.user._id).select("-password");

    // بررسی اینکه آیا سبد خرید قبلاً وجود دارد یا نه
    let existingOrder = await productUsersModel.findOne({ userID: user._id });

    if (existingOrder) {
      // اگر سبد خرید موجود باشد، بررسی می‌کنیم که آیا هر محصول قبلاً وجود دارد یا خیر
      for (let item of items) {
        const productIndex = existingOrder.products.findIndex(
          (product) => product.productID.toString() === item.productID
        );

        if (productIndex !== -1) {
          // اگر محصول قبلاً موجود بود، تعداد آن را به روز می‌کنیم
          existingOrder.products[productIndex].quantity += item.quantity;
        } else {
          // اگر محصول جدید بود، آن را اضافه می‌کنیم
          existingOrder.products.push({
            productID: item.productID,
            quantity: item.quantity,
          });
        }
      }

      // ذخیره تغییرات در سبد خرید
      await existingOrder.save();
    } else {
      // اگر سبد خرید برای کاربر وجود نداشت، سبد خرید جدید می‌سازیم
      const newOrder = new productUsersModel({
        userID: user._id,  // userID را فقط به صورت ID ارسال می‌کنیم
        products: items,   // محصولات و تعداد آنها
      });

      await newOrder.save();
    }

    return res.status(201).json({
      message: "محصولات به سفارشات اضافه شد",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "خطای سرور!", error });
  }
};
