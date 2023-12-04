const {model, Schema} = require("mongoose")
const moment = require("moment-timezone")

// Schema de servicio.
const serviceSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
    ref: "Client"
  },
  ipAddress: String,
  status: {
    type: String,
    default: "HABILITADO",
    enum: ["HABILITADO", "DESHABILITADO", "SUSPENDIDO"]
  },
  temporal: {
    type: Boolean,
    default: false
  },
  servicePlanId: {
    type: Schema.Types.ObjectId,
    ref: "ServicePlan"
  },
  initialDate: String,
  mikrotikId: {
    type: Schema.Types.ObjectId,
    ref: "Mikrotik"
  },
  interfaceId: {
    type: Schema.Types.ObjectId,
    ref: "Interface"
  },
  userName: String,
  password: String,
  // basicNote: String,
  accessPoint: {
    type: Schema.Types.ObjectId,
    ref: "Device"
  },
  macAddress: String,
  // ============================================================
  address: String,
  city: String,
  region: String,
  coverageId: {
    type: Schema.Types.ObjectId,
    ref: "Coverage"
  },
  // ============================================================
  paymentType: {
    type: String,
    default: "PRE",
    enum: ["PRE", "POS", "CONVENIO", "EMPRESA"]
  },
  defPrice: {
    type: Boolean,
    default: false
  },
  price: Number,
  commonPayment: {
    type: String,
    default: "MENSUAL",
    enum: ["MENSUAL", "BIMESTRAL", "TRIMESTRAL", "SEMESTRAL", "ANUAL"]
  },
  paymentNote: String,
  // ============================================================
  lastPayment: {
    type: Schema.Types.ObjectId,
    ref: "Payment"
  },
  paidUpTo: String,
  // ============================================================
  createdAt: {
    type: Date,
    default: moment().utc().toDate()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

// Exportar modelo servicio.
// Almacena la información del servicio contratado.
const Service = model("Service", serviceSchema)

module.exports = {
  Service
}
