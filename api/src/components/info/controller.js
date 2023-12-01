const {InfoStore} = require("./store")

// Lógica - Info.
class InfoController {
  // obtener la info empresa.
  static getInfo() {
    return new Promise((resolve, reject) => {
      try {
        resolve(InfoStore.getInfo())
      } catch (err) {
        reject(err)
      }
    })
  }

  // actualizar info empresa.
  static updateInfo(id, data) {
    return new Promise((resolve, reject) => {
      try {
        resolve(InfoStore.updateInfo(id, data))
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = {
  InfoController
}
