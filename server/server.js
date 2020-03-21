const express = require('express')
const app = express()
const api = require('./api/api')
const err = require('./middleware/error')

// set up the app middleware
require('./middleware/appMiddleware')(app)

// set up the api
app.use('/api', api)
// set up the global error handling
app.use(err())
//export app for testing
module.exports = app
