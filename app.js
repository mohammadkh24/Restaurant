const express = require("express")
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth")

const app = express();

// Get req.body
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/auth" , authRouter)

// Not-Found Page
app.use((req, res) => {
    return res.status(404).json({
      error: {
        type: "Not Found",
        message: "Page Not Found",
      },
    });
  });

module.exports = app