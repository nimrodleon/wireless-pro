import {model, Schema} from 'mongoose'

export const ServicePlan = model('ServicePlan',
  new Schema({
    name: {
      type: String,
      uppercase: true
    },
    priceMonthly: Number,
    downloadSpeed: Number,
    uploadSpeed: Number,
  }))
