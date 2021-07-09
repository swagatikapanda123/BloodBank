const db = require('../models')
const config = require('../config/auth.config')
const User = db.user

const Op = db.Sequelize.Op

exports.getDonors = (req, res) => {
  const username = req.query.username
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving donors.',
      })
    })
}

exports.getAvailableDonors = (req, res) => {
  const status = req.query.status
  var condition = { status: { [Op.eq]: 'available' } }
  User.findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving',
      })
    })
}

exports.updateStatus = (req, res) => {
  const id = req.params.id
  User.update(req.body, { where: { id: id } })
    .then((data) => {
      res.status(200).send('Status updated successfully')
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

exports.getdonor = (req, res) => {
  const id = req.params.id

  User.findByPk(id)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Tutorial with id=' + id,
      })
    })
}
