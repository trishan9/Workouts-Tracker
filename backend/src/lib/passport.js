import passport from "passport"
import { Strategy } from "passport-google-oauth20";
import config from "../config/index.js";
import Users from "../db/models/users.js";

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.use(new Strategy({
    clientID: config.oauth.google.client_id,
    clientSecret: config.oauth.google.client_secret,
    callbackURL: config.oauth.google.callback_url
},
    async function (access, refresh, profile, done) {
        try {
            const { sub, name, email, picture } = profile._json
            const userExists = await Users.findOne({ googleId: sub, email })
            if (!userExists) {
                const user = await Users.create({ name, email, googleId: sub, avatar: picture, password: "" })
                return done(null, { ...user, isNewUser: true })
            } else {
                return done(null, userExists)
            }
        } catch (err) {
            return done(null, null)
        }
    }
))
