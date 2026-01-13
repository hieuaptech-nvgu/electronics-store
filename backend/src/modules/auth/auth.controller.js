const AuthService = require("./auth.service");

class AuthController {
  async register(req, res, next) {
    try {
      const user = await AuthService.register(req.body);
      res.status(201).json({ message: "Register successful", data: user });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { user, tokens } = await AuthService.login(req.body);

      const options = {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      };

      res.cookie("refreshToken", tokens.refreshToken, options);

      const { password, ...safeUser } = user.toObject();

      res.status(200).json({
        message: "Login successful",
        data: safeUser,
        accessToken: tokens.accessToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;

      await AuthService.logout(refreshToken);

      res.clearCookie("refreshToken");
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
