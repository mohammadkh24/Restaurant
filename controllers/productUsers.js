const { isValidObjectId } = require("mongoose");
const productUsersModel = require("../models/productUsers");
const usersModel = require("../models/users");
const productModel = require("../models/products");

exports.getAll = async (req, res) => {
    const productUser = await productUsersModel
        .find({ userID: req.user._id })
        .populate("productID");

    return res.json(productUser);
};

exports.orders = async (req, res) => {
    const productUser = await productUsersModel
        .find({})
        .populate("productID")
        .populate("userID", "-password");

    return res.json(productUser);
};

exports.checkout = async (req, res) => {
    try {
        const { productID, quantity } = req.body;  // دریافت یک محصول به صورت جداگانه

        // بررسی اینکه محصول و تعداد مشخص شده است
        if (!productID || !quantity) {
            return res.status(400).json({ message: "محصول یا تعداد مشخص نشده است!" });
        }

        if (!isValidObjectId(productID)) {
            return res.status(400).json({ message: `آیدی محصول ${productID} معتبر نیست` });
        }

        // بررسی موجودیت محصول در دیتابیس
        const product = await productModel.findById(productID);
        if (!product) {
            return res.status(404).json({ message: `محصول ${productID} پیدا نشد` });
        }

        // ساخت یا به روزرسانی سفارش در دیتابیس
        const user = await usersModel.findById(req.user._id).select("-password");

        // چک کردن اینکه آیا این محصول قبلاً به سفارشات اضافه شده است یا نه
        const existingOrder = await productUsersModel.findOne({ userID: user._id, productID: productID });
        
        if (existingOrder) {
            // اگر محصول قبلاً موجود بود، تعداد آن را به روزرسانی می‌کنیم
            existingOrder.quantity += quantity;
            await existingOrder.save();
        } else {
            // اگر محصول قبلاً موجود نبود، یک سفارش جدید ایجاد می‌کنیم
            await productUsersModel.create({
                userID: user,
                productID: product,
                quantity: quantity,
            });
        }

        return res.status(201).json({
            message: "محصول به سفارشات اضافه شد",
        });
    } catch (error) {
        return res.status(500).json({ message: "خطای سرور!", error });
    }
};


