import {WorkerActivity} from './model'

export class WorkerStore {
  // lista de actividades.
  static async getWorkerActivities(serviceId, year) {
    return WorkerActivity.find({serviceId: serviceId, year: year}).hint({$natural: -1})
  }

  // registrar actividad.
  static async createWorkerActivity(data, user) {
    let _workerActivity = new WorkerActivity(data)
    _workerActivity.user = user
    await _workerActivity.save()
    return _workerActivity
  }
}
