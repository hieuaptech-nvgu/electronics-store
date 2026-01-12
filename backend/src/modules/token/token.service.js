const JwtUtils = require("../../utils/jwt");
const tokenSchema = require("./token.schema");
class TokenService{
    async generateAuthTokens(user){
        const payload = {
            id: user._id,
            roles: user.roles,
        }

        const accessToken = JwtUtils.createAccessToken(payload);
        const refreshToken = JwtUtils.createRefreshToken(payload);

        await tokenSchema.create({
            userId: user._id,
            token: refreshToken,
        })

        return {
            accessToken,
            refreshToken
        }
    }

    
}