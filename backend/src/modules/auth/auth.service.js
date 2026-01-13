const userSchema = require("../user/user.schema");
const TokenService = require("../token/token.service");
const HashUtils = require("../../utils/hash");

class AuthService {
  async register({ email, password }) {
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await HashUtils.hashPassword(password);

    const newUser = await userSchema.create({
      email,
      password: hashedPassword,
    });

    return newUser;
  }

  async login({ email, password }) {
    const user = await userSchema.findOne({ email });
    if (!user) {
      throw new Error("Wrong email or password");
    }
    const isMatch = await HashUtils.comparePassword(password, user.password);

    if (!isMatch) {
      throw new Error("Incorrect password");
    }

    if (!user.isActive) {
      throw new Error("Your account has been locked. Please contact admin");
    }

    const tokens = await TokenService.generateAuthTokens(user);

    const cookieOptions = {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    return {
      user,
      tokens,
      cookieOptions,
    };
  }
}

module.exports = new AuthService();
