import bcrypt from "bcrypt"

const generate = async (password) => {
    return await bcrypt.hash(password, 12)
}

const compare = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

export default { generate, compare }