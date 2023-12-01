const {model, Schema} = require("mongoose")
const moment = require("moment-timezone")

// schema orden de instalación.
const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client"
  },
  description: {
    type: String,
    uppercase: true,
  },
  address: String,
  city: String,
  region: String,
  typeTask: String,
  servicePlanId: {
    type: Schema.Types.ObjectId,
    ref: "ServicePlan"
  },
  total: Number,
  amount: Number,
  statusOrder: {
    type: String,
    default: "PENDIENTE",
    enum: ["PENDIENTE", "EN PROCESO", "FINALIZADO"]
  },
  year: {
    type: String,
    default: moment().format("YYYY")
  },
  month: {
    type: String,
    default: moment().format("MM")
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

// modelo orden de instalación.
const Order = model("Order", orderSchema)

// schema materiales de órdenes de instalación.
const orderMaterialSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  },
  materialId: String,
  description: String,
  quantity1: Number,
  quantity2: Number,
  price: Number,
  difference: Number,
  total: Number,
})

// modelo materiales de órdenes de instalación.
const OrderMaterial = model("OrderMaterial", orderMaterialSchema)

module.exports = {
  Order,
  OrderMaterial,
}
