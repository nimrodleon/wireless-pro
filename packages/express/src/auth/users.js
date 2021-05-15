const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  userName: String,
  password: String,
  avatar: String,
  isAdmin: Boolean,
  redes: Boolean,
  caja: Boolean,
  suspended: {
    type: Boolean,
    default: false
  },
}, { collation: 'users' })

const User = mongoose.model('User', schema)
module.exports = User
