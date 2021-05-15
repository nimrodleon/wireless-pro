const express = require('express'),
  router = express.Router(),
  verifyToken = require('../auth/verify')

const Material = require('./model')

router.get('/', verifyToken, async (req, res) => {
  try {
    const search = req.query.search || ''
    const materials = await Material.find({
      $or: [
        { description: { $regex: search } }
      ]
    })
    res.json(materials)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const material = await Material.findById(req.params.id)
    res.json(material)
  } catch (err) {
    res.status(500).send(err)
  }
})

// Cantidad de materiales en Tareas.
router.get('/:id/count/material', verifyToken, async (req, res) => {
  try {
    const TaskMaterial = require('../tasks/material')
    const count = await TaskMaterial.find({ material: req.params.id }).countDocuments()
    res.json({ count })
  } catch (err) {
    res.status(500).send()
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const material = new Material(req.body)
    await material.save()
    res.json(material)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await material.save()
    res.json(material)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const material = await Material.findByIdAndDelete(req.params.id)
    if (!material) res.status(500).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
