import validator from "validator"

import Users from "../../db/models/users.js"
import hash from "../../lib/hash.js"
import token from "../../lib/token.js"
import uploadToCloudinary from "../../lib/cloudinary.js"

const signup = async (name, email, password, avatar) => {
    if (!email || !name || !password || !avatar) {
        throw Error("All the fields are required")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email address is not valid")
    }

    const exists = await Users.findOne({ email })
    if (exists) {
        throw Error("User with this email address already exists")
    }
    const avatarUrl = await uploadToCloudinary(avatar)
    const hashedPassword = await hash.generate(password)
    const user = await Users.create({ name, email, password: hashedPassword, avatar: avatarUrl.secure_url })
    return user
}

const login = async (email, password) => {
    if (!email || !password) {
        throw Error("All the fields are required")
    }

    if (!validator.isEmail(email)) {
        throw Error("Email address is not valid")
    }

    const user = await Users.findOne({ email })
    if (!user) {
        throw Error("User with this email address doesn't exist")
    }

    const isPasswordCorrect = await hash.compare(password, user.password)
    if (!isPasswordCorrect) {
        throw Error("Password is incorrect")
    }

    const acccessToken = token.generate({
        payload: { _id: user._id },
        type: "access"
    })

    return {
        token: acccessToken,
        _id: user._id
    }
}

const getMe = async (id) => {
    const user = await Users.findById(id)
    if (!user) {
        throw Error("User doesn't exists!")
    }
    return {
        name: user.name,
        email: user.email,
        avatar: user.avatar
    }
}

export default { signup, login, getMe }