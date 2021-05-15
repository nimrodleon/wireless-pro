const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  description: String,
  status: String,
  createdAt: String,
}, { collation: 'outages' })

const Outage = mongoose.model('Outage', schema)
module.exports = Outage
