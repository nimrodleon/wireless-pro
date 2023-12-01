const _ = require("lodash")
const {User} = require("./model")

// CRUD - usuarios.
class UserService {
  // Listar usuarios.
  static async getUsers(suspended = false) {
    return User.find({suspended: suspended, isDeleted: false})
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
    // Excluir userName, password y email de la actualización en la base de datos.
    const {password, ...user} = data
    return User.findByIdAndUpdate(id, user, {new: true})
  }

  // actualizar usuario profile.
  static async updateUserProfile(id, data) {
    delete data.password
    delete data.roles
    delete data.email
    delete data.suspended
    delete data.isDeleted
    return User.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar usuario.
  static async deleteUser(id) {
    let _user = await this.getUser(id)
    _user.isDeleted = true
    return this.updateUser(id, _user)
  }

  // Buscar usuarios con select2.
  static async getUsersWithSelect2(term) {
    let _users = await User.find({
      isDeleted: false,
      suspended: false,
      $or: [
        {fullName: {$regex: term}}
      ]
    })
    let data = {results: []}
    await _.forEach(_users, value => {
      data.results.push({id: value._id, text: value.fullName})
    })
    return data
  }
}

module.exports = {
  UserService
}
