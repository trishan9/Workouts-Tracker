import { Router } from "express"

import AuthController from "./auth.controller.js"
import isAuthenticated from "../../middlewares/auth.middleware.js"
import { upload } from "../../middlewares/multer.middleware.js"
import passport from "passport"

const authRouter = Router()

authRouter.post("/signup", upload.single("avatar"), AuthController.signup)
authRouter.post("/login", AuthController.login)
authRouter.get("/me", isAuthenticated, AuthController.getMe)

// Google OAuth Routes
authRouter.get("/failed", AuthController.authFailed)
authRouter.get(
    "/google",
    passport.authenticate("google", {
        scope: ["email", "profile"]
    })
)
authRouter.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/api/auth/failed"
    }),
    AuthController.googleAuthCallback
)


export default authRouter