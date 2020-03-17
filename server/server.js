// find modules
const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash')

const app = express()

const PORT = 3001
const host = '127.0.0.1'

app.use(express.static('client'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var lions = []
var id = 0
// TODO: Make the REST  routes to perform CRUD on lions
app.get('/lions', (req, res) => {
  res.json(lions)
})

app.get('/lions/:id', (req, res) => {
  var lion = _.find(lions, { id: req.params.id })
  res.json(lion || {})
})

app.post('/lions', (req, res) => {
  var lion = req.body
  id++
  lion.id = id + ''
  lions.push(lion)

  res.json(lions)
})

app.put('/lions/:id', function(req, res) {
  var update = req.body
  if (update.id) {
    delete update.id
  }

  var lion = _.findIndex(lions, { id: req.params.id })
  if (!lions[lion]) {
    res.send()
  } else {
    var updatedLion = _.assign(lions[lion], update)
    res.json(updatedLion)
  }
})

app.delete('/lions/:id', (req, res) => {
  var lion = _.find(lions, { id: req.params.id })

  if (!lions[lion]) {
    res.send()
  } else {
    var deletedLion = lions[lion]
    lions.splice(lion, 1)
    res.json(deletedLion)
  }
})

app.listen(PORT, host, () => {
  console.log(`Server running on port ${PORT} at http://${host}:${PORT}/`)
})
