import {model, Schema} from "mongoose"

// Schema Usuario.
const userSchema = new Schema({
  fullName: String,
  userName: String,
  password: String,
  roles: {
    type: String,
    default: "ROL_REDES",
    enum: ["ROL_ADMIN", "ROL_REDES", "ROL_CAJA"]
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
export const User = model("User", userSchema)
