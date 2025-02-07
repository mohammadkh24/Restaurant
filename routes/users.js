const express = require("express");
const usersController = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");
const validateMiddleware = require("../middlewares/validate");
const { userValidator } = require("../validators/users");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, isAdminMiddleware, usersController.getAll);
router
  .route("/:id/remove")
  .delete(authMiddleware, isAdminMiddleware, usersController.remove);
router
  .route("/edit")
  .put(
    authMiddleware,
    usersController.edit
  );
router
  .route("/:id/role")
  .put(authMiddleware, isAdminMiddleware, usersController.changeRole);

module.exports = router;
