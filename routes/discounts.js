const express = require("express");
const discountsController = require("../controllers/discounts");
const validateMiddleware = require("../middlewares/validate");
const authMiddleware = require("../middlewares/auth");
const { discountValidator } = require("../validators/discounts");
const isAdminMiddleware = require("../middlewares/isAdmin");

const router = express.Router();

router.route("/").get(discountsController.getAll);

router
  .route("/set")
  .get(
    discountValidator(),
    validateMiddleware,
    authMiddleware,
    isAdminMiddleware,
    discountsController.set
  );
  
router
  .route("/setAll")
  .get(
    discountValidator(),
    validateMiddleware,
    authMiddleware,
    isAdminMiddleware,
    discountsController.setAll
  );

router
  .route("/:id/remove")
  .delete(
    authMiddleware,
    isAdminMiddleware,
    discountsController.remove
  );

router
  .route("/:id/edit")
  .put(
    authMiddleware,
    isAdminMiddleware,
    discountsController.edit
  );

module.exports = router;
