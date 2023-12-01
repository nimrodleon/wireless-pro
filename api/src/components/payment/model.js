const {model, Schema} = require("mongoose")
const moment = require("moment")

// Schema de pagos.
const paymentSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client"
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "Service"
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
    ref: "User"
  },
  createdAt: {
    type: String,
    default: moment().format("YYYY-MM-DD")
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

// formatear fecha de creación.
// paymentSchema.methods.toJSON = function () {
//   const model = this.toObject()
//   model.createdAt = moment(model.createdAt).tz(process.env.TIME_ZONE).format('YYYY-MM-DD')
//   return model
// }

// Almacena información de los pagos.
const Payment = model("Payment", paymentSchema)

module.exports = {
  Payment
}
