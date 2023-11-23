import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {UserService} from "./user.service"

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
  // devolver usuario por id.
  static getUser(userId) {
    return new Promise((resolve, reject) => {
      try {
        resolve(UserService.getUser(userId))
      } catch (err) {
        reject(err)
      }
    })
  }

  // Login de acceso => retorna un [token].
  static userLogin(userName, password) {
    return new Promise(async (resolve, reject) => {
      let _user = await UserService.getUserByUserName(userName)
      if (!_user) reject(new Error("El usuario no Existe"))
      if (_user.suspended) reject(new Error("Cuenta Suspendida"))
      bcrypt.compare(password, _user.password).then(result => {
        if (result === false) {
          reject(new Error("Contraseña Incorrecta"))
        } else {
          const tokenExp = process.env.TOKEN_EXP_ADMIN || "45m"
          const exp = _user.roles === "ROLE_ADMIN" || _user.roles === "ROLE_NETWORK" ? tokenExp : "12h"
          const token = jwt.sign({
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
          reject(new Error("El usuario no existe!"))
        }
        generatePassword(password).then(hash => {
          currentUser.password = hash
          try {
            resolve(UserService.updateUser(userId, currentUser))
          } catch (err) {
            reject(err)
          }
        }).catch(err => reject(err))
      })
    })
  }

}
