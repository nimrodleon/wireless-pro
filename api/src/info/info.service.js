const {Info} = require("./info.model")

// CRUD - info.
class InfoService {
  // devolver info por id.
  async getInfo() {
    if (Info.find().countDocuments() <= 0) {
      let _info = new Info({company: "EMPRESA 1"})
      await _info.save()
    }
    return Info.findOne({})
  }

  // actualizar info.
  async updateInfo(id, info) {
    return Info.findByIdAndUpdate(id, info, {new: true})
  }

}

module.exports = {
  InfoService
}
