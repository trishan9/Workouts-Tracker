import express from "express"
import cors from "cors"
import helmet from "helmet"
import config from "./config/index.js"
import connectToDB from "./db/connect.js"
import router from "./modules/main.router.js"

const app = express()

app.use(cors())
app.use(helmet())

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello")
})

app.use("/api", router)

connectToDB().then(() => app.listen(config.app.port, () => console.log(`Listening on port ${config.app.port}`)))