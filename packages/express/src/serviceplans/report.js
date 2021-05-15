const express = require('express'),
  router = express.Router()
const verifyToken = require('../auth/verify')

router.get('/total', verifyToken, async (req, res) => {
  try {
    const ServicePlan = require('./serviceplans')
    const serviceplans = await ServicePlan.find({})
    let data = []
    const Service = require('../services/services')
    const services = await Service.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: "$servicePlan", count: { $sum: 1 } } }
    ])
    const _ = require('lodash')
    Array.from(serviceplans).forEach(value => {
      const obj = _.find(services, { _id: value._id })
      if (obj) data.push({ _id: value._id, name: value.name, count: obj.count })
    })
    res.json(data)
  } catch (error) {
    res.status(500).send(error)
  }
})

module.exports = router
