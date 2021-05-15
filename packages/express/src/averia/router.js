const express = require('express'),
  router = express.Router()
// Import models.
const Averia = require('./averia'),
  verifyToken = require('../auth/verify')
// Lodash.
const _ = require('lodash')

router.get('/', verifyToken, async (req, res) => {
  try {
    let { archived, search } = req.query
    if (!search) search = ''
    archived = archived == 'true' ? true : false
    let averias = new Object()
    if (archived) {
      averias = await Averia.find({
        archived: true,
      }).populate({
        path: 'client',
        select: 'fullName',
        match: { fullName: { $regex: search } }
      }).populate({
        path: 'user',
        select: 'name',
      }).hint({ $natural: -1 }).limit(25)
    } else {
      averias = await Averia.find({
        archived: false,
      }).populate({
        path: 'client',
        select: 'fullName',
        match: { fullName: { $regex: search } }
      }).populate({
        path: 'user',
        select: 'name',
      }).hint({ $natural: -1 })
    }
    averias = _.filter(averias, (obj) => obj.client != null)
    res.json(averias)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const averia = await Averia.findById(req.params.id)
      .populate({ path: 'client', select: 'fullName' })
    res.json(averia)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const averia = new Averia(req.body)
    averia.archived = false
    averia.status = 'P'
    await averia.save()
    res.json(averia)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const averia = await Averia.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await averia.save()
    res.json(averia)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const averia = await Averia.findByIdAndDelete(req.params.id)
    if (!averia) res.status(500).send('No item found')
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
