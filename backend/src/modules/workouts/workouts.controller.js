import WorkoutsService from "./workouts.service.js"

const getAllWorkouts = async (req, res) => {
    try {
        const userId = res.locals.user._id
        const workouts = await WorkoutsService.getAllWorkouts(userId, req.query.page)
        res.json({
            success: true,
            ...workouts
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            error: err.message
        })
    }
}

const getWorkout = async (req, res) => {
    try {
        const workout = await WorkoutsService.getWorkout(req.params.id)
        res.json({
            success: true,
            workout
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            error: err.message
        })
    }
}

const createWorkout = async (req, res) => {
    try {
        const { title, reps, load } = req.body
        await WorkoutsService.createWorkout(title, Number(reps), Number(load), res.locals.user._id)
        res.json({
            success: true,
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            error: err.message
        })
    }
}

const deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params
        await WorkoutsService.deleteWorkout(id)
        res.json({
            success: true,
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            error: err.message
        })
    }
}

const updateWorkout = async (req, res) => {
    try {
        const { body } = req
        const { id } = req.params
        await WorkoutsService.updateWorkout(id, body)
        res.json({
            success: true,
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            error: err.message
        })
    }
}

export default { getAllWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout }