import axios from 'axios'
import {InfoController} from '../info/controller'
import {MikrotikController} from '../mikrotik/controller'

// Lógica bitWorker.
export class WorkerController {
  // cache arp.
  static migrationArpCache(mikrotikId) {
    console.log('id mikrotik', mikrotikId)
    return new Promise((resolve, reject) => {
      MikrotikController.getMikrotikById(mikrotikId)
        .then(result => {
          console.log('mikrotik', result)
          let mikrotik = result
          InfoController.getApplicationId(result.applicationId)
            .then(result => {
              console.log('application', result)
              axios.defaults.headers.common['Authorization'] = `Bearer ${result.token}`
              resolve(
                axios.get(`${result.urlBase}/Migration/Arp/Cache`, {
                  data: {
                    'ipAddress': mikrotik.host,
                    'port': mikrotik.port,
                    'userName': mikrotik.userName,
                    'password': mikrotik.password
                  }
                })
              )
            }).catch(err => reject(err))
        }).catch(err => reject(err))
    })
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
