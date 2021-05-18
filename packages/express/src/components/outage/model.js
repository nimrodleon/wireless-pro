import {model, Schema} from 'mongoose'

export const Outage = model('Outage',
  new Schema({
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service'
    },
    description: String,
    status: String,
    createdAt: String,
    isDeleted: {
      type: Boolean,
      default: false
    }
  }))
