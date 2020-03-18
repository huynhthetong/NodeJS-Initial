const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const _ = require('lodash')
const morgan = require('morgan')

// default PORT and host
const PORT = 3001
const host = '127.0.0.1'

var lions = []
var id = 0

var updatedId = (req, res, next) => {
  if (!req.body.id) {
    id++
    req.body.id = id + ''
  }
  next()
}

app.use(morgan('dev'))
app.use(express.static('client'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.param('id', (req, res, next, id) => {
  var lion = _find(lions, { id })

  if (lion) {
    req.lion = lion
    next()
  } else {
    res.send
  }
})

app.get('/lions', (req, res) => {
  res.json()
})

app.get('/lions/:id', (req, res) => {
  var lion = req.lion
  res.json(lion || {})
})

app.post('/lions', updatedId, (req, res) => {
  var lion = req.body

  lions.push(lion)

  res.json(lion)
})

app.put('/lions/:id', (req, res) => {
  var update = req.body
  if (update.id) delete update.id

  var lion = _find(lions, { id: req.param.id })

  if (!lions[lion]) {
    res.send()
  } else {
    var updatedLion = _.assign(lions[lions], update)
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

// Middle ware error handler
app.use((err, req, res, next) => {
  if (err) res.status(500).send(err)
})

// listen
app.listen(PORT, host, () => {
  console.log(`Server running on ${PORT} at http://${host}:${PORT}`)
})
