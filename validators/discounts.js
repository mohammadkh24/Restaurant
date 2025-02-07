const { body } = require("express-validator");

const discountValidator = () => {
  return [
    body("productID")
      .isMongoId()
      .withMessage("شناسه محصول باید یک ID معتبر MongoDB باشد"),

    body("discount")
      .isFloat({ min: 0, max: 100 })
      .withMessage("تخفیف باید یک عدد بین ۰ تا ۱۰۰ باشد"),
  ];
};

module.exports = { discountValidator };
