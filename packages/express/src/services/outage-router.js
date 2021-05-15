const express = require('express'),
  router = express.Router(),
  verifyToken = require('../auth/verify')

const Outage = require('./outage')

router.get('/:id/service', verifyToken, async (req, res) => {
  try {
    const outages = await Outage.find({ service: req.params.id })
      .hint({ $natural: -1 }).limit(12)
    res.json(outages)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const outage = await Outage.findById(req.params.id)
    res.json(outage)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const outage = new Outage(req.body)
    await outage.save()
    res.json(outage)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
