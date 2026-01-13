const JwtUtils = require("../../utils/jwt");
const UserRepository = require("../user/user.repository");
const TokenRepository = require("./token.repository");

class TokenService {
  async generateAuthTokens(user) {
    const payload = {
      id: user._id,
      roles: user.roles,
    };

    const accessToken = JwtUtils.createAccessToken(payload);
    const refreshToken = JwtUtils.createRefreshToken(payload);

    await TokenRepository.deactivateByUser(user._id);

    await TokenRepository.create({
      userId: user._id,
      token: refreshToken,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAuthTokens(refreshToken) {
    let payload;

    try {
      payload = JwtUtils.verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new Error("Invalid or expired refresh token");
    }

    const storedToken = await TokenRepository.findByToken(refreshToken);

    if (!storedToken) {
      throw new Error("Refresh token not found or revoked");
    }

    await TokenRepository.deactivateByToken(refreshToken);

    const user = await UserRepository.findByIdActive(payload.id);

    if (!user) {
      throw new Error("User not found or inactive");
    }

    const newToken = await this.generateAuthTokens(user);

    return newToken;
  }


}

module.exports = new TokenService();
