import dotenv from 'dotenv'
import express from 'express'
import logger from 'morgan'
import router from './network/routes'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import http from 'http'

dotenv.config()
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
// Simple Usage (Enable All CORS Requests)
app.use(cors())
const dbname = process.env.DB_NAME || 'rd4-server'
mongoose.connect(`mongodb://127.0.0.1:27017/${dbname}`, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(() => {
  router(app)
  console.log(dbname)
  console.log('database connect success!')
  const port = process.env.PORT || '3000'
  const server = http.createServer(app)
  server.listen(port)
})
