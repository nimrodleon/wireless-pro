const {model, Schema} = require("mongoose")

const Tramo = model("Tramo",
  new Schema({
    tramo: {
      type: String,
      uppercase: true
    },
    coverage: {
      type: Schema.Types.ObjectId,
      ref: "Coverage"
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  }))

module.exports = {
  Tramo
}
