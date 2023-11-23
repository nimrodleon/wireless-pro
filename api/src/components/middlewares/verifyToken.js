import jwt from 'jsonwebtoken'
import {UserService} from '../auth/user.service'
import {response} from 'express'

// Middleware para verificar el Token de acceso.
export const verifyToken = (req, res = response, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      msg: 'Solicitud no autorizada'
    })
  }
  const token = req.headers.authorization.split(' ')[1]
  if (token === null) {
    return res.status(401).json({
      msg: 'Solicitud no autorizada'
    })
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    UserService.getUser(decoded._id).then(currentUser => {
      if (!currentUser) {
        return res.status(401).json({
          msg: 'Token invalido'
        })
      } else {
        // verificar estado activo.
        if (currentUser.suspended !== false) {
          return res.status(401).json({
            msg: 'Token invalido'
          })
        }
        req.currentUser = currentUser
        next()
      }
    }).catch(err => {
      console.error(err)
    })
  } catch (err) {
    return res.status(401).json({
      msg: 'Token invalido'
    })
  }
}
