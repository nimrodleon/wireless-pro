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

// Application schema.
const applicationSchema = new Schema({
  name: {
    type: String,
    uppercase: true
  },
  urlBase: String,
  token: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
})

// Application model.
// almacena la información de aplicaciones relacionadas.
export const Application = model('Application', applicationSchema)
