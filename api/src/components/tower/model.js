const {model, Schema} = require("mongoose")

const Tower = model("Tower",
  new Schema({
    tower: {
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
  Tower
}
