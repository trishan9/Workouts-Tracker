import jwt from "jsonwebtoken"
import config from "../config/index.js"

const selectType = (type) => {
    if (type === "access") {
        return {
            secret: config.jwt.accessToken.secret,
            expiresIn: config.jwt.accessToken.expiresIn
        }
    }
}

const generate = ({ payload, type }) => {
    const { expiresIn, secret } = selectType(type)
    return jwt.sign(payload, secret, { expiresIn, subject: type })
}

const verify = ({ token, type }) => {
    const { secret } = selectType(type)
    return jwt.verify(token, secret, { subject: type })
}

export default { generate, verify }