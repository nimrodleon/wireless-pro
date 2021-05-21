import * as store from './store'

// Lista de clientes.
export function getClients(query, status) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getClients(query, status))
    } catch (err) {
      reject(err)
    }
  })
}

// devolver cliente por id.
export function getClient(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getClient(id))
    } catch (err) {
      reject(err)
    }
  })
}

// registrar cliente.
export function createClient(data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.createClient(data))
    } catch (err) {
      reject(err)
    }
  })
}

// actualizar cliente.
export function updateClient(id, data) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.updateClient(id, data))
    } catch (err) {
      reject(err)
    }
  })
}

// borrar cliente.
export function deleteClient(id) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.deleteClient(id))
    } catch (err) {
      reject(err)
    }
  })
}

// buscador select2.
export function getClientsS2(term) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getClientsS2(term))
    } catch (err) {
      reject(err)
    }
  })
}

// lista de clientes activos/inactivos.
export function getClientsActive(status) {
  return new Promise((resolve, reject) => {
    try {
      resolve(store.getClientsActive(status))
    } catch (err) {
      reject(err)
    }
  })
}
