const { body } = require("express-validator");

const categoriesValidator = () => {
  return [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("عنوان دسته‌بندی الزامی است!")
      .isLength({ min: 3, max: 50 })
      .withMessage("عنوان باید بین ۳ تا ۵۰ کاراکتر باشد!"),

    // body("image")
    //   .notEmpty()
    //   .withMessage("لینک تصویر الزامی است!")
    //   .isURL()
    //   .withMessage("لینک تصویر معتبر نیست!")
    //   .matches(/\.(jpg|jpeg|png|webp|gif)$/i)
    //   .withMessage("فرمت تصویر باید jpg, jpeg, png, webp یا gif باشد!"),
  ];
};

module.exports = { categoriesValidator };
