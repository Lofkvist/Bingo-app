const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {

  console.log("Inne i veryfyJWT" + req.headers);
  const token = req.headers["x-access-token"];
  if (!token) {
    res.status(400).json({ error: "No token given" });
  } else {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "Failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

module.exports = {verifyJWT};
