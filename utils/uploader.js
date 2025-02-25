const path = require("path");
const multer = require("multer");
const crypto = require("crypto");

module.exports = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "public", "covers"));
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + Math.floor(Math.random() * 9999);

    // const hashedFilename = crypto
    //   .createHash("SHA256")
    //   .update(file.originalname)
    //   .digest("hex");

    const ext = path.extname(file.originalname);
    cb(null, fileName + ext);
  },
});
