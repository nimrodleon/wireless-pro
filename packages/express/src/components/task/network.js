import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {TaskController} from './controller'

const router = express.Router()

// // http://<HOST>/api/tasks/:status/v1
// router.get('/:status/v1', [verifyToken], getTasks)
//
// // filtrar por status V1.
// function getTasks(req, res = response) {
//   TaskController.getTasksByStatusV1(req.params.status).then(result => {
//     res.json(result)
//   }).catch(err => {
//     res.status(500).json(err)
//   })
// }

// http://<HOST>/api/tasks/:status/v2
router.get('/:status/v2', [verifyToken], getTasksFilterByStatus)

// filtrar por status V2.
function getTasksFilterByStatus(req, res = response) {
  console.log('hola .............')
  const {search = ''} = req.query
  TaskController.getTasksByStatusV2(req.params.status, search).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/tasks/:year/:month/s
router.get('/:year/:month/s', [verifyToken], getTasksByDates)

// buscar tareas por mes y año.
function getTasksByDates(req, res = response) {
  let query = req.query.search || ''
  TaskController.getTasksByYearAndMonth(query,
    req.params.year, req.params.month).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/tasks/:id
router.get('/:id', [verifyToken], getTask)

// obtener task por id.
function getTask(req, res = response) {
  TaskController.getTask(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/tasks
router.post('/', [verifyToken], addTask)

// registrar tarea.
function addTask(req, res = response) {
  TaskController.createTask(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/tasks/:id
router.patch('/:id', [verifyToken], updateTask)

// actualizar tarea.
function updateTask(req, res = response) {
  TaskController.updateTask(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/tasks/:id
router.delete('/:id', [verifyToken], deleteTask)

// borrar tarea.
function deleteTask(req, res = response) {
  TaskController.deleteTask(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

export const taskRouter = router
