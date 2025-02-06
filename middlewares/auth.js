const jwt = require("jsonwebtoken");
const userModel = require("../models/users");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization")?.split(" ");

  if (authHeader?.length !== 2) {
    return res.status(403).json({
      message: "This route is protected and you can't access to it!",
    });
  }

  const token = authHeader[1];

  try {
    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(jwtPayload.id).lean();

    if (!user) {
      return res.status(404).json({
        message: "User not found !", 
      });
    }

    Reflect.deleteProperty(user, "password");

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json(error); 
  }
};
