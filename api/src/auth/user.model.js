const {model, Schema} = require("mongoose")
const {userRoles} = require("../config")

// Schema Usuario.
const userSchema = new Schema({
  fullName: String,
  userName: String,
  password: String,
  roles: {
    type: String,
    default: userRoles.redes,
    enum: [userRoles.admin, userRoles.redes, userRoles.cajero]
  },
  email: String,
  avatar: String,
  suspended: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

// quitar password de la serialización.
userSchema.methods.toJSON = function () {
  const {password, ...user} = this.toObject()
  return user
}

// Exportar modelo Usuario.
const User = model("User", userSchema)

module.exports = {
  User
}
