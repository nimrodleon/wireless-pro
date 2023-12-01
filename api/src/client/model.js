const {model, Schema} = require("mongoose")

// Schema modelo cliente.
const clientSchema = new Schema({
  dni: String,
  type: {
    type: String,
    uppercase: true,
    default: "D.N.I",
    enum: ["D.N.I", "R.U.C"]
  },
  fullName: {
    type: String,
    uppercase: true
  },
  fullAddress: {
    type: String,
    uppercase: true
  },
  phone: String,
  telegram: String,
  email: String,
  note: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
})

// modelo cliente.
const Client = model("Client", clientSchema)
module.exports = {Client}
