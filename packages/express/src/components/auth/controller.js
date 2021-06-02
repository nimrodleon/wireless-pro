import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {UserStore} from './store'

const saltRounds = 10

// generate Password.
export function generatePassword(myTextPassword) {
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
export class UserController {
  // Lista de usuarios.
  static getUsers(status) {
    return new Promise((resolve, reject) => {
      try {
        resolve(UserStore.getUsers(status))
      } catch (err) {
        reject(err)
      }
    })
  }

  // devolver usuario por id.
  static getUser(userId) {
    return new Promise((resolve, reject) => {
      try {
        resolve(UserStore.getUser(userId))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar usuario.
  static createUser(data) {
    return new Promise((resolve, reject) => {
      generatePassword(data.password).then(hash => {
        data.password = hash
        try {
          resolve(UserStore.createUser(data))
        } catch (err) {
          reject(err)
        }
      }).catch(err => reject(err))
    })
  }

  // actualizar usuario.
  static updateUser(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(UserStore.updateUser(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar usuario.
  static deleteUser(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(UserStore.deleteUser(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // Login de acceso => retorna un [token].
  static userLogin(userName, password) {
    return new Promise(async (resolve, reject) => {
      let _user = await UserStore.getUserByUserName(userName)
      if (!_user) reject(new Error('El usuario no Existe'))
      if (_user.suspended) reject(new Error('Cuenta Suspendida'))
      bcrypt.compare(password, _user.password).then(result => {
        if (result === false) {
          reject(new Error('Contraseña Incorrecta'))
        } else {
          let exp = _user.roles === 'ROLE_ADMIN' || _user.roles === 'ROLE_NETWORK' ? '60m' : '8h'
          let token = jwt.sign({
            _id: _user._id,
          }, process.env.JWT_SECRET_KEY, {expiresIn: exp})
          resolve(token)
        }
      })
    })
  }

  // Cambiar contraseña del usuario.
  static passwordChange(userId, password) {
    return new Promise(async (resolve, reject) => {
      this.getUser(userId).then(currentUser => {
        if (!currentUser) {
          reject(new Error('El usuario no existe!'))
        }
        generatePassword(password).then(hash => {
          currentUser.password = hash
          try {
            resolve(UserStore.updateUser(userId, currentUser))
          } catch (err) {
            reject(err)
          }
        }).catch(err => reject(err))
      })
    })
  }
}
