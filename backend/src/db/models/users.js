import { model, Schema } from "mongoose"

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    googleId: {
        type: String
    }
})

const Users = model("User", userSchema)

export default Users