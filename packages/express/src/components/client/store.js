import {Client} from './model'

// Listar clientes.
export async function getClients(query, status) {

}

// devolver cliente por id.
export async function getClient(id) {
  return Client.findById(id)
}

// crear cliente.
export async function createClient(client) {
  const _client = new Client(client)
  await _client.save()
  return _client
}

// actualizar cliente.
export async function updateClient(id, client) {
  const _client = await Client.findByIdAndUpdate(id, client, {new: true})
  await _client.save()
  return _client
}

// borrar cliente.
export async function deleteClient(id) {
  return Client.findByIdAndDelete(id)
}
