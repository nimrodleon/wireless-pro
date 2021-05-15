const express = require('express'),
  router = express.Router()

const moment = require('moment')
const verifyToken = require('../auth/verify'),
  Task = require('./task'),
  TaskMaterial = require('./material')

/**
 * Filtrar por Status.
 * @deprecated sice version 4
 */
router.get('/:status/v1', verifyToken, async (req, res) => {
  try {
    let tasks = {}
    if (req.params.status == 'F') {
      tasks = await Task.find({ status: req.params.status })
        .populate({ path: 'user', select: 'name' })
        .hint({ $natural: -1 }).limit(10)
    } else {
      tasks = await Task.find({ status: req.params.status })
        .populate({ path: 'user', select: 'name' })
        .sort({ 'forDate': 1 })
    }
    res.json(tasks)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Filtrar por Status v2.
router.get('/:status/v2', verifyToken, async (req, res) => {
  try {
    let tasks = new Object()
    const search = req.query.search || ''
    if (req.params.status == 'F') {
      tasks = await Task.find({
        status: 'F', $or: [
          { title: { $regex: search } }, { fullName: { $regex: search } }
        ]
      }).populate({ path: 'user', select: 'name' })
        .hint({ $natural: -1 }).limit(25)
    } else {
      tasks = await Task.find({
        status: { $ne: 'F' }, $or: [
          { title: { $regex: search } }, { fullName: { $regex: search } }
        ]
      }).populate({ path: 'user', select: 'name' })
        .hint({ $natural: -1 })
    }
    res.json(tasks)
  } catch (err) {
    res.status(500).send(err)
  }
})

// buscador de tareas.
router.get('/:year/:month/s', verifyToken, async (req, res) => {
  try {
    const search = req.query.search || ''
    const tasks = await Task.find({
      year: req.params.year, month: req.params.month, $or: [
        { title: { $regex: search } }, { fullName: { $regex: search } }
      ]
    }).populate({ path: 'user', select: 'name' })
    res.json(tasks)
  } catch (err) {
    res.status(500).send(err)
  }
})

// retorna una Tarea especifica.
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate({ path: 'user', select: 'name userName' })
    res.json(task)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Guarda una Nueva Tarea.
router.post('/', verifyToken, async (req, res) => {
  try {
    const task = new Task(req.body)
    task.year = moment(task.createdAt).format('YYYY')
    task.month = moment(task.createdAt).format('MM')
    await task.save()
    res.json(task)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Actualiza una Tarea Existente.
router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await task.save()
    res.json(task)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Borra una Tarea Existente.
const _ = require('lodash')
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const taskId = req.params.id
    const taskMaterials = await TaskMaterial.find({ task: taskId })
    _.forEach(taskMaterials, async (material) => {
      await TaskMaterial.findByIdAndDelete(material._id)
    })
    const task = await Task.findByIdAndDelete(taskId)
    if (!task) res.status(500).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

// Route of Materials.
router.get('/:id/material', verifyToken, async (req, res) => {
  try {
    const materials = await TaskMaterial.find({ task: req.params.id })
      .populate('material')
    res.json(materials)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/material/:id', verifyToken, async (req, res) => {
  try {
    const material = await TaskMaterial.findById(req.params.id)
    res.json(material)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/material', verifyToken, async (req, res) => {
  try {
    const material = new TaskMaterial(req.body)
    await material.save()
    res.json(material)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.patch('/material/:id', verifyToken, async (req, res) => {
  try {
    const material = await TaskMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await material.save()
    res.json(material)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/material/:id', verifyToken, async (req, res) => {
  try {
    const material = await TaskMaterial.findByIdAndDelete(req.params.id)
    if (!material) res.status(500).send('No item found')
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
