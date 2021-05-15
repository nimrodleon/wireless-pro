const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    uppercase: true
  },
  fullName: {
    type: String,
    uppercase: true
  },
  address: String,
  phoneNumber: String,
  note: String,
  status: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: String,
  forDate: String,
  month: String,
  year: String,
}, { collation: 'tasks' })

const Task = mongoose.model('Task', schema)
module.exports = Task
