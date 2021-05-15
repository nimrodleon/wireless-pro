const express = require('express')
const router = express.Router()
const Info = require('./infos')
const verifyToken = require('../auth/verify')

router.get('/', verifyToken, async (req, res) => {
  try {
    const count = await Info.find({}).countDocuments()
    if (count <= 0) {
      const _info = new Info({ company: 'EMPRESA 1' })
      await _info.save()
    }
    const info = await Info.findOne({})
    res.json(info)
  } catch (err) {
    res.status(500).send(err)
  }
})

router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const info = await Info.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await info.save()
    res.json(info)
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
