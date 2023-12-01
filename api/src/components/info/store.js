const {Info} = require("./model")

// CRUD - info.
class InfoStore {
  // devolver info por id.
  static async getInfo() {
    if (Info.find().countDocuments() <= 0) {
      let _info = new Info({company: "EMPRESA 1"})
      await _info.save()
    }
    return Info.findOne({})
  }

  // actualizar info.
  static async updateInfo(id, info) {
    return Info.findByIdAndUpdate(id, info, {new: true})
  }

}

module.exports = {
  InfoStore
}
