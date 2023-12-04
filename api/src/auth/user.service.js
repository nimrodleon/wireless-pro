const _ = require("lodash")
const {User} = require("./user.model")

// CRUD - usuarios.
class UserService {
  // Listar usuarios.
  async getUsers(suspended = false) {
    return User.find({suspended: suspended, isDeleted: false})
  }

  // devolver un usuario por id.
  async getUser(id) {
    return User.findById(id)
  }

  // devolver  usuario por userName.
  async getUserByUserName(userName) {
    return User.findOne({userName: userName})
  }

  // registrar usuario.
  async createUser(data) {
    const _user = new User(data)
    return _user.save()
  }

  // actualizar usuario.
  async updateUser(id, data) {
    // Excluir userName, password y email de la actualización en la base de datos.
    const {password, ...user} = data
    return User.findByIdAndUpdate(id, user, {new: true})
  }

  // actualizar usuario profile.
  async updateUserProfile(id, data) {
    delete data.password
    delete data.roles
    delete data.email
    delete data.suspended
    delete data.isDeleted
    return User.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar usuario.
  async deleteUser(id) {
    let _user = await this.getUser(id)
    _user.isDeleted = true
    return this.updateUser(id, _user)
  }

  // Buscar usuarios con select2.
  async getUsersWithSelect2(term) {
    let _users = await User.find({
      isDeleted: false, suspended: false, $or: [{fullName: {$regex: term}}]
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
