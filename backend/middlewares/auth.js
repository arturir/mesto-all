const jwt = require("jsonwebtoken");

const { NODE_ENV, JWT_SECRET } = process.env;
const secretKey = NODE_ENV === "production" ? JWT_SECRET : "dev-secret";

const UnauthorizedError = require("../errors/UnauthorizedError");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return new UnauthorizedError("Необходима авторизация")
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return new UnauthorizedError("Необходима авторизация")
  }
  req.user = payload;
  next();
};
