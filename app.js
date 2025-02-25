const express = require("express");
const cors = require("cors");
const path = require("path")
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const productsRouter = require("./routes/products")
const discountsRouter = require("./routes/discounts")
const productUsersRouter = require("./routes/productUsers")

const app = express();

// Set Public
app.use(express.static(path.join(__dirname, "public")));

// Get req.body
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/products", productsRouter);
app.use("/discounts", discountsRouter);
app.use("/orders", productUsersRouter);

// Not-Found Page
app.use((req, res) => {
  return res.status(404).json({
    error: {
      type: "Not Found",
      message: "Page Not Found",
    },
  });
});

module.exports = app;
