import {model, Schema} from 'mongoose'

export const Averia = model('Averia',
  new Schema({
    averia: String,
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    status: String,
    priority: String,
    archived: Boolean,
    createdAt: String,
    year: String,
    month: String,
    day: String,
    origin: String,
    solution: String,
  }))
