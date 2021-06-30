import express, {response} from 'express'
import {verifyToken} from '../middlewares'
import {OrderController} from './controller'

const router = express.Router()

// http://<HOST>/api/installation_orders

// Lista de ordenes de instalación.


// http://<HOST>/api/installation_orders
// Lista de ordenes filtrado por mes y año.

// Obtener orden de instalación por id.

// http://<HOST>/api/installation_orders
router.post('/', [verifyToken], addOrderInstallation)

// Registrar orden de instalación.
function addOrderInstallation(req, res = response) {
  OrderController.addOrder(req.body).then(result => {
    res.json(result)
  })
}

// actualizar orden de instalación.


// Borrar orden de instalación.

// ========================================
// Lista de materiales.

// Obtener material por id.
// registrar material.
// actualizar material.
// borrar material.

export const installationOrderRouter = router
