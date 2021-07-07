import {model, Schema} from 'mongoose'

// Schema Mikrotik.
const mikrotikSchema = new Schema({
  name: String,
  host: String,
  port: Number,
  userName: String,
  password: String,
  applicationId: {
    type: Schema.Types.ObjectId,
    ref: 'Application'
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

// exportar modelo mikrotik.
export const Mikrotik = model('Mikrotik', mikrotikSchema)

// Schema ethernet mikrotik.
const ethernetSchema = new Schema({
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

// exportar modelo ethernet.
export const Ethernet = model('Ethernet', ethernetSchema)
