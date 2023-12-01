const {model, Schema} = require("mongoose")

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
const Mikrotik = model("Mikrotik", mikrotikSchema)

// Schema interface mikrotik.
const interfaceSchema = new Schema({
  name: String,
  mikrotikId: {
    type: Schema.Types.ObjectId,
    ref: "Mikrotik"
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

// exportar modelo interface.
const Interface = model("Interface", interfaceSchema)

module.exports = {
  Mikrotik,
  Interface,
}
