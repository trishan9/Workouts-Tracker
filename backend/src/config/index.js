import "dotenv/config"

export default {
    app: {
        port: process.env.PORT
    },
    database: {
        mongodb: {
            uri: process.env.MONGODB_URI
        }
    },
    jwt: {
        accessToken: {
            secret: process.env.JWT_ACCESS_SECRET,
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
        }
    },
    oauth: {
        google: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET
        }
    }
}