import express from 'express'
import * as controller from './controller'
import verifyToken from '../middlewares/verifyToken'

const router = express.Router()

// filtrar por status V1.
router.get('/:status/v1', verifyToken, async (req, res) => {
  controller.getTasksByStatusV1(req.params.status).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// filtrar por status V2.
router.get('/:status/v2', verifyToken, async (req, res) => {
  let status = req.params.status
  let query = req.query.search || ''
  controller.getTasksByStatusV2(status, query).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// buscar tareas por mes y año.
router.get('/:year/:month/s', verifyToken, async (req, res) => {
  let query = req.query.search || ''
  controller.getTasksByYearAndMonth(query,
    req.params.year, req.params.month).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// obtener task por id.
router.get('/:id', verifyToken, async (req, res) => {
  controller.getTask(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// registrar tarea.
router.post('/', verifyToken, async (req, res) => {
  controller.createTask(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// actualizar tarea.
router.patch('/:id', verifyToken, async (req, res) => {
  controller.updateTask(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// borrar tarea.
router.delete('/:id', verifyToken, async (req, res) => {
  controller.deleteTask(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

export default router
