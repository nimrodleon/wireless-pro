#!/usr/bin/env node
const logger = require('morgan')
const express = require('express')
const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

// Simple Usage (Enable All CORS Requests)
const cors = require('cors')
app.use(cors())

// Simple express middleware for uploading files.
const fileUpload = require('express-fileupload')
app.use(fileUpload())

const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/red-direcom', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.use('/api/info', require('./infos/router'))
app.use('/api/users', require('./auth/router'))
app.use('/api/clients', require('./clients/router'))
app.use('/api/service-plans', require('./serviceplans/router'))
app.use('/api/service-plans/report', require('./serviceplans/report'))
app.use('/api/services', require('./services/router'))
app.use('/api/services/outages', require('./services/outage-router'))
app.use('/api/payments', require('./payments/router'))
app.use('/api/coverages', require('./coverages/router'))
app.use('/api/coverages/report', require('./coverages/report'))
app.use('/api/report', require('./report/report'))
app.use('/api/material', require('./material/router'))
app.use('/api/tasks', require('./tasks/router'))
app.use('/api/averias', require('./averia/router'))
app.use('/api/tower', require('./devices/tower-router'))
app.use('/api/tramo', require('./devices/tramo-router'))
app.use('/api/devices', require('./devices/device-router'))

const http = require('http')
const port = process.env.PORT || '3000'
const server = http.createServer(app)
server.listen(port)
