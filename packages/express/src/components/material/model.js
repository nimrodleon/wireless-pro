import {model, Schema} from 'mongoose'

export const Material = model('Material',
  new Schema({
    und: {
      type: String,
      uppercase: true
    },
    description: {
      type: String,
      uppercase: true
    },
    price: Number,
    isDeleted: {
      type: Boolean,
      default: false
    }
  }))
