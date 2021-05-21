import _ from 'lodash'
import {Client} from './model'

// Listar clientes.
export async function getClients(query, status) {
  return Client.find({
    is_active: status, $or: [
      {dni: {$regex: query}},
      {fullName: {$regex: query}}
    ]
  }).populate('coverage').limit(50).sort({'fullName': 1})
}

// devolver cliente por id.
export async function getClient(id) {
  return Client.findById(id)
}

// crear cliente.
export async function createClient(data) {
  const _client = new Client(data)
  await _client.save()
  return _client
}

// actualizar cliente.
export async function updateClient(id, data) {
  return Client.findByIdAndUpdate(id, data, {new: true})
}

// borrar cliente.
export async function deleteClient(id) {
  let _client = await getClient(id)
  _client.isDeleted = true
  return updateClient(id, _client)
}

// buscador de select2.
export async function getClientsS2(term) {
  let _clients = Client.find({
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
export async function getClientsActive(status) {
  return Client.find({is_active: status})
}
