const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },
  month: String,
  amount: Number,
  payment_method: String,
  note: String,
  created_date: String,
  year: String,
  payFrom: String,
  payUp: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { collation: 'payments' })

const Payment = mongoose.model('Payment', schema)
module.exports = Payment
