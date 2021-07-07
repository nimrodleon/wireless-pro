import {model, Schema} from 'mongoose'

// Schema Mikrotik.
const mikrotikSchema = new Schema({})

// exportar modelo mikrotik.
export const Mikrotik = model('Mikrotik', mikrotikSchema)
