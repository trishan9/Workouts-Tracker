import Workouts from "../../db/models/workouts.js"
import getPagination from "../../utils/pagination.js"

const SORT_METHODS = {
    "title-asc": "title",
    "title-desc": "-title",
    "date-asc": "createdAt",
    "date-desc": "-createdAt"
}

const getAllWorkouts = async (userId, query) => {
    const { page, sortBy } = query
    const { limit, skip } = getPagination(page)
    const totalWorkouts = await Workouts.countDocuments({ userId })
    const totalPages = totalWorkouts <= limit ? 1 : Math.ceil(totalWorkouts / limit)
    const hasNextPage = parseInt(page) < parseInt(totalPages) ? true : false
    const workouts = await Workouts.find({ userId }).sort(sortBy ? SORT_METHODS[sortBy] : { "createdAt": -1 }).skip(skip).limit(limit)
    return {
        workouts,
        pageData: {
            totalPages,
            currentPage: parseInt(page),
            hasNextPage,
            totalResults: totalWorkouts,
            from: skip + 1,
            to: totalWorkouts <= limit ? totalWorkouts : skip + workouts.length
        }
    }
}

const getWorkout = async (id) => {
    const workout = await Workouts.findById(id)
    if (!workout) throw Error("Workout with this ID not found")
    return workout
}

const createWorkout = async (title, reps, load, userId) => {
    if (!title || !reps) {
        throw Error("Title and Reps are required")
    }
    const exists = await Workouts.findOne({ title, userId })
    if (exists) throw Error("Workout with this title already exists")
    return await Workouts.create({ title, reps, load, userId })
}

const deleteWorkout = async (id) => {
    const workout = await Workouts.findById(id)
    if (!workout) throw Error("Workout with this ID not found")
    return await Workouts.deleteOne({ _id: id })
}

const updateWorkout = async (id, body) => {
    const workout = await Workouts.findById(id)
    if (!workout) throw Error("Workout with this ID not found")
    return await Workouts.updateOne({ _id: id }, { ...body })
}

export default { getAllWorkouts, getWorkout, createWorkout, deleteWorkout, updateWorkout }