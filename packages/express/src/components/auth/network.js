import express, {response} from 'express'
import verifyToken from '../middlewares/verifyToken'
import {UserController} from './controller'

const router = express.Router()

// http://<HOST>/api/users
router.get('/', [verifyToken], getUsers)

// Lista de usuarios.
function getUsers(req, res = response) {
  const status = req.query.status || false
  UserController.getUsers(status).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/users/:id/edit
router.get('/:id/edit', [verifyToken], getUserEdit)

// retornar usuario para editar.
function getUserEdit(req, res = response) {
  UserController.getUser(req.params.id).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/users/profile
router.get('/profile', [verifyToken], getProfile)

// devolver la información del usuario autenticado.
function getProfile(req, res = response) {
  UserController.getUser(req.userId).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/users
router.post('/', [verifyToken], addUser)

// registrar usuario.
function addUser(req, res = response) {
  UserController.createUser(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/users/:id
router.patch('/:id', [verifyToken], updateUser)

// actualizar datos del usuario.
function updateUser(req, res = response) {
  UserController.updateUser(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/users/:id
router.delete('/:id', [verifyToken], deleteUser)

// borrar usuarios.
function deleteUser(req, res = response) {
  if (!req.isAdmin) {
    return res.status(500).send('Unauthorized request')
  } else {
    UserController.deleteUser(req.params.id).then(result => {
      if (!result) {
        res.status(404).send('No item found')
      }
      res.status(200).send()
    }).catch(err => {
      res.status(500).json(err)
    })
  }
}

// http://<HOST>/api/users/login
router.post('/login', [verifyToken], loginUser)

// Login de acceso.
function loginUser(req, res = response) {
  const {userName, password} = req.body
  UserController.userLogin(userName, password).then(token => {
    res.status(200).json(token)
  }).catch(err => {
    res.status(500).json(err)
  })
}

// http://<HOST>/api/users/:id/change-password
router.post('/:id/change-password', [verifyToken], passwordChange)

// Cambiar contraseña.
function passwordChange(req, res = response) {
  const {current} = req.body
  UserController.passwordChange(req.params.id, current).then(() => {
    res.status(200).send()
  }).catch(err => {
    res.status(500).json(err)
  })
}

export const authRouter = router
