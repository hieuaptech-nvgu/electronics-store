const Token = require("./token.schema");

class TokenRepository {
  async create(payload) {
    return await Token.create(payload);
  }

  async findByToken(token) {
    return await Token.findOne({ token, isActive: true });
  }

  async deactivateByUser(userId) {
    return await Token.updateMany(
      {
        userId,
        isActive: true,
      },
      { isActive: false }
    );
  }

  async deactivateByToken(token) {
    return await Token.findOneAndUpdate(
      { token, isActive: true },
      { isActive: false }
    );
  }
}

module.exports = new TokenRepository();
