import {model, Schema} from 'mongoose'

export const ServicePlan = model('ServicePlan',
  new Schema({
    name: {
      type: String,
      uppercase: true
    },
    priceMonthly: Number,
    downloadSpeed: String,
    uploadSpeed: String,
    isDeleted: {
      type: Boolean,
      default: false
    }
  }))
