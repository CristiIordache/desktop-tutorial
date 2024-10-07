import express from "express"
import dotenv from "dotenv"

import 

dotenv.config()


const app = express()
const port = process.env.PORT || 3030
app.use(express.json())


app.use('/user')