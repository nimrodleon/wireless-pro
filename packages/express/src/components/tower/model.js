import {model, Schema} from 'mongoose'

export const Tower = model('Tower',
  new Schema({
    tower: {
      type: String,
      uppercase: true
    },
    coverage: {
      type: Schema.Types.ObjectId,
      ref: 'Coverage'
    }
  }))
