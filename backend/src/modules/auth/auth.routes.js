import { Router } from "express"

import AuthController from "./auth.controller.js"
import isAuthenticated from "../../middlewares/auth.middleware.js"

const authRouter = Router()

authRouter.post("/signup", AuthController.signup)
authRouter.post("/login", AuthController.login)
authRouter.get("/me", isAuthenticated, AuthController.getMe)

export default authRouter