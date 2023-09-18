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

  // total servicios activos.
  static totalEnabledServices(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.totalStatusServices(id, 'HABILITADO'))
      } catch (err) {
        reject(err)
      }
    })
  }

  // total servicios suspendidos.
  static totalSuspendedServices(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.totalStatusServices(id, 'SUSPENDIDO'))
      } catch (err) {
        reject(err)
      }
    })
  }

  // lista de servicios por mikrotik.
  static getServicesList(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.getServicesList(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // ============================================================

  // Lista de interfaces.
  static getInterfaceList(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.getInterfaceList(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // obtener interfaz por id.
  static getInterfaceById(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.getInterfaceById(id))
      } catch (err) {
        reject(err)
      }
    })
  }

  // registrar interface.
  static createInterface(data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.createInterface(data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar interface.
  static updateInterface(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.updateInterface(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }

  // borrar interface.
  static deleteInterface(id) {
    return new Promise((resolve, reject) => {
      try {
        resolve(MikrotikStore.deleteInterface(id))
      } catch (err) {
        reject(err)
      }
    })
  }

}
