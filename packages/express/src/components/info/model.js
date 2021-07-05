import {model, Schema} from 'mongoose'

export const Info = model('Info',
  new Schema({
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
    paperWidth: Number,
    googleMap: String
  }))
