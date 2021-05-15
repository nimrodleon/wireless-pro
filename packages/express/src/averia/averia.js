const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  averia: String,
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: String,
  priority: String,
  archived: Boolean,
  createdAt: String,
  year: String,
  month: String,
  day: String,
  origin: String,
  solution: String,
}, { collation: 'averias' })

const Averia = mongoose.model('Averia', schema)
module.exports = Averia
