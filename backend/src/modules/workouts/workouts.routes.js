import { Router } from "express"

import WorkoutsController from "./workouts.controller.js"

const workoutRouter = Router()

workoutRouter.get("/", WorkoutsController.getAllWorkouts)
workoutRouter.get("/:id", WorkoutsController.getWorkout)
workoutRouter.post("/", WorkoutsController.createWorkout)
workoutRouter.delete("/:id", WorkoutsController.deleteWorkout)
workoutRouter.patch("/:id", WorkoutsController.updateWorkout)

export default workoutRouter