import axios from 'axios'
import {MikrotikStore} from '../mikrotik/store'
import {InfoStore} from '../info/store'
import {WorkerStore} from './store'

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
  static async getArpList(mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.get(`${application.urlBase}/ArpList`, {data: {mikrotikId: mikrotik._id}})
  }

  // registrar arp.
  static async createArpList(data) {
    let mikrotik = await MikrotikStore.getMikrotikById(data.mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.post(`${application.urlBase}/ArpList`, data)
  }

  // obtener registro arp.
  static async getArpListById(arpId, mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.get(`${application.urlBase}/ArpList/${arpId}`, {data: {mikrotikId: mikrotik._id}})
  }

  // actualizar registro arp.
  static async updateArpList(arpId, data) {
    let mikrotik = await MikrotikStore.getMikrotikById(data.mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.put(`${application.urlBase}/ArpList/${arpId}`, data)
  }

  // borrar registro arp.
  static async deleteArpList(arpId, mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.delete(`${application.urlBase}/ArpList/${arpId}`, {data: {mikrotikId: mikrotik._id}})
  }

  // Lista arp  por campo deshabilitado.
  static async getArpListByDisabled(value, mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.get(`${application.urlBase}/ArpList/disabled/${value}`, {data: {mikrotikId: mikrotik._id}})
  }

  // ====================================================================================================

  // Lista cola simple.
  static async getSimpleQueueList(mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.get(`${application.urlBase}/SimpleQueue`, {data: {mikrotikId: mikrotik._id}})
  }

  // registrar cola simple.
  static async createSimpleQueue(data) {
    let mikrotik = await MikrotikStore.getMikrotikById(data.mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.post(`${application.urlBase}/SimpleQueue`, data)
  }

  // obtener registro cola simple.
  static async getSimpleQueueById(simpleQueueId, mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.get(`${application.urlBase}/SimpleQueue/${simpleQueueId}`, {data: {mikrotikId: mikrotik._id}})
  }

  // actualizar registro cola simple.
  static async updateSimpleQueue(simpleQueueId, data) {
    let mikrotik = await MikrotikStore.getMikrotikById(data.mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.put(`${application.urlBase}/SimpleQueue/${simpleQueueId}`, data)
  }

  // borrar registro cola simple.
  static async deleteSimpleQueue(simpleQueueId, mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.delete(`${application.urlBase}/SimpleQueue/${simpleQueueId}`, {data: {mikrotikId: mikrotik._id}})
  }

  // Lista de cola simple por campo deshabilitado.
  static async getSimpleQueueByDisabled(value, mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.get(`${application.urlBase}/SimpleQueue/${value}`, {data: {mikrotikId: mikrotik._id}})
  }

  // ====================================================================================================

  // Lista de estado de cambios.
  static getWorkerActivities(serviceId, year) {
    return new Promise((resolve, reject) => {
      try {
        resolve(WorkerStore.getWorkerActivities(serviceId, year))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registra el cambio de estado.
  static createWorkerActivity(data, user) {
    return new Promise((resolve, reject) => {
      try {
        resolve(WorkerStore.createWorkerActivity(data, user))
      } catch (err) {
        reject(err)
      }
    })
  }

}
