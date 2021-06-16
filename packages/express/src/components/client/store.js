import _ from 'lodash'
import {Client} from './model'

// CRUD - clientes.
export class ClientStore {
  // Listar clientes.
  static async getClients(query, status) {
    return Client.find({
      is_active: status, $or: [
        {dni: {$regex: query}},
        {fullName: {$regex: query}}
      ]
    }).hint({$natural: -1})
      .limit(50)
  }

  // devolver cliente por id.
  static async getClient(id) {
    return Client.findById(id)
  }

  // crear cliente.
  static async createClient(data) {
    const _client = new Client(data)
    await _client.save()
    return _client
  }

  // actualizar cliente.
  static async updateClient(id, data) {
    return Client.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar cliente.
  static async deleteClient(id) {
    let _client = await this.getClient(id)
    _client.isDeleted = true
    return this.updateClient(id, _client)
  }

  // buscador de select2.
  static async getClientsS2(term) {
    let _clients = await Client.find({
      isDeleted: false,
      $or: [
        {dni: {$regex: term}},
        {fullName: {$regex: term}}
      ]
    }).limit(10)
    let data = {results: []}
    await _.forEach(_clients, value => {
      data.results.push({id: value._id, text: value.fullName})
    })
    return data
  }

  // Lista de clientes activos/inactivos.
  static async getClientsActive(status) {
    return Client.find({is_active: status})
  }
}
