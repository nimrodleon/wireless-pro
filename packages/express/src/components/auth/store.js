import {User} from './model'

// Listar usuarios.
export async function getUsers(suspended = false) {
  return User.find({suspended: suspended})
}

// devolver un usuario por id.
export async function getUser(id) {
  return User.findById(id)
}

// registrar usuario.
export async function createUser(user) {
  const _user = new User(user)
  return _user.save()
}

// actualizar usuario.
export async function updateUser(id, user) {
  return User.findByIdAndUpdate(id, user, {new: true})
}
