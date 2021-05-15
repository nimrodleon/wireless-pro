const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true
  },
  priceMonthly: Number,
  downloadSpeed: Number,
  uploadSpeed: Number,
}, { collation: 'serviceplans' })

const ServicePlan = mongoose.model('ServicePlan', schema)
module.exports = ServicePlan
