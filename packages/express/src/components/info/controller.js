import * as store from './store'

// obtener la info empresa.
export function getInfo() {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getInfo())
    } catch (err) {
      reject(err)
    }
  })
}

// actualizar info empresa.
export function updateInfo(id, data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.updateInfo(id, data))
    } catch (err) {
      reject(err)
    }
  })
}
