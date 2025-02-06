const express = require("express");
const authController = require("../controllers/auth");
const validateMiddleware = require("../middlewares/validate");
const authMiddleware = require("../middlewares/auth");
const { userValidator } = require("../validators/users");

const router = express.Router();

router
  .route("/register")
  .post(userValidator(), validateMiddleware, authController.register);

router
  .route("/login")
  .post(authController.login);

router
  .route("/getMe")
  .get(authMiddleware ,authController.getMe);

module.exports = router;
