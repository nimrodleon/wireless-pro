import {model, Schema} from 'mongoose'

// Schema Mikrotik.
const mikrotikSchema = new Schema({
  name: String,
  host: String,
  port: Number,
  userName: String,
  password: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
})

// exportar modelo mikrotik.
export const Mikrotik = model('Mikrotik', mikrotikSchema)

// Schema interface mikrotik.
const interfaceSchema = new Schema({
  name: String,
  mikrotikId: {
    type: Schema.Types.ObjectId,
    ref: 'Mikrotik'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

// exportar modelo interface.
export const Interface = model('Interface', interfaceSchema)
