const jwt = require("jsonwebtoken");
const USER = require("../userschema/userSchema");
const Authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token)
    console.log("Hello ", token);
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("theuser is", verifyToken);
    const rootUser = await USER.findOne({
      _id: verifyToken._id
    });
    if (!rootUser) {
      throw new Error("User not found");
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    next();
  } catch (err) {
    res.status(401).send({ err: "unAutherized User" });
    console.log(err);
  }
};
module.exports = Authenticate;
