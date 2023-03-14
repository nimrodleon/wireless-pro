import {response} from 'api'

// Verificar si el Rol del usuario es Admin.
// este Rol solo puede Eliminar registros y crear nuevos usuarios.
export function checkRolAdmin(req, res = response, next) {
  const {userName, roles} = req.currentUser
  if (roles !== 'ROLE_ADMIN') {
    return res.status(401).json({
      msg: `${userName} no es Administrador - No puede hacer esto`
    })
  }
  next()
}

// Verificar si el Rol del usuario es Network.
// Solo para funciones de administración de redes.
export function checkRolNetwork(req, res = response, next) {
  const {userName, roles} = req.currentUser
  if (roles !== 'ROLE_NETWORK') {
    return res.status(401).json({
      msg: `${userName} no tiene permiso para administrar la red`
    })
  }
  next()
}

// Verificar rol Administrador de caja.
// este rol se utiliza para registrar pagos y administrar las finanzas.
export function checkRolCash(req, res = response, next) {
  const {userName, roles} = req.currentUser
  if (roles !== 'ROLE_CASH') {
    return res.status(401).json({
      msg: `${userName} no tiene permiso para administrar la caja`
    })
  }
  next()
}
