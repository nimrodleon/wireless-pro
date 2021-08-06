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
    return axios.post(`${application.urlBase}/Mikrotik/Add`, {
      'ipAddress': mikrotik.host,
      'port': mikrotik.port,
      'userName': mikrotik.userName,
      'password': mikrotik.password,
      'remoteId': mikrotik._id
    })
  }

  // obtener lista arp por <ip-address>.
  static async getArpListByIpAddress(mikrotikId, ipAddress) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.get(`${application.urlBase}/Mikrotik/Arp/${ipAddress}`, {data: {mikrotikId: mikrotik._id}})
  }

  // obtener lista de cola simple por <name>.
  static async getSimpleQueueByName(mikrotikId, name) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.get(`${application.urlBase}/Mikrotik/SimpleQueue/${name}`, {data: {mikrotikId: mikrotik._id}})
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
  static async getArpListById(serviceId, mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.get(`${application.urlBase}/ArpList/${serviceId}`, {data: {mikrotikId: mikrotik._id}})
  }

  // actualizar registro arp.
  static async updateArpList(serviceId, data) {
    let mikrotik = await MikrotikStore.getMikrotikById(data.mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.put(`${application.urlBase}/ArpList/${serviceId}`, data)
  }

  // borrar registro arp.
  static async deleteArpList(serviceId, mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.delete(`${application.urlBase}/ArpList/${serviceId}`, {data: {mikrotikId: mikrotik._id}})
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
  static async getSimpleQueueById(serviceId, mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.get(`${application.urlBase}/SimpleQueue/${serviceId}`, {data: {mikrotikId: mikrotik._id}})
  }

  // actualizar registro cola simple.
  static async updateSimpleQueue(serviceId, data) {
    let mikrotik = await MikrotikStore.getMikrotikById(data.mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.put(`${application.urlBase}/SimpleQueue/${serviceId}`, data)
  }

  // borrar registro cola simple.
  static async deleteSimpleQueue(serviceId, mikrotikId) {
    let mikrotik = await MikrotikStore.getMikrotikById(mikrotikId)
    let application = await InfoStore.getApplicationId(mikrotik.applicationId)
    axios.defaults.headers.common['Authorization'] = `Bearer ${application.token}`
    return axios.delete(`${application.urlBase}/SimpleQueue/${serviceId}`, {data: {mikrotikId: mikrotik._id}})
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
