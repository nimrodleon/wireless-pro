import {model, Schema} from 'mongoose'

// Schema modelo cliente.
const clientSchema = new Schema({
  dni: String,
  type: {
    type: String,
    uppercase: true,
    default: 'PERSONA',
    enum: ['PERSONA', 'EMPRESA']
  },
  fullName: {
    type: String,
    uppercase: true
  },
  fullAddress: {
    type: String,
    uppercase: true
  },
  phone: String,
  email: String,
  note: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
})

// modelo cliente.
export const Client = model('Client', clientSchema)
