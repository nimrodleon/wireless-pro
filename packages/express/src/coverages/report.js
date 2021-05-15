const express = require('express'),
  router = express.Router()
const verifyToken = require('../auth/verify')

router.get('/total', verifyToken, async (req, res) => {
  try {
    const Coverage = require('./coverages')
    const coverages = await Coverage.find({})
    let data = []
    const Client = require('../clients/clients')
    const clients = await Client.aggregate([
      { $match: { is_active: true } },
      { $group: { _id: "$coverage", count: { $sum: 1 } } }
    ])
    const _ = require('lodash')
    Array.from(coverages).forEach(value => {
      const obj = _.find(clients, { _id: value._id })
      if (obj) data.push({ _id: value._id, name: value.name, count: obj.count })
    })
    res.json(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
