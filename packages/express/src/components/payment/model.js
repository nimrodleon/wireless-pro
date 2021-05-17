import {model, Schema} from 'mongoose'

export const Payment = model('Payment',
  new Schema({
    client: {
      type: Schema.Types.ObjectId,
      ref: 'Client'
    },
    service: {
      type: Schema.Types.ObjectId,
      ref: 'Service'
    },
    month: String,
    amount: Number,
    payment_method: String,
    note: String,
    created_date: String,
    year: String,
    payFrom: String,
    payUp: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  }))
