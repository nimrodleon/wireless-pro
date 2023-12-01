const {model, Schema} = require("mongoose")

// Schema info model.
const infoSchema = new Schema({
  ruc: String,
  company: {
    type: String,
    uppercase: true
  },
  fullAddress: {
    type: String,
    uppercase: true
  },
  phone: String,
  legendTicket: String,
  paperWidth: Number,
  googleMap: String
})

// Model info.
// Almacena información general.
const Info = model("Info", infoSchema)

module.exports = {
  Info
}
