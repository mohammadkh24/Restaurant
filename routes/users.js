const express = require("express");
const usersController = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");
const isAdminMiddleware = require("../middlewares/isAdmin");

const router = express.Router()


router.route("/").get(authMiddleware , isAdminMiddleware, usersController.getAll)
router.route("/:id/remove").delete(authMiddleware , isAdminMiddleware, usersController.remove)
router.route("/:id/role").put(authMiddleware , isAdminMiddleware , usersController.changeRole)

module.exports = router