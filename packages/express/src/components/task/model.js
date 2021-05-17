import {model, Schema} from 'mongoose'

export const Task = model('Task',
  new Schema({
    title: {
      type: String,
      uppercase: true
    },
    fullName: {
      type: String,
      uppercase: true
    },
    address: String,
    phoneNumber: String,
    note: String,
    status: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: String,
    forDate: String,
    month: String,
    year: String,
  }))
