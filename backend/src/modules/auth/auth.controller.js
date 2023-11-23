import AuthService from "./auth.service.js"

const signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        await AuthService.signup(name, email, password)
        res.json({
            success: true,
        })
    } catch (err) {
        res.json({
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
        res.json({
            success: false,
            error: err.message
        })
    }
}

export default { login, signup }