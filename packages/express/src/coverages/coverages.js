const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true,
  }
}, { collation: 'coverages' })

const Coverage = mongoose.model('Coverage', schema)
module.exports = Coverage
