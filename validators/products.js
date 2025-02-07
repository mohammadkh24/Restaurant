const { body } = require("express-validator");

const productValidator = () => {
  return [
    body("title")
      .isString()
      .withMessage("عنوان باید یک رشته باشد")
      .isLength({ min: 3 })
      .withMessage("عنوان باید حداقل ۳ کاراکتر داشته باشد"),

    body("description")
      .isString()
      .withMessage("توضیحات باید یک رشته باشد")
      .isLength({ min: 10 })
      .withMessage("توضیحات باید حداقل ۱۰ کاراکتر داشته باشد"),

    //
    // body("image")
    //   .isURL()
    //   .withMessage("آدرس تصویر باید یک URL معتبر باشد")
    //   .matches(/\.(jpeg|jpg|gif|png)$/i)
    //   .withMessage("آدرس تصویر باید فرمت معتبر jpeg، jpg، gif یا png داشته باشد"),

    body("timeRequired")
      .isString()
      .withMessage("زمان مورد نیاز باید یک رشته باشد")
      .isLength({ min: 3 })
      .withMessage("زمان مورد نیاز باید حداقل ۳ کاراکتر داشته باشد"),

    body("priceWithoutDiscount")
      .isFloat({ min: 0 })
      .withMessage("قیمت بدون تخفیف باید یک عدد بزرگتر یا مساوی صفر باشد"),

    body("priceWithDiscount")
      .isFloat({ min: 0 })
      .withMessage("قیمت با تخفیف باید یک عدد بزرگتر یا مساوی صفر باشد"),

    body("categoryID")
      .isMongoId()
      .withMessage("شناسه دسته‌بندی باید یک ID معتبر MongoDB باشد"),
  ];
};

module.exports = { productValidator };
