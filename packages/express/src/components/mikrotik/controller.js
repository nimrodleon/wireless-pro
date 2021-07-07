import {MikrotikStore} from './store'

// Lógica - Mikrotik.
export class MikrotikController {
  // Lista de mikrotik.
  static getMikrotikList() {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.getMikrotikList())
      } catch (err) {
        reject(err)
      }
    })
  }

  // Obtener por id.
  static getMikrotikById(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.getMikrotikById(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar.
  static createMikrotik(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.createMikrotik(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar.
  static updateMikrotik(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.updateMikrotik(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar.
  static deleteMikrotik(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.deleteMikrotik(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // ============================================================

  // Lista de interfaces.
  static getEthernetList() {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.getEthernetList())
      } catch (err) {
        reject(err)
      }
    })
  }

  // obtener interfaz por id.
  static getEthernetById(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.getEthernet(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar interface.
  static createEthernet(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.createEthernet(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar interface.
  static updateEthernet(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.updateEthernet(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar interface.
  static deleteEthernet(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.deleteEthernet(id))
      } catch (err) {
        reject(err)
      }
    })
  }

}
