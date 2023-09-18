import express, {response} from "express"
import {check} from "express-validator"
import {
  verifyToken,
  validate,
  userNameExist,
  userEmailExist,
  isValidRole,
  checkRolAdmin,
  editUserNameExist, editUserEmailExist
} from "../middlewares"
import {UserController} from "./controller"

const router = express.Router()

// http://<HOST>/api/users
router.get("/", [verifyToken], getUsers)

// Lista de usuarios.
function getUsers(req, res = response) {
  const status = req.query.status || false
  UserController.getUsers(status).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/users/:id
router.get("/:id", [verifyToken], getUser)

// retornar usuario para editar.
function getUser(req, res = response) {
  UserController.getUser(req.params.id).then(result => {
    res.json(result)
  })
}

// http://<HOST>/api/users/profile/currentUser
router.get("/profile/currentUser", [verifyToken], getProfile)

// devolver la información del usuario autenticado.
function getProfile(req, res = response) {
  res.json(req.currentUser)
}

// http://<HOST>/api/users/profile/roles
router.get("/profile/roles", [verifyToken], getRoles)

// Obtener el rol del usuario autentificado.
function getRoles(req, res = response) {
  const {roles} = req.currentUser
  res.json(roles)
}

// http://<HOST>/api/users
router.post("/", [
  verifyToken, checkRolAdmin,
  check("userName", "El userName es obligatorio").not().isEmpty(),
  check("userName").custom(userNameExist),
  check("password", "La contraseña debe ser más de 6 letras").isLength({min: 6}),
  check("roles").custom(isValidRole),
  check("email", "El email es obligatorio").not().isEmpty(),
  check("email", "El E-Mail no es válido").isEmail(),
  check("email").custom(userEmailExist),
  validate
], addUser)

// registrar usuario.
function addUser(req, res = response) {
  UserController.createUser(req.body).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json({
      ok: false,
      msg: "No se puedo crear registro del usuario"
    })
  })
}

// http://<HOST>/api/users/:id
router.patch("/:id", [
  verifyToken, checkRolAdmin,
  check("id", "No es un ID válido").isMongoId(),
  check("userName", "El userName es obligatorio").not().isEmpty(),
  check("userName").custom((value, {req}) =>
    editUserNameExist(value, req.params.id)),
  check("roles").custom(isValidRole),
  check("email", "El email es obligatorio").not().isEmpty(),
  check("email", "El E-Mail no es válido").isEmail(),
  check("email").custom((value, {req}) =>
    editUserEmailExist(value, req.params.id)),
  validate
], updateUser)

// actualizar datos del usuario.
function updateUser(req, res = response) {
  UserController.updateUser(req.params.id, req.body).then(result => {
    res.json(result)
  }).catch(err => {
    console.error("[updateUser]", err)
    res.status(400).json({
      ok: false,
      msg: "No se pudo actualizar la información del usuario"
    })
  })
}

// http://<HOST>/api/users/:id
router.delete("/:id", [
  verifyToken, checkRolAdmin,
  check("id", "No es un ID válido").isMongoId(),
  validate
], deleteUser)

// borrar usuarios.
function deleteUser(req, res = response) {
  UserController.deleteUser(req.params.id).then(result => {
    if (!result) {
      res.status(404).send("No item found")
    }
    res.json({ok: true, _id: result._id})
  }).catch(err => {
    console.error("[deleteUser]", err)
    res.status(400).json({
      ok: false,
      msg: "No se pudo eliminar el usuario"
    })
  })
}

// http://<HOST>/api/users/login
router.post("/login", [], loginUser)

// Login de acceso.
function loginUser(req, res = response) {
  const {userName, password} = req.body
  UserController.userLogin(userName, password).then(token => {
    res.json({token})
  }).catch(err => {
    console.log("[loginUser]", err)
    res.status(400).json({
      ok: false,
      msg: "Usuario y/o Contraseña Invalida!"
    })
  })
}

// http://<HOST>/api/users/:id/change-password
router.post("/:id/change-password", [
  verifyToken,
  check("id", "No es un ID válido").isMongoId(),
  check("password", "La contraseña debe ser más de 6 letras").isLength({min: 6}),
  validate
], passwordChange)

// Cambiar contraseña.
function passwordChange(req, res = response) {
  const {password} = req.body
  UserController.passwordChange(req.params.id, password).then(() => {
    res.json({ok: true, _id: req.params.id})
  }).catch(err => {
    console.log("[passwordChange]", err)
    res.status(400).json({
      ok: false,
      msg: "No se pudo cambiar la contraseña"
    })
  })
}

// http://<HOST>/api/users/:id
router.put("/:id", [
  verifyToken,
  check("id", "No es un ID válido").isMongoId(),
  check("userName", "El userName es obligatorio").not().isEmpty(),
  check("userName").custom((value, {req}) =>
    editUserNameExist(value, req.params.id)),
  validate
], updateUserProfile)

// actualizar datos del usuario.
function updateUserProfile(req, res = response) {
  UserController.updateUserProfile(req.params.id, req.body)
    .then(result => {
      res.json(result)
    }).catch(err => {
    console.error("[updateUser]", err)
    res.status(400).json({
      ok: false,
      msg: "No se pudo actualizar la información del usuario"
    })
  })
}

// http://<HOST>/api/users/select2/:q?
router.get("/select2/:q?", [verifyToken], getUsersWithSelect2)

// Buscar usuarios con select2.
function getUsersWithSelect2(req, res = response) {
  let {term = ""} = req.query
  UserController.getUsersWithSelect2(term).then(result => {
    res.json(result)
  }).catch(err => {
    res.status(400).json(err)
  })
}

export const authRouter = router
