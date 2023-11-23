import { Router } from "express"

import authRouter from "./auth/auth.routes.js"
import userRouter from "./user/user.routes.js"

import isAuthenticated from "../middlewares/auth.middleware.js"
import workoutRouter from "./workouts/workouts.routes.js"

const router = Router()

router.use("/auth", authRouter)
router.use("/user", userRouter)
router.use("/workout", isAuthenticated, workoutRouter)

export default router