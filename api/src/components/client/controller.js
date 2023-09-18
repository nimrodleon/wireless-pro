import {ClientStore} from './store'

// Lógica - clientes.
export class ClientController {
  // Lista de clientes.
  static getClients(query) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ClientStore.getClients(query))
      } catch (err) {
        reject(err)
      }
    })
  }

  // devolver cliente por id.
  static getClient(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ClientStore.getClient(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar cliente.
  static createClient(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ClientStore.createClient(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar cliente.
  static updateClient(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ClientStore.updateClient(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar cliente.
  static deleteClient(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ClientStore.deleteClient(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // buscador select2.
  static getClientsS2(term) {
    return new Promise((resolve, reject) => {
      try {
        resolve(ClientStore.getClientsS2(term))
      } catch (err) {
        reject(err)
      }
    })
  }

  // Lista de Clientes.
  static getClientList() {
    return new Promise((resolve, reject) => {
      try {
        resolve(ClientStore.getClientList())
      } catch (err) {
        reject(err)
      }
    })
  }

}
