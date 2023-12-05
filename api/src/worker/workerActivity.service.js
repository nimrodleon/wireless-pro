const {WorkerActivity} = require("./workerActivity.model")

class WorkerActivityService {
  // lista de actividades.
   async getWorkerActivities(serviceId, year) {
    return WorkerActivity.find({serviceId: serviceId, year: year}).hint({$natural: -1})
  }

  // registrar actividad.
   async createWorkerActivity(data, user) {
    let _workerActivity = new WorkerActivity(data)
    _workerActivity.user = user
    await _workerActivity.save()
    return _workerActivity
  }

}

module.exports = {
  WorkerActivityService
}
