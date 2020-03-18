const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

const lionsRouter = require('./lions')
const tigersRouter = require('./tigers')

// default PORT and host
const PORT = 3001
const host = '127.0.0.1'

app.use(morgan('dev'))
app.use(express.static('client'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/lions', lionsRouter)

// Error middleware
app.use((error, req, res, next) => {
  if (error) {
    res.status(500).send({ message: 'Nope', error })
  }
})
// listen
app.listen(PORT, host, () => {
  console.log(`Server running on ${PORT} at http://${host}:${PORT}`)
})
