const express = require('express')
const router = express.Router()

const User = require('./users'),
  bcrypt = require('bcrypt'),
  verifyToken = require('./verify')

router.get('/', verifyToken, async (req, res) => {
  try {
    const status = req.query.status || false
    const users = await User.find({ suspended: status })
    res.json(users)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id/edit', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Permisos Administrador.
router.get('/is-admin', verifyToken, async (req, res) => {
  res.json(req.isAdmin)
})

// Permisos de Administrador de redes.
router.get('/is-redes', verifyToken, async (req, res) => {
  res.json(req.redes)
})

// Permisos para realizar Cobros.
router.get('/is-caja', verifyToken, async (req, res) => {
  res.json(req.caja)
})

router.post('/', verifyToken, async (req, res) => {
  try {
    const saltRounds = 10
    const user = new User(req.body)
    if (!user.password) {
      res.status(401).send('The password doesn´t exists')
    } else {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(user.password, salt, async (err, hash) => {
          user.password = hash
          await user.save()
          res.json(user)
        })
      })
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

router.patch('/:id', verifyToken, async (req, res) => {
  try {
    // const avatar = req.files.avatar
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    await user.save()
    res.json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

// dependencias de documentos.
router.get('/:id/dependency', verifyToken, async (req, res) => {
  try {
    let dep = 0
    const userId = req.params.id
    const Averia = require('../averia/averia')
    dep = await Averia.find({ user: userId }).countDocuments()
    if (dep <= 0) {
      const Payment = require('../payments/payments')
      dep = await Payment.find({ user: userId }).countDocuments()
    }
    res.json(dep)
  } catch (error) {
    res.status(500).send(error)
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(500).send('Unauthorized request')
    } else {
      const user = await User.findByIdAndDelete(req.params.id)
      if (!user) res.status(404).send("No item found")
      return res.status(200).send()
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

const jwt = require('jsonwebtoken')
router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body
    const user = await User.findOne({ userName: userName })
    if (!user) return res.status(401).send('El usuario no Existe')
    if (user.suspended) return res.status(500).send('Cuenta Suspendida')
    bcrypt.compare(password, user.password).then((result) => {
      if (result == false) {
        return res.status(401).send('Contraseña Incorrecta')
      } else {
        const exp = user.isAdmin || user.redes ? '10m' : '4h'
        const token = jwt.sign({
          _id: user._id,
          isAdmin: user.isAdmin,
          redes: user.redes,
          caja: user.caja
        }, 'ias0SH23FN47L0ZciKN204BFfWwj6vNY', { expiresIn: exp })
        return res.status(200).json(token)
      }
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/:id/change-password', verifyToken, async (req, res) => {
  try {
    const { isProfile, current, old } = req.body
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(401).send('El usuario no existe!')
    } else {
      const saltRounds = 10
      if (isProfile) {
        bcrypt.compare(old, user.password).then(result => {
          if (result == false) {
            return res.status(401).send('Contraseña incorrecta')
          } else {
            bcrypt.genSalt(saltRounds, (err, salt) => {
              bcrypt.hash(current, salt, async (err, hash) => {
                user.password = hash
                await user.save()
                res.status(200).send()
              })
            })
          }
        })
      } else {
        if (req.isAdmin === true) {
          bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(current, salt, async (err, hash) => {
              user.password = hash
              await user.save()
              res.status(200).send()
            })
          })
        }
      }
    }
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = router
