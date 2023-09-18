import {model, Schema} from 'mongoose'
import moment from 'moment-timezone'

// Schema averias.
const averiaSchema = new Schema({
  averia: String,
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service'
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: String,
  priority: String,
  archived: Boolean,
  origin: String,
  solution: String,
  year: {
    type: String,
    default: moment().format('YYYY')
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

// modelo averias.
// almacena información relacionada a las averias de los clientes.
export const Averia = model('Averia', averiaSchema)
