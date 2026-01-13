const AuthService = require("./auth.service");

class AuthController{
    async register(req, res, next){
        try{
            const user = await AuthService.register(req.body);
            res.status(201).json({message: "Register successful", data: user})
        }catch(error){
            next(error);
        }
    }
    
    async login(req,res,next){
        try{
            const { user, tokens, cookieOptions } = await AuthService.login(
              req.body
            );
            res.cookie("refreshToken", tokens.refreshToken, cookieOptions);
            res.status(200).json({message: "Login successful", data: user, accessToken: tokens.accessToken});
        }catch(error){
            next(error);
        }
    }
}

module.exports = new AuthController();