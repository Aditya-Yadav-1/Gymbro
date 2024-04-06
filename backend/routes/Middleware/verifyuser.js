const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    res.status(401).send({ error: "Wrong token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.Admin = data.Admin;
    next();
  } catch (error) {
    // console.log(error)
    res.status(401).send(error);
  }
};

module.exports = fetchuser;