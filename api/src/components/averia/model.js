const {model, Schema} = require("mongoose")
const moment = require("moment-timezone")

// Schema averías.
const averiaSchema = new Schema({
  averia: String,
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client"
  },
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: "Service"
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  status: String,
  priority: String,
  archived: Boolean,
  origin: String,
  solution: String,
  year: {
    type: String,
    default: moment().format("YYYY")
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

// Modelo averías.
// Almacena información relacionada de las averías de los clientes.
const Averia = model("Averia", averiaSchema)
module.exports = {
  Averia
}
