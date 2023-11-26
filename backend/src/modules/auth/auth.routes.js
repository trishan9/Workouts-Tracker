import { Router } from "express"

import AuthController from "./auth.controller.js"
import isAuthenticated from "../../middlewares/auth.middleware.js"
import { upload } from "../../middlewares/multer.middleware.js"

const authRouter = Router()

authRouter.post("/signup", upload.single("avatar"), AuthController.signup)
authRouter.post("/login", AuthController.login)
authRouter.get("/me", isAuthenticated, AuthController.getMe)

export default authRouter