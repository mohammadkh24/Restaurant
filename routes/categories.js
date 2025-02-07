const express = require("express");
const categoriesController = require("../controllers/categories");
const validateMiddleware = require("../middlewares/validate");
const authMiddleware = require("../middlewares/auth");
const { categoriesValidator } = require("../validators/categories");
const isAdminMiddleware = require("../middlewares/isAdmin");
const multer = require("multer");
const multerStorage = require("../utils/uploader");

const router = express.Router();

router.route("/").get(categoriesController.getAll);

router
  .route("/add")
  .post(
    multer({ storage: multerStorage, limits: { fileSize: 300000 } }).single(
        "cover"
      ),
    authMiddleware,
    isAdminMiddleware,
    categoriesValidator(),
    validateMiddleware,
    categoriesController.add
  );

router
  .route("/:id/remove")
  .delete(authMiddleware, isAdminMiddleware, categoriesController.remove);

router
  .route("/:id/edit")
  .put(multer({ storage: multerStorage, limits: { fileSize: 300000 } }).single(
    "cover"
  ),authMiddleware, isAdminMiddleware, categoriesController.edit);

module.exports = router;
