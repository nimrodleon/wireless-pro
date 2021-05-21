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
  let _task = await getTask(id)
  _task.isDeleted = true
  return updateTask(id, _task)
}

// buscar tareas por año y mes.
export async function getTasksByYearAndMonth(query, year, month) {
  return Task.find({
    year: year, month: month, $or: [
      {title: {$regex: query}}, {fullName: {$regex: query}}
    ]
  }).populate({path: 'user', select: 'name'})
}

// Filtrar tareas por status V1.
export async function getTasksByStatusV1(status) {
  if (status === 'F') {
    return Task.find({status: status})
      .populate({path: 'user', select: 'name'})
      .hint({$natural: -1}).limit(10)
  } else {
    return Task.find({status: status})
      .populate({path: 'user', select: 'name'})
      .sort({'forDate': 1})
  }
}

// Filtrar tareas por status V2.
export async function getTasksByStatusV2(status, query) {
  if (status === 'F') {
    return Task.find({
      status: status, $or: [
        {title: {$regex: query}}, {fullName: {$regex: query}}
      ]
    }).populate({path: 'user', select: 'name'})
      .hint({$natural: -1}).limit(25)
  } else {
    return Task.find({
      status: {$ne: status}, $or: [
        {title: {$regex: query}}, {fullName: {$regex: query}}
      ]
    }).populate({path: 'user', select: 'name'})
      .hint({$natural: -1})
  }
}
