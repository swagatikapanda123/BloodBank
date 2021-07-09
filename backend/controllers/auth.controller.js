const db = require('../models')
const config = require('../config/auth.config')
const User = db.user

const Op = db.Sequelize.Op

var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    username: req.body.username,
    bloodGroup: req.body.bloodGroup,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city,
    email: req.body.email,
    phone: req.body.phone,
    status: req.body.status,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then(() => {
      res.status(200).send({ message: 'Donor created successfully' })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: 'Invalid Password!',
        })
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      })

      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        bloodGroup: user.bloodGroup,
        status: user.status,
        accessToken: token,
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}
