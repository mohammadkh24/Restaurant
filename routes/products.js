const express = require("express");
const productsController = require("../controllers/products");
const validateMiddleware = require("../middlewares/validate");
const authMiddleware = require("../middlewares/auth");
const { productValidator } = require("../validators/products");
const isAdminMiddleware = require("../middlewares/isAdmin");
const multer = require("multer");
const multerStorage = require("../utils/uploader");

const router = express.Router();

router
  .route("/add")
  .post(
    authMiddleware,  
    isAdminMiddleware, 
    multer({ storage: multerStorage, limits: { fileSize: 300000 } }).single("image"),  
    productValidator(), 
    validateMiddleware, 
    productsController.add 
  );


router.route("/").get(productsController.getAll);

router.route("/:id").get(productsController.getOne);

router.route("/category/:categoryID").get(productsController.getByCategory);





router
  .route("/:id/remove")
  .delete(authMiddleware, isAdminMiddleware, productsController.remove);

router
  .route("/:id/edit")
  .put(
    productValidator(),
    validateMiddleware,
    authMiddleware,
    isAdminMiddleware,
    productsController.edit
  );

module.exports = router;
