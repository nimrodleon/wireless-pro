import {model, Schema} from 'mongoose'

export const Tramo = model('Tramo',
  new Schema({
    tramo: {
      type: String,
      uppercase: true
    },
    coverage: {
      type: Schema.Types.ObjectId,
      ref: 'Coverage'
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  }))
