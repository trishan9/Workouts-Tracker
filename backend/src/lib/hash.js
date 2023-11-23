import bcrypt from "bcrypt"

const generate = (password) => {
    return bcrypt.hash(password, 12)
}

const compare = (password, hash) => {
    return bcrypt.compare(password, hash)
}

export default { generate, compare }