const {response} = require("express")
const {validationResult} = require("express-validator")

// middleware validar campos.
const validate = (req, res = response, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors)
  }
  next()
}

module.exports = {
  validate
}
