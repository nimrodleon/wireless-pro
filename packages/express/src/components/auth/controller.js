import * as store from './store'

// Lista de usuarios.
export function getUsers(status) {
  return new Promise((resolve, reject) => {
    resolve(store.getUsers(status))
  })
}
