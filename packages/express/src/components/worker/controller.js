import axios from 'axios'
import {MikrotikStore} from '../mikrotik/store'
import {InfoStore} from '../info/store'

// Lógica bitWorker.
export class WorkerController {
  // registrar mikrotik.
  static async addMikrotik(mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.post(`${application.urlBase}/Migration/Mikrotik/Add`, {
      'ipAddress': mikrotik.host,
      'port': mikrotik.port,
      'userName': mikrotik.userName,
      'password': mikrotik.password,
      'remoteId': mikrotik._id
    })
  }

  // cache arp.
  static migrationArpCache(mikrotikId) {

  }

  // cache cola simple.
  // obtener lista arp.
  // obtener lista de cola simple.

  // CONTROLADOR LISTA ARP.

  // Lista arp.
  // registrar arp.
  // obtener registro arp.
  // actualizar registro arp.
  // borrar registro arp.

  // CONTROLADOR COLAS SIMPLE.

  // Lista cola simple.
  // registrar cola simple.
  // obtener registro cola simple.
  // actualizar registro cola simple.
  // borrar registro cola simple.
}
