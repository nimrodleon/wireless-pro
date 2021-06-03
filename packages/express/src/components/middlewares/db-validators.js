import {User} from '../auth/model'

export function isValidRole(rol = '') {
  const roles = ['ROLE_ADMIN', 'ROLE_NETWORK', 'ROLE_CASH', 'ROLE_USER']
  if (!roles.includes(rol)) {
    throw new Error(`${rol}, no es un rol válido`)
  }
  return true
}

export async function userNameExist(userName) {
  // verificar si userName existe.
  const userExist = await User.findOne({userName})
  if (userExist) {
    throw new Error(`El nombre de usuario: ${userName}, ya está registrado`)
  }
}

export async function userEmailExist(email) {
  // verificar si correo usuario existe.
  const emailExist = await User.findOne({email})
  if (emailExist) {
    throw new Error(`El email: ${email}, ya está registrado`)
  }
}
