const {model, Schema} = require("mongoose")

const Material = model("Material",
  new Schema({
    und: {
      type: String,
      uppercase: true
    },
    description: {
      type: String,
      uppercase: true
    },
    price: Number,
    isDeleted: {
      type: Boolean,
      default: false
    }
  }))

module.exports = {
  Material
}
