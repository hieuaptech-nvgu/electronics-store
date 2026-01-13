const JwtUtils = require("../utils/jwt");
const UserRepository = require("../modules/user/user.repository");

const verifyAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token is required" });
    }

    const token = authHeader.split(" ")[1];

    let payload;

    try {
      payload = JwtUtils.verifyAccessToken(token);
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Invalid or expired access token" });
    }

    const user = await UserRepository.findByIdActive(payload.id);

    if (!user) {
      return res.status(401).json({ message: "User not found or inactive" });
    }

    req.user = {
      id: user._id,
      roles: user.roles,
    };

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyAccessToken,
};