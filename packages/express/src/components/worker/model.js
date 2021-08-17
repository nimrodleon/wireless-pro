import {model, Schema} from 'mongoose'
import moment from 'moment'

// Schema worker activity.
const workerActivitySchema = new Schema({
  serviceId: {
    type: Schema.Types.ObjectId,
    ref: 'Service'
  },
  clientId: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  task: String,
  user: String,
  typeOperation: String,
  remark: String,
  year: {
    type: String,
    default: moment().format('YYYY')
  },
  createdAt: {
    type: String,
    default: moment().format('YYYY-MM-DD')
  }
})

// modelo worker activity guardar la información de cambios de estado.
export const WorkerActivity = model('WorkerActivity', workerActivitySchema)
