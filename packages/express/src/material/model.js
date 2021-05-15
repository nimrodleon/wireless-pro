const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  und: {
    type: String,
    uppercase: true
  },
  description: {
    type: String,
    uppercase: true
  },
  price: Number,
}, { collation: 'materials' })

const Material = mongoose.model('Material', schema)
module.exports = Material
