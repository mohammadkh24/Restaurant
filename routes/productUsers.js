const express = require("express");
const productUsersController = require("../controllers/productUsers");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const router = express.Router();

router.route("/").get(authMiddleware,productUsersController.getAll);
router.route("/all").get(authMiddleware , isAdminMiddleware,productUsersController.orders);
router.route("/:id/add").post(authMiddleware,productUsersController.add);
router.route("/:id/remove").delete(authMiddleware,productUsersController.remove);

module.exports = router;
