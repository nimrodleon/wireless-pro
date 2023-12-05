const dotenv = require("dotenv")
const express = require("express")
const http = require("http")
const mongoose = require("mongoose")
const router = require("./routes")
const logger = require("morgan")
const cors = require("cors")

dotenv.config()
const app = express()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// Simple Usage (Enable All CORS Requests)
app.use(cors())
const dbname = process.env.DB_NAME || "rd4-server"
mongoose.connect(`mongodb://127.0.0.1:27017/${dbname}`)
  .then(async () => {
    router(app)
    console.log(dbname)
    console.log("database connect success!")
    const port = process.env.PORT || "3000"
    const server = http.createServer(app)
    server.listen(port)
  })
