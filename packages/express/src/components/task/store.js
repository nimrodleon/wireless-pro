import {Task} from './model'
import moment from 'moment'

// devolver tarea por id.
export async function getTask(id) {
  return Task.findById(id).populate({path: 'user', select: 'name userName'})
}

// registrar tarea.
export async function createTask(data) {
  let _task = new Task(data)
  _task.year = moment(_task.createdAt).format('YYYY')
  _task.month = moment(_task.createdAt).format('MM')
  await _task.save()
  return _task
}

// actualizar tarea.
export async function updateTask(id, data) {
  return Task.findByIdAndUpdate(id, data, {new: true})
}

// borrar tarea.
export async function deleteTask(id) {
  return Task.findByIdAndDelete(id)
}
