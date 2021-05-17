import express from 'express'
import verifyToken from './verifyToken'
import * as controller from './controller'

const router = express.Router()

// Lista de usuarios.
router.get('/', verifyToken, async (req, res) => {
  const status = req.query.status || false
  controller.getUsers(status).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
})

// retornar usuario para editar.
router.get('/:id/edit', verifyToken, async (req, res) => {

})

// devolver la información del usuario autenticado.
router.get('/profile', verifyToken, async (req, res) => {

})

// permisos del usuario administrador.
router.get('/is-admin', verifyToken, async (req, res) => {

})

// permisos del usuario redes.
router.get('/is-redes', verifyToken, async (req, res) => {

})

// permisos del usuario caja.
router.get('/is-caja', verifyToken, async (req, res) => {

})

// registrar usuario.
router.post('/', verifyToken, async (req, res) => {

})

// actualizar datos del usuario.
router.patch('/:id', verifyToken, async (req, res) => {

})

// dependencia de documentos.
router.get('/:id/dependency', verifyToken, async (req, res) => {

})

// borrar usuarios.
router.delete('/:id', verifyToken, async (req, res) => {

})

// Login de acceso.
router.post('/login', async (req, res) => {

})

// Cambiar contraseña.
router.post('/:id/change-password', verifyToken, async (req, res) => {

})

export default router
