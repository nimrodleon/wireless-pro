import {model, Schema} from 'mongoose'
import moment from 'moment-timezone'

// Schema de pagos.
const paymentSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service'
  },
  year: String,
  month: String,
  amount: Number,
  paymentMethod: String,
  payFrom: String,
  payUp: String,
  note: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: moment().utc().toDate()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

// formatear fecha de creación.
paymentSchema.methods.toJSON = function () {
  const model = this.toObject()
  model.createdAt = moment(model.createdAt).tz(process.env.TIME_ZONE).format('YYYY-MM-DD')
  return model
}

// Almacena información de los pagos.
export const Payment = model('Payment', paymentSchema)
