const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  dni: String,
  fullName: {
    type: String,
    uppercase: true
  },
  fullAddress: {
    type: String,
    uppercase: true
  },
  coverage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coverage'
  },
  email: String,
  phone: String,
  type: {
    type: String,
    uppercase: true,
    default: 'U'
  },
  note: String,
  is_active: {
    type: Boolean,
    default: true,
  }
}, { collation: 'clients' })

const Client = mongoose.model('Client', schema)
module.exports = Client
