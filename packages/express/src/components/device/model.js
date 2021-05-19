import {model, Schema} from 'mongoose'

export const Device = model('Device',
  new Schema({
    ipAddress: String,
    mode: String,
    name: {
      type: String,
      uppercase: true
    },
    userName: String,
    password: String,
    ssid: {
      type: String,
      uppercase: true
    },
    coverage: String,
    tower: String,
    tramo: String,
    accessPoint: String,
    isDeleted: {
      type: Boolean,
      default: false
    }
  }))
