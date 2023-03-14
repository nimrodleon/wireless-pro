import express, {response} from 'api'
import {checkRolAdmin, verifyToken} from '../middlewares'
import {InfoController} from './controller'

const router = express.Router()

// http://<HOST>/api/info
router.get('/', [
  verifyToken,
], getInfoCompany)

// obtener info empresa.
function getInfoCompany(req, res = response) {
  InfoController.getInfo().then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/info/:id
router.patch('/:id', [
  verifyToken,
  checkRolAdmin,
], updateInfoCompany)

// actualizar info empresa.
function updateInfoCompany(req, res = response) {
  InfoController.updateInfo(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

export const infoRouter = router
