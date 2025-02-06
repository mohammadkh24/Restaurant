const {validationResult} = require("express-validator");

const validate = (req,res,next) => {
    const result = validationResult(req);

  if (!result.isEmpty()) {
    const obj = {};

    result.errors.forEach((error) => {
      obj[error.path] = error.msg;
    });

    return res.status(400).json(obj);
  } else {
    next()
  }
}

module.exports = validate