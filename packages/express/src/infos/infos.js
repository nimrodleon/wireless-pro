const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  ruc: String,
  company: {
    type: String,
    uppercase: true
  },
  fullAddress: {
    type: String,
    uppercase: true
  },
  phone: String,
  legendTicket: String,
}, { collation: 'infos' })

const Info = mongoose.model('Info', schema)
module.exports = Info
