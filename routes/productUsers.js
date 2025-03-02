const express = require("express");
const productUsersController = require("../controllers/productUsers");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const router = express.Router();

// دریافت سفارشات کاربر
router.get("/", authMiddleware, productUsersController.getAll);

// دریافت تمام سفارشات (ادمین)
router.get("/all", authMiddleware , isAdminMiddleware, productUsersController.orders);

// دریافت سبد خرید از فرانت و ثبت سفارش
router.post("/checkout", authMiddleware, productUsersController.checkout);

module.exports = router;
