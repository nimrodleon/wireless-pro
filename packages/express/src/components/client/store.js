import {Client} from './model'

// Listar clientes.
export async function getClients(query, status) {

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
