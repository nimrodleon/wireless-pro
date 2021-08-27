import {model, Schema} from 'mongoose'

// Schema info model.
const infoSchema = new Schema({
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
})

// Model info.
// almacena información general.
export const Info = model('Info', infoSchema)
