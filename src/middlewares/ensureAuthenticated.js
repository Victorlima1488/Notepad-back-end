const { verify } = require("jsonwebtoken")
const Apperror = require("../utils/AppError")
const authConfig = require("../config/auth")

function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization

    if(!authHeader) {
        throw new Apperror("JWT Token não informado", 401)
    }

    const [, token] = authHeader.split(' ')

    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret)

        request.user = {
            id: Number(user_id)
        }

        return next()
    }catch{
        throw new Apperror("JWT Token inválido", 401)
    }
}   

module.exports = ensureAuthenticated