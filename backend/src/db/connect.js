import mongoose from "mongoose"
import config from "../config/index.js"

const connectToDB = async () => {
    await mongoose.connect(config.database.mongodb.uri)
    console.log("Connected to database succesfully")
}

export default connectToDB