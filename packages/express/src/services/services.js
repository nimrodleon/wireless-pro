const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client'
  },
  ipAddress: String,
  servicePlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServicePlan'
  },
  dateFrom: String,
  closeDate: String,
  userName: String,
  password: String,
  note: String,
  isActive: {
    type: Boolean,
    default: true
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  accessPoint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device'
  },
  macAddress: String,
  lastOutage: String,
  createdAt: String,
}, { collation: 'services' })

const Service = mongoose.model('Service', schema)
module.exports = Service
