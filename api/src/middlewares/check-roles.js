const {response} = require("express")
const {userRoles} = require("../config")

// Verificar si el Rol del usuario es Admin.
// Este Rol solo puede Eliminar registros y crear nuevos usuarios.
function checkRolAdmin(req, res = response, next) {
  const {userName, roles} = req.currentUser
  if (roles !== userRoles.admin) {
    return res.status(401).json({
      msg: `${userName} no es Administrador - No puede hacer esto`
    })
  }
  next()
}

// Verificar si el Rol del usuario es Network.
// Solo para funciones de administración de redes.
function checkRolRedes(req, res = response, next) {
  const {userName, roles} = req.currentUser
  if (roles !== userRoles.redes) {
    return res.status(401).json({
      msg: `${userName} no tiene permiso para administrar la red`
    })
  }
  next()
}

// Verifica si el rol es admin o redes.
function checkRolAdminOrRedes(req, res = response, next) {
  const {userName, roles} = req.currentUser
  if (roles === userRoles.admin || roles === userRoles.redes)
    next()
  else
    return res.status(401).json({
      msg: `${userName}, No puede hacer esto`
    })
}

// Verificar rol Administrador de caja.
// Este rol se utiliza para registrar pagos y administrar las finanzas.
function checkRolCajero(req, res = response, next) {
  const {userName, roles} = req.currentUser
  if (roles !== userRoles.cajero) {
    return res.status(401).json({
      msg: `${userName} no tiene permiso para administrar la caja`
    })
  }
  next()
}

function checkAnyRole(req, res = response, next) {
  const {userName, roles} = req.currentUser
  if (roles === userRoles.admin
    || roles === userRoles.redes
    || roles === userRoles.cajero)
    next()
  else
    return res.status(401).json({
      msg: `${userName} no tiene permiso para acceder a este recurso!`
    })
}

module.exports = {
  checkRolAdmin,
  checkRolRedes,
  checkRolAdminOrRedes,
  checkRolCajero,
  checkAnyRole,
}
