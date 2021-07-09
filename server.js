const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

var corsOptions = {
  origin: 'http://localhost:8080',
}

app.use(cors(corsOptions))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./backend/models')
db.sequelize.sync()

require('./backend/routes/donor.route.js')(app)
require('./backend/routes/auth.route.js')(app)

app.get('/', (req, res) => {
  res.send('home page')
})

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
