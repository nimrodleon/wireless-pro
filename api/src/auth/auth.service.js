const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {UserService} = require("./user.service")

const saltRounds = 10
const userService = new UserService()

// generate Password.
function generatePassword(myTextPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(myTextPassword, salt, (err, hash) => {
        if (err) {
          reject(err)
        }
        resolve(hash)
      })
    })
  })
}

// Lógica - usuarios.
class AuthService {
  // Login de acceso => retorna un [token].
  async userLogin(userName, password) {
    return new Promise(async (resolve, reject) => {
      let _user = await userService.getUserByUserName(userName)
      if (!_user) reject(new Error("El usuario no Existe"))
      if (_user.suspended) reject(new Error("Cuenta Suspendida"))
      bcrypt.compare(password, _user.password).then(result => {
        if (result === false) {
          reject(new Error("Contraseña Incorrecta"))
        } else {
          const token = jwt.sign({
            _id: _user._id,
          }, process.env.JWT_SECRET_KEY, {expiresIn: "12h"})
          resolve(token)
        }
      })
    })
  }

  // Cambiar contraseña del usuario.
  async passwordChange(userId, password) {
    return new Promise(async (resolve, reject) => {
      userService.getUser(userId).then(currentUser => {
        if (!currentUser) {
          reject(new Error("El usuario no existe!"))
        }
        generatePassword(password).then(hash => {
          currentUser.password = hash
          try {
            resolve(userService.updateUser(userId, currentUser))
          } catch (err) {
            reject(err)
          }
        }).catch(err => reject(err))
      })
    })
  }

}

module.exports = {
  AuthService,
}
