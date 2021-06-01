import {model, Schema} from 'mongoose'

// Schema Usuario.
const userSchema = new Schema({
  fullName: String,
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  roles: {
    type: String,
    default: 'ROLE_USER',
    enum: ['ROLE_ADMIN', 'ROLE_NETWORK', 'ROLE_CASH', 'ROLE_USER']
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
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
export const User = model('User', userSchema)
