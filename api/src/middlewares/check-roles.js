const {response} = require("express")

// Verificar si el Rol del usuario es Admin.
// Este Rol solo puede Eliminar registros y crear nuevos usuarios.
function checkRolAdmin(req, res = response, next) {
  const {userName, roles} = req.currentUser
  if (roles !== "ROL_ADMIN") {
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
  if (roles !== "ROL_REDES") {
    return res.status(401).json({
      msg: `${userName} no tiene permiso para administrar la red`
    })
  }
  next()
}

// Verificar rol Administrador de caja.
// Este rol se utiliza para registrar pagos y administrar las finanzas.
function checkRolCajero(req, res = response, next) {
  const {userName, roles} = req.currentUser
  if (roles !== "ROL_CAJERO") {
    return res.status(401).json({
      msg: `${userName} no tiene permiso para administrar la caja`
    })
  }
  next()
}

module.exports = {
  checkRolAdmin,
  checkRolRedes,
  checkRolCajero,
}
