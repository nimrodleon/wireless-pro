import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import http from 'http'
import mongoose from 'mongoose'
import {Telegraf} from 'telegraf'
import router from './network/routes'
import {initBot365} from './rbot365'
import logger from 'morgan'
import cors from 'cors'

dotenv.config()
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))
// Simple Usage (Enable All CORS Requests)
app.use(cors())
const bot = new Telegraf(process.env.BOT_TOKEN)
const dbname = process.env.DB_NAME || 'rd4-server'
mongoose.connect(`mongodb://127.0.0.1:27017/${dbname}`, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
}).then(async () => {
  router(app)
  console.log(dbname)
  console.log('database connect success!')
  // Begin Bot TELEGRAM.
  initBot365(bot)
  await bot.launch()
  // End Bot TELEGRAM.
  const port = process.env.PORT || '3000'
  const server = http.createServer(app)
  server.listen(port)
})
