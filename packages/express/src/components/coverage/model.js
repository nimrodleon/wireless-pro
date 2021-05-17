import {model, Schema} from 'mongoose'

export const Coverage = model('Coverage',
  new Schema({
    name: {
      type: String,
      uppercase: true,
    }
  }))
