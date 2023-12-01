const {User} = require("../auth/model")

// validar rol del usuario.
function isValidRole(rol = "") {
  const roles = ["ROLE_ADMIN", "ROLE_NETWORK", "ROLE_CASH", "ROLE_USER"]
  if (!roles.includes(rol)) {
    throw new Error(`${rol}, no es un rol válido`)
  }
  return true
}

// comprobar existencia de usuario.
async function userNameExist(userName) {
  // verificar si userName existe.
  const userExist = await User.findOne({userName, isDeleted: false})
  if (userExist) {
    throw new Error(`El nombre de usuario: ${userName}, ya está registrado`)
  }
}

// comprobar existencia usuario al editar.
async function editUserNameExist(userName, id) {
  // verificar si userName existe.
  const userExist = await User.findOne({_id: {$ne: id}, userName, isDeleted: false})
  console.log(userExist, id)
  if (userExist) {
    throw new Error(`El nombre de usuario: ${userName}, ya está registrado`)
  }
}

// comprobar existencia email.
async function userEmailExist(email) {
  // verificar si correo usuario existe.
  const emailExist = await User.findOne({email, isDeleted: false})
  if (emailExist) {
    throw new Error(`El email: ${email}, ya está registrado`)
  }
}

// comprobar existencia email al editar.
async function editUserEmailExist(email, id) {
  // verificar si correo usuario existe.
  const emailExist = await User.findOne({_id: {$ne: id}, email, isDeleted: false})
  if (emailExist) {
    throw new Error(`El email: ${email}, ya está registrado`)
  }
}

module.exports = {
  isValidRole,
  userNameExist,
  editUserNameExist,
  userEmailExist,
  editUserEmailExist,
}
