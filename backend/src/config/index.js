import "dotenv/config"

export default {
    app: {
        port: process.env.PORT,
        frontend_uri: process.env.FRONTEND_URI
    },
    database: {
        mongodb: {
            uri: process.env.MONGODB_URI
        }
    },
    session: {
        secret: "workouts-tracker-session-secret",
        resave: false,
        saveUninitialized: false
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
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            callback_url: "https://enthusiastic-umbrella-newt.cyclic.app/api/auth/google/callback"
        }
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
}