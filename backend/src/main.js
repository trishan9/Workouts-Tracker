import express from "express"
import cors from "cors"
import helmet from "helmet"
import passport from "passport"
import session from "express-session"

import config from "./config/index.js"
import connectToDB from "./db/connect.js"
import router from "./modules/main.router.js"
import "./lib/passport.js"

const app = express()

app.use(cors())
app.use(helmet())
app.use(session(config.session))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.json())

app.use("/api", router)

connectToDB().then(() => app.listen(config.app.port, () => console.log(`Listening on port ${config.app.port}`)))