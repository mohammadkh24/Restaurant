const { body } = require("express-validator");

const userValidator = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("نام نمی‌تواند خالی باشد")
      .isLength({ min: 2 })
      .withMessage("نام باید حداقل ۲ کاراکتر باشد"),

    body("lastName")
      .notEmpty()
      .withMessage("نام خانوادگی نمی‌تواند خالی باشد")
      .isLength({ min: 2 })
      .withMessage("نام خانوادگی باید حداقل ۲ کاراکتر باشد"),

    body("phone")
      .notEmpty()
      .withMessage("شماره تلفن نمی‌تواند خالی باشد")
      .matches(/^(\+98|0)?9\d{9}$/)
      .withMessage("شماره تلفن معتبر نیست"),

    body("email")
      .notEmpty()
      .withMessage("ایمیل نمی‌تواند خالی باشد")
      .isEmail()
      .withMessage("فرمت ایمیل نامعتبر است"),

    body("address")
      .notEmpty()
      .withMessage("آدرس نمی‌تواند خالی باشد")
      .isLength({ min: 10 })
      .withMessage("آدرس باید حداقل ۱۰ کاراکتر باشد"),

    body("password")
      .notEmpty()
      .withMessage("رمز عبور نمی‌تواند خالی باشد")
      .isLength({ min: 8 })
      .withMessage("رمز عبور باید حداقل ۸ کاراکتر باشد"),

    body("confirmPassword")
      .notEmpty()
      .withMessage("تأیید رمز عبور نمی‌تواند خالی باشد")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("رمز عبور و تأیید رمز عبور یکسان نیستند");
        }
        return true;
      }),
  ];
};

module.exports = { userValidator };
