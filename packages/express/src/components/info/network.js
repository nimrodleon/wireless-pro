import express from 'express'
import * as controller from './controller'
import verifyToken from '../auth/verifyToken'

const router = express.Router()

// obtener info empresa.
router.get('/', verifyToken, async (req, res) => {
  controller.getInfo().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// actualizar info empresa.
router.patch('/:id', verifyToken, async (req, res) => {
  controller.updateInfo(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

export default router
