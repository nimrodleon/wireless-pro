import express, {response} from 'express'
import * as controller from './controller'
import {verifyToken} from '../middlewares'

const router = express.Router()

// http://<HOST>/api/info
router.get('/', [verifyToken], getInfoCompany)

// obtener info empresa.
function getInfoCompany(req, res = response) {
  controller.getInfo().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/info/:id
router.patch('/:id', [verifyToken], updateInfoCompany)

// actualizar info empresa.
function updateInfoCompany(req, res = response) {
  controller.updateInfo(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

export const infoRouter = router
