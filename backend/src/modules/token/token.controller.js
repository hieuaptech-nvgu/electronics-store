const TokenService = require("./token.service");

class TokenController{
    async refreshAuthTokens(req, res, next){
        try{
            const {refreshToken} = req.body;
            const tokens = await TokenService.refreshAuthTokens(refreshToken);

            res.status(200).json({message: "Token refreshed successfully", data: tokens});
        }catch(error){
            next(error);
        }
    }
}

module.exports = new TokenController();