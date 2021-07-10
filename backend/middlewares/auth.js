const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
const db = require('../models')
const User = db.user

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!',
      })
    }
    req.userId = decoded.id
    next()
  })
}

isAvailable = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getStatus().then((status) => {
      for (let i = 0; i < status.length; i++) {
        if (roles[i].name === 'available') {
          next()
          return
        }
      }

      res.status(403).send({
        message: 'Not available!',
      })
      return
    })
  })
}

const auth = {
  verifyToken: verifyToken,
  isAvailable: isAvailable,
}
module.exports = auth
