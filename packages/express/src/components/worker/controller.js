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
  static async migrationArpCache(mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.post(`${application.urlBase}/Migration/Arp/Cache`, {mikrotikId: mikrotik._id})
  }

  // cache cola simple.
  static async migrationSimpleQueueCache(mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.post(`${application.urlBase}/Migration/SimpleQueue/Cache`, {mikrotikId: mikrotik._id})
  }

  // obtener lista arp por <ip-address>.
  static async getArpListByIpAddress(mikrotikId, ipAddress) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.get(`${application.urlBase}/Migration/Arp/${ipAddress}`, {data: {mikrotikId: mikrotik._id}})
  }

  // obtener lista de cola simple por <ip-address>.
  static async getSimpleQueueByIpAddress(mikrotikId, ipAddress) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.get(`${application.urlBase}/Migration/SimpleQueue/${ipAddress}`, {data: {mikrotikId: mikrotik._id}})
  }

  // ====================================================================================================

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
