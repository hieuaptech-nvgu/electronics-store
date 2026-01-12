const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;
const SECRET_REFRESH_KEY = process.env.SECRET_REFRESH_KEY;
const ACCESS_EXPIRES_IN = "3m";
const REFRESH_EXPIRES_IN = "7d";

class JwtUtils {
  createAccessToken(payload) {
    return jwt.sign(payload, SECRET_ACCESS_KEY, {
      expiresIn: ACCESS_EXPIRES_IN,
    });
  }

  createRefreshToken(payload) {
    return jwt.sign(payload, SECRET_REFRESH_KEY, {
      expiresIn: REFRESH_EXPIRES_IN,
    });
  }

  verifyAccessToken(token) {
    return jwt.verify(token, SECRET_ACCESS_KEY);
  }

  verifyRefreshToken(token) {
    return jwt.verify(token, SECRET_REFRESH_KEY);
  }
}

module.exports = new JwtUtils();
