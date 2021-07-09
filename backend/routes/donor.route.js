const controller = require('../controllers/donors.controller.js')

module.exports = function (app) {
  app.get('/api/donors', controller.getDonors)

  app.get('/api/availableDonors', controller.getAvailableDonors)

  app.put('/api/update/:id', controller.updateStatus)

  app.get('/api/getdonor/:id', controller.getdonor)
}
