import {model, Schema} from 'mongoose'

export const Client = model('Client',
  new Schema({
    dni: String,
    fullName: {
      type: String,
      uppercase: true
    },
    fullAddress: {
      type: String,
      uppercase: true
    },
    coverage: {
      type: Schema.Types.ObjectId,
      ref: 'Coverage'
    },
    email: String,
    phone: String,
    type: {
      type: String,
      uppercase: true,
      default: 'U'
    },
    note: String,
    is_active: {
      type: Boolean,
      default: true,
    }
  }))
