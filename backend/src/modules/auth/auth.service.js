const UserRepository = require("../user/user.repository");
const TokenService = require("../token/token.service");
const TokenRepository = require("../token/token.repository");
const HashUtils = require("../../utils/hash");
const userSchema = require("../user/user.schema");

class AuthService {
  async register({ email, password }) {
    const existingUser = await UserRepository.findByEmailIncludeDeleted(email);
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await HashUtils.hashPassword(password);

    const newUser = await UserRepository.create({
      email, 
      password: hashedPassword
    })

    return newUser;
  }

  async login({ email, password }) {
    const user = await UserRepository.findByEmailIncludeDeleted(email);
    if (!user || user.isDeleted) {
      throw new Error("Wrong email or password");
    }
    const isMatch = await HashUtils.comparePassword(password, user.password);

    if (!isMatch) {
      throw new Error("Wrong email or password");
    }

    if (!user.isActive) {
      throw new Error("Your account has been locked. Please contact admin");
    }

    const tokens = await TokenService.generateAuthTokens(user);

    return {
      user,
      tokens,
    };
  }

  async logout(refreshToken) {
    if (!refreshToken) {
      throw new Error("Refresh token is required");
    }
    const token = await TokenRepository.findByToken(refreshToken);
    if (!token) {
      throw new Error("Refresh token not found or already inactive");
    }

    await TokenRepository.deactivateByToken(refreshToken);

    return true;
  }
}

module.exports = new AuthService();
