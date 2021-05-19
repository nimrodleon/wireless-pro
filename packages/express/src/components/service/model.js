import {model, Schema} from 'mongoose'

export const Service = model('Service',
  new Schema({
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    },
    ipAddress: String,
    servicePlan: {
      type: Schema.Types.ObjectId,
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
      type: Schema.Types.ObjectId,
      ref: 'Payment'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    accessPoint: {
      type: Schema.Types.ObjectId,
      ref: 'Device'
    },
    macAddress: String,
    lastOutage: String,
    createdAt: String,
    isDeleted: {
      type: Boolean,
      default: false
    }
  }))
