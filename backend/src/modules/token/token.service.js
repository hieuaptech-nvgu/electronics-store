const JwtUtils = require("../../utils/jwt");
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

  // async refreshAuthTokens(refreshToken) {
  //   const payload = JwtUtils.verifyRefreshToken(refreshToken);
  //   const token = await TokenRepository.findByToken(refreshToken);
  //   if(!token){
  //       throw new Error("Refresh token not found");
  //   }

  //   await TokenRepository.deactivateByToken(refreshToken);

  //   const newPayload = {
  //       userId: payload.id,
  //       roles: payload.roles,
  //   }
  // }
}

module.exports = new TokenService();
