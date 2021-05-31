import {User} from './model'

// CRUD - usuarios.
export class UserStore {
  // Listar usuarios.
  static async getUsers(suspended = false) {
    return User.find({suspended: suspended})
  }

  // devolver un usuario por id.
  static async getUser(id) {
    return User.findById(id)
  }

  // devolver  usuario por userName.
  static async getUserByUserName(userName) {
    return User.findOne({userName: userName})
  }

  // registrar usuario.
  static async createUser(data) {
    const _user = new User(data)
    return _user.save()
  }

  // actualizar usuario.
  static async updateUser(id, data) {
    return User.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar usuario.
  static async deleteUser(id) {
    let _user = await this.getUser(id)
    _user.isDeleted = true
    return this.updateUser(id, _user)
  }
}
