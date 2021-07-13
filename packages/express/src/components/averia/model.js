import {model, Schema} from 'mongoose'

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
  createdAt: String,
  year: String,
  month: String,
  day: String,
  origin: String,
  solution: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
})

// modelo averias.
// almacena información relacionada a las averias de los clientes.
export const Averia = model('Averia', averiaSchema)
