import config from "../../config/index.js"
import token from "../../lib/token.js"
import AuthService from "./auth.service.js"

const FRONTEND_URI = config.app.frontend_uri

const signup = async (req, res) => {
    const { name, email, password } = req.body
    const avatar = req.file?.path
    try {
        await AuthService.signup(name, email, password, avatar)
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

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await AuthService.login(email, password)
        res.json({
            success: true,
            ...user
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            error: err.message
        })
    }
}

const authFailed = (req, res) => {
    res.redirect(`${FRONTEND_URI}/callback?emailAlreadyExists=true`)
}

const googleAuthCallback = async (req, res) => {
    const { user } = req
    if (user) {
        if (user.isNewUser) {
            return res.redirect(`${FRONTEND_URI}/callback?isNewUser=true`)
        } else {
            const acccessToken = token.generate({
                payload: { _id: user._id },
                type: "access"
            })
            return res.redirect(`${FRONTEND_URI}/callback?accessToken=${acccessToken}&_id=${user._id}`)
        }
    }
    res.status(404).json({
        error: "Google Authentication Failed"
    })
}

const getMe = async (req, res) => {
    try {
        const user = await AuthService.getMe(res.locals.user._id)
        res.json({
            success: true,
            user
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            error: err.message
        })
    }
}

export default { login, signup, googleAuthCallback, authFailed, getMe }