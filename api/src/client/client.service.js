const _ = require("lodash")
const {Client} = require("./client.model")

// CRUD - clientes.
class ClientService {
  // Listar clientes.
  async getClients(query) {
    return Client.find({
      isDeleted: false,
      $or: [
        {dni: {$regex: query}},
        {fullName: {$regex: query}},
        {fullAddress: {$regex: query}},
        {phone: {$regex: query}}
      ]
    }).hint({$natural: -1})
      .limit(32)
  }

  // devolver cliente por id.
  async getClient(id) {
    return Client.findById(id)
  }

  // crear cliente.
  async createClient({_id, ...data}) {
    const _client = new Client(data)
    await _client.save()
    return _client
  }

  // actualizar cliente.
  async updateClient(id, data) {
    return Client.findByIdAndUpdate(id, data, {new: true})
  }

  // borrar cliente.
  async deleteClient(id) {
    let _client = await this.getClient(id)
    _client.isDeleted = true
    return this.updateClient(id, _client)
  }

  // buscador de select2.
  async getClientsS2(term) {
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

  // Lista de clientes.
  async getClientList() {
    return Client.find({isDeleted: false})
  }

}

module.exports = {
  ClientService
}
