import {model, Schema} from 'mongoose'
import moment from 'moment-timezone'

// schema orden de instalación.
const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  address: String,
  city: String,
  region: String,
  typeInstallation: String,
  servicePlanId: {
    type: Schema.Types.ObjectId,
    ref: 'ServicePlan'
  },
  costInstallation: Number,
  amount: Number,
  createdAt: {
    type: Date,
    default: moment().utc().toDate()
  }
})

// modelo orden de instalación.
export const Order = model('Order', orderSchema)

// schema materiales de ordenes de instalación.
const orderMaterialSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: 'Order'
  },
  materialId: String,
  description: String,
  quantity1: Number,
  quantity2: Number,
  price: Number,
  difference: Number,
  total: Number,
})

// modelo materiales de las ordenes de instalación.
export const OrderMaterial = model('OrderMaterial', orderMaterialSchema)
