const {model, Schema} = require("mongoose")

const Coverage = model("Coverage",
  new Schema({
    name: {
      type: String,
      uppercase: true,
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  }))

module.exports = {
  Coverage
}
